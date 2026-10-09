# Thêm Swagger cho các API

## Bối cảnh
Bạn muốn có trang tài liệu API (Swagger UI) cho các API `users` để xem và gọi thử. Project đang dùng Nest 11, đã có `ValidationPipe({ whitelist: true, transform: true })` trong `src/main.ts`, nhưng chưa cài `@nestjs/swagger`.

Cách làm: dùng **Swagger CLI plugin** của Nest. Plugin tự đọc kiểu TypeScript và các decorator của `class-validator` trong DTO/entity để sinh schema, nên gần như không phải viết `@ApiProperty()` thủ công.

## Các bước

1. **Cài package**: `npm install @nestjs/swagger`

2. **Bật CLI plugin** trong `nest-cli.json`:
   ```json
   "compilerOptions": {
     "deleteOutDir": true,
     "plugins": [{ "name": "@nestjs/swagger", "options": { "introspectComments": true } }]
   }
   ```
   Tuỳ chọn `introspectComments` lấy comment `/** ... */` phía trên các field làm mô tả trong Swagger.

3. **Cấu hình Swagger** trong `src/main.ts`, đặt trước `app.listen`:
   ```ts
   const config = new DocumentBuilder()
     .setTitle('NestJS Practice API')
     .setVersion('1.0')
     .build();
   SwaggerModule.setup('docs', app, () => SwaggerModule.createDocument(app, config));
   ```
   Trang tài liệu sẽ nằm ở `http://localhost:3000/docs`, còn JSON spec ở `/docs-json`.

4. **DTO**
   - `src/users/dto/create-user.dto.ts`: thêm `@IsString() @IsNotEmpty()` cho `name`. Đây là **lỗi đang có sẵn**: vì `whitelist: true` sẽ xoá mọi field không có decorator validate, `name` hiện đang bị bỏ khi tạo user. Swagger plugin cũng dựa vào các decorator này để đánh dấu field là bắt buộc.
   - `src/users/dto/update-user.dto.ts`: đổi import `PartialType` từ `@nestjs/mapped-types` sang `@nestjs/swagger`, để Swagger hiển thị đúng các field tuỳ chọn.
   - `src/users/dto/search-user.dto.ts`: plugin tự nhận diện `keyword`, `page`, `size`, kể cả giá trị mặc định, không cần sửa.

5. **Controller** `src/users/users.controller.ts`
   - Thêm `@ApiTags('users')` trên class để gom các API vào một nhóm.
   - Thêm `ParseUUIDPipe` cho các tham số `:id` (đúng kiểu uuid, đồng thời trả lỗi 400 khi id sai định dạng).
   - Thêm `@ApiNotFoundResponse()` cho các route `findOne`, `update` và `remove`, vì service có thể ném lỗi 404.
   - Kiểu dữ liệu trả về sẽ được plugin suy ra từ `Promise<User>` trong service, vì entity `User` (`src/users/entities/user.entity.ts`) cũng được plugin quét qua.

6. **Response phân trang** (`src/common/dto/paginated-response.dto.ts`): Swagger không mô tả được class generic `PaginatedResponse<T>`. Tạm thời giữ nguyên. Nếu cần hiển thị schema đầy đủ, tạo thêm `PaginatedUserResponse extends PaginatedResponse<User>` có khai báo `@ApiProperty({ type: [User] }) items`, rồi dùng `@ApiOkResponse({ type: PaginatedUserResponse })` cho route `search`.

## Kiểm tra
- `npx tsc --noEmit` không báo lỗi.
- `npm run start:dev`, mở `http://localhost:3000/docs` và kiểm tra:
  - Nhóm `users` có đủ 5 API.
  - `POST /users` hiển thị body có `name` bắt buộc. Bấm "Try it out" thì tạo được user, và trong response `name` có giá trị.
  - `GET /users` có các query param `keyword`, `page`, `size`.
  - Gọi `GET /users/abc` trả lỗi 400 vì id không phải uuid. Gọi với một uuid không tồn tại thì trả lỗi 404.

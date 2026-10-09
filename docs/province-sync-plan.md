# Đồng bộ province.json vào bảng `provinces`

## Context
File [province.json](province.json) (gốc project) là object `{ "<key>": {name, slug, type, name_with_type, code} }` gồm 34 tỉnh/thành. Cần nạp vào bảng `provinces`, dùng **key làm `id`**. Hiện entity dùng `@PrimaryGeneratedColumn()` (id tự tăng) nên không gán id thủ công được, và `ProvincesService` vẫn là stub chưa có repository.

## Thay đổi

### 0. Lưu plan vào docs
- Copy nội dung plan này vào `docs/province-sync-plan.md` (tạo thư mục `docs/` nếu chưa có).

### 1. [province.entity.ts](src/modules/provinces/entities/province.entity.ts)
- `@PrimaryGeneratedColumn()` → `@PrimaryColumn()` (`id: number`), để id lấy từ key JSON.
- `synchronize: true` trong [app.module.ts](src/app.module.ts) sẽ tự bỏ default sequence của cột id.

### 2. [provinces.module.ts](src/modules/provinces/provinces.module.ts)
- Thêm `imports: [TypeOrmModule.forFeature([Province])]` (giống `UsersModule`).

### 3. [provinces.service.ts](src/modules/provinces/provinces.service.ts)
- Inject `@InjectRepository(Province) private provinceRepository: Repository<Province>` (theo pattern [users.service.ts](src/modules/users/users.service.ts)).
- Thêm method `sync()`:
  ```ts
  async sync() {
    const raw = await readFile(join(process.cwd(), 'province.json'), 'utf-8');
    const data = JSON.parse(raw) as Record<string, Omit<Province, 'id' | 'createdAt' | 'updatedAt'>>;
    const provinces = Object.entries(data).map(([key, item]) => ({ id: Number(key), ...item }));
    await this.provinceRepository.upsert(provinces, ['id']);
    return { total: provinces.length };
  }
  ```
  `upsert` theo `id` → chạy lại nhiều lần không bị trùng, bản ghi đã có sẽ được cập nhật.
- (Tuỳ chọn, nhỏ) cài đặt `findAll()` bằng `provinceRepository.find({ order: { id: 'ASC' } })` để kiểm tra kết quả.

### 4. [provinces.controller.ts](src/modules/provinces/provinces.controller.ts)
- Thêm `@Post('sync')` gọi `provincesService.sync()` — đặt **trước** các route `:id`.

## Kiểm tra
1. `npm run start:dev` → TypeORM sync schema không lỗi.
2. `curl -X POST http://localhost:3000/provinces/sync` → `{ "total": 34 }`.
3. Gọi lại lần 2 → vẫn 34 bản ghi (không trùng).
4. `GET /provinces` hoặc `SELECT id, name, code FROM provinces ORDER BY id;` → id 11..44 khớp key JSON.

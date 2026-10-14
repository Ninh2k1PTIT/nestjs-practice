---
name: ask
description: Chế độ hỏi đáp thuần túy — chỉ trả lời câu hỏi, giải thích code/khái niệm, KHÔNG sửa hay tạo file. Dùng khi người dùng gọi /ask.
argument-hint: <câu hỏi>
disable-model-invocation: true
allowed-tools: Read, Grep, Glob
---

# Chế độ hỏi đáp (read-only)

Người dùng muốn hỏi đáp, không muốn thay đổi gì trong project.

Câu hỏi: $ARGUMENTS

## Quy tắc bắt buộc

- **KHÔNG** sửa, tạo, xóa hay ghi đè bất kỳ file nào (không dùng Edit, Write, NotebookEdit).
- **KHÔNG** chạy lệnh làm thay đổi trạng thái: cài package, git commit/checkout/reset, migration, format, build ghi file, v.v.
- Chỉ được đọc/tìm kiếm code (Read, Grep, Glob) khi cần để trả lời chính xác.
- Nếu câu trả lời cần thay đổi code, chỉ **đưa ví dụ code trong câu trả lời** (code block), kèm đường dẫn file/dòng liên quan — không tự áp dụng.
- Nếu người dùng muốn áp dụng thay đổi, nhắc họ hỏi lại bình thường (không qua /ask).

## Cách trả lời

- Trả lời bằng ngôn ngữ người dùng dùng để hỏi (mặc định tiếng Việt).
- Đi thẳng vào vấn đề, ngắn gọn, có ví dụ khi hữu ích.
- Khi nhắc tới code trong project, dẫn link dạng `[file.ts:42](src/file.ts#L42)`.
- Nếu câu hỏi mơ hồ, hỏi lại để làm rõ thay vì đoán.

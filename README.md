# Thi đua 11A3

Bản thử nghiệm giao diện bảng thi đua lớp 11A3.

## Tính năng hiện có

- Bảng xếp hạng 4 tổ với điểm nền 350.
- Ghi sự kiện điểm theo tổ.
- Trạng thái chờ duyệt, duyệt hoặc từ chối sự kiện.
- Lưu dữ liệu nháp trong localStorage của trình duyệt.
- Giao diện thích ứng với điện thoại và máy tính.

## Chạy thử

Mở `index.html` trong trình duyệt hoặc chạy máy chủ tĩnh:

```bash
npm install
npm start
```

## Giới hạn quan trọng

Đây hiện là **bản demo phía trình duyệt**, chưa kết nối Supabase hay cơ sở dữ liệu dùng chung. Dữ liệu chỉ nằm trên thiết bị/trình duyệt đang dùng và có thể bị mất khi xóa dữ liệu trang. Nút duyệt chỉ thay đổi trạng thái trong bản nháp, không phải quy trình xác nhận chính thức.

Không nhập thông tin cá nhân thật của học sinh vào bản demo. Trước khi dùng thực tế cần xây dựng xác thực, phân quyền và cơ sở dữ liệu an toàn.

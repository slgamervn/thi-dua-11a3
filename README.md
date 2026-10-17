# Thi đua 11A3

Ứng dụng web responsive theo dõi thi đua lớp 11A3, năm học 2026–2027.

## Mã nguồn

Bản mã nguồn ban đầu gồm HTML, CSS, JavaScript và SQL cho Supabase. Đây là bản khởi đầu, chưa triển khai production.

## Chạy bản nháp

Mở `index.html` trong trình duyệt hoặc chạy `npm install` rồi `npm start`.

## Cấu hình cloud

Sao chép `config.js.example` thành `config.js`, sau đó điền Supabase Project URL và Publishable key. Không đưa Supabase Secret key vào mã phía trình duyệt hoặc repository.

Chạy `supabase/schema.sql` trong SQL Editor của Supabase trước khi bật chế độ cloud. Kiểm thử Row Level Security (RLS) với từng vai trò trước khi sử dụng dữ liệu thật.

## Lưu ý

Tài khoản `demo` / `123456` (nếu có trong bản nháp) chỉ dùng thử, không dùng làm thông tin đăng nhập thật. Không đưa dữ liệu cá nhân của học sinh lên bản demo hoặc repository công khai.
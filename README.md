# ShopMini

Ứng dụng cửa hàng mini xây dựng bằng React, TypeScript, Vite, Context API và Redux Toolkit. Danh sách sản phẩm được lấy từ [Fake Store API](https://fakestoreapi.com/products).

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Đăng nhập giả lập với tên người dùng bất kỳ và mật khẩu `123456`. Chạy `npm run build` để tạo bản dựng trong `dist/`.

## Tổ chức state

| Nơi lưu state | Dữ liệu | Lý do |
| --- | --- | --- |
| `useState` trong component | Từ khóa tìm kiếm, giá trị các ô đăng nhập, lỗi biểu mẫu và trạng thái thông báo đặt hàng | Chỉ ảnh hưởng tới một màn hình, không cần chia sẻ giữa các trang. |
| Context API | Theme sáng/tối trong `ThemeContext`; người dùng đăng nhập trong `AuthContext` | Là trạng thái ứng dụng cần dùng ở nhiều màn hình nhưng không cần các thao tác cập nhật phức tạp. Theme và phiên đăng nhập được lưu trong `localStorage`. |
| Redux Toolkit | Danh sách sản phẩm, trạng thái tải API và giỏ hàng | Dữ liệu được chia sẻ giữa nhiều trang. `productsSlice` dùng `createAsyncThunk`; `cartSlice` cung cấp thêm, xóa, đổi số lượng, xóa toàn bộ và selector tính tổng. |

## Các trang

- `/` — lưới sản phẩm 1 cột trên điện thoại, 2 cột trên tablet, 4 cột trên desktop; có tìm kiếm theo tên.
- `/products/:id` — thông tin chi tiết sản phẩm.
- `/cart` — chỉnh số lượng và xem tổng tiền.
- `/login` — đăng nhập giả lập.
- `/checkout` — yêu cầu đăng nhập; sau khi đăng nhập, người dùng trở lại trang cần truy cập. Đặt hàng sẽ xóa giỏ và hiện thông báo thành công.
- Trang 404 cho đường dẫn không tồn tại.

## Nộp bài

Đổi tên repository theo mẫu `<mã sinh viên> - BaiTH03`, sau đó push mã nguồn lên repository đó. Không commit `node_modules/` hoặc `dist/` (đã có trong `.gitignore`). Nếu repository ở chế độ private, mời giảng viên với username `anhttptit`. Dán địa chỉ repository vào phần trả lời trên Slink.

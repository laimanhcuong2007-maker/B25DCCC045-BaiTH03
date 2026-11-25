import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <span className="not-found-code">404</span>
      <p className="eyebrow">TRANG NÀY CHƯA CÓ Ở SHOPMINI</p>
      <h1>Hình như bạn đã đi lạc.</h1>
      <p>Đường dẫn này không tồn tại hoặc đã được chuyển đi.</p>
      <Link className="button button-dark" to="/">Về trang chủ <span aria-hidden="true">→</span></Link>
    </section>
  )
}

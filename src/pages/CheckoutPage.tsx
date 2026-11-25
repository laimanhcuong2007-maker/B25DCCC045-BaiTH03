import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearCart, selectCartItems, selectCartTotalPrice } from '../features/cart/cartSlice'

const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' })

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotalPrice)
  const [ordered, setOrdered] = useState(false)

  const placeOrder = () => {
    dispatch(clearCart())
    setOrdered(true)
  }

  if (ordered) {
    return (
      <section className="success-state" role="status">
        <span className="success-icon" aria-hidden="true">✓</span>
        <p className="eyebrow">ĐẶT HÀNG THÀNH CÔNG</p>
        <h1>Cảm ơn bạn đã mua sắm!</h1>
        <p>Đơn hàng của bạn đã được ghi nhận. Chúc bạn một ngày thật vui.</p>
        <Link className="button button-dark" to="/">Tiếp tục mua sắm</Link>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <span className="empty-icon" aria-hidden="true">♡</span>
        <h1>Giỏ hàng đang trống</h1>
        <p>Thêm sản phẩm vào giỏ trước khi thanh toán nhé.</p>
        <Link className="button button-dark" to="/">Về cửa hàng</Link>
      </section>
    )
  }

  return (
    <section className="checkout-page">
      <div className="page-heading">
        <p className="eyebrow">CHỈ CÒN MỘT BƯỚC</p>
        <h1>Hoàn tất đơn hàng</h1>
        <p className="muted-copy">Kiểm tra lại lựa chọn của bạn trước khi đặt hàng.</p>
      </div>
      <div className="checkout-layout">
        <div className="checkout-items">
          {items.map(({ product, quantity }) => (
            <div className="checkout-item" key={product.id}>
              <img src={product.image} alt={product.title} />
              <span className="checkout-item-name">{product.title}<small>Số lượng: {quantity}</small></span>
              <strong>{currency.format(product.price * quantity)}</strong>
            </div>
          ))}
        </div>
        <aside className="order-summary">
          <p className="eyebrow">TÓM TẮT ĐƠN HÀNG</p>
          <div className="summary-line"><span>Tạm tính</span><span>{currency.format(total)}</span></div>
          <div className="summary-line"><span>Phí giao hàng</span><span className="free-label">Miễn phí</span></div>
          <div className="summary-total"><span>Tổng cộng</span><strong>{currency.format(total)}</strong></div>
          <button className="button button-dark button-wide" type="button" onClick={placeOrder}>Đặt hàng <span aria-hidden="true">→</span></button>
          <p className="secure-note">Thanh toán giả lập cho bài thực hành.</p>
        </aside>
      </div>
    </section>
  )
}

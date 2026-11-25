import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  updateQuantity,
} from '../features/cart/cartSlice'

const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' })

export default function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotalPrice)

  if (items.length === 0) {
    return (
      <section className="empty-state">
        <span className="empty-icon" aria-hidden="true">♡</span>
        <p className="eyebrow">GIỎ HÀNG CỦA BẠN</p>
        <h1>Chưa có món nào ở đây</h1>
        <p>Hãy dạo quanh cửa hàng và thêm món bạn yêu thích nhé.</p>
        <Link className="button button-dark" to="/">Khám phá sản phẩm</Link>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <div className="page-heading">
        <p className="eyebrow">GIỎ HÀNG CỦA BẠN</p>
        <h1>Những món bạn đã chọn</h1>
      </div>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.id}>
              <Link className="cart-item-image" to={`/products/${product.id}`}><img src={product.image} alt={product.title} /></Link>
              <div className="cart-item-main">
                <p className="product-category">{product.category}</p>
                <Link className="cart-item-title" to={`/products/${product.id}`}>{product.title}</Link>
                <strong className="cart-item-price">{currency.format(product.price)}</strong>
              </div>
              <div className="quantity-control" aria-label={`Số lượng ${product.title}`}>
                <button type="button" aria-label="Giảm số lượng" onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }))}>−</button>
                <span>{quantity}</span>
                <button type="button" aria-label="Tăng số lượng" onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }))}>+</button>
              </div>
              <button className="remove-button" type="button" onClick={() => dispatch(removeFromCart(product.id))} aria-label={`Xóa ${product.title}`}>×</button>
            </article>
          ))}
        </div>
        <aside className="order-summary">
          <p className="eyebrow">TÓM TẮT ĐƠN HÀNG</p>
          <div className="summary-line"><span>Tạm tính</span><span>{currency.format(total)}</span></div>
          <div className="summary-line"><span>Phí giao hàng</span><span className="free-label">Miễn phí</span></div>
          <div className="summary-total"><span>Tổng cộng</span><strong>{currency.format(total)}</strong></div>
          <Link className="button button-dark button-wide" to="/checkout">Tiến hành thanh toán <span aria-hidden="true">→</span></Link>
          <Link className="continue-link" to="/">← Tiếp tục mua sắm</Link>
        </aside>
      </div>
    </section>
  )
}

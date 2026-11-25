import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import { fetchProducts } from '../features/products/productsSlice'

const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' })

export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchProducts())
  }, [dispatch, status])

  const product = items.find((item) => item.id === Number(id))

  if (status === 'loading' && !product) return <div className="state-panel"><span className="spinner" />Đang tải sản phẩm...</div>
  if (status === 'failed' && !product) {
    return <div className="state-panel state-error"><p>{error ?? 'Không thể tải sản phẩm.'}</p><Link className="button button-dark" to="/">Về trang chủ</Link></div>
  }
  if (!product) return <div className="state-panel"><h1>Không tìm thấy sản phẩm</h1><Link className="text-link" to="/">Quay lại cửa hàng</Link></div>

  return (
    <section className="detail-page">
      <Link className="back-link" to="/">← Quay lại cửa hàng</Link>
      <div className="detail-layout">
        <div className="detail-image-wrap"><img src={product.image} alt={product.title} className="detail-image" /></div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="detail-price">{currency.format(product.price)}</p>
          <p className="detail-description">{product.description}</p>
          <button className="button button-dark button-wide" type="button" onClick={() => dispatch(addToCart(product))}>Thêm vào giỏ hàng <span aria-hidden="true">↗</span></button>
          <p className="detail-note">✦ Sản phẩm được chọn lọc dành cho bạn</p>
        </div>
      </div>
    </section>
  )
}

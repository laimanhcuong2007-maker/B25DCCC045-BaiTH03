import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'

const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' })

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  return (
    <article className="product-card">
      <Link className="product-image-wrap" to={`/products/${product.id}`} aria-label={`Xem ${product.title}`}>
        <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <Link className="product-title" to={`/products/${product.id}`}>{product.title}</Link>
        <div className="product-card-footer">
          <strong className="product-price">{currency.format(product.price)}</strong>
          <button
            className="add-button"
            type="button"
            onClick={() => dispatch(addToCart(product))}
            aria-label={`Thêm ${product.title} vào giỏ hàng`}
          >
            + <span>Thêm</span>
          </button>
        </div>
      </div>
    </article>
  )
}

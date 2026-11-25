import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../features/products/productsSlice'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (status === 'idle') void dispatch(fetchProducts())
  }, [dispatch, status])

  const filteredProducts = items.filter((product) =>
    product.title.toLocaleLowerCase('vi').includes(search.trim().toLocaleLowerCase('vi')),
  )

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">GÓC MUA SẮM CỦA BẠN</p>
          <h1>Những món hay,<br /><span>cho ngày thêm vui.</span></h1>
          <p className="hero-description">Khám phá các sản phẩm được yêu thích và chọn điều phù hợp với bạn.</p>
          <a className="button button-dark" href="#san-pham">Khám phá ngay <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-note"><span>✳</span><small>little<br />things</small></div>
          <div className="hero-bag"><span className="bag-handle" /><span className="bag-spark">✦</span><span className="bag-word">good<br />finds</span></div>
          <span className="hero-dot dot-one" /><span className="hero-dot dot-two" />
        </div>
      </section>

      <section className="catalog-section" id="san-pham">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CHỌN MÓN BẠN THÍCH</p>
            <h2>Sản phẩm nổi bật</h2>
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Tìm theo tên sản phẩm..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Tìm theo tên sản phẩm"
            />
          </label>
        </div>

        {status === 'loading' && <div className="state-panel"><span className="spinner" />Đang tải sản phẩm...</div>}
        {status === 'failed' && (
          <div className="state-panel state-error">
            <p>{error ?? 'Không thể tải danh sách sản phẩm.'}</p>
            <button className="button button-dark" type="button" onClick={() => void dispatch(fetchProducts())}>Thử lại</button>
          </div>
        )}
        {status === 'succeeded' && filteredProducts.length > 0 && (
          <div className="product-grid">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
        {status === 'succeeded' && filteredProducts.length === 0 && (
          <div className="state-panel">Không tìm thấy sản phẩm phù hợp với “{search}”.</div>
        )}
      </section>
    </>
  )
}

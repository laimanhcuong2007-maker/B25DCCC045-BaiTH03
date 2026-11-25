import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCartTotalQuantity } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const cartCount = useAppSelector(selectCartTotalQuantity)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="ShopMini — Trang chủ">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>shop<span className="brand-accent">mini</span></span>
        </Link>

        <nav className="primary-nav" aria-label="Điều hướng chính">
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/cart">Giỏ hàng <span className="cart-count">{cartCount}</span></NavLink>
        </nav>

        <div className="header-actions">
          <button className="icon-button theme-button" type="button" onClick={toggleTheme} aria-label="Đổi giao diện sáng tối">
            <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
          </button>
          {user ? (
            <div className="user-actions">
              <span className="user-greeting">Xin chào, <strong>{user.username}</strong></span>
              <button className="button button-quiet button-small" type="button" onClick={handleLogout}>Đăng xuất</button>
            </div>
          ) : (
            <Link className="button button-dark button-small" to="/login">Đăng nhập</Link>
          )}
        </div>
      </div>
    </header>
  )
}

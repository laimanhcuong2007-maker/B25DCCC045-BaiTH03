import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ReturnLocation {
  pathname?: string
  search?: string
  hash?: string
}

interface LoginState {
  from?: ReturnLocation
}

export default function LoginPage() {
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const from = (location.state as LoginState | null)?.from

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!login(username, password)) {
      setError('Mật khẩu chưa đúng. Hãy thử lại với mật khẩu 123456.')
      return
    }
    const destination = from ? `${from.pathname ?? '/'}${from.search ?? ''}${from.hash ?? ''}` : '/'
    navigate(destination, { replace: true })
  }

  return (
    <section className="login-layout">
      <div className="login-art">
        <span className="login-art-spark">✳</span>
        <p>Make room<br />for <em>good things.</em></p>
        <span className="login-art-caption">SHOPMINI — YOUR EVERYDAY STORE</span>
      </div>
      <div className="login-form-wrap">
        <Link className="back-link" to="/">← Về cửa hàng</Link>
        <p className="eyebrow">RẤT VUI ĐƯỢC GẶP BẠN</p>
        <h1>Đăng nhập</h1>
        <p className="muted-copy">Đăng nhập để tiếp tục thanh toán đơn hàng của bạn.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Tên người dùng</label>
          <input id="username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Ví dụ: Minh Anh" required />
          <label htmlFor="password">Mật khẩu</label>
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" required />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-dark button-wide" type="submit">Đăng nhập <span aria-hidden="true">→</span></button>
        </form>
        <p className="login-hint">Đăng nhập thử với mật khẩu <strong>123456</strong>.</p>
      </div>
    </section>
  )
}

import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="page-shell"><Outlet /></main>
      <footer className="site-footer">© {new Date().getFullYear()} ShopMini <span>•</span> Mua sắm vui vẻ mỗi ngày</footer>
    </>
  )
}

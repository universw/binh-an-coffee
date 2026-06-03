import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Menu from '../pages/Menu.jsx'
import Order from '../pages/Order.jsx'
import AdminLogin from '../pages/AdminLogin.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import AdminMenu from '../pages/AdminMenu.jsx'
import AdminReports from '../pages/AdminReports.jsx'
import AdminOrders from '../pages/AdminOrders.jsx'
import AdminSeats from '../pages/AdminSeats.jsx'
import AdminLayout from '../components/layout/AdminLayout.jsx'
import { watchStaffAuth } from '../services/authService.js'

function Protected({ children }) {
  const [state, setState] = useState({ loading: true, user: null })

  useEffect(() => watchStaffAuth(user => setState({ loading: false, user })), [])

  if (state.loading) return <div className="grid min-h-screen place-items-center bg-slate-100 font-black text-coffee-900">Đang kiểm tra đăng nhập...</div>
  return state.user ? children : <Navigate to="/admin/login" replace />
}

function StaffEntry() {
  return <Navigate to="/admin/login" replace />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function AppRoutes() {
  return <>
    <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/order" element={<Order />} />
      <Route path="/staff" element={<StaffEntry />} />
      <Route path="/staff/login" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Protected><AdminLayout /></Protected>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="seats" element={<AdminSeats />} />
        <Route path="menu" element={<AdminMenu />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
}

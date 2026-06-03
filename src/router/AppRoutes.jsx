import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Menu from '../pages/Menu.jsx'
import AdminLogin from '../pages/AdminLogin.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import AdminMenu from '../pages/AdminMenu.jsx'
import AdminReports from '../pages/AdminReports.jsx'
import AdminLayout from '../components/layout/AdminLayout.jsx'

function Protected({ children }) {
  const ok = localStorage.getItem('demoStaffLoggedIn') === 'true'
  return ok ? children : <Navigate to="/admin/login" replace />
}

function StaffEntry() {
  const ok = localStorage.getItem('demoStaffLoggedIn') === 'true'
  return <Navigate to={ok ? '/admin/dashboard' : '/admin/login'} replace />
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
      <Route path="/staff" element={<StaffEntry />} />
      <Route path="/staff/login" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Protected><AdminLayout /></Protected>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="menu" element={<AdminMenu />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
}

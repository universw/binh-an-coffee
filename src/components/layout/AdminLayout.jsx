import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logoutStaff } from '../../services/authService.js'
export default function AdminLayout() {
  const navigate = useNavigate()
  const linkClass = ({ isActive }) => isActive ? 'font-black text-coffee-900' : 'font-semibold text-slate-600 hover:text-coffee-900'
  async function logout() {
    await logoutStaff()
    navigate('/admin/login')
  }
  return <div className="min-h-screen bg-slate-100"><div className="border-b bg-white"><div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-3 py-3"><Link to="/admin/orders" className="font-black">Bình An Staff</Link><div className="flex flex-wrap items-center gap-4 text-sm"><NavLink to="/admin/orders" className={linkClass}>Bếp nhận đơn</NavLink><NavLink to="/admin/seats" className={linkClass}>Mã QR</NavLink><NavLink to="/admin/dashboard" className={linkClass}>Tổng quan</NavLink><NavLink to="/admin/menu" className={linkClass}>Thực đơn</NavLink><NavLink to="/admin/reports" className={linkClass}>Trạng thái</NavLink><button onClick={logout} className="rounded bg-slate-100 px-3 py-2 font-semibold text-slate-700">Đăng xuất</button></div></div></div><main className="container-page py-6"><Outlet /></main></div>
}

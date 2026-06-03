import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage.jsx'
export default function AdminLayout() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const linkClass = ({ isActive }) => isActive ? 'font-black text-coffee-900' : 'font-semibold text-slate-600 hover:text-coffee-900'
  function logout() {
    localStorage.removeItem('demoStaffLoggedIn')
    navigate('/admin/login')
  }
  return <div className="min-h-screen bg-slate-100"><div className="border-b bg-white"><div className="container-page flex min-h-16 flex-wrap items-center justify-between gap-3 py-3"><Link to="/admin/dashboard" className="font-black">Binh An Staff</Link><div className="flex flex-wrap items-center gap-4 text-sm"><NavLink to="/admin/dashboard" className={linkClass}>{t('admin.dashboard')}</NavLink><NavLink to="/admin/menu" className={linkClass}>Menu</NavLink><NavLink to="/admin/reports" className={linkClass}>Reports</NavLink><button onClick={logout} className="rounded bg-slate-100 px-3 py-2 font-semibold text-slate-700">Logout</button></div></div></div><main className="container-page py-6"><Outlet /></main></div>
}

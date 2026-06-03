import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  function login(e) { e.preventDefault(); localStorage.setItem('demoStaffLoggedIn','true'); navigate('/admin/dashboard') }
  return <><Navbar /><main className="container-page grid min-h-[70vh] place-items-center py-10"><form onSubmit={login} className="card w-full max-w-md p-6"><h1 className="text-3xl font-black">{t('admin.login')}</h1><p className="mt-2 text-sm text-coffee-700">Demo only. Firebase Auth can be connected later.</p><input className="input mt-6" defaultValue="staff@binhancoffee.com" /><input className="input mt-3" type="password" defaultValue="password" /><button className="btn-primary mt-5 w-full">Login Demo</button></form></main></>
}

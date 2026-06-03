import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import { loginStaff } from '../services/authService.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function login(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await loginStaff(email, password)
      navigate('/admin/orders')
    } catch (err) {
      setError('Không đăng nhập được. Kiểm tra email, mật khẩu và Firebase Auth.')
    } finally {
      setLoading(false)
    }
  }

  return <><Navbar /><main className="container-page grid min-h-[70vh] place-items-center py-10">
    <form onSubmit={login} className="card w-full max-w-md p-6">
      <h1 className="text-3xl font-black">Đăng nhập nhân viên</h1>
      <p className="mt-2 text-sm text-coffee-700">Dùng tài khoản nhân viên đã tạo trong Firebase Auth.</p>
      <input className="input mt-6" type="email" placeholder="Email nhân viên" value={email} onChange={e => setEmail(e.target.value)} required />
      <input className="input mt-3" type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required />
      {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
      <button className="btn-primary mt-5 w-full" disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
    </form>
  </main></>
}

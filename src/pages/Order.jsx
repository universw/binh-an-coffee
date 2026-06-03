import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Minus, Plus, Send, ShoppingBag, Trash2 } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import { categories, menuItems } from '../data/menu.js'
import { findSeat } from '../data/seats.js'
import { createOrder } from '../services/orderService.js'
import { formatCurrency } from '../utils/formatCurrency.js'
import { useLanguage } from '../hooks/useLanguage.jsx'

function itemPrice(item) {
  return item.price
}

function displayPrice(item) {
  return item.priceLabel ? `${item.priceLabel}.000đ` : formatCurrency(item.price)
}

export default function Order() {
  const { lang } = useLanguage()
  const [params] = useSearchParams()
  const seatId = params.get('seat') || ''
  const seat = findSeat(seatId)
  const [category, setCategory] = useState('all')
  const [cart, setCart] = useState({})
  const [customerNote, setCustomerNote] = useState('')
  const [itemNotes, setItemNotes] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [error, setError] = useState('')

  const visibleItems = useMemo(() => menuItems.filter(item => (
    item.isAvailable && (category === 'all' || item.category === category)
  )), [category])

  const cartItems = useMemo(() => Object.entries(cart)
    .map(([id, quantity]) => {
      const item = menuItems.find(menuItem => menuItem.id === id)
      if (!item) return null
      return {
        item,
        quantity,
        note: itemNotes[id] || '',
        subtotal: itemPrice(item) * quantity
      }
    })
    .filter(Boolean), [cart, itemNotes])

  const total = cartItems.reduce((sum, entry) => sum + entry.subtotal, 0)
  const quantityTotal = cartItems.reduce((sum, entry) => sum + entry.quantity, 0)

  function changeQuantity(id, delta) {
    setCart(prev => {
      const nextQty = Math.max(0, (prev[id] || 0) + delta)
      const next = { ...prev }
      if (nextQty === 0) delete next[id]
      else next[id] = nextQty
      return next
    })
  }

  function requestSubmitOrder(e) {
    e.preventDefault()
    if (!seat || !cartItems.length) return
    setConfirmOpen(true)
  }

  async function submitOrder() {
    setSubmitting(true)
    setError('')

    try {
      const orderId = await createOrder({
        seatId: seat.id,
        seatLabel: seat.label,
        items: cartItems.map(({ item, quantity, note, subtotal }) => ({
          id: item.id,
          name: item.name.vi,
          price: item.price,
          priceLabel: item.priceLabel || '',
          quantity,
          note: note.trim(),
          subtotal
        })),
        total,
        customerNote: customerNote.trim()
      })

      setSubmittedId(orderId)
      setSuccessOpen(true)
      setConfirmOpen(false)
      setCart({})
      setItemNotes({})
      setCustomerNote('')
    } catch (err) {
      setError(err.message || 'Không gửi được đơn. Vui lòng gọi nhân viên.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!seat) {
    return <><Navbar /><main className="container-page grid min-h-[70vh] place-items-center py-10">
      <div className="card max-w-lg p-6 text-center">
        <h1 className="text-3xl font-black">Không tìm thấy bàn</h1>
        <p className="mt-3 text-coffee-700">Mã QR này chưa đúng hoặc chưa được tạo trong hệ thống.</p>
        <Link to="/menu" className="btn-primary mt-6">Xem thực đơn</Link>
      </div>
    </main><Footer /></>
  }

  return <><Navbar /><main className="container-page py-8">
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section>
        <div className="mb-5 rounded-lg bg-coffee-700 p-5 text-white">
          <p className="text-sm font-bold opacity-85">Gọi món tại</p>
          <h1 className="mt-1 text-4xl font-black">{seat.label}</h1>
        </div>

        {submittedId && <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          <b>Đã gửi đơn thành công.</b>
          <p className="mt-1 text-sm">Nhân viên sẽ chuẩn bị món cho {seat.label}. Mã đơn: {submittedId.slice(0, 6).toUpperCase()}</p>
        </div>}

        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => <button key={cat.id} onClick={() => setCategory(cat.id)} className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold ${category === cat.id ? 'bg-coffee-700 text-white' : 'bg-white text-coffee-700 shadow-sm'}`}>{cat[lang]}</button>)}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {visibleItems.map(item => {
            const quantity = cart[item.id] || 0
            return <article key={item.id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-black">{item.name[lang]}</h2>
                  <p className="mt-1 text-sm text-coffee-700">{item.description[lang]}</p>
                </div>
                <b className="shrink-0 text-coffee-700">{displayPrice(item)}</b>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex h-10 items-center overflow-hidden rounded-lg border border-coffee-100 bg-white">
                  <button type="button" onClick={() => changeQuantity(item.id, -1)} className="grid h-10 w-10 place-items-center text-coffee-700" aria-label="Giảm số lượng"><Minus size={16} /></button>
                  <span className="grid h-10 min-w-10 place-items-center font-black">{quantity}</span>
                  <button type="button" onClick={() => changeQuantity(item.id, 1)} className="grid h-10 w-10 place-items-center text-coffee-700" aria-label="Tăng số lượng"><Plus size={16} /></button>
                </div>
                <button type="button" onClick={() => changeQuantity(item.id, 1)} className="btn-secondary min-h-10">Thêm</button>
              </div>
              {quantity > 0 && <input className="input mt-3 text-sm" placeholder="Ghi chú món này: ít đường, ít đá..." value={itemNotes[item.id] || ''} onChange={e => setItemNotes(prev => ({ ...prev, [item.id]: e.target.value }))} />}
            </article>
          })}
        </div>
      </section>

      <aside className="lg:sticky lg:top-20 lg:self-start">
        <form onSubmit={requestSubmitOrder} className="card overflow-hidden">
          <div className="flex items-center justify-between bg-coffee-900 p-4 text-white">
            <div>
              <p className="text-sm font-bold opacity-80">Đơn của bạn</p>
              <h2 className="text-xl font-black">{seat.label}</h2>
            </div>
            <ShoppingBag />
          </div>

          <div className="p-4">
            {!cartItems.length && <p className="rounded-lg bg-coffee-50 p-4 text-center text-sm font-semibold text-coffee-700">Chưa có món nào.</p>}
            <div className="space-y-3">
              {cartItems.map(({ item, quantity, note, subtotal }) => <div key={item.id} className="rounded-lg bg-coffee-50 p-3">
                <div className="flex justify-between gap-3">
                  <div>
                    <b>{item.name.vi}</b>
                    <p className="text-sm text-coffee-700">x{quantity}{note ? ` - ${note}` : ''}</p>
                  </div>
                  <div className="text-right">
                    <b>{formatCurrency(subtotal)}</b>
                    <button type="button" onClick={() => changeQuantity(item.id, -quantity)} className="ml-auto mt-1 grid h-8 w-8 place-items-center rounded bg-white text-red-600" aria-label="Xóa món"><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>)}
            </div>

            <textarea className="input mt-4 min-h-24 resize-none" placeholder="Ghi chú chung cho đơn..." value={customerNote} onChange={e => setCustomerNote(e.target.value)} />

            <div className="mt-4 flex items-center justify-between border-t border-coffee-100 pt-4">
              <span className="font-bold">{quantityTotal} món</span>
              <b className="text-2xl text-coffee-700">{formatCurrency(total)}</b>
            </div>

            {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

            <button className="btn-primary mt-4 w-full" disabled={!cartItems.length || submitting}>
              <Send size={18} />{submitting ? 'Đang gửi...' : 'Gửi đơn'}
            </button>
          </div>
        </form>
      </aside>
    </div>

    {confirmOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-coffee-900/60 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-2xl font-black">Xác nhận đơn</h2>
        <p className="mt-2 text-sm font-semibold text-coffee-700">Vui lòng kiểm tra lại món trước khi gửi cho nhân viên.</p>

        <div className="mt-4 max-h-72 space-y-2 overflow-y-auto">
          {cartItems.map(({ item, quantity, note, subtotal }) => <div key={item.id} className="rounded-lg bg-coffee-50 p-3">
            <div className="flex justify-between gap-3">
              <b>{quantity} x {item.name.vi}</b>
              <span className="font-bold">{formatCurrency(subtotal)}</span>
            </div>
            {note && <p className="mt-1 text-sm font-semibold text-coffee-700">Ghi chú: {note}</p>}
          </div>)}
        </div>

        {customerNote && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-amber-800">Ghi chú đơn: {customerNote}</p>}

        <div className="mt-4 flex items-center justify-between border-t border-coffee-100 pt-4">
          <span className="font-bold">Tổng cộng</span>
          <b className="text-2xl text-coffee-700">{formatCurrency(total)}</b>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button type="button" className="btn-secondary" onClick={() => setConfirmOpen(false)} disabled={submitting}>Kiểm tra lại</button>
          <button type="button" className="btn-primary" onClick={submitOrder} disabled={submitting}>{submitting ? 'Đang gửi...' : 'Xác nhận gửi'}</button>
        </div>
      </div>
    </div>}

    {successOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-coffee-900/60 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-100 text-3xl text-green-700">✓</div>
        <h2 className="mt-4 text-2xl font-black">Bạn đã đặt món thành công</h2>
        <p className="mt-3 text-coffee-700">Nhân viên đã nhận đơn cho {seat.label}. Vui lòng không đặt lại đơn để tránh nhầm lẫn cho nhân viên.</p>
        {submittedId && <p className="mt-3 rounded-lg bg-coffee-50 p-3 text-sm font-black text-coffee-700">Mã đơn: {submittedId.slice(0, 6).toUpperCase()}</p>}
        <button type="button" className="btn-primary mt-5 w-full" onClick={() => setSuccessOpen(false)}>Đã hiểu</button>
      </div>
    </div>}
  </main><Footer /></>
}

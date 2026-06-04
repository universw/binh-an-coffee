import { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, BellOff, CheckCircle2, Clock, Coffee, Loader2, XCircle } from 'lucide-react'
import { orderStatuses, subscribeToActiveOrders, updateOrderStatus } from '../services/orderService.js'
import { formatCurrency } from '../utils/formatCurrency.js'

const columns = [
  { id: 'new', title: 'Đơn mới', icon: Clock },
  { id: 'preparing', title: 'Đang làm', icon: Coffee },
  { id: 'ready', title: 'Sẵn sàng', icon: CheckCircle2 }
]

function formatTime(value) {
  if (!value?.toDate) return 'Vừa xong'
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(value.toDate())
}

function playOrderSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return

  const audio = new AudioContext()
  const now = audio.currentTime

  function beep(start, frequency, duration) {
    const oscillator = audio.createOscillator()
    const gain = audio.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, start)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

    oscillator.connect(gain)
    gain.connect(audio.destination)
    oscillator.start(start)
    oscillator.stop(start + duration + 0.02)
  }

  const pattern = [
    [0, 740, 0.28],
    [0.38, 920, 0.32],
    [0.9, 740, 0.28],
    [1.28, 920, 0.32],
    [1.8, 740, 0.28],
    [2.18, 980, 0.45]
  ]

  pattern.forEach(([offset, frequency, duration]) => {
    beep(now + offset, frequency, duration)
  })

  window.setTimeout(() => audio.close(), 3200)
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState('')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const knownNewOrderIds = useRef(new Set())
  const initializedOrders = useRef(false)

  useEffect(() => {
    const unsubscribe = subscribeToActiveOrders(nextOrders => {
      const newOrderIds = nextOrders.filter(order => order.status === 'new').map(order => order.id)

      if (!initializedOrders.current) {
        knownNewOrderIds.current = new Set(newOrderIds)
        initializedOrders.current = true
      } else {
        const hasNewIncomingOrder = newOrderIds.some(orderId => !knownNewOrderIds.current.has(orderId))
        knownNewOrderIds.current = new Set(newOrderIds)
        if (soundEnabled && hasNewIncomingOrder) playOrderSound()
      }

      setOrders(nextOrders)
      setLoading(false)
      setError('')
    }, err => {
      setLoading(false)
      setError(err.message || 'Không tải được đơn hàng.')
    })

    return unsubscribe
  }, [soundEnabled])

  const grouped = useMemo(() => columns.reduce((acc, column) => ({
    ...acc,
    [column.id]: orders.filter(order => order.status === column.id)
  }), {}), [orders])

  async function move(orderId, status) {
    setUpdating(`${orderId}:${status}`)
    try {
      await updateOrderStatus(orderId, status)
    } finally {
      setUpdating('')
    }
  }

  function enableSound() {
    playOrderSound()
    setSoundEnabled(true)
  }

  return <div>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black">Bếp nhận đơn</h1>
        <p className="mt-2 text-slate-600">Đơn từ mã QR sẽ hiện ở đây theo thời gian thực.</p>
      </div>
      <div className="rounded-lg bg-white px-5 py-3 text-right shadow-sm">
        <p className="text-sm text-slate-500">Đơn đang xử lý</p>
        <b className="text-2xl">{orders.length}</b>
      </div>
    </div>

    <div className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg p-4 shadow-sm ${soundEnabled ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
      <div className="flex items-center gap-3">
        {soundEnabled ? <Bell size={20} /> : <BellOff size={20} />}
        <div>
          <b>{soundEnabled ? 'Âm báo đang bật' : 'Âm báo chưa bật'}</b>
          <p className="text-sm font-semibold opacity-80">{soundEnabled ? 'Khi có đơn mới, trang bếp sẽ phát âm thanh.' : 'Bấm bật âm báo một lần sau khi mở trang bếp.'}</p>
        </div>
      </div>
      {!soundEnabled && <button type="button" onClick={enableSound} className="rounded-lg bg-coffee-700 px-4 py-2 text-sm font-black text-white">Bật âm báo</button>}
    </div>

    {loading && <div className="mt-8 flex items-center gap-2 rounded-lg bg-white p-5 font-bold shadow-sm"><Loader2 className="animate-spin" size={18} />Đang tải đơn...</div>}
    {error && <div className="mt-8 rounded-lg bg-red-50 p-5 font-semibold text-red-700">{error}<p className="mt-2 text-sm">Kiểm tra Firestore đã bật, rules đã deploy, và tài khoản nhân viên có quyền đọc đơn.</p></div>}

    <div className="mt-6 grid gap-5 xl:grid-cols-3">
      {columns.map(column => {
        const Icon = column.icon
        const list = grouped[column.id] || []
        return <section key={column.id} className="min-h-96 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="flex items-center gap-2 text-xl font-black"><Icon size={20} />{column.title}</h2>
            <span className="rounded bg-slate-100 px-2 py-1 text-sm font-black">{list.length}</span>
          </div>

          <div className="mt-4 space-y-4">
            {!list.length && <p className="rounded-lg bg-slate-50 p-4 text-center text-sm font-semibold text-slate-500">Chưa có đơn.</p>}
            {list.map(order => <article key={order.id} className="rounded-lg border border-slate-100 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-coffee-900">{order.seatLabel}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{formatTime(order.createdAt)} - {order.id.slice(0, 6).toUpperCase()}</p>
                </div>
                <b className="text-coffee-700">{formatCurrency(order.total)}</b>
              </div>

              <div className="mt-4 space-y-2">
                {order.items?.map((item, index) => <div key={`${item.id}-${index}`} className="rounded bg-slate-50 p-3">
                  <div className="flex justify-between gap-3">
                    <b>{item.quantity} x {item.name}</b>
                    <span>{formatCurrency(item.subtotal)}</span>
                  </div>
                  {item.note && <p className="mt-1 text-sm font-semibold text-coffee-700">Ghi chú: {item.note}</p>}
                </div>)}
              </div>

              {order.customerNote && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm font-semibold text-amber-800">Ghi chú đơn: {order.customerNote}</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                {order.status === 'new' && <button onClick={() => move(order.id, 'preparing')} className="rounded-lg bg-coffee-700 px-3 py-2 text-sm font-black text-white" disabled={updating === `${order.id}:preparing`}>Nhận đơn</button>}
                {order.status === 'preparing' && <button onClick={() => move(order.id, 'ready')} className="rounded-lg bg-green-700 px-3 py-2 text-sm font-black text-white" disabled={updating === `${order.id}:ready`}>Xong món</button>}
                {order.status === 'ready' && <button onClick={() => move(order.id, 'served')} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-black text-white" disabled={updating === `${order.id}:served`}>Đã phục vụ</button>}
                <button onClick={() => move(order.id, 'cancelled')} className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-black text-red-700" disabled={updating === `${order.id}:cancelled`}><XCircle size={16} />Hủy</button>
              </div>
            </article>)}
          </div>
        </section>
      })}
    </div>

    <p className="mt-6 text-sm text-slate-500">Trạng thái dùng trong hệ thống: {Object.entries(orderStatuses).map(([key, label]) => `${key} = ${label}`).join(', ')}.</p>
  </div>
}

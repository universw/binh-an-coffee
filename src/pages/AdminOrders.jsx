import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Clock, Coffee, Loader2, XCircle } from 'lucide-react'
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

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState('')

  useEffect(() => {
    const unsubscribe = subscribeToActiveOrders(nextOrders => {
      setOrders(nextOrders)
      setLoading(false)
      setError('')
    }, err => {
      setLoading(false)
      setError(err.message || 'Không tải được đơn hàng.')
    })

    return unsubscribe
  }, [])

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

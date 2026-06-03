import { useMemo, useState } from 'react'
import { menuItems } from '../data/menu.js'
import { formatCurrency } from '../utils/formatCurrency.js'

export default function AdminMenu() {
  const [items, setItems] = useState(menuItems)
  const availableCount = useMemo(() => items.filter(item => item.isAvailable).length, [items])

  function toggleAvailability(id) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
  }

  return <div>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black">Quản lý thực đơn</h1>
        <p className="mt-2 text-slate-600">Bản demo kiểm tra thực đơn. Phần lưu thực đơn vào Firestore có thể làm sau.</p>
      </div>
      <div className="rounded-lg bg-white px-5 py-3 text-right shadow-sm">
        <p className="text-sm text-slate-500">Món đang bán</p>
        <b className="text-2xl">{availableCount}/{items.length}</b>
      </div>
    </div>

    <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="hidden grid-cols-[1fr_140px_140px] border-b bg-slate-50 px-4 py-3 text-sm font-black text-slate-600 md:grid">
        <span>Món</span>
        <span>Giá</span>
        <span>Trạng thái</span>
      </div>
      {items.map(item => <div key={item.id} className="grid gap-3 border-b px-4 py-4 last:border-b-0 md:grid-cols-[1fr_140px_140px] md:items-center">
        <div>
          <h2 className="font-black">{item.name.vi}</h2>
          <p className="text-sm text-slate-600">{item.name.en}</p>
        </div>
        <b>{item.priceLabel ? `${item.priceLabel}.000đ` : formatCurrency(item.price)}</b>
        <button onClick={() => toggleAvailability(item.id)} className={`rounded-lg px-3 py-2 text-sm font-black ${item.isAvailable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {item.isAvailable ? 'Đang bán' : 'Đang ẩn'}
        </button>
      </div>)}
    </div>
  </div>
}

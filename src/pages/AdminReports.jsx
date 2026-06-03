import { categories, menuItems } from '../data/menu.js'
import { shopInfo } from '../data/shopInfo.js'

export default function AdminReports() {
  const visibleCategories = categories.filter(category => category.id !== 'all').length
  const unavailableItems = menuItems.filter(item => !item.isAvailable).length

  return <div>
    <h1 className="text-3xl font-black">Trạng thái website</h1>
    <div className="mt-6 grid gap-4 md:grid-cols-4">
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Món</p><b className="text-2xl">{menuItems.length}</b></div>
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Nhóm món</p><b className="text-2xl">{visibleCategories}</b></div>
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Đang ẩn</p><b className="text-2xl">{unavailableItems}</b></div>
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Hình ảnh</p><b className="text-2xl">1</b></div>
    </div>

    <section className="mt-8 rounded-lg bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Danh sách kiểm tra trước khi dùng chính thức</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <p className="rounded-lg bg-slate-50 p-4">Kiểm tra lại thực đơn và ẩn món chưa bán nếu cần.</p>
        <p className="rounded-lg bg-slate-50 p-4">Kiểm tra hình ảnh quán và món nước.</p>
        <p className="rounded-lg bg-slate-50 p-4">Xác nhận số điện thoại/Zalo: {shopInfo.phoneDisplay} - {shopInfo.secondaryPhoneDisplay}</p>
        <p className="rounded-lg bg-slate-50 p-4">Xác nhận Google Maps và trang Facebook.</p>
      </div>
    </section>
  </div>
}

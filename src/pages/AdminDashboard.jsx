import { menuItems } from '../data/menu.js'
import { shopInfo } from '../data/shopInfo.js'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function AdminDashboard() {
  const { lang } = useLanguage()
  const availableItems = menuItems.filter(item => item.isAvailable).length
  const popularItems = menuItems.filter(item => item.isPopular).length
  const sections = ['Trang đầu', 'Món yêu thích', 'Giới thiệu', 'Xem nhanh thực đơn', 'Hình ảnh', 'Địa chỉ', 'Liên hệ', 'Chân trang']

  return <div>
    <h1 className="text-3xl font-black">Tổng quan</h1>
    <p className="mt-2 text-slate-600">Khu vực nhân viên để kiểm tra nội dung website và tình trạng gọi món.</p>

    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Món trong thực đơn</p><b className="text-2xl">{menuItems.length}</b></div>
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Đang bán</p><b className="text-2xl">{availableItems}</b></div>
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Món yêu thích</p><b className="text-2xl">{popularItems}</b></div>
    </div>

    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black">Các phần trên trang chủ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {sections.map(section => <div key={section} className="rounded-lg bg-slate-50 px-4 py-3 font-semibold">{section}</div>)}
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black">Thông tin quán</h2>
        <p className="mt-4 font-black">{shopInfo.name[lang]}</p>
        <p className="mt-2 text-slate-600">{shopInfo.address[lang]}</p>
        <p className="mt-2 text-slate-600">{shopInfo.openingHours}</p>
        <p className="mt-2 text-slate-600">{shopInfo.phoneDisplay} - {shopInfo.secondaryPhoneDisplay}</p>
        <p className="mt-2 text-slate-600">Wi-Fi: {shopInfo.wifi}</p>
      </section>
    </div>
  </div>
}

import { categories, menuItems } from '../data/menu.js'
import { shopInfo } from '../data/shopInfo.js'

export default function AdminReports() {
  const visibleCategories = categories.filter(category => category.id !== 'all').length
  const unavailableItems = menuItems.filter(item => !item.isAvailable).length

  return <div>
    <h1 className="text-3xl font-black">Website Status</h1>
    <div className="mt-6 grid gap-4 md:grid-cols-4">
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Menu Items</p><b className="text-2xl">{menuItems.length}</b></div>
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Categories</p><b className="text-2xl">{visibleCategories}</b></div>
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Unavailable</p><b className="text-2xl">{unavailableItems}</b></div>
      <div className="rounded-lg bg-white p-5 shadow-sm"><p>Photos</p><b className="text-2xl">1</b></div>
    </div>

    <section className="mt-8 rounded-lg bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Before Launch Checklist</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <p className="rounded-lg bg-slate-50 p-4">Review real menu items and mark unavailable items if needed.</p>
        <p className="rounded-lg bg-slate-50 p-4">Add real shop and drink photos.</p>
        <p className="rounded-lg bg-slate-50 p-4">Confirm phone/Zalo: {shopInfo.phoneDisplay} - {shopInfo.secondaryPhoneDisplay}</p>
        <p className="rounded-lg bg-slate-50 p-4">Confirm Google Maps link and Facebook page.</p>
      </div>
    </section>
  </div>
}

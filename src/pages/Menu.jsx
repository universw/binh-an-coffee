import { useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import { categories, menuItems } from '../data/menu.js'
import { useLanguage } from '../hooks/useLanguage.jsx'

function displayPrice(item) {
  return item.priceLabel ? `${item.priceLabel}.000đ` : `${new Intl.NumberFormat('vi-VN').format(item.price)}đ`
}

export default function Menu() {
  const { lang, t } = useLanguage()
  const [category, setCategory] = useState('all')
  const visibleCategories = useMemo(() => {
    const selected = category === 'all' ? categories.filter(cat => cat.id !== 'all') : categories.filter(cat => cat.id === category)
    return selected.map(cat => ({
      ...cat,
      items: menuItems.filter(item => item.category === cat.id && item.isAvailable)
    })).filter(cat => cat.items.length)
  }, [category])

  return <><Navbar /><main className="container-page py-12">
    <SectionTitle title={t('sections.menu')} subtitle={lang==='vi'?'Thực đơn hiện tại của Tiệm Cà Phê Bình An.':'Current menu at Binh An Coffee.'}/>

    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {categories.map(cat => <button key={cat.id} onClick={() => setCategory(cat.id)} className={`rounded-lg px-4 py-2 font-bold ${category===cat.id?'bg-coffee-700 text-white':'bg-white text-coffee-700 shadow-sm'}`}>{cat[lang]}</button>)}
    </div>

    <div className="space-y-6">
      {visibleCategories.map(cat => <section key={cat.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="bg-coffee-700 px-5 py-3 text-white">
          <h2 className="text-xl font-black">{cat[lang]}</h2>
        </div>
        <div className="divide-y divide-coffee-100 md:grid md:grid-cols-2 md:divide-x md:divide-y-0">
          {cat.items.map(item => <div key={item.id} className="grid gap-2 border-b border-coffee-100 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-start md:border-b">
            <div>
              <h3 className="font-black">{item.name[lang]}</h3>
              <p className="mt-1 text-sm text-coffee-700">{item.description[lang]}</p>
            </div>
            <b className="text-coffee-700">{displayPrice(item)}</b>
          </div>)}
        </div>
      </section>)}
    </div>
  </main><Footer /></>
}

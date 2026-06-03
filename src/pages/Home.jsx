import { Link } from 'react-router-dom'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import MenuItemCard from '../components/menu/MenuItemCard.jsx'
import { menuItems } from '../data/menu.js'
import { shopInfo } from '../data/shopInfo.js'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function Home() {
  const { t, lang } = useLanguage()
  const best = menuItems.filter(i => i.isPopular).slice(0, 6)
  const previewGroups = [
    { id: 'robusta', title: lang === 'vi' ? 'Cà phê Robusta' : 'Robusta Coffee', items: menuItems.filter(item => item.category === 'robusta').slice(0, 4) },
    { id: 'tea', title: lang === 'vi' ? 'Trà & trà sữa' : 'Tea & Milk Tea', items: menuItems.filter(item => item.category === 'tea').slice(0, 4) },
    { id: 'food', title: lang === 'vi' ? 'Menu thức ăn' : 'Food Menu', items: menuItems.filter(item => item.category === 'food').slice(0, 4) }
  ]
  const gallery = [
    { label: lang === 'vi' ? 'Không gian quán' : 'Cafe seating', src: '/images/hero-cafe-interior.jpg', position: '50% 55%' },
    { label: lang === 'vi' ? 'Ly cà phê Bình An' : 'Binh An coffee cup', src: '/images/gallery-cup-sign.jpg', position: '50% 58%' },
    { label: lang === 'vi' ? 'Góc hiên nhiều nắng' : 'Sunny patio corner', src: '/images/gallery-patio-flowers.jpg', position: '50% 60%' },
    { label: lang === 'vi' ? 'Biển hiệu Bình An' : 'Binh An sign', src: '/images/gallery-shop-sign.jpg', position: '50% 45%' },
    { label: lang === 'vi' ? 'Góc nhìn từ quán' : 'View from the shop', src: '/images/gallery-balcony-view.jpg', position: '50% 50%' },
    { label: lang === 'vi' ? 'Buổi sáng trên đồi' : 'Morning hills', src: '/images/gallery-morning-valley.jpg', position: '50% 52%' }
  ]
  return <><Navbar /><Hero />
    <section className="container-page py-14">
      <SectionTitle title={t('sections.best')} subtitle={lang==='vi'?'Những món dễ gọi, dễ uống khi ghé Bình An.':'Easy favorites when visiting Binh An.'}/>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{best.map(item => <MenuItemCard key={item.id} item={item}/>)}</div>
    </section>

    <About />

    <section className="container-page py-14">
      <SectionTitle title={lang === 'vi' ? 'Xem nhanh thực đơn' : 'Menu Preview'} subtitle={lang === 'vi' ? 'Những nhóm món chính hiện có tại quán.' : 'Main menu groups currently available at the shop.'} />
      <div className="grid gap-5 md:grid-cols-3">
        {previewGroups.map(group => <div key={group.id} className="card p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-black">{group.title}</h3>
            <span className="rounded bg-coffee-100 px-2 py-1 text-xs font-black text-coffee-700">{group.items.length} {lang === 'vi' ? 'món' : 'items'}</span>
          </div>
          <div className="mt-4 space-y-3">
            {group.items.map(item => <div key={item.id} className="flex justify-between gap-4 border-b border-coffee-100 pb-3 last:border-b-0">
              <span className="font-semibold">{item.name[lang]}</span>
              <span className="font-bold text-coffee-700">{item.priceLabel ? `${item.priceLabel}.000đ` : `${new Intl.NumberFormat('vi-VN').format(item.price)}đ`}</span>
            </div>)}
          </div>
        </div>)}
      </div>
      <div className="mt-6 text-center"><Link className="btn-primary" to="/menu">{t('hero.viewMenu')}</Link></div>
    </section>

    <section className="container-page py-14">
      <SectionTitle title={t('sections.gallery')} subtitle={lang === 'vi' ? 'Một vài khoảnh khắc nhỏ của không gian Bình An.' : 'A few quiet moments from the Binh An space.'}/>
      <div className="grid gap-4 sm:grid-cols-3">{gallery.map(item => <div key={item.label} className="group relative aspect-square overflow-hidden rounded-lg bg-coffee-100"><img className="h-full w-full object-cover transition duration-300 group-hover:scale-105" src={item.src} alt={item.label} style={{ objectPosition: item.position }} /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coffee-900/75 to-transparent p-4 text-sm font-bold text-white">{item.label}</div></div>)}</div>
    </section>

    <section className="container-page py-14">
      <SectionTitle title={t('sections.location')} />
      <div className="card grid gap-6 p-6 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-black">{shopInfo.name[lang]}</h3>
          <p className="mt-3">{shopInfo.address[lang]}</p>
          <p className="mt-2">Open: {shopInfo.openingHours}</p>
          <p className="mt-2">Phone/Zalo: {shopInfo.phoneDisplay} - {shopInfo.secondaryPhoneDisplay}</p>
          <p className="mt-2">Wi-Fi: {shopInfo.wifi}</p>
          <div className="mt-6 flex flex-wrap gap-3"><a className="btn-primary" href={shopInfo.mapsUrl} target="_blank"><MapPin size={18}/>Google Maps</a><a className="btn-secondary" href={`tel:${shopInfo.phone}`}><Phone size={18}/>{lang === 'vi' ? 'Gọi quán' : 'Call'}</a></div>
        </div>
        <a className="grid min-h-64 place-items-center rounded-lg bg-coffee-100 p-6 text-center font-bold text-coffee-700" href={shopInfo.mapsUrl} target="_blank"><span><MapPin className="mx-auto mb-3" />{lang === 'vi' ? 'Mở vị trí trên Google Maps' : 'Open location on Google Maps'}</span></a>
      </div>
    </section>

    <section className="container-page py-14">
      <SectionTitle title={lang === 'vi' ? 'Liên hệ' : 'Contact'} subtitle={lang === 'vi' ? 'Gọi trước hoặc nhắn Zalo cho quán.' : 'Call ahead or message the shop on Zalo.'} />
      <div className="grid gap-4 sm:grid-cols-3">
        <a className="card flex items-center gap-4 p-5 font-black" href={`tel:${shopInfo.phone}`}><Phone className="text-leaf" />{shopInfo.phoneDisplay}</a>
        <a className="card flex items-center gap-4 p-5 font-black" href={`tel:${shopInfo.secondaryPhone}`}><Phone className="text-leaf" />{shopInfo.secondaryPhoneDisplay}</a>
        <a className="card flex items-center gap-4 p-5 font-black" href={`https://zalo.me/${shopInfo.zalo}`} target="_blank"><MessageCircle className="text-leaf" />Zalo</a>
      </div>
    </section>

    <Footer /></>
}

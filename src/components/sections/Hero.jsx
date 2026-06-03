import { Link } from 'react-router-dom'
import { Clock, MapPin, Phone, Wifi } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage.jsx'
import { shopInfo } from '../../data/shopInfo.js'

export default function Hero() {
  const { t, lang } = useLanguage()
  return <section className="container-page grid min-h-[72vh] items-center gap-10 py-12 md:grid-cols-[0.95fr_1.05fr]">
    <div>
      <p className="font-bold text-leaf">{shopInfo.tagline[lang]}</p>
      <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl">{t('hero.title')}</h1>
      <p className="mt-4 text-2xl font-semibold text-coffee-700">{t('hero.subtitle')}</p>
      <p className="mt-4 max-w-xl text-coffee-700">{t('hero.desc')}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn-primary" to="/menu">{t('hero.viewMenu')}</Link>
        <a className="btn-secondary inline-flex items-center gap-2" href={shopInfo.mapsUrl} target="_blank"><MapPin size={18}/>{t('hero.directions')}</a>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-white/80 p-3 shadow-sm"><Clock size={18} className="text-leaf" /><p className="mt-2 text-sm font-bold">{shopInfo.openingHours}</p></div>
        <div className="rounded-lg bg-white/80 p-3 shadow-sm"><Phone size={18} className="text-leaf" /><p className="mt-2 text-sm font-bold">{shopInfo.phoneDisplay}</p></div>
        <div className="rounded-lg bg-white/80 p-3 shadow-sm"><Wifi size={18} className="text-leaf" /><p className="mt-2 text-sm font-bold">{shopInfo.wifi}</p></div>
      </div>
    </div>
    <div className="overflow-hidden rounded-lg shadow-2xl shadow-coffee-900/15"><img className="aspect-[5/4] h-full w-full object-cover" src="/images/hero-cafe-interior.jpg" alt="Warm seating area at Binh An Coffee" /></div>
  </section>
}

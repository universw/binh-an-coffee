import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Phone, Wifi } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage.jsx'
import { shopInfo } from '../../data/shopInfo.js'

const heroSlides = [
  { src: '/images/hero-slides/golden-stairs-patio.jpg', alt: 'Nắng chiều trong sân Tiệm Cà Phê Bình An', position: '50% 50%' },
  { src: '/images/hero-slides/coffee-cup-sign.jpg', alt: 'Ly cà phê trước biển hiệu Bình An', position: '50% 50%' },
  { src: '/images/hero-slides/vase-shop-sign.jpg', alt: 'Bình hoa bên biển hiệu Bình An', position: '50% 50%' },
  { src: '/images/hero-slides/patio-flowers-road.jpg', alt: 'Bàn hoa nhìn ra đường trước quán', position: '50% 50%' },
  { src: '/images/hero-slides/sign-under-tree.jpg', alt: 'Biển hiệu Bình An dưới tán cây', position: '50% 45%' },
  { src: '/images/hero-slides/roadside-shop-sign.jpg', alt: 'Biển hiệu Bình An cạnh quốc lộ', position: '50% 45%' },
  { src: '/images/hero-slides/big-tree-canopy.jpg', alt: 'Tán cây lớn trong không gian Bình An', position: '50% 48%' },
  { src: '/images/hero-slides/tree-branches-sky.jpg', alt: 'Nhánh cây Bình An dưới trời xanh', position: '50% 50%' },
  { src: '/images/hero-slides/tree-trunk-sky.jpg', alt: 'Thân cây lớn vươn lên bầu trời', position: '50% 48%' },
  { src: '/images/hero-slides/shop-sign-sunset.jpg', alt: 'Biển hiệu Bình An lúc hoàng hôn', position: '50% 52%' },
  { src: '/images/hero-slides/sunset-silhouette.jpg', alt: 'Hoàng hôn nhìn từ Bình An', position: '50% 50%' },
  { src: '/images/hero-slides/morning-valley-sun.jpg', alt: 'Mặt trời lên trên thung lũng', position: '50% 50%' },
  { src: '/images/hero-slides/rainy-valley-view.jpg', alt: 'Khung cảnh đồi núi sau mưa', position: '50% 50%' },
  { src: '/images/hero-slides/cloudy-valley-view.jpg', alt: 'Thung lũng xanh dưới mây', position: '50% 50%' },
  { src: '/images/hero-slides/green-hills-panorama.jpg', alt: 'Đồi xanh nhìn từ quán', position: '50% 50%' },
  { src: '/images/hero-slides/balcony-hills-view.jpg', alt: 'Ban công nhìn ra đồi núi', position: '50% 50%' },
  { src: '/images/hero-slides/night-shop-sign.jpg', alt: 'Biển hiệu Bình An buổi tối', position: '50% 50%' },
  { src: '/images/hero-slides/night-tree-lights.jpg', alt: 'Ánh đèn dưới tán cây ban đêm', position: '50% 48%' }
]

export default function Hero() {
  const { t, lang } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide(index => (index + 1) % heroSlides.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

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
    <div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-coffee-100 shadow-2xl shadow-coffee-900/15">
      {heroSlides.map((slide, index) => <img
        key={slide.src}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
        src={slide.src}
        alt={slide.alt}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        style={{ objectPosition: slide.position }}
      />)}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2 bg-gradient-to-t from-coffee-900/45 to-transparent p-4">
        {heroSlides.map((slide, index) => <button
          key={slide.src}
          type="button"
          aria-label={`Xem hình ${index + 1}`}
          onClick={() => setActiveSlide(index)}
          className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/80'}`}
        />)}
      </div>
    </div>
  </section>
}

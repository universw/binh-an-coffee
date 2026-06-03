import { shopInfo } from '../../data/shopInfo.js'
import { useLanguage } from '../../hooks/useLanguage.jsx'
export default function Footer() {
  const { lang } = useLanguage()
  return <footer className="mt-16 bg-coffee-900 py-10 text-coffee-50"><div className="container-page"><h3 className="text-2xl font-black">{shopInfo.name[lang]}</h3><p className="mt-2 text-coffee-100">{shopInfo.tagline[lang]}</p><p className="mt-4 text-sm text-coffee-100">{shopInfo.address[lang]} • {shopInfo.openingHours}</p><p className="mt-2 text-sm text-coffee-100">{shopInfo.phoneDisplay} • {shopInfo.secondaryPhoneDisplay} • Wi-Fi: {shopInfo.wifi}</p></div></footer>
}

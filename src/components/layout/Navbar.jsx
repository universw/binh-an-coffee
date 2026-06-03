import { Link, NavLink } from 'react-router-dom'
import { Coffee } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle.jsx'
import { useLanguage } from '../../hooks/useLanguage.jsx'

export default function Navbar() {
  const { t } = useLanguage()
  const nav = [ ['/', t('nav.home')], ['/menu', t('nav.menu')] ]
  return <header className="sticky top-0 z-40 border-b border-coffee-100 bg-coffee-50/90 backdrop-blur">
    <div className="container-page flex h-16 items-center justify-between">
      <Link to="/" className="flex items-center gap-2 font-black"><span className="grid h-9 w-9 place-items-center rounded-full bg-coffee-700 text-white"><Coffee size={19}/></span>Binh An Coffee</Link>
      <nav className="hidden gap-5 md:flex">{nav.map(([to,label]) => <NavLink key={to} to={to} className={({isActive}) => isActive ? 'font-bold text-coffee-900' : 'text-coffee-700 hover:text-coffee-900'}>{label}</NavLink>)}</nav>
      <LanguageToggle />
    </div>
  </header>
}

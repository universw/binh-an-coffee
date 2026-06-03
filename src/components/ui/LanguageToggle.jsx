import { useLanguage } from '../../hooks/useLanguage.jsx'
export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  return <div className="flex rounded-full border border-coffee-200 bg-white p-1 text-sm font-bold"><button onClick={() => setLang('vi')} className={`rounded-full px-3 py-1 ${lang==='vi'?'bg-coffee-700 text-white':'text-coffee-700'}`}>VI</button><button onClick={() => setLang('en')} className={`rounded-full px-3 py-1 ${lang==='en'?'bg-coffee-700 text-white':'text-coffee-700'}`}>EN</button></div>
}

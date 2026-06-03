import { createContext, useContext, useMemo, useState } from 'react'
import vi from '../locales/vi.json'
import en from '../locales/en.json'

const LanguageContext = createContext(null)
const dictionaries = { vi, en }

function readPath(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('vi')
  const value = useMemo(() => ({
    lang,
    setLang,
    t: (path) => readPath(dictionaries[lang], path) || path
  }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}

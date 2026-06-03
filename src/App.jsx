import { LanguageProvider } from './hooks/useLanguage.jsx'
import AppRoutes from './router/AppRoutes.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  )
}

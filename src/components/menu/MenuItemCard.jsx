import { useLanguage } from '../../hooks/useLanguage.jsx'
import { formatCurrency } from '../../utils/formatCurrency.js'

export default function MenuItemCard({ item }) {
  const { lang } = useLanguage()

  return <div className="card flex flex-col p-4">
    <div className="grid h-32 place-items-center rounded-lg bg-coffee-100 text-5xl">☕</div>
    <div className="mt-4 flex-1">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-black">{item.name[lang]}</h3>
        {item.isPopular && <span className="rounded-full bg-leaf px-2 py-1 text-xs font-bold text-white">Best</span>}
      </div>
      <p className="mt-2 text-sm text-coffee-700">{item.description[lang]}</p>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <b>{item.priceLabel ? `${item.priceLabel}.000đ` : formatCurrency(item.price)}</b>
      {!item.isAvailable && <span className="rounded bg-red-50 px-2 py-1 text-xs font-bold text-red-700">Unavailable</span>}
    </div>
  </div>
}

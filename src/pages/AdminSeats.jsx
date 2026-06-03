import { QRCodeSVG } from 'qrcode.react'
import { ExternalLink } from 'lucide-react'
import { seats, orderUrlForSeat } from '../data/seats.js'

function origin() {
  if (typeof window !== 'undefined') return window.location.origin
  return 'https://binh-an-coffee.web.app'
}

export default function AdminSeats() {
  return <div>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black">Mã QR cho bàn</h1>
        <p className="mt-2 text-slate-600">In mỗi mã một lần và đặt cố định tại đúng vị trí.</p>
      </div>
      <div className="rounded-lg bg-white px-5 py-3 text-right shadow-sm">
        <p className="text-sm text-slate-500">Tổng vị trí</p>
        <b className="text-2xl">{seats.length}</b>
      </div>
    </div>

    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {seats.map(seat => {
        const path = orderUrlForSeat(seat.id)
        const url = `${origin()}${path}`
        return <article key={seat.id} className="rounded-lg bg-white p-5 text-center shadow-sm print:break-inside-avoid">
          <div className="mx-auto inline-block rounded-lg border border-slate-200 bg-white p-3">
            <QRCodeSVG value={url} size={160} level="M" includeMargin />
          </div>
          <h2 className="mt-4 text-2xl font-black">{seat.label}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">{seat.group}</p>
          <a className="mt-4 inline-flex items-center gap-2 text-sm font-black text-coffee-700" href={path} target="_blank"><ExternalLink size={16} />Mở trang gọi món</a>
          <p className="mt-3 break-all rounded bg-slate-50 p-2 text-xs text-slate-500">{url}</p>
        </article>
      })}
    </div>
  </div>
}

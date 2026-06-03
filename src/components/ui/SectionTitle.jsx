export default function SectionTitle({ eyebrow, title, subtitle }) {
  return <div className="mb-8 text-center"><p className="text-sm font-bold uppercase tracking-widest text-leaf">{eyebrow}</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">{title}</h2>{subtitle && <p className="mx-auto mt-3 max-w-2xl text-coffee-700">{subtitle}</p>}</div>
}

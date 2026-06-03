export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const cls = variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
  return <button className={`${cls} ${className}`} {...props}>{children}</button>
}

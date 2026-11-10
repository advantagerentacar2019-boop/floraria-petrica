import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Acasă' },
  { to: '/magazin', label: 'Magazin' },
  { to: '/despre', label: 'Despre' },
  { to: '/livrare', label: 'Livrare' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const { totalItems } = useCart()
  const [open, setOpen] = useState(false)
  const [pop, setPop] = useState(false)

  useEffect(() => {
    if (totalItems === 0) return
    setPop(true)
    const t = setTimeout(() => setPop(false), 400)
    return () => clearTimeout(t)
  }, [totalItems])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          Florăria lui <span>Petrică</span>
        </Link>

        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/cos" className="cart-link" aria-label="Coș">
            Coș
            <span className={`cart-badge ${pop ? 'pop' : ''}`}>{totalItems}</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-label="Meniu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Închide' : 'Meniu'}
          </button>
        </div>
      </div>
    </header>
  )
}

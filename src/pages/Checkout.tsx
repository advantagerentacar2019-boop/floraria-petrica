import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export function Checkout() {
  const { items, totalPrice, clear } = useCart()
  const [done, setDone] = useState(false)
  const [orderId, setOrderId] = useState('')

  if (items.length === 0 && !done) {
    return <Navigate to="/cos" replace />
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const id = `FLP-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(id)
    clear()
    setDone(true)
  }

  if (done) {
    return (
      <div className="container success-panel fade-up">
        <h1>Comandă înregistrată (demo)</h1>
        <p>
          Mulțumim! Comanda <strong>{orderId}</strong> a fost simulată cu
          succes. În magazinul real, ai primi un email de confirmare.
        </p>
        <p style={{ color: 'var(--muted)' }}>
          Florăria lui Petrică — flori cu suflet, livrate cu grijă.
        </p>
        <Link to="/magazin" className="btn btn-primary">
          Înapoi la magazin
        </Link>
      </div>
    )
  }

  const delivery = totalPrice >= 250 ? 0 : 25
  const total = totalPrice + delivery

  return (
    <div className="container">
      <div className="page-hero">
        <h1>Checkout</h1>
        <p>Finalizează comanda — flux demo, fără plată reală.</p>
      </div>

      <div className="demo-banner">
        Acesta este un checkout demonstrativ. Datele nu sunt trimise nicăieri;
        comanda este doar simulată local în browser.
      </div>

      <form className="checkout-layout" onSubmit={onSubmit}>
        <div className="form-grid">
          <h2 style={{ color: 'var(--forest)', margin: 0 }}>Date livrare</h2>
          <div className="form-grid two">
            <div className="field">
              <label htmlFor="nume">Nume</label>
              <input id="nume" name="nume" required placeholder="Ana Popescu" />
            </div>
            <div className="field">
              <label htmlFor="telefon">Telefon</label>
              <input
                id="telefon"
                name="telefon"
                required
                type="tel"
                placeholder="07xx xxx xxx"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              required
              type="email"
              placeholder="ana@email.ro"
            />
          </div>
          <div className="field">
            <label htmlFor="adresa">Adresă</label>
            <input
              id="adresa"
              name="adresa"
              required
              placeholder="Str. Florilor 12"
            />
          </div>
          <div className="form-grid two">
            <div className="field">
              <label htmlFor="oras">Oraș</label>
              <input id="oras" name="oras" required placeholder="București" />
            </div>
            <div className="field">
              <label htmlFor="judet">Județ</label>
              <input id="judet" name="judet" required placeholder="București" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="mesaj">Mesaj pe card (opțional)</label>
            <textarea
              id="mesaj"
              name="mesaj"
              rows={3}
              placeholder="Cu drag, de la…"
            />
          </div>
          <div className="field">
            <label htmlFor="plata">Metodă de plată (demo)</label>
            <select id="plata" name="plata" defaultValue="card">
              <option value="card">Card bancar</option>
              <option value="ramburs">Ramburs la livrare</option>
              <option value="transfer">Transfer bancar</option>
            </select>
          </div>
        </div>

        <aside className="summary-box">
          <h2>Comanda ta</h2>
          {items.map((i) => (
            <div className="summary-row" key={i.product.id}>
              <span>
                {i.product.name} × {i.quantity}
              </span>
              <span>{formatPrice(i.product.price * i.quantity)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Livrare</span>
            <span>{delivery === 0 ? 'Gratuită' : formatPrice(delivery)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
            Livrare gratuită peste 250 RON.
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Plasează comanda (demo)
          </button>
        </aside>
      </form>
    </div>
  )
}

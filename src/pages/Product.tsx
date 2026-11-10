import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  CATEGORY_LABELS,
  formatPrice,
  getProductBySlug,
  products,
} from '../data/products'
import { useCart } from '../context/CartContext'
import { ProductCard } from '../components/ProductCard'

export function Product() {
  const { slug } = useParams()
  const product = getProductBySlug(slug || '')
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="container empty-state">
        <h1>Produs negăsit</h1>
        <p>Poate a fost mutat sau redenumit.</p>
        <Link to="/magazin" className="btn btn-primary">
          Înapoi la magazin
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  function handleAdd() {
    addItem(product!, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="container">
      <div className="page-hero" style={{ paddingBottom: '1rem' }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          <Link to="/magazin" style={{ color: 'var(--muted)' }}>
            Magazin
          </Link>
          {' / '}
          <Link
            to={`/magazin?categorie=${product.category}`}
            style={{ color: 'var(--muted)' }}
          >
            {CATEGORY_LABELS[product.category]}
          </Link>
        </p>
      </div>

      <div className="product-detail">
        <div className="product-detail-media">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="price-lg">{formatPrice(product.price)}</div>
          <div className="meta">
            <span className="chip">{CATEGORY_LABELS[product.category]}</span>
            {product.seasonal && <span className="chip">Sezon</span>}
            {product.occasion && (
              <span className="chip">{product.occasion}</span>
            )}
          </div>
          <p style={{ color: 'var(--muted)' }}>{product.longDescription}</p>

          <div className="qty-row">
            <div className="qty-control" aria-label="Cantitate">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Scade"
              >
                −
              </button>
              <span>{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Crește"
              >
                +
              </button>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAdd}>
              {added ? 'Adăugat în coș ✓' : 'Adaugă în coș'}
            </button>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
            Livrare în București în aceeași zi (până la 14:00) · Țară 1–2 zile
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <h2>Din aceeași categorie</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

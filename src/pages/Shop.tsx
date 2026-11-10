import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import {
  CATEGORIES,
  products,
  type Category,
} from '../data/products'

export function Shop() {
  const [params, setParams] = useSearchParams()
  const initialCat = (params.get('categorie') as Category | 'toate') || 'toate'
  const seasonalOnly = params.get('sezon') === '1'
  const [category, setCategory] = useState<Category | 'toate'>(
    CATEGORIES.some((c) => c.id === initialCat) ? initialCat : 'toate',
  )
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== 'toate' && p.category !== category) return false
      if (seasonalOnly && !p.seasonal) return false
      if (query.trim()) {
        const q = query.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [category, query, seasonalOnly])

  function selectCategory(id: Category | 'toate') {
    setCategory(id)
    const next = new URLSearchParams(params)
    if (id === 'toate') next.delete('categorie')
    else next.set('categorie', id)
    setParams(next, { replace: true })
  }

  return (
    <div className="container">
      <div className="page-hero">
        <h1>Magazin</h1>
        <p>
          {products.length} produse — buchete, aranjamente, plante și ocazii.
          Prețuri în RON.
        </p>
      </div>

      <div className="shop-toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Caută flori, buchete…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Caută produse"
        />
        <span className="results-count">
          {filtered.length}{' '}
          {filtered.length === 1 ? 'produs' : 'produse'}
          {seasonalOnly ? ' · sezon' : ''}
        </span>
      </div>

      <div className="filters" role="tablist" aria-label="Categorii">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`filter-chip ${category === c.id ? 'active' : ''}`}
            onClick={() => selectCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>Niciun produs nu corespunde filtrului.</p>
        </div>
      ) : (
        <div className="product-grid" style={{ paddingBottom: '3rem' }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

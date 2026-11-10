import { Link } from 'react-router-dom'
import {
  CATEGORY_LABELS,
  formatPrice,
  type Product,
} from '../data/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/produs/${product.slug}`} className="product-card">
      <div className="product-card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.seasonal && <span className="product-card-tag">Sezon</span>}
      </div>
      <div className="product-card-body">
        <div className="cat">{CATEGORY_LABELS[product.category]}</div>
        <h3>{product.name}</h3>
        <div className="price">{formatPrice(product.price)}</div>
      </div>
    </Link>
  )
}

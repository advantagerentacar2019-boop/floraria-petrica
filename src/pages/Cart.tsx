import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } =
    useCart()

  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <h1>Coșul este gol</h1>
        <p>Adaugă flori din magazin și revino aici.</p>
        <Link to="/magazin" className="btn btn-primary">
          Mergi la magazin
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="page-hero">
        <h1>Coșul tău</h1>
        <p>
          {totalItems} {totalItems === 1 ? 'produs' : 'produse'} selectate
        </p>
      </div>

      <div className="cart-layout">
        <div>
          {items.map((item) => (
            <div key={item.product.id} className="cart-line">
              <Link to={`/produs/${item.product.slug}`}>
                <img src={item.product.image} alt={item.product.name} />
              </Link>
              <div>
                <h3>
                  <Link to={`/produs/${item.product.slug}`}>
                    {item.product.name}
                  </Link>
                </h3>
                <div style={{ color: 'var(--moss)', fontWeight: 600 }}>
                  {formatPrice(item.product.price)}
                </div>
                <div className="qty-control" style={{ marginTop: '0.6rem' }}>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="remove"
                  onClick={() => removeItem(item.product.id)}
                >
                  Elimină
                </button>
              </div>
              <div style={{ fontWeight: 600, color: 'var(--forest)' }}>
                {formatPrice(item.product.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <aside className="summary-box">
          <h2>Sumar</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Livrare</span>
            <span>Calculată la checkout</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Link
            to="/checkout"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Continuă la checkout
          </Link>
          <Link
            to="/magazin"
            className="btn btn-soft"
            style={{ width: '100%', marginTop: '0.6rem' }}
          >
            Continuă cumpărăturile
          </Link>
        </aside>
      </div>
    </div>
  )
}

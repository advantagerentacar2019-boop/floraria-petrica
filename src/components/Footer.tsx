import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Florăria lui Petrică</div>
            <p>
              Flori proaspete, aranjamente elegante și livrare în România. Un
              magazin demo pentru prezentări clienți.
            </p>
          </div>
          <div>
            <h4>Magazin</h4>
            <Link to="/magazin">Toate produsele</Link>
            <Link to="/magazin?categorie=buchete">Buchete</Link>
            <Link to="/magazin?categorie=aranjamente">Aranjamente</Link>
            <Link to="/magazin?categorie=plante">Plante</Link>
            <Link to="/magazin?categorie=ocazii">Ocazii</Link>
          </div>
          <div>
            <h4>Informații</h4>
            <Link to="/despre">Despre noi</Link>
            <Link to="/livrare">Livrare & plată</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Program</h4>
            <p style={{ margin: 0 }}>Luni–Sâmbătă: 9:00–19:00</p>
            <p style={{ margin: '0.35rem 0 0' }}>Duminică: 10:00–15:00</p>
            <p style={{ margin: '0.75rem 0 0' }}>contact@floraria-petrica.ro</p>
            <p style={{ margin: '0.35rem 0 0' }}>+40 721 000 000</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Florăria lui Petrică · Demo e-commerce</span>
          <span>Prețuri în RON · Livrare în România</span>
        </div>
      </div>
    </footer>
  )
}

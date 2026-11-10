import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { getFeatured, getSeasonal } from '../data/products'

const HERO =
  'https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1800&q=80'
const ABOUT =
  'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1200&q=80'

export function Home() {
  const featured = getFeatured().slice(0, 8)
  const seasonal = getSeasonal().slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden>
          <img src={HERO} alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <h1 className="hero-brand fade-up">
            Florăria lui <em>Petrică</em>
          </h1>
          <p className="hero-lead fade-up-delay">
            Flori proaspete, aranjate cu grijă — de la buchete de zi cu zi la
            gesturi pe care le ții minte.
          </p>
          <div className="hero-ctas fade-up-delay-2">
            <Link to="/magazin" className="btn btn-primary">
              Vezi magazinul
            </Link>
            <Link to="/despre" className="btn btn-ghost">
              Povestea noastră
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Recomandările noastre</h2>
              <p>Selecții preferate din atelier — gata de livrare.</p>
            </div>
            <Link to="/magazin" className="section-link">
              Toate produsele →
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="note-band">
        <div className="container note-band-inner">
          <div>
            <h3>Livrare în România</h3>
            <p>
              Livrăm în București în aceeași zi (comenzi până la 14:00) și în
              țară prin curier, în 1–2 zile lucrătoare. Flori proaspete, ambalate
              pentru drum.
            </p>
          </div>
          <Link to="/livrare" className="btn btn-ghost">
            Detalii livrare
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Alese de sezon</h2>
              <p>Ce e acum în floare — proaspăt și la preț bun.</p>
            </div>
            <Link to="/magazin?sezon=1" className="section-link">
              Vezi sezonul →
            </Link>
          </div>
          <div className="product-grid">
            {seasonal.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="split-media">
            <img src={ABOUT} alt="Aranjament floral în atelier" />
          </div>
          <div className="split-copy">
            <h2>Un atelier mic, flori alese cu grijă</h2>
            <p>
              La Florăria lui Petrică lucrăm pe comandă, cu flori de sezon și
              parteneri de încredere. Fiecare buchet e legat manual în atelier —
              fără șabloane, cu ochi pentru culoare și proporție.
            </p>
            <p>
              Acest site este o demonstrație e-commerce (stil WooCommerce) pe
              care o poți arăta clienților: catalog, coș și checkout simulat.
            </p>
            <Link to="/despre" className="btn btn-outline">
              Despre florărie
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

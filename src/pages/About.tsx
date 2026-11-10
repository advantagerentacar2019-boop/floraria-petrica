const IMG =
  'https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1400&q=80'

export function About() {
  return (
    <div className="container">
      <div className="page-hero">
        <h1>Despre Florăria lui Petrică</h1>
        <p>
          Un atelier de floristică unde fiecare buchet începe cu floarea
          potrivită — nu cu un șablon.
        </p>
      </div>

      <div className="split" style={{ paddingBottom: '3rem' }}>
        <div className="split-media" style={{ minHeight: 420 }}>
          <img src={IMG} alt="Flori în atelier" />
        </div>
        <div className="split-copy prose">
          <h2>Povestea</h2>
          <p>
            Florăria lui Petrică s-a născut din pasiunea pentru flori de sezon și
            pentru gesturile mici care contează. Lucrăm pe comandă, alegem
            zilnic din piață și din sere partenere, și legăm fiecare buchet în
            atelier.
          </p>
          <h2>Ce ne definește</h2>
          <p>
            Prospețime, proporție și o notă personală. Preferăm aranjamente care
            respiră — nu supraîncărcate — și culori care se potrivesc ocaziei
            tale.
          </p>
          <h2>Acest site</h2>
          <p>
            Pagina pe care o vezi este o demonstrație e-commerce modernă (stil
            magazin WooCommerce), cu catalog, coș și checkout simulat. Perfectă
            pentru a arăta unui client cum arată un magazin online de florărie.
          </p>
        </div>
      </div>
    </div>
  )
}

export function Delivery() {
  return (
    <div className="container">
      <div className="page-hero">
        <h1>Livrare & informații</h1>
        <p>Cum ajung florile tale — în București și în toată România.</p>
      </div>

      <div className="info-grid" style={{ paddingBottom: '3rem' }}>
        <div className="info-block">
          <h3>București — aceeași zi</h3>
          <p>
            Comenzi plasate până la 14:00 pot fi livrate în aceeași zi, în
            intervalul ales. Zone periferice: confirmăm telefonic.
          </p>
        </div>
        <div className="info-block">
          <h3>În țară</h3>
          <p>
            Livrare prin curier în 1–2 zile lucrătoare. Florile sunt ambalate
            pentru transport, cu instrucțiuni de îngrijire.
          </p>
        </div>
        <div className="info-block">
          <h3>Costuri</h3>
          <p>
            Livrare de la 25 RON. Gratuită pentru comenzi peste 250 RON
            (simulată și în acest demo la checkout).
          </p>
        </div>
        <div className="info-block">
          <h3>Plată</h3>
          <p>
            Card, ramburs sau transfer. În demo, plata este doar simulată — nu
            se procesează sume reale.
          </p>
        </div>
        <div className="info-block">
          <h3>Ridicare din magazin</h3>
          <p>
            Poți ridica personal din atelier, în programul afișat. Pregătim
            comanda și te anunțăm când e gata.
          </p>
        </div>
        <div className="info-block">
          <h3>Ocazii speciale</h3>
          <p>
            Pentru nunți, corporate și volume mari, contactează-ne cu 5–7 zile
            înainte pentru ofertă personalizată.
          </p>
        </div>
      </div>

      <div className="prose" style={{ paddingBottom: '3rem' }}>
        <h2>Notă pentru România</h2>
        <p>
          În perioadele aglomerate (8 Martie, Valentine&apos;s, Dragobete,
          Crăciun) recomandăm comanda din timp. Stocurile de flori de sezon
          variază — dacă o varietate nu e disponibilă, propunem o alternativă
          echivalentă ca stil și valoare.
        </p>
      </div>
    </div>
  )
}

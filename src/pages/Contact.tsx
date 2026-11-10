import { useState, type FormEvent } from 'react'

export function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="container">
      <div className="page-hero">
        <h1>Contact</h1>
        <p>Scrie-ne pentru comenzi speciale, nunți sau colaborări.</p>
      </div>

      <div className="contact-layout">
        <div>
          <div className="info-block" style={{ marginBottom: '1.5rem' }}>
            <h3>Florăria lui Petrică</h3>
            <p>Str. Exemplu 10, București (adresă demo)</p>
            <p style={{ marginTop: '0.5rem' }}>+40 721 000 000</p>
            <p>contact@floraria-petrica.ro</p>
            <p style={{ marginTop: '0.75rem' }}>
              Luni–Sâmbătă 9:00–19:00 · Duminică 10:00–15:00
            </p>
          </div>
          <div className="demo-banner">
            Formularul este demonstrativ — mesajul nu este trimis pe email.
          </div>
        </div>

        {sent ? (
          <div className="summary-box fade-up">
            <h2>Mesaj înregistrat (demo)</h2>
            <p style={{ color: 'var(--muted)' }}>
              Mulțumim! În magazinul real, te-am contacta în curând.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setSent(false)}
            >
              Trimite alt mesaj
            </button>
          </div>
        ) : (
          <form className="form-grid" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="c-nume">Nume</label>
              <input id="c-nume" required placeholder="Numele tău" />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" type="email" required placeholder="email@exemplu.ro" />
            </div>
            <div className="field">
              <label htmlFor="c-subiect">Subiect</label>
              <input id="c-subiect" required placeholder="Comandă nuntă, colaborare…" />
            </div>
            <div className="field">
              <label htmlFor="c-mesaj">Mesaj</label>
              <textarea id="c-mesaj" required rows={5} placeholder="Cum te putem ajuta?" />
            </div>
            <button type="submit" className="btn btn-primary">
              Trimite mesajul
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

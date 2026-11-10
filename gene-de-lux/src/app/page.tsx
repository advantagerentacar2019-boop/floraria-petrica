import Link from "next/link";
import { SERVICES } from "../lib/services";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-label="Gene de lux">
        <div className={styles.heroMedia} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Rovinari · Gorj</p>
          <h1 className={styles.title}>
            Gene de lux
            <span>By Roxana Scredeanu</span>
          </h1>
          <p className={styles.lead}>
            Look de senzație, finisat cu precizie. Programează-ți intervalul —
            vezi când e liber și rezervă în câteva secunde.
          </p>
          <div className={styles.actions}>
            <Link href="/programari" className={styles.primary}>
              Programează-te
            </Link>
            <Link href="/servicii" className={styles.secondary}>
              Vezi serviciile
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.band} id="despre">
        <div className={styles.bandText}>
          <h2>Frumusețe care rămâne în privire</h2>
          <p>
            În studio, Roxana lucrează seturi personalizate — de la clasic
            natural la mega volum dramatic. Fiecare programare durează circa
            două ore, într-un ritm calm, pe Lun–Sâm 10:00–18:00.
          </p>
        </div>
        <ul className={styles.facts}>
          <li>
            <strong>Locație</strong>
            <span>Rovinari, jud. Gorj</span>
          </li>
          <li>
            <strong>Orar</strong>
            <span>Luni–Sâmbătă 10–18</span>
          </li>
          <li>
            <strong>Durată</strong>
            <span>~2 ore / ședință</span>
          </li>
        </ul>
      </section>

      <section className={styles.servicesPreview}>
        <div className={styles.sectionHead}>
          <h2>Semnături din meniu</h2>
          <Link href="/servicii">Toate serviciile</Link>
        </div>
        <div className={styles.serviceGrid}>
          {SERVICES.slice(0, 3).map((s, i) => (
            <article
              key={s.id}
              className={styles.serviceCard}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {s.tag ? <span className={styles.tag}>{s.tag}</span> : null}
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <p className={styles.price}>{s.priceRon} RON</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaBlock} id="contact">
        <h2>Pregătită pentru un look nou?</h2>
        <p>
          Alege serviciul, vezi intervalele libere și rezervă. Pentru întrebări,
          lasă telefonul la programare — Roxana te contactează dacă e nevoie.
        </p>
        <Link href="/programari" className={styles.primary}>
          Deschide programările
        </Link>
      </section>
    </>
  );
}

import Link from "next/link";
import { SERVICES } from "../../lib/services";
import styles from "./page.module.css";

export const metadata = {
  title: "Servicii — Gene de lux",
};

export default function ServiciiPage() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p>Meniu demo</p>
        <h1>Servicii & prețuri</h1>
        <p className={styles.lead}>
          Prețuri orientative pentru demo. Fiecare ședință durează aproximativ
          două ore.
        </p>
      </header>
      <div className={styles.grid}>
        {SERVICES.map((s, i) => (
          <article
            key={s.id}
            className={styles.card}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className={styles.top}>
              <h2>{s.name}</h2>
              <span>{s.priceRon} RON</span>
            </div>
            <p>{s.description}</p>
            {s.tag ? <em>{s.tag}</em> : null}
          </article>
        ))}
      </div>
      <Link href="/programari" className={styles.cta}>
        Rezervă un interval
      </Link>
    </div>
  );
}

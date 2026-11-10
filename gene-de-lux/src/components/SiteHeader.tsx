import Link from "next/link";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <span className={styles.brandMain}>Gene de lux</span>
        <span className={styles.brandBy}>By Roxana Scredeanu</span>
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        <Link href="/servicii">Servicii</Link>
        <Link href="/programari">Programări</Link>
        <Link href="/#despre">Despre</Link>
        <Link href="/#contact">Contact</Link>
        <Link href="/programari" className={styles.cta}>
          Rezervă
        </Link>
      </nav>
    </header>
  );
}

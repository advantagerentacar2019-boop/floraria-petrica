import Link from "next/link";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.brand}>Gene de lux</p>
        <p className={styles.by}>By Roxana Scredeanu · Rovinari, Gorj</p>
      </div>
      <div className={styles.meta}>
        <p>Luni–Sâmbătă · 10:00–18:00</p>
        <p>Programări ~2 ore</p>
        <Link href="/admin">Admin</Link>
      </div>
    </footer>
  );
}

import { BookingForm } from "../../components/BookingForm";
import styles from "./page.module.css";

export const metadata = {
  title: "Programări — Gene de lux",
};

export default function ProgramariPage() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p>Online · Rovinari</p>
        <h1>Programări</h1>
        <p className={styles.lead}>
          Selectează serviciul și un interval liber (Lun–Sâm 10–18, ~2 ore).
          Vezi doar orele disponibile.
        </p>
      </header>
      <BookingForm />
    </div>
  );
}

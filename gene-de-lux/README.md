# Gene de lux By Roxana Scredeanu

Demo — site de prezentare + programări pentru salon de gene în Rovinari, Gorj.

- Orar: Luni–Sâmbătă 10:00–18:00
- Sloturi ~2 ore (10, 12, 14, 16)
- Client: vede intervale libere și rezervă
- Admin (`/admin`): gestionează / blochează programări

## Secrets (obligatorii pentru admin)

Configurează în Cursor Secrets (nu în repo):

- `ADMIN_PASSWORD` — parola de login admin
- `ADMIN_SESSION_SECRET` — cheie separată pentru semnarea sesiunii admin

Fără ambele, login-ul admin e refuzat.

```bash
npm install
env -u DATABASE_URL npm run dev
```

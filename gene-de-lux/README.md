# Gene de lux By Roxana Scredeanu

Demo — site de prezentare + programări pentru salon de gene în Rovinari, Gorj.

- Orar: Luni–Sâmbătă 10:00–18:00
- Sloturi ~2 ore (10, 12, 14, 16)
- Client: vede intervale libere și rezervă
- Admin (`/admin`): gestionează / blochează programări (parolă `ADMIN_PASSWORD`)

```bash
npm install
env -u DATABASE_URL npm run dev
```

Local admin sample password (când `ADMIN_PASSWORD` lipsește): `demo-admin`

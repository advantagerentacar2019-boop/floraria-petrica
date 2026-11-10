export type Service = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceRon: number;
  tag?: string;
};

export const SERVICES: Service[] = [
  {
    id: "clasic",
    name: "Extensii clasice",
    description: "Un fir pe un fir — look natural, elegant, pentru fiecare zi.",
    durationMinutes: 120,
    priceRon: 180,
    tag: "Best seller",
  },
  {
    id: "volum",
    name: "Volum 2D–3D",
    description: "Densitate fină, ochi deschiși, fără greutate excesivă.",
    durationMinutes: 120,
    priceRon: 230,
  },
  {
    id: "mega",
    name: "Mega volum",
    description: "Efect dramatic, dens, pentru evenimente și look de lux.",
    durationMinutes: 120,
    priceRon: 290,
    tag: "Statement",
  },
  {
    id: "retus",
    name: "Retuș (2–3 săptămâni)",
    description: "Reîmprospătare set existent — menține forma și densitatea.",
    durationMinutes: 120,
    priceRon: 130,
  },
  {
    id: "laminare",
    name: "Laminare + tint",
    description: "Gene naturale ridicate și colorate, fără extensii.",
    durationMinutes: 120,
    priceRon: 160,
  },
  {
    id: "demachiere",
    name: "Demachiere extensii",
    description: "Îndepărtare blândă, protejând genele naturale.",
    durationMinutes: 120,
    priceRon: 80,
  },
];

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

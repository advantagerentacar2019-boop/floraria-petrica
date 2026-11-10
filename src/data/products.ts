export type Category = 'buchete' | 'aranjamente' | 'plante' | 'ocazii'

export type Product = {
  id: string
  name: string
  slug: string
  category: Category
  price: number
  description: string
  longDescription: string
  image: string
  featured?: boolean
  seasonal?: boolean
  occasion?: string
}

export const CATEGORIES: { id: Category | 'toate'; label: string }[] = [
  { id: 'toate', label: 'Toate' },
  { id: 'buchete', label: 'Buchete' },
  { id: 'aranjamente', label: 'Aranjamente' },
  { id: 'plante', label: 'Plante' },
  { id: 'ocazii', label: 'Ocazii' },
]

export const CATEGORY_LABELS: Record<Category, string> = {
  buchete: 'Buchete',
  aranjamente: 'Aranjamente',
  plante: 'Plante',
  ocazii: 'Ocazii',
}

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const products: Product[] = [
  {
    id: '1',
    name: 'Buchet Trandafiri Clasici',
    slug: 'buchet-trandafiri-clasici',
    category: 'buchete',
    price: 189,
    description: 'Doisprezece trandafiri roșii proaspeți, legați elegant cu raffia naturală.',
    longDescription:
      'Un clasic al dragostei: doisprezece trandafiri roșii selectați zilnic din serele noastre partenere. Tulpini lungi, frunziș verde proaspăt și o legătură discretă din raffia. Ideal pentru aniversări și declarații.',
    image: img('photo-1591886960571-74d43a9d4166'),
    featured: true,
  },
  {
    id: '2',
    name: 'Buchet Peonii de Primăvară',
    slug: 'buchet-peonii-primavara',
    category: 'buchete',
    price: 249,
    description: 'Peonii roz pudrați, moi și generoși — esența primăverii.',
    longDescription:
      'Peonii sezonieri în nuanțe de roz pudrat și crem, aranjați într-un buchet generos, rotund. Parfum delicat, textură catifelată. Disponibil în sezonul de vârf (aprilie–iunie).',
    image: img('photo-1490750967868-88aa4486c946'),
    featured: true,
    seasonal: true,
  },
  {
    id: '3',
    name: 'Buchet Lavandă & Eucalipt',
    slug: 'buchet-lavanda-eucalipt',
    category: 'buchete',
    price: 139,
    description: 'Lavandă uscată și eucalipt argintiu pentru un aer mediteranean.',
    longDescription:
      'Un buchet aromat cu lavandă și frunze de eucalipt. Potrivit pentru birou sau cadou discret. Se usucă frumos și păstrează parfumul săptămâni întregi.',
    image: img('photo-1463936575829-25148e1db1b8'),
    seasonal: true,
  },
  {
    id: '4',
    name: 'Buchet Lalele Olandeze',
    slug: 'buchet-lalele-olandeze',
    category: 'buchete',
    price: 119,
    description: 'Mix vibrant de lalele olandeze — veselie de primăvară.',
    longDescription:
      'Fascicul de lalele în nuanțe mixte: roșu, galben, alb și roz. Importate săptămânal. Perfecte pentru a aduce lumină într-o casă sau birou.',
    image: img('photo-1582794543139-8ac9cb0f7b11'),
    seasonal: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Buchet Hortensii Albastre',
    slug: 'buchet-hortensii-albastre',
    category: 'buchete',
    price: 199,
    description: 'Hortensii albastre, voluminoase, într-un buchet de impact.',
    longDescription:
      'Capete generoase de hortensie albastră, aranjate într-un buchet dens. Ideal ca piesă centrală pe masă sau cadou spectaculos.',
    image: img('photo-1533616688419-b7a585564566'),
  },
  {
    id: '6',
    name: 'Buchet Floarea-Soarelui',
    slug: 'buchet-floarea-soarelui',
    category: 'buchete',
    price: 129,
    description: 'Soare într-un buchet — floarea-soarelui cu verdeață rustic.',
    longDescription:
      'Floarea-soarelui proaspătă, acompaniată de verdeață rustic. Atmosferă caldă, de vară la țară. Perfect pentru gazde și zile însorite.',
    image: img('photo-1558618666-fcd25c85cd64'),
    seasonal: true,
  },
  {
    id: '7',
    name: 'Buchet Frezii Parfumate',
    slug: 'buchet-frezii-parfumate',
    category: 'buchete',
    price: 159,
    description: 'Frezii albe și crem cu un parfum inconfundabil.',
    longDescription:
      'Frezii delicate, alese pentru aroma lor intensă. Buchet elegant, potrivit pentru nuntă sau un gest rafinat.',
    image: img('photo-1519378058457-4c29a0a2efac'),
  },
  {
    id: '8',
    name: 'Buchet Ranunculus Pastel',
    slug: 'buchet-ranunculus-pastel',
    category: 'buchete',
    price: 179,
    description: 'Ranunculus în pasteluri — petale în straturi fine.',
    longDescription:
      'Ranunculus în nuanțe pastel: piersică, lila și crem. Fiecare floare e un mic nor de petale. Preferatul fotografelor de nuntă.',
    image: img('photo-1546842931-886c185b4c8c'),
    featured: true,
  },
  {
    id: '9',
    name: 'Buchet Crizanteme de Toamnă',
    slug: 'buchet-crizanteme-toamna',
    category: 'buchete',
    price: 109,
    description: 'Crizanteme în tonuri de bronz, portocaliu și vișiniu.',
    longDescription:
      'Buchet de sezon cu crizanteme dense, în nuanțe de toamnă. Rezistent și colorat — ideal pentru masa de sărbătoare.',
    image: img('photo-1508610048659-a06b669e3321'),
    seasonal: true,
  },
  {
    id: '10',
    name: 'Buchet Gerbera Colorate',
    slug: 'buchet-gerbera-colorate',
    category: 'buchete',
    price: 99,
    description: 'Gerbera vesele, perfecte pentru a ridica moralul.',
    longDescription:
      'Mix de gerbera în culori vii. Un cadou accesibil, energic, potrivit pentru colegi, prieteni sau o zi obișnuită pe care vrei să o faci specială.',
    image: img('photo-1468327768560-75b778cbb551'),
  },
  {
    id: '11',
    name: 'Buchet Orhidee Phalaenopsis',
    slug: 'buchet-orhidee-phalaenopsis',
    category: 'buchete',
    price: 229,
    description: 'Tije de orhidee albe, eleganță minimală.',
    longDescription:
      'Tije de phalaenopsis albe, prezentate ca un buchet vertical, modern. Cadou premium pentru inaugurări și evenimente corporate.',
    image: img('photo-1578662996442-48f60103fc96'),
  },
  {
    id: '12',
    name: 'Buchet Gypsophila Nor Alb',
    slug: 'buchet-gypsophila-nor-alb',
    category: 'buchete',
    price: 89,
    description: 'Nor de gypsophila — aerisire și delicatețe.',
    longDescription:
      'Un nor alb de gypsophila (floarea miresei), legat simplu. Romantic, aerisit, perfect ca buchet secundar sau decor de masă.',
    image: img('photo-1525310072745-f49212b5ac6d'),
  },
  {
    id: '13',
    name: 'Buchet Mix de Câmp',
    slug: 'buchet-mix-camp',
    category: 'buchete',
    price: 149,
    description: 'Flori de câmp românești, aranjate natural.',
    longDescription:
      'Un mix rustic de flori de câmp: mușețel, clopoței, ierburi decorative. Sentiment de vară la munte, adus acasă.',
    image: img('photo-1471899236350-e3016bf1e69e'),
    seasonal: true,
  },
  {
    id: '14',
    name: 'Buchet Dalii de Lux',
    slug: 'buchet-dalii-lux',
    category: 'buchete',
    price: 219,
    description: 'Dalii voluminoase în nuanțe de burgundy și coral.',
    longDescription:
      'Dalii de sezon, cu petale dense și formă dramatică. Un buchet de impact pentru cineva special.',
    image: img('photo-1546842931-886c185b4c8c'),
    seasonal: true,
  },
  {
    id: '15',
    name: 'Buchet Anemone Negre & Albe',
    slug: 'buchet-anemone-negre-albe',
    category: 'buchete',
    price: 169,
    description: 'Contrast puternic: anemone albe cu centru negru.',
    longDescription:
      'Anemone cu contrast dramatic, aranjate modern. Preferate în aranjamentele contemporane de nuntă.',
    image: img('photo-1606041008023-472dfb5e530f'),
  },
  {
    id: '16',
    name: 'Aranjament Vază de Masă',
    slug: 'aranjament-vaza-masa',
    category: 'aranjamente',
    price: 279,
    description: 'Compoziție proaspătă într-o vază de sticlă transparentă.',
    longDescription:
      'Aranjament pentru masă de dining: flori de sezon, verdeață și vază inclusă. Gata de așezat — fără bătăi de cap.',
    image: img('photo-1533616688419-b7a585564566'),
    featured: true,
  },
  {
    id: '17',
    name: 'Aranjament în Coș de Ratan',
    slug: 'aranjament-cos-ratan',
    category: 'aranjamente',
    price: 259,
    description: 'Coș împletit cu flori mixte și verdeață.',
    longDescription:
      'Coș de ratan umplut cu flori de sezon și verdeață. Cadou de vizită, ideal pentru gazde și convalescență.',
    image: img('photo-1487070183336-b863922373d4'),
  },
  {
    id: '18',
    name: 'Aranjament Minimalist Alb',
    slug: 'aranjament-minimalist-alb',
    category: 'aranjamente',
    price: 299,
    description: 'Alb pe alb: flori albe într-un vas ceramic mat.',
    longDescription:
      'Compoziție monocromă albă — trandafiri, lisianthus și eucalipt — într-un vas ceramic mat. Stil scandinav, perfect pentru spații moderne.',
    image: img('photo-1519378058457-4c29a0a2efac'),
  },
  {
    id: '19',
    name: 'Aranjament Tropical Verde',
    slug: 'aranjament-tropical-verde',
    category: 'aranjamente',
    price: 319,
    description: 'Frunze tropicale și accente florale exotice.',
    longDescription:
      'Monstera, calathea și flori exotice într-un aranjament vertical, dramatic. Pentru birouri creative și lofturi.',
    image: img('photo-1446071103084-c257b5f70672'),
  },
  {
    id: '20',
    name: 'Aranjament în Cutie Cadou',
    slug: 'aranjament-cutie-cadou',
    category: 'aranjamente',
    price: 239,
    description: 'Flori în cutie pătrată, gata de oferit.',
    longDescription:
      'Cutie elegantă cu flori proaspete, aranjate dens. Nu necesită vază — ideal pentru livrare la birou.',
    image: img('photo-1526047932273-341f2a7631f9'),
    featured: true,
  },
  {
    id: '21',
    name: 'Aranjament Centru de Masă Nuntă',
    slug: 'aranjament-centru-masa-nunta',
    category: 'aranjamente',
    price: 349,
    description: 'Centru de masă romantic pentru evenimente.',
    longDescription:
      'Compoziție joasă, vizibilă peste masă, cu flori de sezon în nuanțe acordate. Disponibil și pentru comandă pe volum.',
    image: img('photo-1519225421980-715cb0215aed'),
  },
  {
    id: '22',
    name: 'Aranjament Suculente & Cactus',
    slug: 'aranjament-suculente-cactus',
    category: 'aranjamente',
    price: 159,
    description: 'Mini-grădină de suculente într-un vas de ciment.',
    longDescription:
      'Compoziție de suculente și cactus în vas de ciment. Întreținere minimă, durată lungă — cadou modern.',
    image: img('photo-1459411552884-841db9b3cc2a'),
  },
  {
    id: '23',
    name: 'Aranjament de Toamnă Rustic',
    slug: 'aranjament-toamna-rustic',
    category: 'aranjamente',
    price: 269,
    description: 'Dalii, crizanteme și spice de grâu.',
    longDescription:
      'Atmosferă de toamnă: dalii, crizanteme, spice și frunze uscate. Perfect pentru Thanksgiving sau mese de familie.',
    image: img('photo-1508610048659-a06b669e3321'),
    seasonal: true,
  },
  {
    id: '24',
    name: 'Aranjament pe Placă de Lemn',
    slug: 'aranjament-placa-lemn',
    category: 'aranjamente',
    price: 289,
    description: 'Compoziție orizontală pe suport de lemn natural.',
    longDescription:
      'Aranjament floral pe placă de lemn — stil „table runner” floral. Ideal pentru mese lungi de eveniment.',
    image: img('photo-1501004318641-b39e6451bec6'),
  },
  {
    id: '25',
    name: 'Aranjament în Ulcior Vintage',
    slug: 'aranjament-ulcior-vintage',
    category: 'aranjamente',
    price: 219,
    description: 'Flori de câmp într-un ulcior ceramic vintage.',
    longDescription:
      'Ulcior ceramic recondiționat, umplut cu flori de câmp. Farmhouse chic pentru bucătării și verandă.',
    image: img('photo-1463936575829-25148e1db1b8'),
  },
  {
    id: '26',
    name: 'Aranjament Orhidee în Vas',
    slug: 'aranjament-orhidee-vas',
    category: 'aranjamente',
    price: 329,
    description: 'Orhidee phalaenopsis în vas de sticlă cu mușchi.',
    longDescription:
      'Două-trei tije de orhidee în vas transparent cu mușchi și pietricele. Cadou premium, de lungă durată.',
    image: img('photo-1578662996442-48f60103fc96'),
  },
  {
    id: '27',
    name: 'Aranjament Advent / Crăciun',
    slug: 'aranjament-advent-craciun',
    category: 'aranjamente',
    price: 199,
    description: 'Coroniță și aranjament de Advent cu lumânări.',
    longDescription:
      'Aranjament de sezon cu brad, conuri, fructe uscate și lumânări. Disponibil în noiembrie–decembrie.',
    image: img('photo-1512389142860-9c449e58a543'),
    seasonal: true,
  },
  {
    id: '28',
    name: 'Monstera Deliciosa',
    slug: 'monstera-deliciosa',
    category: 'plante',
    price: 179,
    description: 'Monstera în ghiveci — statement plant pentru living.',
    longDescription:
      'Monstera deliciosa sănătoasă, în ghiveci de 20–24 cm. Preferă lumină indirectă. Include ghiveci ceramic opțional (+49 RON).',
    image: img('photo-1497250681960-ef046c08a56e'),
    featured: true,
  },
  {
    id: '29',
    name: 'Ficus Lyrata (Fiddle Leaf)',
    slug: 'ficus-lyrata',
    category: 'plante',
    price: 249,
    description: 'Ficus cu frunze mari, sculpturale.',
    longDescription:
      'Ficus lyrata de interior, înălțime ~80–100 cm. Necesită lumină bună și udare moderată. Starul plantelor de design.',
    image: img('photo-1446071103084-c257b5f70672'),
  },
  {
    id: '30',
    name: 'Calathea Orbifolia',
    slug: 'calathea-orbifolia',
    category: 'plante',
    price: 149,
    description: 'Frunze dungate, elegante — iubește umiditatea.',
    longDescription:
      'Calathea orbifolia cu frunze rotunde, dungate argintiu-verde. Ideală pentru băi luminate sau colțuri cu umiditate.',
    image: img('photo-1416879595882-3373a0480b5b'),
  },
  {
    id: '31',
    name: 'Pothos Golden',
    slug: 'pothos-golden',
    category: 'plante',
    price: 69,
    description: 'Pothos ușor de îngrijit, perfect pentru începători.',
    longDescription:
      'Epipremnum aureum — plantă cățărătoare, toleră lumină slabă. Ideală pe rafturi sau în ghivece suspendate.',
    image: img('photo-1485955900006-10f4d324d411'),
  },
  {
    id: '32',
    name: 'Sansevieria (Limba Soacrei)',
    slug: 'sansevieria',
    category: 'plante',
    price: 89,
    description: 'Rezistentă, purifică aerul, aproape indestructibilă.',
    longDescription:
      'Sansevieria trifasciata în ghiveci. Udare rară, lumină variabilă. Perfectă pentru birou sau dormitor.',
    image: img('photo-1497250681960-ef046c08a56e'),
  },
  {
    id: '33',
    name: 'Orhidee Phalaenopsis în Ghiveci',
    slug: 'orhidee-phalaenopsis-ghiveci',
    category: 'plante',
    price: 159,
    description: 'Orhidee înflorită, gata de așezat pe masă.',
    longDescription:
      'Phalaenopsis cu 1–2 tije înflorite, în ghiveci transparent. Include instrucțiuni de îngrijire în română.',
    image: img('photo-1578662996442-48f60103fc96'),
    featured: true,
  },
  {
    id: '34',
    name: 'Lavandă în Ghiveci',
    slug: 'lavanda-ghiveci',
    category: 'plante',
    price: 59,
    description: 'Lavandă aromatică pentru terasă sau pervaz.',
    longDescription:
      'Lavandă în ghiveci, potrivită pentru exterior însorit sau balcon. Parfum relaxant, flori violet.',
    image: img('photo-1463936575829-25148e1db1b8'),
    seasonal: true,
  },
  {
    id: '35',
    name: 'Suculentă Echeveria',
    slug: 'suculenta-echeveria',
    category: 'plante',
    price: 45,
    description: 'Rozetă de suculentă în ghiveci mic.',
    longDescription:
      'Echeveria compactă, ideală pentru birou. Necesită lumină și udare rară. Cadou mic, drăguț.',
    image: img('photo-1459411552884-841db9b3cc2a'),
  },
  {
    id: '36',
    name: 'Palmier Areca',
    slug: 'palmier-areca',
    category: 'plante',
    price: 199,
    description: 'Palmier de interior, aer tropical acasă.',
    longDescription:
      'Dypsis lutescens (areca) — palmier dens, verde deschis. Preferă lumină indirectă și udare regulată.',
    image: img('photo-1416879595882-3373a0480b5b'),
  },
  {
    id: '37',
    name: 'Zamioculcas ZZ Plant',
    slug: 'zamioculcas-zz',
    category: 'plante',
    price: 119,
    description: 'Plantă glossată, toleră neglijarea.',
    longDescription:
      'Zamioculcas zamiifolia — frunze lucioase, creștere lentă. Perfectă dacă uiți să uzi plantele.',
    image: img('photo-1485955900006-10f4d324d411'),
  },
  {
    id: '38',
    name: 'Trandafiri pentru Valentine\'s',
    slug: 'trandafiri-valentine',
    category: 'ocazii',
    price: 299,
    description: 'Douăzeci și patru de trandafiri roșii pentru Ziua Îndrăgostiților.',
    longDescription:
      'Buchet special Valentine\'s: 24 trandafiri roșii premium, ambalaj romantic și bilet personalizat inclus. Comandă din timp în februarie.',
    image: img('photo-1591886960571-74d43a9d4166'),
    occasion: 'Valentine\'s Day',
    featured: true,
  },
  {
    id: '39',
    name: 'Buchet de 8 Martie',
    slug: 'buchet-8-martie',
    category: 'ocazii',
    price: 179,
    description: 'Mix de primăvară dedicat Zilei Femeii.',
    longDescription:
      'Buchet special 8 Martie: lalele, frezii și mimoză (în sezon). Ambalaj festiv și card cu mesaj.',
    image: img('photo-1582794543139-8ac9cb0f7b11'),
    occasion: '8 Martie',
    seasonal: true,
    featured: true,
  },
  {
    id: '40',
    name: 'Buchet de Nuntă Classic',
    slug: 'buchet-nunta-classic',
    category: 'ocazii',
    price: 449,
    description: 'Buchet de mireasă cu trandafiri albi și eucalipt.',
    longDescription:
      'Buchet de mireasă clasic: trandafiri albi, lisianthus, eucalipt și panglică de mătase. Consultanță cromatică inclusă.',
    image: img('photo-1519225421980-715cb0215aed'),
    occasion: 'Nuntă',
  },
  {
    id: '41',
    name: 'Aranjament Funerar Respect',
    slug: 'aranjament-funerar',
    category: 'ocazii',
    price: 279,
    description: 'Coroană / aranjament sobru pentru condoleanțe.',
    longDescription:
      'Aranjament funerar sobru, cu flori albe și verdeață. Livrare rapidă, panglică cu mesaj. Contactați-ne telefonic pentru urgențe.',
    image: img('photo-1519378058457-4c29a0a2efac'),
    occasion: 'Condoleanțe',
  },
  {
    id: '42',
    name: 'Buchet Absolvire',
    slug: 'buchet-absolvire',
    category: 'ocazii',
    price: 159,
    description: 'Buchet festiv pentru absolvire și examene.',
    longDescription:
      'Mix colorat și energic pentru absolvire: gerbera, trandafiri și verdeață. Poate include o panglică cu numele absolventului.',
    image: img('photo-1468327768560-75b778cbb551'),
    occasion: 'Absolvire',
  },
  {
    id: '43',
    name: 'Cadou Aniversare Cuplu',
    slug: 'cadou-aniversare-cuplu',
    category: 'ocazii',
    price: 329,
    description: 'Cutie cu flori și mini-șampanie (simulat în demo).',
    longDescription:
      'Pachet aniversar: cutie cu flori premium + mesaj personalizat. În magazinul real, opțional cu mini-prosecco.',
    image: img('photo-1526047932273-341f2a7631f9'),
    occasion: 'Aniversare',
  },
  {
    id: '44',
    name: 'Buchet Botez Pastel',
    slug: 'buchet-botez-pastel',
    category: 'ocazii',
    price: 199,
    description: 'Pasteluri delicate pentru botez.',
    longDescription:
      'Buchet / aranjament în tonuri pastel (alb, bleu, roz pudrat) pentru botez. Potrivit și ca decor de masă.',
    image: img('photo-1546842931-886c185b4c8c'),
    occasion: 'Botez',
  },
  {
    id: '45',
    name: 'Buchet Mulțumesc',
    slug: 'buchet-multumesc',
    category: 'ocazii',
    price: 129,
    description: 'Un gest simplu de mulțumire, cu flori calde.',
    longDescription:
      'Buchet accesibil, cald, pentru a spune „mulțumesc”. Mix de sezon, ambalaj simplu, elegant.',
    image: img('photo-1490750967868-88aa4486c946'),
    occasion: 'Mulțumire',
  },
  {
    id: '46',
    name: 'Aranjament Corporate Welcome',
    slug: 'aranjament-corporate',
    category: 'ocazii',
    price: 389,
    description: 'Aranjament de recepție pentru birouri și evenimente.',
    longDescription:
      'Compoziție de impact pentru recepții corporate, showroom-uri și conferințe. Factură pe firmă disponibilă în magazinul real.',
    image: img('photo-1533616688419-b7a585564566'),
    occasion: 'Corporate',
  },
  {
    id: '47',
    name: 'Buchet Dragobete',
    slug: 'buchet-dragobete',
    category: 'ocazii',
    price: 169,
    description: 'Sărbătorește Dragobetele cu flori românești.',
    longDescription:
      'Buchet inspirat de tradiția Dragobete: flori de sezon, accente roșii și mesaj pe card. Disponibil în februarie.',
    image: img('photo-1518895949257-7621c3c786d7'),
    occasion: 'Dragobete',
    seasonal: true,
  },
  {
    id: '48',
    name: 'Coroniță de Paște',
    slug: 'coronita-paste',
    category: 'ocazii',
    price: 149,
    description: 'Coroniță de ușă cu flori de primăvară.',
    longDescription:
      'Coroniță pentru ușă, cu flori de primăvară și ouă decorative (opțional). Disponibilă înainte de Paște.',
    image: img('photo-1582794543139-8ac9cb0f7b11'),
    occasion: 'Paște',
    seasonal: true,
  },
  {
    id: '49',
    name: 'Buchet Zi de Naștere Surprise',
    slug: 'buchet-zi-nastere',
    category: 'ocazii',
    price: 189,
    description: 'Surpriză colorată pentru ziua de naștere.',
    longDescription:
      'Mix festiv, colorat, cu balon mic opțional. Spune-ne culoarea preferată a sărbătoritului și adaptăm buchetul.',
    image: img('photo-1558618666-fcd25c85cd64'),
    occasion: 'Zi de naștere',
    featured: true,
  },
  {
    id: '50',
    name: 'Pachet Casa Nouă',
    slug: 'pachet-casa-noua',
    category: 'ocazii',
    price: 359,
    description: 'Plantă + aranjament pentru inaugurarea casei.',
    longDescription:
      'Combo: plantă de interior ușor de îngrijit + aranjament floral mic. Mesaj „Felicitări pentru casa nouă!” inclus.',
    image: img('photo-1446071103084-c257b5f70672'),
    occasion: 'Casa nouă',
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getFeatured() {
  return products.filter((p) => p.featured)
}

export function getSeasonal() {
  return products.filter((p) => p.seasonal)
}

export function formatPrice(ron: number) {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    minimumFractionDigits: 0,
  }).format(ron)
}

import {
  TravelStyle,
  Destination,
  Activity,
  Accommodation,
  Restaurant,
} from '../types';

export const travelStyles: TravelStyle[] = [
  {
    id: 'curator',
    nameEn: 'Bespoke Travel / The Curator',
    nameDe: 'Massgeschneiderte Reisen / The Curator',
    descriptionEn:
      'A fully individual Pur Life Maroc path, shaped around private guidance, hand-picked stays, and refined local moments.',
    descriptionDe:
      'Ein individueller Pur Life Maroc Weg mit privater Begleitung, kuratierten Unterkuenften und besonderen lokalen Momenten.',
    icon: '*',
    color: '#DB7F32',
  },
  {
    id: 'culturist',
    nameEn: 'Moroccan Tours / The Culturist',
    nameDe: 'Marokko Rundreisen / The Culturist',
    descriptionEn:
      'A culture-led way into imperial cities, medinas, craft, language basics, and the stories behind Morocco.',
    descriptionDe:
      'Ein kulturorientierter Zugang zu Koenigsstaedten, Medinas, Handwerk, Sprachbasics und Marokkos Geschichten.',
    icon: 'C',
    color: '#DB7F32',
  },
  {
    id: 'urbanite',
    nameEn: 'City Breaks / The Urbanite',
    nameDe: 'City Breaks / The Urbanite',
    descriptionEn:
      'Polished city stays, design hotels, restaurants, galleries, and concierge-backed urban discovery.',
    descriptionDe:
      'Stilvolle City-Stays, Designhotels, Restaurants, Galerien und urbane Entdeckung mit Concierge-Kontext.',
    icon: 'U',
    color: '#000000',
  },
  {
    id: 'nomad',
    nameEn: 'Adventurers / The Nomad',
    nameDe: 'Abenteurer / The Nomad',
    descriptionEn:
      'Open landscapes, Atlantic movement, Atlas routes, riding, surf, golf, and softer adventure days.',
    descriptionDe:
      'Offene Landschaften, Atlantik-Bewegung, Atlas-Routen, Reiten, Surf, Golf und sanfte Abenteuer.',
    icon: 'N',
    color: '#DB7F32',
  },
];

export const destinations: Destination[] = [
  {
    id: 'essaouira',
    nameEn: 'Essaouira',
    nameDe: 'Essaouira',
    descriptionEn:
      'Pur Life Maroc is strongly rooted in Essaouira: a UNESCO medina, Atlantic light, artisan life, dining, riding, surf, and refined boutique stays.',
    descriptionDe:
      'Pur Life Maroc ist stark in Essaouira verwurzelt: UNESCO-Medina, Atlantiklicht, Handwerk, Dining, Reiten, Surf und kuratierte Boutique-Stays.',
    image: 'essaouira',
    highlights: ['UNESCO medina', 'Atlantic coast', 'Argan cooperative', 'Golf Mogador', 'Villa Maroc'],
    bestSeason: 'April-October',
  },
  {
    id: 'agadir',
    nameEn: 'Agadir',
    nameDe: 'Agadir',
    descriptionEn:
      'A sunny southern Atlantic base for beach rhythm, surf, Jack Sparrow Boat, Tikida Golf Palace, and softer family-friendly experiences.',
    descriptionDe:
      'Eine sonnige Basis am suedlichen Atlantik fuer Beach-Rhythmus, Surf, Jack Sparrow Boat, Tikida Golf Palace und leichte Familienerlebnisse.',
    image: 'agadir',
    highlights: ['Atlantic beach', 'Tikida Golf Palace', 'Jack Sparrow Boat', 'Surf schools', 'Coastal day trips'],
    bestSeason: 'October-April',
  },
  {
    id: 'marrakesh',
    nameEn: 'Marrakesh',
    nameDe: 'Marrakesch',
    descriptionEn:
      'A key PLM city for gardens, museums, medina layers, Palais Ronsard, Al Fassia, hammam rituals, and private city guidance.',
    descriptionDe:
      'Eine zentrale PLM-Stadt fuer Gaerten, Museen, Medina-Schichten, Palais Ronsard, Al Fassia, Hammam-Rituale und private City-Guidance.',
    image: 'marrakesh',
    highlights: ['Medina', 'Jardin Majorelle', 'Palais Ronsard', 'Al Fassia', 'Hammam'],
    bestSeason: 'September-May',
  },
  {
    id: 'fez',
    nameEn: 'Fez',
    nameDe: 'Fes',
    descriptionEn:
      'The heritage heart of Morocco in the app catalog, with riads, medina depth, craft, and elegant culinary references.',
    descriptionDe:
      'Das Heritage-Herz im App-Katalog mit Riads, Medina-Tiefe, Handwerk und eleganten kulinarischen Referenzen.',
    image: 'fez',
    highlights: ['Medina', 'Riad Fes', 'Riad Myra', 'Restaurant Gayza', 'Craft heritage'],
    bestSeason: 'September-May',
  },
  {
    id: 'chefchaouen',
    nameEn: 'Chefchaouen',
    nameDe: 'Chefchaouen',
    descriptionEn:
      'The blue Rif city, presented as a calm mountain-framed destination with Riad Hicham and a slower visual rhythm.',
    descriptionDe:
      'Die blaue Stadt im Rif, als ruhiges Ziel mit Bergkulisse, Riad Hicham und visuellem Slow-Travel-Rhythmus.',
    image: 'chefchaouen',
    highlights: ['Blue medina', 'Rif Mountains', 'Riad Hicham', 'Photo walks', 'Soft culture'],
    bestSeason: 'April-October',
  },
  {
    id: 'casablanca',
    nameEn: 'Casablanca',
    nameDe: 'Casablanca',
    descriptionEn:
      'A modern metropolitan stop with Art Deco atmosphere, Le Doge, Restaurant Le Doge, and elegant arrival or departure nights.',
    descriptionDe:
      'Ein moderner Metropolenstopp mit Art-Deco-Stimmung, Le Doge, Restaurant Le Doge und eleganten Ankunfts- oder Abreisen.',
    image: 'casablanca',
    highlights: ['Hassan II Mosque', 'Art Deco', 'Le Doge', 'Restaurant Le Doge', 'Urban stopover'],
    bestSeason: 'September-May',
  },
  {
    id: 'ouarzazate',
    nameEn: 'Ouarzazate',
    nameDe: 'Ouarzazate',
    descriptionEn:
      'The southern gateway for kasbah atmosphere, desert-facing design, Le Berbere Palace, Dar Ahlam, and cinematic landscapes.',
    descriptionDe:
      'Das Tor zum Sueden fuer Kasbah-Stimmung, wuestennahe Gestaltung, Le Berbere Palace, Dar Ahlam und filmische Landschaften.',
    image: 'ouarzazate',
    highlights: ['Kasbahs', 'Atlas Studios', 'Le Berbere Palace', 'Dar Ahlam', 'Desert routes'],
    bestSeason: 'October-April',
  },
  {
    id: 'rabat',
    nameEn: 'Rabat',
    nameDe: 'Rabat',
    descriptionEn:
      'A composed capital stop with cultural institutions, Atlantic calm, Story Rabat, and an elegant contrast to busier cities.',
    descriptionDe:
      'Ein ruhiger Hauptstadtstopp mit Kulturinstitutionen, Atlantikruhe, Story Rabat und elegantem Kontrast zu lebhaften Staedten.',
    image: 'rabat',
    highlights: ['Capital mood', 'Kasbah des Oudaias', 'Story Rabat', 'Museums', 'Atlantic calm'],
    bestSeason: 'April-October',
  },
  {
    id: 'tangier',
    nameEn: 'Tangier',
    nameDe: 'Tanger',
    descriptionEn:
      'Northern Morocco with Mediterranean views, literary atmosphere, Dar Chams Tanja, and an easy bridge between Europe and Africa.',
    descriptionDe:
      'Nordmarokko mit Mittelmeerblick, literarischer Stimmung, Dar Chams Tanja und einer Bruecke zwischen Europa und Afrika.',
    image: 'tangier',
    highlights: ['Mediterranean gateway', 'Dar Chams Tanja', 'Medina', 'Kasbah', 'Sea views'],
    bestSeason: 'April-October',
  },
];

export const activities: Activity[] = [
  {
    id: 'argan-oil',
    nameEn: 'Marjana Argan Cooperative',
    nameDe: 'Marjana Argan Kooperative',
    descriptionEn:
      'A PLM website experience focused on argan oil, cooperative work, local craft, and meaningful cultural context near Essaouira.',
    descriptionDe:
      'Ein PLM-Web-Erlebnis zu Arganoel, Kooperativenarbeit, lokalem Handwerk und kulturellem Kontext bei Essaouira.',
    destination: 'essaouira',
    category: 'Culture',
    image: 'argan-oil',
    duration: 'Half-day guidance',
    serviceNote: 'Concierge can connect the visit with Essaouira craft and dining stops.',
  },
  {
    id: 'atlas-mountains',
    nameEn: 'Atlas Mountains / Roches Armed',
    nameDe: 'Atlas Mountains / Roches Armed',
    descriptionEn:
      'A mountain experience from the relaunch plan, suited to guests who want Berber villages, terrain, and private guide context.',
    descriptionDe:
      'Ein Berg-Erlebnis aus dem Relaunch-Plan fuer Gaeste, die Berberdoerfer, Landschaft und private Guidance suchen.',
    destination: 'marrakesh',
    category: 'Nature',
    image: 'atlas-trek',
    duration: 'Day route or longer',
    serviceNote: 'Works well with private chauffeur support and a concierge-led route.',
  },
  {
    id: 'winery',
    nameEn: "Val d'Argan Winery",
    nameDe: "Weingut Val d'Argan",
    descriptionEn:
      'A signature Essaouira-side culinary experience from the website plan, combining landscape, tasting, and relaxed dining.',
    descriptionDe:
      'Ein Essaouira-nahes Kulinarik-Erlebnis aus dem Website-Plan mit Landschaft, Degustation und entspanntem Dining.',
    destination: 'essaouira',
    category: 'Dining',
    image: 'winery-val',
    duration: 'Half-day guidance',
    serviceNote: 'Positioned as a curated taste-of-place stop, not a booking widget.',
  },
  {
    id: 'surfing',
    nameEn: "Surfin' in Atlantic - Atlanticzin",
    nameDe: "Surfin' in Atlantic - Atlanticzin",
    descriptionEn:
      'A water-sports idea from the navigation sheet for Essaouira, covering surf, kite surf, and bike-tour style Atlantic movement.',
    descriptionDe:
      'Eine Wasser- und Bewegungs-Idee aus der Navigation fuer Essaouira: Surf, Kite Surf und Bike-Touren am Atlantik.',
    destination: 'essaouira',
    category: 'Atlantic',
    image: 'surfing-lesson',
    duration: 'Flexible activity slot',
    serviceNote: 'Best handled through local partner guidance and weather-aware timing.',
  },
  {
    id: 'boat-tour',
    nameEn: 'Jack Sparrow Boat Agadir',
    nameDe: 'Jack Sparrow Boat Agadir',
    descriptionEn:
      'A light coastal Agadir experience from the website plan, useful for families and guests wanting sea air without a heavy schedule.',
    descriptionDe:
      'Ein leichtes Agadir-Kuestenerlebnis aus dem Website-Plan fuer Familien und Gaeste, die Meeresluft ohne dichtes Programm suchen.',
    destination: 'agadir',
    category: 'Coast',
    image: 'boat-tour',
    duration: 'Short coastal outing',
    serviceNote: 'Concierge can advise fit, timing, and pairing with beach time.',
  },
  {
    id: 'golf',
    nameEn: 'Golf Mogador Essaouira',
    nameDe: 'Golf Mogador Essaouira',
    descriptionEn:
      'A named PLM activity for Essaouira, pairing Atlantic scenery with golf, resort comfort, and polished local coordination.',
    descriptionDe:
      'Eine benannte PLM-Aktivitaet fuer Essaouira mit Atlantikszenerie, Golf, Resort-Komfort und lokaler Koordination.',
    destination: 'essaouira',
    category: 'Sport',
    image: 'golf-mogador',
    duration: 'Half-day or full-day',
    serviceNote: 'Useful as a premium leisure day within an Atlantic route.',
  },
  {
    id: 'beach-horseback',
    nameEn: 'Horse Riding on the Beach',
    nameDe: 'Pferd am Strand',
    descriptionEn:
      'A beach riding idea from the relaunch navigation, aligned with Essaouira and Atlantic slow-travel experiences.',
    descriptionDe:
      'Eine Reit-Idee aus der Relaunch-Navigation, passend zu Essaouira und ruhigen Atlantik-Erlebnissen.',
    destination: 'essaouira',
    category: 'Atlantic',
    image: 'beach-horseback',
    duration: 'Flexible activity slot',
    serviceNote: 'A concierge can shape this around comfort level and coastal conditions.',
  },
  {
    id: 'hammam',
    nameEn: 'Traditional Hammam',
    nameDe: 'Traditioneller Hammam',
    descriptionEn:
      'A wellness page in the relaunch plan, kept as an information-first ritual rather than a transactional spa checkout.',
    descriptionDe:
      'Eine Wellness-Seite aus dem Relaunch-Plan, als informativer Ritual-Kontext statt Spa-Checkout.',
    destination: 'marrakesh',
    category: 'Wellbeing',
    image: 'hammam',
    duration: 'Wellbeing slot',
    serviceNote: 'Best presented as local advice and concierge coordination.',
  },
];

export const accommodations: Accommodation[] = [
  {
    id: 'heure-bleue-palais',
    nameEn: 'Heure Bleue Palais Essaouira',
    nameDe: 'Heure Bleue Palais Essaouira',
    descriptionEn:
      'A Relais & Chateaux palace in Essaouira from the new Pur Life Living plan, rooted in medina atmosphere and rooftop views.',
    descriptionDe:
      'Ein Relais & Chateaux Palais in Essaouira aus dem neuen Pur Life Living Plan mit Medina-Stimmung und Dachterrassenblick.',
    destination: 'essaouira',
    category: 'luxury',
    image: 'villa-maroc',
    amenities: ['Medina location', 'Rooftop', 'Spa', 'Restaurant', 'Riad atmosphere'],
    stayStyle: 'Luxury Living',
  },
  {
    id: 'villa-maroc',
    nameEn: 'Villa Maroc Essaouira',
    nameDe: 'Villa Maroc Essaouira',
    descriptionEn:
      'Four interconnected traditional riads near Essaouira beach, harbour, and souk; a long-standing PLM-style boutique reference.',
    descriptionDe:
      'Vier verbundene traditionelle Riads nahe Strand, Hafen und Souk in Essaouira; eine klassische PLM-Boutique-Referenz.',
    destination: 'essaouira',
    category: 'traditional',
    image: 'villa-maroc',
    amenities: ['Historic riads', 'Rooftop terrace', 'Restaurant', 'Medina', 'Personal service'],
    stayStyle: 'Experience Living',
  },
  {
    id: 'villa-jardin-maroc',
    nameEn: 'Les Jardins de Villa Maroc',
    nameDe: 'Les Jardins de Villa Maroc',
    descriptionEn:
      'A countryside sister property near Essaouira, shaped as a small estate with gardens, pool, hammam, and slower rhythm.',
    descriptionDe:
      'Ein Landhaus bei Essaouira mit Gärten, Pool, Hammam und ruhigerem Rhythmus.',
    destination: 'essaouira',
    category: 'boutique',
    image: 'villa-jardins',
    amenities: ['Gardens', 'Pool', 'Hammam', 'Restaurant', 'Countryside setting'],
    stayStyle: 'Experience Living',
  },
  {
    id: 'tikida-golf-palace',
    nameEn: 'Tikida Golf Palace Agadir',
    nameDe: 'Tikida Golf Palace Agadir',
    descriptionEn:
      'A golf-linked palace stay in Agadir from the new website list, useful for guests combining coast and leisure.',
    descriptionDe:
      'Ein golfnaher Palace-Stay in Agadir aus der neuen Website-Liste, passend fuer Kueste und Leisure.',
    destination: 'agadir',
    category: 'luxury',
    image: 'barcelo-tangier',
    amenities: ['Golf setting', 'Pool', 'Spa', 'Restaurant', 'Quiet resort mood'],
    stayStyle: 'Luxury Living',
  },
  {
    id: 'palais-ronsard',
    nameEn: 'Palais Ronsard Marrakesh',
    nameDe: 'Palais Ronsard Marrakesch',
    descriptionEn:
      'A refined Marrakesh palace from the Pur Life Living plan, associated with gardens, designer rooms, and calm outside the city rush.',
    descriptionDe:
      'Ein eleganter Marrakesch-Palast aus dem Pur Life Living Plan mit Gaerten, Designerzimmern und Ruhe.',
    destination: 'marrakesh',
    category: 'luxury',
    image: 'palais-ronsard',
    amenities: ['Gardens', 'Spa', 'Restaurant', 'Pool', 'Designer rooms'],
    stayStyle: 'Luxury Living',
  },
  {
    id: 'al-fassia',
    nameEn: 'Al Fassia Marrakesh',
    nameDe: 'Al Fassia Marrakesch',
    descriptionEn:
      'A women-led Marrakesh address in the workbook, connecting accommodation, Moroccan cuisine, warmth, and authenticity.',
    descriptionDe:
      'Eine frauenpraegte Marrakesch-Adresse aus der Workbook-Liste mit Unterkunft, marokkanischer Kueche, Waerme und Authentizitaet.',
    destination: 'marrakesh',
    category: 'boutique',
    image: 'palais-ronsard',
    amenities: ['Restaurant', 'Terrace', 'Palms', 'Moroccan cuisine', 'Boutique scale'],
    stayStyle: 'Experience Living',
  },
  {
    id: 'riad-fes',
    nameEn: 'Riad Fes',
    nameDe: 'Riad Fes',
    descriptionEn:
      'A Fes riad reference from the relaunch list, suited to guests seeking medina depth, rooftop views, and refined heritage.',
    descriptionDe:
      'Eine Fes-Riad-Referenz aus der Relaunch-Liste fuer Medina-Tiefe, Dachterrassenblicke und Heritage.',
    destination: 'fez',
    category: 'luxury',
    image: 'riad-fes',
    amenities: ['Medina', 'Rooftop', 'Courtyard', 'Restaurant', 'Heritage interiors'],
    stayStyle: 'Luxury Living',
  },
  {
    id: 'riad-myra',
    nameEn: 'Riad Myra Fes',
    nameDe: 'Riad Myra Fes',
    descriptionEn:
      'A Fes riad in the new website plan, close to old-town atmosphere and positioned for authentic hospitality.',
    descriptionDe:
      'Ein Fes-Riad aus dem neuen Website-Plan, nahe Altstadt-Atmosphaere und authentischer Gastfreundschaft.',
    destination: 'fez',
    category: 'traditional',
    image: 'riad-fes',
    amenities: ['Medina access', 'Courtyard', 'Traditional decor', 'Dining', 'Riad atmosphere'],
    stayStyle: 'Experience Living',
  },
  {
    id: 'riad-hicham',
    nameEn: 'Riad Hicham Chefchaouen',
    nameDe: 'Riad Hicham Chefchaouen',
    descriptionEn:
      'A Chefchaouen stay from the workbook, steps from the blue city rhythm and suited to a calm northern route.',
    descriptionDe:
      'Ein Chefchaouen-Stay aus dem Workbook, nahe am Rhythmus der blauen Stadt und passend fuer eine ruhige Nordroute.',
    destination: 'chefchaouen',
    category: 'traditional',
    image: 'barcelo-tangier',
    amenities: ['Blue city access', 'Riad setting', 'Restaurant', 'Family feel', 'Mountain context'],
    stayStyle: 'Experience Living',
  },
  {
    id: 'le-doge',
    nameEn: 'Hotel & Spa Le Doge Casablanca',
    nameDe: 'Hotel & Spa Le Doge Casablanca',
    descriptionEn:
      'A Casablanca address from the relaunch list, framed by Art Deco mood, spa comfort, and metropolitan polish.',
    descriptionDe:
      'Eine Casablanca-Adresse aus der Relaunch-Liste mit Art-Deco-Stimmung, Spa-Komfort und urbaner Eleganz.',
    destination: 'casablanca',
    category: 'luxury',
    image: 'le-doge',
    amenities: ['Art Deco', 'Spa', 'Restaurant', 'Urban location', 'Boutique scale'],
    stayStyle: 'Luxury Living',
  },
  {
    id: 'dar-chams-tanja',
    nameEn: 'Dar Chams Tanja Tangier',
    nameDe: 'Dar Chams Tanja Tanger',
    descriptionEn:
      'A Tangier boutique reference from the website workbook, positioned around medina access and Mediterranean views.',
    descriptionDe:
      'Eine Tanger-Boutique-Referenz aus dem Website-Workbook mit Medina-Nahe und Mittelmeerblick.',
    destination: 'tangier',
    category: 'boutique',
    image: 'barcelo-tangier',
    amenities: ['Medina', 'Sea views', 'Terrace', 'Boutique house', 'Northern route fit'],
    stayStyle: 'Experience Living',
  },
  {
    id: 'le-berbere-palace',
    nameEn: 'Le Berbere Palace Ouarzazate',
    nameDe: 'Le Berbere Palace Ouarzazate',
    descriptionEn:
      'A southern Morocco palace reference from the workbook, close to kasbahs, Atlas Studios, and desert-facing routes.',
    descriptionDe:
      'Eine Suedmarokko-Palace-Referenz aus dem Workbook, nahe Kasbahs, Atlas Studios und wuestennahen Routen.',
    destination: 'ouarzazate',
    category: 'luxury',
    image: 'le-berbere',
    amenities: ['Kasbah style', 'Pool', 'Spa', 'Restaurants', 'Southern route base'],
    stayStyle: 'Luxury Living',
  },
  {
    id: 'dar-ahlam',
    nameEn: 'Dar Ahlam',
    nameDe: 'Dar Ahlam',
    descriptionEn:
      'An exclusive Skoura kasbah stay from the workbook, centered on palm groves, desert atmosphere, and tailor-made experiences.',
    descriptionDe:
      'Ein exklusiver Skoura-Kasbah-Stay aus dem Workbook mit Palmenhain, Wuestenstimmung und massgeschneiderten Erlebnissen.',
    destination: 'ouarzazate',
    category: 'luxury',
    image: 'dar-ahlam',
    amenities: ['Kasbah', 'Palm grove', 'Dining', 'Wellness', 'Tailor-made activities'],
    stayStyle: 'Luxury Living',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: 'cafe-caravane',
    nameEn: 'Cafe Caravane',
    nameDe: 'Cafe Caravane',
    descriptionEn:
      'An Essaouira dining address from the Pur Life Living workbook, useful as a relaxed medina food reference.',
    descriptionDe:
      'Eine Essaouira-Dining-Adresse aus dem Pur Life Living Workbook und eine entspannte Medina-Referenz.',
    destination: 'essaouira',
    cuisine: 'Moroccan and international',
    image: 'umia',
    specialties: ['Medina atmosphere', 'Casual dining', 'Essaouira evening'],
    atmosphere: 'Relaxed medina dining',
  },
  {
    id: 'le-love-caravane',
    nameEn: 'Le Love by Caravane',
    nameDe: 'Le Love by Caravane',
    descriptionEn:
      'A WIP Essaouira restaurant entry in the website navigation, kept as an information-first dining idea.',
    descriptionDe:
      'Ein WIP-Restaurant aus der Website-Navigation fuer Essaouira, als informationsorientierte Dining-Idee.',
    destination: 'essaouira',
    cuisine: 'Creative dining',
    image: 'umia',
    specialties: ['Creative mood', 'Essaouira', 'Caravane family'],
    atmosphere: 'Creative and intimate',
  },
  {
    id: 'restaurant-le-doge',
    nameEn: 'Restaurant Le Doge',
    nameDe: 'Restaurant Le Doge',
    descriptionEn:
      'A Casablanca dining reference connected to Hotel & Spa Le Doge and the Art Deco side of the PLM catalog.',
    descriptionDe:
      'Eine Casablanca-Dining-Referenz mit Hotel & Spa Le Doge und der Art-Deco-Seite des PLM-Katalogs.',
    destination: 'casablanca',
    cuisine: 'Refined hotel dining',
    image: 'kasbah-lamrani',
    specialties: ['Art Deco setting', 'Hotel dining', 'Casablanca stop'],
    atmosphere: 'Elegant metropolitan',
  },
  {
    id: 'malak-emeraude',
    nameEn: 'Malak Emeraude',
    nameDe: 'Malak Emeraude',
    descriptionEn:
      'A Marrakesh dining address from the workbook, suited to guests looking for a polished city food moment.',
    descriptionDe:
      'Eine Marrakesch-Dining-Adresse aus dem Workbook fuer Gaeste, die einen gepflegten City-Food-Moment suchen.',
    destination: 'marrakesh',
    cuisine: 'Moroccan dining',
    image: 'dar-cheikh',
    specialties: ['Marrakesh evening', 'Moroccan flavors', 'City atmosphere'],
    atmosphere: 'Polished city dining',
  },
  {
    id: 'restaurant-al-fassia',
    nameEn: 'Restaurant Al Fassia',
    nameDe: 'Restaurant Al Fassia',
    descriptionEn:
      'A women-led Marrakesh restaurant reference from the relaunch list, known in the PLM plan for warmth and Moroccan cuisine.',
    descriptionDe:
      'Eine frauenpraegte Marrakesch-Restaurantreferenz aus der Relaunch-Liste, mit Waerme und marokkanischer Kueche.',
    destination: 'marrakesh',
    cuisine: 'Moroccan cuisine',
    image: 'dar-cheikh',
    specialties: ['Women-led', 'Moroccan classics', 'Warm service'],
    atmosphere: 'Authentic and welcoming',
  },
  {
    id: 'restaurant-gayza',
    nameEn: 'Restaurant Gayza at Riad Fes',
    nameDe: 'Restaurant Gayza im Riad Fes',
    descriptionEn:
      'A Fez dining entry from the new website navigation, connected to Riad Fes and medina heritage.',
    descriptionDe:
      'Ein Fes-Dining-Eintrag aus der neuen Website-Navigation, verbunden mit Riad Fes und Medina-Heritage.',
    destination: 'fez',
    cuisine: 'Refined Moroccan',
    image: 'chez-said',
    specialties: ['Riad setting', 'Fez heritage', 'Moroccan cuisine'],
    atmosphere: 'Heritage dining',
  },
];

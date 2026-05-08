export type WebsiteSection = {
  id: string;
  titleEn: string;
  titleDe: string;
  summaryEn: string;
  summaryDe: string;
  route?: string;
  items: string[];
  status?: 'forward' | 'wip' | 'open' | 'content';
};

export const websiteSections: WebsiteSection[] = [
  {
    id: 'home',
    titleEn: 'Home',
    titleDe: 'Home',
    summaryEn:
      'The relaunch home focuses on a short brand film, what Pur Life Maroc offers, core pillars, private concierge, experiences, stays, destinations, and contact.',
    summaryDe:
      'Die Relaunch-Home fokussiert Kurzvideo, Angebot, PLM-Saeulen, Private Concierge, Erlebnisse, Unterkuenfte, Destinationen und Kontakt.',
    route: '/(app)/(tabs)',
    items: [
      'Brand film header',
      'What Pur Life Maroc offers',
      'PLM pillars with icons',
      'Private Concierge teaser',
      'Experiences, stays, destinations',
    ],
    status: 'wip',
  },
  {
    id: 'experiences',
    titleEn: 'Erlebnisse',
    titleDe: 'Erlebnisse',
    summaryEn:
      'The workbook lists experiences such as Private Concierge, argan cooperative, Atlas Mountains, Val d Argan winery, Atlantic surf, Jack Sparrow Boat, private chauffeur, golf, beach riding, and hammam.',
    summaryDe:
      'Das Workbook listet Erlebnisse wie Private Concierge, Argan-Kooperative, Atlas Mountains, Val d Argan, Atlantic Surf, Jack Sparrow Boat, Private Chauffeur, Golf, Reiten und Hammam.',
    route: '/(app)/activities-list',
    items: [
      'Private Concierge',
      'Marjana Argan Cooperative',
      'Atlas Mountains / Roches Armed',
      "Val d'Argan Winery",
      "Surfin' in Atlantic - Atlanticzin",
      'Jack Sparrow Boat Agadir',
      'Golf Mogador Essaouira',
      'Horse riding on the beach',
      'Traditional Hammam',
    ],
    status: 'content',
  },
  {
    id: 'living',
    titleEn: 'Pur Life Living',
    titleDe: 'Pur Life Living',
    summaryEn:
      'The new site separates curated hotels into Luxury Living and Experience Living, with named stays and restaurants from the relaunch workbook.',
    summaryDe:
      'Die neue Website trennt kuratierte Hotels in Luxury Living und Experience Living mit benannten Stays und Restaurants aus dem Relaunch-Workbook.',
    route: '/(app)/accommodation-list',
    items: [
      'Luxury Living',
      'Experience Living',
      'Heure Bleue Palais',
      'Tikida Golf Palace',
      'Palais Ronsard',
      'Al Fassia',
      'Riad Fes',
      'Riad Myra',
      'Riad Hicham',
      'Le Doge',
      'Dar Chams Tanja',
    ],
    status: 'forward',
  },
  {
    id: 'morocco',
    titleEn: 'Morocco',
    titleDe: 'Marokko',
    summaryEn:
      'The relaunch Morocco area contains discovery, inspiration and highlights, facts and figures, tips/glossary, language basics, short history, VIP impressions, spices, Ramadan travel, and culinary content.',
    summaryDe:
      'Der Relaunch-Bereich Marokko umfasst Entdecken, Inspirationen und Highlights, Facts and Figures, Tipps/Glossar, Sprachbasics, kurze Geschichte, VIP-Eindruecke, Gewuerze, Ramadan und Kulinarik.',
    route: '/(app)/about-purlife',
    items: [
      'Morocco discovery',
      'Inspirations and highlights',
      'Facts and figures',
      'Tips and glossary',
      'Moroccan language basics',
      'A short story',
      'Culinary Morocco',
      'Spices and Ramadan travel',
    ],
    status: 'forward',
  },
  {
    id: 'destinations',
    titleEn: 'Destinations',
    titleDe: 'Destinationen',
    summaryEn:
      'The navigation keeps the destination set focused on Essaouira, Agadir, Marrakesh, Fez, Chefchaouen, Casablanca, Ouarzazate, Rabat, and Tangier.',
    summaryDe:
      'Die Navigation fokussiert Destinationen auf Essaouira, Agadir, Marrakesch, Fes, Chefchaouen, Casablanca, Ouarzazate, Rabat und Tanger.',
    route: '/(app)/destinations-list',
    items: [
      'Essaouira',
      'Agadir',
      'Marrakesh',
      'Fez',
      'Chefchaouen',
      'Casablanca',
      'Ouarzazate',
      'Rabat',
      'Tangier',
    ],
    status: 'content',
  },
  {
    id: 'contact',
    titleEn: 'Contact',
    titleDe: 'Kontakt',
    summaryEn:
      'The contact area remains simple: team, contact form, privacy/legal pages, imprint, and newsletter. The app turns this into a light concierge email request.',
    summaryDe:
      'Der Kontaktbereich bleibt einfach: Team, Kontaktformular, Datenschutz/DSV, Impressum und Newsletter. Die App macht daraus eine leichte Concierge-E-Mail-Anfrage.',
    route: '/(app)/enquiry',
    items: ['Team', 'Contact form', 'Privacy', 'Imprint', 'Newsletter'],
    status: 'content',
  },
];

export const servicePillars = [
  {
    id: 'concierge',
    titleEn: 'Private Concierge',
    titleDe: 'Private Concierge',
    textEn:
      'Local expert, adviser, interpreter, and networker by the guest side from morning to night.',
    textDe:
      'Lokaler Experte, Berater, Sprachrohr und Netzwerker an der Seite des Gastes.',
  },
  {
    id: 'chauffeur',
    titleEn: 'Private Chauffeur',
    titleDe: 'Private Chauffeur',
    textEn:
      'Flexible city rides and longer routes, with local knowledge and optional concierge pairing.',
    textDe:
      'Flexible Stadtfahrten und laengere Routen mit lokaler Kenntnis und optionaler Concierge-Begleitung.',
  },
  {
    id: 'living',
    titleEn: 'Pur Life Living',
    titleDe: 'Pur Life Living',
    textEn:
      'Luxury Living and Experience Living properties selected for atmosphere, location, and fit.',
    textDe:
      'Luxury Living und Experience Living Unterkuenfte, gewaehlt nach Atmosphaere, Lage und Passung.',
  },
];

export default {
  websiteSections,
  servicePillars,
};

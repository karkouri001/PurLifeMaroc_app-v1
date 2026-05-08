import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  AccommodationDto,
  ActivityDto,
  CompanyProfileDto,
  DestinationDto,
  DriverProfileDto,
  RestaurantDto,
  SignatureItineraryDto,
  TravelStyleDto,
} from '../dto/content.dto';
import { ContentProvider } from './content-provider.interface';

type WordPressRendered = {
  rendered?: string;
};

type WordPressMedia = {
  source_url?: string;
};

type WordPressItem = {
  id: number;
  slug: string;
  link?: string;
  title?: WordPressRendered;
  excerpt?: WordPressRendered;
  content?: WordPressRendered;
  featured_media?: number;
  yoast_head_json?: {
    description?: string;
    og_description?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
  };
};

type DestinationPage = {
  id: string;
  slug: string;
  nameEn: string;
  nameDe: string;
  bestSeason: string;
  highlights: string[];
};

type ActivityPost = {
  id: string;
  slug: string;
  nameEn: string;
  nameDe: string;
  destination: string;
  category: string;
  duration: string;
};

type RoutePost = {
  id: string;
  slug: string;
  nameEn: string;
  nameDe: string;
  duration: string;
  destinations: string[];
  themeEn: string;
  themeDe: string;
};

const destinationPages: DestinationPage[] = [
  {
    id: 'essaouira',
    slug: 'essaouira',
    nameEn: 'Essaouira',
    nameDe: 'Essaouira',
    bestSeason: 'All year',
    highlights: ['Atlantic medina', 'Harbor', 'Coastal dining'],
  },
  {
    id: 'agadir',
    slug: 'agadir',
    nameEn: 'Agadir',
    nameDe: 'Agadir',
    bestSeason: 'All year',
    highlights: ['Beach', 'Marina', 'Southern Atlantic coast'],
  },
  {
    id: 'marrakesh',
    slug: 'marrakesh',
    nameEn: 'Marrakesh',
    nameDe: 'Marrakesch',
    bestSeason: 'Spring and autumn',
    highlights: ['Medina', 'Gardens', 'Design hotels'],
  },
  {
    id: 'fez',
    slug: 'fez-meknes',
    nameEn: 'Fez',
    nameDe: 'Fes',
    bestSeason: 'Spring and autumn',
    highlights: ['Medina', 'Crafts', 'Heritage'],
  },
  {
    id: 'chefchaouen',
    slug: 'chefchaouen',
    nameEn: 'Chefchaouen',
    nameDe: 'Chefchaouen',
    bestSeason: 'Spring',
    highlights: ['Blue city', 'Rif Mountains', 'Photography'],
  },
  {
    id: 'casablanca',
    slug: 'casablanca',
    nameEn: 'Casablanca',
    nameDe: 'Casablanca',
    bestSeason: 'All year',
    highlights: ['Hassan II Mosque', 'Art Deco', 'Urban coast'],
  },
  {
    id: 'ouarzazate',
    slug: 'ouarzazate',
    nameEn: 'Ouarzazate',
    nameDe: 'Ouarzazate',
    bestSeason: 'Autumn to spring',
    highlights: ['Kasbahs', 'Desert gateway', 'Film landscapes'],
  },
  {
    id: 'rabat',
    slug: 'rabat',
    nameEn: 'Rabat',
    nameDe: 'Rabat',
    bestSeason: 'All year',
    highlights: ['Capital city', 'Museums', 'Coastal heritage'],
  },
  {
    id: 'tangier',
    slug: 'tangier',
    nameEn: 'Tangier',
    nameDe: 'Tanger',
    bestSeason: 'Spring and autumn',
    highlights: ['Northern gateway', 'Medina', 'Sea views'],
  },
];

const activityPosts: ActivityPost[] = [
  {
    id: 'private-concierge',
    slug: 'private-concierge',
    nameEn: 'Private Concierge',
    nameDe: 'Private Concierge',
    destination: 'morocco',
    category: 'Service',
    duration: 'Flexible',
  },
  {
    id: 'private-chauffeur',
    slug: 'private-chauffeur',
    nameEn: 'Private Chauffeur',
    nameDe: 'Private Chauffeur',
    destination: 'morocco',
    category: 'Service',
    duration: 'Flexible',
  },
  {
    id: 'winery-val-dargan',
    slug: 'winery-val-dargan',
    nameEn: "Val d'Argan Winery",
    nameDe: "Val d'Argan Winery",
    destination: 'essaouira',
    category: 'Gastronomic',
    duration: 'Half day',
  },
  {
    id: 'hammam',
    slug: 'hammam',
    nameEn: 'Traditional Hammam',
    nameDe: 'Traditioneller Hammam',
    destination: 'morocco',
    category: 'Wellness',
    duration: '2 hours',
  },
  {
    id: 'jack-sparrow-boat-agadir',
    slug: 'jack-sparrow-boat-agadir',
    nameEn: 'Jack Sparrow Boat Agadir',
    nameDe: 'Jack Sparrow Boat Agadir',
    destination: 'agadir',
    category: 'Beach & Water',
    duration: 'Half day',
  },
  {
    id: 'golf-mogador',
    slug: 'golf-mogador',
    nameEn: 'Golf Mogador',
    nameDe: 'Golf Mogador',
    destination: 'essaouira',
    category: 'Sport',
    duration: 'Half day',
  },
  {
    id: 'atlas-mountains',
    slug: 'atlas-mountains',
    nameEn: 'Atlas Mountains',
    nameDe: 'Atlasgebirge',
    destination: 'marrakesh',
    category: 'Adventure',
    duration: 'Full day',
  },
  {
    id: 'gnaoua-festival',
    slug: 'gnaoua-festival',
    nameEn: 'Gnaoua Festival',
    nameDe: 'Gnaoua Festival',
    destination: 'essaouira',
    category: 'Cultural',
    duration: 'Seasonal',
  },
  {
    id: 'ysl-museum',
    slug: 'yves-saint-laurent-museum-marrakesh',
    nameEn: 'Yves Saint Laurent Museum',
    nameDe: 'Yves Saint Laurent Museum',
    destination: 'marrakesh',
    category: 'Cultural',
    duration: '2 hours',
  },
  {
    id: 'jardin-majorelle',
    slug: 'le-jardin-majorelle',
    nameEn: 'Le Jardin Majorelle',
    nameDe: 'Le Jardin Majorelle',
    destination: 'marrakesh',
    category: 'Cultural',
    duration: '2 hours',
  },
];

const routePosts: RoutePost[] = [
  {
    id: 'marrakesh-merzouga-desert-tour',
    slug: 'marrakesh-merzouga-desert-tour',
    nameEn: 'Marrakesh & Merzouga Desert',
    nameDe: 'Marrakesch & Merzouga Wuste',
    duration: '4-night tour package',
    destinations: ['marrakesh'],
    themeEn: 'Desert and mountains',
    themeDe: 'Wuste und Berge',
  },
  {
    id: 'casablanca-marrakesh-essaouira-tour',
    slug: 'casablanca-marrakesh-essaouira-tour',
    nameEn: 'Casablanca, Marrakesh & Essaouira',
    nameDe: 'Casablanca, Marrakesch & Essaouira',
    duration: '4-night tour package',
    destinations: ['casablanca', 'marrakesh', 'essaouira'],
    themeEn: 'Culture and coast',
    themeDe: 'Kultur und Kuste',
  },
  {
    id: 'tangier-chefchaouen-tour',
    slug: 'tangier-chefchaouen-tour',
    nameEn: 'Tangier & Chefchaouen',
    nameDe: 'Tanger & Chefchaouen',
    duration: '4-night tour package',
    destinations: ['tangier', 'chefchaouen'],
    themeEn: 'Northern Morocco',
    themeDe: 'Nordmarokko',
  },
  {
    id: 'marrakesh-agadir-essaouira-tour',
    slug: 'marrakesh-agadir-essaouira-tour',
    nameEn: 'Marrakesh, Agadir & Essaouira',
    nameDe: 'Marrakesch, Agadir & Essaouira',
    duration: '4-night tour package',
    destinations: ['marrakesh', 'agadir', 'essaouira'],
    themeEn: 'City and Atlantic coast',
    themeDe: 'Stadt und Atlantikkuste',
  },
  {
    id: 'fez-chefchaouen-tour',
    slug: 'fez-chefchaouen-tour',
    nameEn: 'Fez & Chefchaouen',
    nameDe: 'Fes & Chefchaouen',
    duration: '4-night tour package',
    destinations: ['fez', 'chefchaouen'],
    themeEn: 'Heritage and blue city',
    themeDe: 'Kulturerbe und blaue Stadt',
  },
  {
    id: 'marrakesh-essaouira-tour',
    slug: 'marrakesh-essaouira-tour',
    nameEn: 'Marrakesh & Essaouira',
    nameDe: 'Marrakesch & Essaouira',
    duration: '4-night tour package',
    destinations: ['marrakesh', 'essaouira'],
    themeEn: 'City and coast',
    themeDe: 'Stadt und Kuste',
  },
  {
    id: 'marrakesh-atlas-mountains-tour',
    slug: 'marrakesh-atlas-mountains-tour',
    nameEn: 'Marrakesh & Atlas Mountains',
    nameDe: 'Marrakesch & Atlasgebirge',
    duration: '3-night tour package',
    destinations: ['marrakesh'],
    themeEn: 'City and mountains',
    themeDe: 'Stadt und Berge',
  },
];

@Injectable()
export class WordPressContentProvider implements ContentProvider {
  private get baseUrl() {
    return (
      process.env.WORDPRESS_BASE_URL || 'https://www.purlife-maroc.com/en'
    ).replace(/\/$/, '');
  }

  private get apiRoot() {
    return `${this.baseUrl}/wp-json/wp/v2`;
  }

  private decodeEntities(value: string): string {
    return value
      .replace(/&#038;/g, '&')
      .replace(/&amp;/g, '&')
      .replace(/&#8211;/g, '-')
      .replace(/&#8217;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, ' ');
  }

  private stripHtml(value: string | undefined): string {
    return this.decodeEntities(value || '')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private getSummary(item: WordPressItem | undefined, fallback: string): string {
    const excerpt = this.stripHtml(item?.excerpt?.rendered);
    const seoDescription = this.stripHtml(
      item?.yoast_head_json?.description || item?.yoast_head_json?.og_description
    );
    const content = this.stripHtml(item?.content?.rendered);
    const text = excerpt || seoDescription || content || fallback;

    return text.length > 360 ? `${text.slice(0, 357).trim()}...` : text;
  }

  private getTitle(item: WordPressItem | undefined, fallback: string): string {
    return this.stripHtml(item?.title?.rendered) || fallback;
  }

  private getImage(item: WordPressItem | undefined): string {
    return item?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  }

  private async fetchCollection(
    route: 'pages' | 'posts',
    slugs: string[]
  ): Promise<Map<string, WordPressItem>> {
    if (slugs.length === 0) {
      return new Map();
    }

    const response = await axios.get<WordPressItem[]>(`${this.apiRoot}/${route}`, {
      params: {
        slug: slugs.join(','),
        per_page: Math.min(slugs.length, 100),
        _embed: 'wp:featuredmedia',
        _fields:
          'id,slug,link,title,excerpt,featured_media,yoast_head_json,_embedded.wp:featuredmedia.source_url',
      },
      timeout: 20000,
    });

    return new Map((response.data || []).map((item) => [item.slug, item]));
  }

  private async fetchPageMap(slugs: string[]) {
    return this.fetchCollection('pages', slugs);
  }

  private async fetchPostMap(slugs: string[]) {
    return this.fetchCollection('posts', slugs);
  }

  async getTravelStyles(): Promise<TravelStyleDto[]> {
    return [
      {
        id: 'curator',
        nameEn: 'The Curator',
        nameDe: 'The Curator',
        descriptionEn:
          'Bespoke travel with private concierge guidance, cultural immersion, and refined service.',
        descriptionDe:
          'Bespoke Travel mit Private Concierge, kultureller Tiefe und feinem Service.',
        icon: 'sparkles',
        color: '#DB7F32',
      },
      {
        id: 'culturist',
        nameEn: 'The Culturist',
        nameDe: 'The Culturist',
        descriptionEn:
          'Moroccan tours for hidden corners, local communities, and heritage-led discovery.',
        descriptionDe:
          'Marokko-Routen fuer versteckte Orte, lokale Begegnungen und Kultur.',
        icon: 'landmark',
        color: '#DB7F32',
      },
      {
        id: 'urbanite',
        nameEn: 'The Urbanite',
        nameDe: 'The Urbanite',
        descriptionEn:
          'City breaks shaped around medinas, galleries, design hotels, and restaurants.',
        descriptionDe:
          'City Breaks rund um Medinas, Galerien, Designhotels und Restaurants.',
        icon: 'building',
        color: '#DB7F32',
      },
      {
        id: 'nomad',
        nameEn: 'The Nomad',
        nameDe: 'The Nomad',
        descriptionEn:
          'Open-air Morocco with mountains, desert routes, surf, riding, and active days.',
        descriptionDe:
          'Aktives Marokko mit Bergen, Wuestenrouten, Surf, Reiten und Natur.',
        icon: 'map',
        color: '#DB7F32',
      },
    ];
  }

  async getDestinations(): Promise<DestinationDto[]> {
    const pageMap = await this.fetchPageMap(destinationPages.map((item) => item.slug));

    return destinationPages.map((entry) => {
      const page = pageMap.get(entry.slug);

      return {
        id: entry.id,
        nameEn: this.getTitle(page, entry.nameEn),
        nameDe: entry.nameDe,
        descriptionEn: this.getSummary(page, `${entry.nameEn} destination page from Pur Life Maroc.`),
        descriptionDe: this.getSummary(page, `${entry.nameDe} Destination von Pur Life Maroc.`),
        image: this.getImage(page) || entry.id,
        highlights: entry.highlights,
        bestSeason: entry.bestSeason,
      };
    });
  }

  async getActivities(): Promise<ActivityDto[]> {
    const postMap = await this.fetchPostMap(activityPosts.map((item) => item.slug));

    return activityPosts.map((entry) => {
      const post = postMap.get(entry.slug);
      const summary = this.getSummary(
        post,
        `${entry.nameEn} service and experience information from Pur Life Maroc.`
      );

      return {
        id: entry.id,
        nameEn: this.getTitle(post, entry.nameEn),
        nameDe: entry.nameDe,
        descriptionEn: summary,
        descriptionDe: summary,
        destination: entry.destination,
        category: entry.category,
        image: this.getImage(post) || entry.id,
        duration: entry.duration,
        serviceNote: 'Concierge context only. Commercial details are handled directly by the PLM team.',
      };
    });
  }

  async getAccommodations(): Promise<AccommodationDto[]> {
    const pageMap = await this.fetchPageMap(['pur-life-living']);
    const page = pageMap.get('pur-life-living');
    const summary = this.getSummary(
      page,
      'Pur Life Living brings together carefully selected Moroccan hotels, riads, villas, and authentic stays.'
    );

    return [
      {
        id: 'pur-life-living',
        nameEn: this.getTitle(page, 'Pur Life Living'),
        nameDe: 'Pur Life Living',
        descriptionEn: summary,
        descriptionDe: summary,
        destination: 'morocco',
        category: 'luxury',
        image: this.getImage(page) || 'pur-life-living',
        amenities: ['Luxury Living', 'Experience Living', 'Riads', 'Villas', 'Concierge fit'],
        stayStyle: 'Luxury Living / Experience Living',
      },
    ];
  }

  async getRestaurants(): Promise<RestaurantDto[]> {
    const pageMap = await this.fetchPageMap(['pur-life-eat-drink']);
    const page = pageMap.get('pur-life-eat-drink');
    const summary = this.getSummary(
      page,
      'Pur Life Eat & Drink is the culinary entry point for Moroccan restaurants and local dining inspiration.'
    );

    return [
      {
        id: 'pur-life-eat-drink',
        nameEn: this.getTitle(page, 'Pur Life Eat & Drink'),
        nameDe: 'Pur Life Eat & Drink',
        descriptionEn: summary,
        descriptionDe: summary,
        destination: 'morocco',
        cuisine: 'Moroccan culinary references',
        image: this.getImage(page) || 'pur-life-eat-drink',
        specialties: ['Tajine', 'Couscous', 'Tea service', 'Coastal dining'],
        atmosphere: 'Curated dining guidance',
      },
    ];
  }

  async getDrivers(): Promise<DriverProfileDto[]> {
    const postMap = await this.fetchPostMap(['private-chauffeur']);
    const post = postMap.get('private-chauffeur');
    const summary = this.getSummary(
      post,
      'Private chauffeur service for flexible routes, transfers, and local support.'
    );

    return [
      {
        id: 'private-chauffeur',
        name: this.getTitle(post, 'Private Chauffeur'),
        languages: ['Arabic', 'French', 'English', 'German'],
        baseCity: 'Morocco',
        specialtiesEn: ['Private routes', 'Transfers', 'Local service'],
        specialtiesDe: ['Private Routen', 'Transfers', 'Lokaler Service'],
        summaryEn: summary,
        summaryDe: summary,
        vehicleEn: 'Private chauffeur fleet',
        vehicleDe: 'Private Chauffeur Flotte',
        rating: 5,
      },
    ];
  }

  async getItineraries(): Promise<SignatureItineraryDto[]> {
    const postMap = await this.fetchPostMap(routePosts.map((item) => item.slug));

    return routePosts.map((entry) => {
      const post = postMap.get(entry.slug);
      const summary = this.getSummary(post, `${entry.nameEn} route idea from Pur Life Maroc.`);

      return {
        id: entry.id,
        nameEn: this.getTitle(post, entry.nameEn),
        nameDe: entry.nameDe,
        summaryEn: summary,
        summaryDe: summary,
        duration: entry.duration,
        destinations: entry.destinations,
        themeEn: entry.themeEn,
        themeDe: entry.themeDe,
      };
    });
  }

  async getCompanyProfile(): Promise<CompanyProfileDto> {
    const pageMap = await this.fetchPageMap(['marokko-urlaub', 'contact']);
    const home = pageMap.get('marokko-urlaub');

    return {
      brandName: 'Pur Life Maroc',
      aboutEn: this.getSummary(
        home,
        'Pur Life Maroc Travel creates personalised Moroccan journeys with local experts, private concierge service, curated stays, experiences, and destinations.'
      ),
      aboutDe:
        'Pur Life Maroc Travel kuratiert persoenliche Marokko-Reisen mit lokalen Experten, Private Concierge, Unterkuenften, Erlebnissen und Destinationen.',
      email: 'inside@purlife-maroc.com',
      phone: '+43 5242 61115',
    };
  }
}

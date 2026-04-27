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

@Injectable()
export class WordPressContentProvider implements ContentProvider {
  private get baseUrl() {
    return (process.env.WORDPRESS_BASE_URL || '').replace(/\/$/, '');
  }

  private stripHtml(value: string | undefined): string {
    return (value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  private async fetchCollection(route: string): Promise<any[]> {
    if (!this.baseUrl) {
      return [];
    }

    try {
      const response = await axios.get(`${this.baseUrl}/wp-json/wp/v2/${route}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch {
      return [];
    }
  }

  async getTravelStyles(): Promise<TravelStyleDto[]> {
    const items = await this.fetchCollection('travel-style');
    return items.map((item) => ({
      id: item.slug || String(item.id),
      nameEn: item.title?.rendered || item.slug || 'style',
      nameDe: item.acf?.name_de || item.title?.rendered || item.slug || 'style',
      descriptionEn: this.stripHtml(item.excerpt?.rendered),
      descriptionDe: this.stripHtml(item.acf?.description_de || item.excerpt?.rendered),
      icon: item.acf?.icon || 'sparkles',
      color: item.acf?.color || '#B85C38',
    }));
  }

  async getDestinations(): Promise<DestinationDto[]> {
    const items = await this.fetchCollection('destination');
    return items.map((item) => ({
      id: item.slug || String(item.id),
      nameEn: item.title?.rendered || item.slug || 'destination',
      nameDe: item.acf?.name_de || item.title?.rendered || item.slug || 'destination',
      descriptionEn: this.stripHtml(item.excerpt?.rendered),
      descriptionDe: this.stripHtml(item.acf?.description_de || item.excerpt?.rendered),
      image: item.acf?.image || '',
      highlights: item.acf?.highlights || [],
      bestSeason: item.acf?.best_season || '',
    }));
  }

  async getActivities(): Promise<ActivityDto[]> {
    const items = await this.fetchCollection('activity');
    return items.map((item) => ({
      id: item.slug || String(item.id),
      nameEn: item.title?.rendered || item.slug || 'activity',
      nameDe: item.acf?.name_de || item.title?.rendered || item.slug || 'activity',
      descriptionEn: this.stripHtml(item.excerpt?.rendered),
      descriptionDe: this.stripHtml(item.acf?.description_de || item.excerpt?.rendered),
      destination: item.acf?.destination || '',
      category: item.acf?.category || 'Cultural',
      image: item.acf?.image || '',
      duration: item.acf?.duration || '',
      priceRange: item.acf?.price_range || '',
    }));
  }

  async getAccommodations(): Promise<AccommodationDto[]> {
    const items = await this.fetchCollection('accommodation');
    return items.map((item) => ({
      id: item.slug || String(item.id),
      nameEn: item.title?.rendered || item.slug || 'accommodation',
      nameDe: item.acf?.name_de || item.title?.rendered || item.slug || 'accommodation',
      descriptionEn: this.stripHtml(item.excerpt?.rendered),
      descriptionDe: this.stripHtml(item.acf?.description_de || item.excerpt?.rendered),
      destination: item.acf?.destination || '',
      category: item.acf?.category || 'boutique',
      image: item.acf?.image || '',
      amenities: item.acf?.amenities || [],
      pricePerNight: item.acf?.price_per_night || '',
    }));
  }

  async getRestaurants(): Promise<RestaurantDto[]> {
    const items = await this.fetchCollection('restaurant');
    return items.map((item) => ({
      id: item.slug || String(item.id),
      nameEn: item.title?.rendered || item.slug || 'restaurant',
      nameDe: item.acf?.name_de || item.title?.rendered || item.slug || 'restaurant',
      descriptionEn: this.stripHtml(item.excerpt?.rendered),
      descriptionDe: this.stripHtml(item.acf?.description_de || item.excerpt?.rendered),
      destination: item.acf?.destination || '',
      cuisine: item.acf?.cuisine || '',
      image: item.acf?.image || '',
      specialties: item.acf?.specialties || [],
      priceRange: item.acf?.price_range || '',
    }));
  }

  async getDrivers(): Promise<DriverProfileDto[]> {
    const items = await this.fetchCollection('driver');
    return items.map((item) => ({
      id: item.slug || String(item.id),
      name: item.title?.rendered || item.slug || 'driver',
      languages: item.acf?.languages || [],
      baseCity: item.acf?.base_city || '',
      specialtiesEn: item.acf?.specialties_en || [],
      specialtiesDe: item.acf?.specialties_de || [],
      summaryEn: this.stripHtml(item.excerpt?.rendered),
      summaryDe: this.stripHtml(item.acf?.summary_de || item.excerpt?.rendered),
      vehicleEn: item.acf?.vehicle_en || '',
      vehicleDe: item.acf?.vehicle_de || '',
      rating: Number(item.acf?.rating || 0),
    }));
  }

  async getItineraries(): Promise<SignatureItineraryDto[]> {
    const items = await this.fetchCollection('itinerary');
    return items.map((item) => ({
      id: item.slug || String(item.id),
      nameEn: item.title?.rendered || item.slug || 'itinerary',
      nameDe: item.acf?.name_de || item.title?.rendered || item.slug || 'itinerary',
      summaryEn: this.stripHtml(item.excerpt?.rendered),
      summaryDe: this.stripHtml(item.acf?.summary_de || item.excerpt?.rendered),
      duration: item.acf?.duration || '',
      destinations: item.acf?.destinations || [],
      themeEn: item.acf?.theme_en || '',
      themeDe: item.acf?.theme_de || '',
    }));
  }

  async getCompanyProfile(): Promise<CompanyProfileDto> {
    const items = await this.fetchCollection('company-profile');
    const item = items[0];

    return {
      brandName: item?.title?.rendered || 'Pur Life Maroc',
      aboutEn: this.stripHtml(item?.excerpt?.rendered),
      aboutDe: this.stripHtml(item?.acf?.about_de || item?.excerpt?.rendered),
      email: item?.acf?.email || '',
      phone: item?.acf?.phone || '',
    };
  }
}

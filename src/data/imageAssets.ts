import { ImageSourcePropType } from 'react-native';

export const brandAssets: {
  logo: ImageSourcePropType;
  heroBanner: ImageSourcePropType;
} = {
  logo: require('../../assets/images/purlife/brand/logo.png'),
  heroBanner: require('../../assets/images/purlife/brand/morocco.png'),
};

export const destinationAssets: Record<string, ImageSourcePropType> = {
  essaouira: require('../../assets/images/purlife/destinations/essaouira.png'),
  marrakesh: require('../../assets/images/purlife/destinations/marrakesh.png'),
  fez: require('../../assets/images/purlife/destinations/fez.png'),
  chefchaouen: require('../../assets/images/purlife/destinations/chefchaoun.png'),
  ouarzazate: require('../../assets/images/purlife/destinations/ouarzazate.png'),
  casablanca: require('../../assets/images/purlife/destinations/casablanca.png'),
  rabat: require('../../assets/images/purlife/destinations/rabat.png'),
  agadir: require('../../assets/images/purlife/destinations/agadir.png'),
  tangier: require('../../assets/images/purlife/destinations/tangier.png'),
};

export const activityAssets: Record<string, ImageSourcePropType> = {
  'argan-oil': require('../../assets/images/purlife/activities/argan-oil.png'),
  'winery-val': require('../../assets/images/purlife/activities/winery-val.png'),
  hammam: require('../../assets/images/purlife/activities/hammam.png'),
  'boat-tour': require('../../assets/images/purlife/activities/boat-tour.png'),
  'golf-mogador': require('../../assets/images/purlife/activities/golf-mogador.png'),
  'atlas-trek': require('../../assets/images/purlife/activities/atlas-trek.png'),
  'gnaoua-festival': require('../../assets/images/purlife/activities/gnaoua-festival.png'),
  'ysl-museum': require('../../assets/images/purlife/activities/ysl-museum.png'),
  'jardin-majorelle': require('../../assets/images/purlife/activities/jardin-majorelle.png'),
  'surfing-lesson': require('../../assets/images/purlife/activities/surfing-lesson.png'),
  'camel-trekking': require('../../assets/images/purlife/activities/camel-trekking.png'),
  'beach-horseback': require('../../assets/images/purlife/activities/beach-horseback.png'),
};

export const accommodationAssets: Record<string, ImageSourcePropType> = {
  'villa-maroc': require('../../assets/images/purlife/accommodation/villa-maroc.png'),
  'villa-jardins': require('../../assets/images/purlife/accommodation/villa-jardins.png'),
  'riad-fes': require('../../assets/images/purlife/accommodation/riad-fes.png'),
  'palais-ronsard': require('../../assets/images/purlife/accommodation/palais-ronsard.png'),
  'le-berbere': require('../../assets/images/purlife/accommodation/le-berbere.png'),
  'le-doge': require('../../assets/images/purlife/accommodation/le-doge.png'),
  'dar-ahlam': require('../../assets/images/purlife/accommodation/dar-ahlam.png'),
  'barcelo-tangier': require('../../assets/images/purlife/accommodation/barcelo-tangier.png'),
  'camp-chebbi': require('../../assets/images/purlife/accommodation/camp-chebbi.png'),
};

export const diningAssets: Record<string, ImageSourcePropType> = {
  umia: require('../../assets/images/purlife/dining/umia.png'),
  'dar-cheikh': require('../../assets/images/purlife/dining/dar-cheikh.png'),
  'chez-said': require('../../assets/images/purlife/dining/chez-said.png'),
  'kasbah-lamrani': require('../../assets/images/purlife/dining/kasbah-lamrani.png'),
};

export const getDestinationImage = (
  destinationId: string
): ImageSourcePropType | undefined => {
  return destinationAssets[destinationId];
};

export const getActivityImage = (
  imageId: string
): ImageSourcePropType | undefined => {
  return activityAssets[imageId];
};

export const getAccommodationImage = (
  imageId: string
): ImageSourcePropType | undefined => {
  return accommodationAssets[imageId];
};

export const getDiningImage = (
  imageId: string
): ImageSourcePropType | undefined => {
  return diningAssets[imageId];
};

export default {
  brandAssets,
  destinationAssets,
  activityAssets,
  accommodationAssets,
  diningAssets,
  getDestinationImage,
  getActivityImage,
  getAccommodationImage,
  getDiningImage,
};

import { getImgUrl } from '../utils/cloudinary';

export const galleryCategories = [
  'All Collections',
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Dining',
  'Office',
  'Wardrobe',
  'Showroom',
  'Lobby'
];

export const galleryImages = [
  { id: 'g1', category: 'Living Room', image: getImgUrl("gal-living-room-01") },
  { id: 'g2', category: 'Bedroom', image: getImgUrl("gal-bedroom-01") },
  { id: 'g3', category: 'Showroom', image: getImgUrl("gal-showroom-01") },
  { id: 'g4', category: 'Kitchen', image: getImgUrl("est-kit-complete") },
  { id: 'g5', category: 'Dining', image: getImgUrl("est-room-dining") },
  { id: 'g6', category: 'Office', image: getImgUrl("gal-office-01") },
  { id: 'g7', category: 'Wardrobe', image: getImgUrl("gal-wardrobe-01") },
  { id: 'g8', category: 'Living Room', image: getImgUrl("gal-living-room-02") },
  { id: 'g9', category: 'Lobby', image: getImgUrl("gal-lobby-01") }
];

import { getImgUrl } from '../utils/cloudinary';

export const services = [
  {
    id: 'living-room',
    title: 'Living Room',
    description: 'Stylish sofa and seating designs for your family space.',
    image: getImgUrl("gal-living-room-01")
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description: 'Beds, side tables and storage designed for comfort.',
    image: getImgUrl("gal-bedroom-01")
  },
  {
    id: 'modular-kitchen',
    title: 'Modular Kitchen',
    description: 'Smart kitchen designs with strong storage.',
    image: getImgUrl("gal-lobby-01")
  },
  {
    id: 'wardrobes',
    title: 'Wardrobes',
    description: 'Custom wardrobes with clean finishing.',
    image: getImgUrl("gal-wardrobe-01")
  },
  {
    id: 'dining',
    title: 'Dining',
    description: 'Dining tables and units for everyday use.',
    image: getImgUrl("gal-showroom-01")
  },
  {
    id: 'tv-units',
    title: 'TV Units',
    description: 'Modern TV units for living rooms.',
    image: getImgUrl("gal-living-room-02")
  },
  {
    id: 'office',
    title: 'Office',
    description: 'Workspaces with practical furniture.',
    image: getImgUrl("gal-office-01")
  },
  {
    id: 'full-home',
    title: 'Full Home',
    description: 'Complete interior setup for your home.',
    image: getImgUrl("gal-lobby-01")
  },
  {
    id: 'custom-furniture',
    title: 'Custom Furniture',
    description: 'Made-to-size furniture as per your need.',
    image: getImgUrl("gal-wardrobe-02")
  }
];

import { getImgUrl } from '../utils/cloudinary';

export const projects = [
  // LIVING ROOM
  {
    id: 'p1',
    category: 'Living Room',
    title: 'Modern Darbhanga Villa',
    location: 'Darbhanga, Bihar',
    description: 'A complete living room setup with a custom TV unit and luxury sofas.',
    image: getImgUrl("gal-living-room-01"),
    badge: 'Featured'
  },
  {
    id: 'p2',
    category: 'Living Room',
    title: 'Contemporary TV Unit',
    location: 'Samastipur',
    description: 'Sleek wall-mounted TV unit with hidden wiring and elegant back-lighting.',
    image: living2,
    badge: ''
  },
  // KITCHEN
  {
    id: 'p3',
    category: 'Kitchen',
    title: 'Smart Storage Kitchen',
    location: 'Laheriasarai, Darbhanga',
    description: 'Modular kitchen with deep walnut finish and smart storage solutions.',
    image: getImgUrl("gal-lobby-01"),
    badge: 'New'
  },
  {
    id: 'p4',
    category: 'Kitchen',
    title: 'Minimalist L-Shaped Kitchen',
    location: 'Madhubani',
    description: 'Clean, handle-less L-shaped kitchen featuring premium quartz countertops.',
    image: kitchen1,
    badge: ''
  },
  // BEDROOM
  {
    id: 'p5',
    category: 'Bedroom',
    title: 'Cozy Master Bedroom',
    location: 'Madhubani',
    description: 'Custom king-size bed with integrated side tables and warm lighting.',
    image: getImgUrl("gal-bedroom-01"),
    badge: ''
  },
  {
    id: 'p4',
    category: 'Wardrobe',
    title: 'Premium Sliding Wardrobe',
    location: 'Darbhanga, Bihar',
    description: 'Full-wall sliding wardrobe with mirror panels and clean finishing.',
    image: getImgUrl("gal-wardrobe-01"),
    badge: ''
  },
  {
    id: 'p5',
    category: 'Office',
    title: 'Professional Workspace',
    location: 'Samastipur',
    description: 'Office interior with ergonomic desks and document storage units.',
    image: getImgUrl("gal-office-01"),
    badge: ''
  },
  {
    id: 'p6',
    category: 'Bedroom',
    title: 'Luxury Suite Setup',
    location: 'Darbhanga City',
    description: 'Plush upholstered headboard with a minimalist wooden bed frame.',
    image: bed2,
    badge: 'Featured'
  },
  // WARDROBE
  {
    id: 'p7',
    category: 'Wardrobe',
    title: 'Premium Sliding Wardrobe',
    location: 'Darbhanga, Bihar',
    description: 'Full-wall sliding wardrobe with mirror panels and clean finishing.',
    image: wardrobe1,
    badge: ''
  },
  {
    id: 'p8',
    category: 'Wardrobe',
    title: 'Walk-In Closet',
    location: 'Patna',
    description: 'Custom walk-in closet featuring open shelving and dedicated accessory drawers.',
    image: wardrobe2,
    badge: 'Popular'
  },
  // OFFICE
  {
    id: 'p9',
    category: 'Office',
    title: 'Professional Workspace',
    location: 'Samastipur',
    description: 'Office interior with ergonomic desks and document storage units.',
    image: office1,
    badge: ''
  },
  {
    id: 'p10',
    category: 'Office',
    title: 'Executive Director Cabin',
    location: 'Darbhanga, Bihar',
    description: 'Premium wood paneled executive office with a custom conference desk.',
    image: office2,
    badge: ''
  },
  // FULL INTERIOR
  {
    id: 'p11',
    category: 'Full Interior',
    title: 'Complete Home Setup',
    location: 'Darbhanga City',
    description: 'End-to-end interior design including all furniture and fixtures.',
    image: getImgUrl("gal-showroom-01"),
    badge: 'Popular'
  },
  {
    id: 'p12',
    category: 'Full Interior',
    title: 'Heritage Villa Restoration',
    location: 'Muzaffarpur',
    description: 'Complete interior overhaul combining traditional woodwork with modern design.',
    image: newImg2,
    badge: 'Featured'
  }
];

export const projectCategories = [
  'All Projects',
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Wardrobe',
  'Office',
  'Full Interior'
];

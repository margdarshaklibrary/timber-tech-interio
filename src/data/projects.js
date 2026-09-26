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
    image: getImgUrl("gal-living-room-02"),
    badge: ''
  },
  // KITCHEN
  {
    id: 'p3',
    category: 'Kitchen',
    title: 'Smart Storage Kitchen',
    location: 'Laheriasarai, Darbhanga',
    description: 'Modular kitchen with deep walnut finish and smart storage solutions.',
    image: getImgUrl("est-kit-island"),
    badge: 'New'
  },
  {
    id: 'p4',
    category: 'Kitchen',
    title: 'Minimalist L-Shaped Kitchen',
    location: 'Madhubani',
    description: 'Clean, handle-less L-shaped kitchen featuring premium quartz countertops.',
    image: getImgUrl("est-kit-l-shaped"),
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
    image: getImgUrl("gal-bedroom-02"),
    badge: 'Featured'
  },
  // WARDROBE
  {
    id: 'p7',
    category: 'Wardrobe',
    title: 'Premium Sliding Wardrobe',
    location: 'Darbhanga, Bihar',
    description: 'Full-wall sliding wardrobe with mirror panels and clean finishing.',
    image: getImgUrl("est-wd-sliding2"),
    badge: ''
  },
  {
    id: 'p8',
    category: 'Wardrobe',
    title: 'Walk-In Closet',
    location: 'Patna',
    description: 'Custom walk-in closet featuring open shelving and dedicated accessory drawers.',
    image: getImgUrl("gal-wardrobe-02"),
    badge: 'Popular'
  },
  // OFFICE
  {
    id: 'p9',
    category: 'Office',
    title: 'Professional Workspace',
    location: 'Samastipur',
    description: 'Office interior with ergonomic desks and document storage units.',
    image: getImgUrl("gal-office-01"),
    badge: ''
  },
  {
    id: 'p10',
    category: 'Office',
    title: 'Executive Director Cabin',
    location: 'Darbhanga, Bihar',
    description: 'Premium wood paneled executive office with a custom conference desk.',
    image: getImgUrl("est-off-manager-cabin"),
    badge: ''
  },
  // FULL INTERIOR
  {
    id: 'p11',
    category: 'Full Interior',
    title: 'Complete Home Setup',
    location: 'Darbhanga City',
    description: 'End-to-end interior design including all furniture and fixtures.',
    image: getImgUrl("est-prop-villa"),
    badge: 'Popular'
  },
  {
    id: 'p12',
    category: 'Full Interior',
    title: 'Heritage Villa Restoration',
    location: 'Muzaffarpur',
    description: 'Complete interior overhaul combining traditional woodwork with modern design.',
    image: getImgUrl("est-prop-3bhk"),
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

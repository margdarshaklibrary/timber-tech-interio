import projectLiving from '../assets/images/project-living.jpg';
import projectKitchen from '../assets/images/project-kitchen.jpg';
import projectBedroom from '../assets/images/project-bedroom.jpg';
import projectWardrobe from '../assets/images/project-wardrobe.jpg';
import projectOffice from '../assets/images/project-office.jpg';
import projectFullhome from '../assets/images/project-fullhome.jpg';

export const projects = [
  {
    id: 'p1',
    category: 'Living Room',
    title: 'Modern Darbhanga Villa',
    location: 'Darbhanga, Bihar',
    description: 'A complete living room setup with a custom TV unit and luxury sofas.',
    image: projectLiving,
    badge: 'Featured'
  },
  {
    id: 'p2',
    category: 'Kitchen',
    title: 'Smart Storage Kitchen',
    location: 'Laheriasarai, Darbhanga',
    description: 'Modular kitchen with deep walnut finish and smart storage solutions.',
    image: projectKitchen,
    badge: 'New'
  },
  {
    id: 'p3',
    category: 'Bedroom',
    title: 'Cozy Master Bedroom',
    location: 'Madhubani',
    description: 'Custom king-size bed with integrated side tables and warm lighting.',
    image: projectBedroom,
    badge: ''
  },
  {
    id: 'p4',
    category: 'Wardrobe',
    title: 'Premium Sliding Wardrobe',
    location: 'Darbhanga, Bihar',
    description: 'Full-wall sliding wardrobe with mirror panels and clean finishing.',
    image: projectWardrobe,
    badge: ''
  },
  {
    id: 'p5',
    category: 'Office',
    title: 'Professional Workspace',
    location: 'Samastipur',
    description: 'Office interior with ergonomic desks and document storage units.',
    image: projectOffice,
    badge: ''
  },
  {
    id: 'p6',
    category: 'Full Interior',
    title: 'Complete Home Setup',
    location: 'Darbhanga City',
    description: 'End-to-end interior design including all furniture and fixtures.',
    image: projectFullhome,
    badge: 'Popular'
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

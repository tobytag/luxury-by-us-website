import type { Watch } from '@shared/schema';

export const brands = [
  'Rolex',
  'Patek Philippe',
  'Audemars Piguet',
  'Omega',
  'Cartier',
  'TAG Heuer',
  'Breitling',
  'IWC',
  'Panerai',
  'Jaeger-LeCoultre',
  'Hublot',
];

export const categories = [
  "Men's",
  "Women's",
  "Unisex",
  "Limited Edition",
];

export const conditions = [
  'Excellent',
  'Very Good',
  'Good',
  'Fair',
];

export const priceRanges = [
  { label: 'Under $5M', value: '0-5000000' },
  { label: '$5M - $15M', value: '5000000-15000000' },
  { label: '$15M - $30M', value: '15000000-30000000' },
  { label: 'Above $30M', value: '30000000' },
];

export const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
];

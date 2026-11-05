import { FacilityItem, GalleryItem, RoomItem } from '../types';

export const HOTEL_INFO = {
  name: 'Hotel Ghunghat',
  legalName: 'Hotel Ghunghat Gandhinagar',
  address: 'Sector-26, K Road, Near GIDC, Gandhinagar-Mansa Road, Gandhinagar, Gujarat 382028, India',
  city: 'Gandhinagar',
  state: 'Gujarat',
  postalCode: '382028',
  country: 'India',
  phone: '+91 98253 00161',
  phoneClean: '+919825300161',
  whatsappNumber: '919825300161',
  email: 'hotelghunghat.gnr@gmail.com',
  rating: 4.1,
  maxRating: 5.0,
  googleMapsUrl: 'https://maps.app.goo.gl/h1YKpmW68jtAuLv69',
  googleBusinessProfileUrl: 'https://share.google/KyMGrzVVSrjzQrf7U',
  instagramUrl: 'https://www.instagram.com/hotelghunghat/',
  embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.2751767664655!2d72.6565384!3d23.2508107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b64d0cb5a9d%3A0x867375a0cbb0df29!2sHOTEL%20GHUNGHAT!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  categories: ['Hotel Accommodation', 'Pure Veg & Multi-Cuisine Dining', 'Banquet Hall', 'Wedding & Party Lawn'],
  operatingHours: '24 Hours Front Desk & Guest Check-in'
};

export const HOTEL_IMAGES = {
  logo: '/assets/aistudio/image_54bc113c.png',
  hero: '/assets/aistudio/Twilight_Courtyard_at_a_Tropical_Resort_ce86ea60.png',
  roomLuxury: '/assets/images/hotel_luxury_room_1793689846698.jpg',
  restaurant: '/assets/images/hotel_restaurant_dining_1793689847324.jpg',
  banquet: '/assets/images/hotel_banquet_hall_1793689848254.jpg',
  partyLawn: '/assets/images/hotel_party_lawn_1793689848911.jpg',
};

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'executive-deluxe',
    nameKey: 'room_executive_name',
    descKey: 'room_executive_desc',
    image: HOTEL_IMAGES.roomLuxury,
    occupancy: '2 Adults, 1 Child',
    bedType: 'King Size Bed',
    size: 'Spacious & Air Conditioned',
    features: ['Air Conditioning', 'Free High-Speed Wi-Fi', '24/7 Room Service', 'LED Smart TV', 'Modern En-Suite Bathroom', 'Daily Housekeeping']
  },
  {
    id: 'deluxe-comfort',
    nameKey: 'room_deluxe_name',
    descKey: 'room_deluxe_desc',
    image: HOTEL_IMAGES.roomLuxury,
    occupancy: '2 Adults',
    bedType: 'Queen / Twin Beds',
    size: 'Comfort Executive',
    features: ['Air Conditioning', 'Free Wi-Fi', 'Intercom & Room Service', 'Clean Premium Linens', 'Attached Bathroom', 'Complimentary Toiletries']
  },
  {
    id: 'family-suite',
    nameKey: 'room_family_name',
    descKey: 'room_family_desc',
    image: HOTEL_IMAGES.roomLuxury,
    occupancy: '3 - 4 Guests',
    bedType: 'Family Bedding Arrangement',
    size: 'Grand Family Layout',
    features: ['Air Conditioning', 'High Speed Wi-Fi', 'Spacious Seating Area', '24-Hour Hot & Cold Water', 'Room Service Assistance', 'Wardrobe & Luggage Rack']
  }
];

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: 'wifi',
    nameKey: 'fac_wifi_title',
    descKey: 'fac_wifi_desc',
    iconName: 'Wifi',
    verified: true
  },
  {
    id: 'parking',
    nameKey: 'fac_parking_title',
    descKey: 'fac_parking_desc',
    iconName: 'Car',
    verified: true
  },
  {
    id: 'reception',
    nameKey: 'fac_reception_title',
    descKey: 'fac_reception_desc',
    iconName: 'Clock',
    verified: true
  },
  {
    id: 'room_service',
    nameKey: 'fac_service_title',
    descKey: 'fac_service_desc',
    iconName: 'BellRing',
    verified: true
  },
  {
    id: 'ac',
    nameKey: 'fac_ac_title',
    descKey: 'fac_ac_desc',
    iconName: 'AirVent',
    verified: true
  },
  {
    id: 'restaurant',
    nameKey: 'fac_restaurant_title',
    descKey: 'fac_restaurant_desc',
    iconName: 'UtensilsCrossed',
    verified: true
  },
  {
    id: 'banquet',
    nameKey: 'fac_banquet_title',
    descKey: 'fac_banquet_desc',
    iconName: 'Building2',
    verified: true
  },
  {
    id: 'lawn',
    nameKey: 'fac_lawn_title',
    descKey: 'fac_lawn_desc',
    iconName: 'Trees',
    verified: true
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-ext-1',
    titleKey: 'gal_ext_1',
    category: 'exterior',
    image: HOTEL_IMAGES.hero,
    alt: 'Hotel Ghunghat exterior entrance and architectural facade at dusk in Gandhinagar',
    isIllustrative: true
  },
  {
    id: 'gal-room-1',
    titleKey: 'gal_room_1',
    category: 'rooms',
    image: HOTEL_IMAGES.roomLuxury,
    alt: 'Executive luxury bedroom accommodation at Hotel Ghunghat',
    isIllustrative: true
  },
  {
    id: 'gal-rest-1',
    titleKey: 'gal_rest_1',
    category: 'restaurant',
    image: HOTEL_IMAGES.restaurant,
    alt: 'Fine dining restaurant serving Gujarati and North Indian cuisine at Hotel Ghunghat',
    isIllustrative: true
  },
  {
    id: 'gal-banq-1',
    titleKey: 'gal_banq_1',
    category: 'banquet',
    image: HOTEL_IMAGES.banquet,
    alt: 'Grand indoor banquet hall decorated for wedding ceremonies and receptions',
    isIllustrative: true
  },
  {
    id: 'gal-lawn-1',
    titleKey: 'gal_lawn_1',
    category: 'lawn',
    image: HOTEL_IMAGES.partyLawn,
    alt: 'Sprawling outdoor evening party lawn with fairy lights at Hotel Ghunghat Gandhinagar',
    isIllustrative: true
  },
  {
    id: 'gal-events-1',
    titleKey: 'gal_events_1',
    category: 'events',
    image: HOTEL_IMAGES.partyLawn,
    alt: 'Evening wedding celebration and stage decoration on hotel lawn',
    isIllustrative: true
  }
];

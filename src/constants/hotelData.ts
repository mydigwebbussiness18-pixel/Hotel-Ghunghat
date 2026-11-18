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
  entranceGate: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.15.31_PM_030c0ca2.jpeg',
  exteriorTwilight: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.17.12_PM_2cc7c28a.jpeg',
  exteriorNight: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.19.12_PM_dcb2f732.jpeg',
  gardenDay: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.20.37_PM_b4b5995c.jpeg',
  lawnSunsetEvent: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.21.59_PM_e93f58e4.jpeg',
  roomRoyalWide: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.23.35_PM_8f0652e7.jpeg',
  roomNavySuite: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.25.26_PM_bb7d7ed5.jpeg',
  roomCrimsonDeluxe: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.27.13_PM_805b21b3.jpeg',
  roomBalcony: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.40.41_PM_af886daf.jpeg',
  lawnBuildingDay: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_4.45.09_PM_e48dbebc.jpeg',
  roomLuxury: '/assets/images/hotel_luxury_room_1793689846698.jpg',
  restaurant: '/assets/aistudio/Polished_Modern_Dining_Hall_c1bfe864.png',
  restaurantThali: '/assets/aistudio/Colourful_Indian_Thali_Feast_697c3256.png',
  restaurantSizzler: '/assets/aistudio/image_edcb8365.png',
  banquet: '/assets/images/hotel_banquet_hall_1793689848254.jpg',
  partyLawn: '/assets/images/hotel_party_lawn_1793689848911.jpg',
  nightGardenFacade: '/assets/aistudio/Nighttime_Hotel_Garden_Illumination_1be7f099.png',
  nightGardenEntrance: '/assets/aistudio/Tropical_Garden_Entrance_at_Night_68802d9d.png',
  nightGardenTerrace: '/assets/aistudio/Tropical_Night_Garden_Terrace_eea65b72.png',
  nightGardenWalkway: '/assets/aistudio/Vibrant_Hotel_Chungat_Garden_Walkway_d62eff36.png',
};

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'executive-deluxe',
    nameKey: 'room_executive_name',
    descKey: 'room_executive_desc',
    image: HOTEL_IMAGES.roomRoyalWide,
    images: [
      HOTEL_IMAGES.roomRoyalWide,
      HOTEL_IMAGES.roomNavySuite,
    ],
    imagePositions: ['center', 'center'],
    occupancy: '2 Adults, 1 Child',
    bedType: 'King Size Bed',
    size: 'Spacious & Air Conditioned',
    features: ['Air Conditioning', 'Free High-Speed Wi-Fi', '24/7 Room Service', 'LED Smart TV', 'Modern En-Suite Bathroom', 'Daily Housekeeping']
  },
  {
    id: 'deluxe-comfort',
    nameKey: 'room_deluxe_name',
    descKey: 'room_deluxe_desc',
    image: HOTEL_IMAGES.roomCrimsonDeluxe,
    images: [
      HOTEL_IMAGES.roomCrimsonDeluxe,
      HOTEL_IMAGES.roomBalcony,
    ],
    imagePositions: ['center', 'center 60%'],
    occupancy: '2 Adults',
    bedType: 'Queen / Twin Beds',
    size: 'Comfort Executive',
    features: ['Air Conditioning', 'Free Wi-Fi', 'Intercom & Room Service', 'Clean Premium Linens', 'Attached Bathroom', 'Complimentary Toiletries']
  },
  {
    id: 'family-suite',
    nameKey: 'room_family_name',
    descKey: 'room_family_desc',
    image: HOTEL_IMAGES.roomNavySuite,
    images: [
      HOTEL_IMAGES.roomNavySuite,
      HOTEL_IMAGES.roomRoyalWide,
      HOTEL_IMAGES.roomLuxury,
    ],
    imagePositions: ['center', 'center', 'center'],
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
    id: 'gal-ext-gate',
    titleKey: 'gal_ext_gate',
    category: 'exterior',
    image: HOTEL_IMAGES.entranceGate,
    alt: 'Grand illuminated entrance arch gate and landscaped courtyard at Hotel Ghunghat Gandhinagar',
    objectPosition: 'center 25%',
  },
  {
    id: 'gal-ext-twilight',
    titleKey: 'gal_ext_twilight',
    category: 'exterior',
    image: HOTEL_IMAGES.exteriorTwilight,
    alt: 'Hotel Ghunghat main building exterior and red-tiled entrance portico at twilight',
  },
  {
    id: 'gal-ext-night',
    titleKey: 'gal_ext_night',
    category: 'exterior',
    image: HOTEL_IMAGES.exteriorNight,
    alt: 'Hotel Ghunghat illuminated at night with festive exterior lights and garden entrance',
  },
  {
    id: 'gal-ext-1',
    titleKey: 'gal_ext_1',
    category: 'exterior',
    image: HOTEL_IMAGES.hero,
    alt: 'Hotel Ghunghat twilight palm courtyard and evening ambience in Gandhinagar',
    isIllustrative: true
  },
  {
    id: 'gal-room-royal',
    titleKey: 'gal_room_royal',
    category: 'rooms',
    image: HOTEL_IMAGES.roomRoyalWide,
    alt: 'Executive Royal Room with backlit cushioned headboard, navy-gold bedding, and vanity mirror',
  },
  {
    id: 'gal-room-suite',
    titleKey: 'gal_room_suite',
    category: 'rooms',
    image: HOTEL_IMAGES.roomNavySuite,
    alt: 'Spacious Premium Suite interior featuring LED TV, designer wardrobe, and tea lounge corner',
  },
  {
    id: 'gal-room-deluxe',
    titleKey: 'gal_room_deluxe',
    category: 'rooms',
    image: HOTEL_IMAGES.roomCrimsonDeluxe,
    alt: 'Deluxe Comfort Room with warm ambient lighting, split AC, and royal red-gold bedding',
  },
  {
    id: 'gal-room-balcony',
    titleKey: 'gal_room_balcony',
    category: 'rooms',
    image: HOTEL_IMAGES.roomBalcony,
    alt: 'Air-conditioned comfort room with private balcony access, wardrobe, and LED television',
    objectPosition: 'center 58%',
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
    id: 'gal-events-1',
    titleKey: 'gal_events_1',
    category: 'events',
    image: HOTEL_IMAGES.lawnSunsetEvent,
    alt: 'Golden sunset open-air celebration and stage setup on Hotel Ghunghat party lawn',
  },
  {
    id: 'gal-lawn-day',
    titleKey: 'gal_lawn_day',
    category: 'lawn',
    image: HOTEL_IMAGES.lawnBuildingDay,
    alt: 'Expansive manicured green party lawn overlooking Hotel Ghunghat main wing',
  },
  {
    id: 'gal-garden-day',
    titleKey: 'gal_garden_day',
    category: 'lawn',
    image: HOTEL_IMAGES.gardenDay,
    alt: 'Lush landscaped garden lawn with stone feature wall, palm trees, and pathway lighting',
  },
  {
    id: 'gal-lawn-1',
    titleKey: 'gal_lawn_1',
    category: 'lawn',
    image: HOTEL_IMAGES.partyLawn,
    alt: 'Sprawling outdoor evening party lawn with fairy lights at Hotel Ghunghat Gandhinagar',
    isIllustrative: true
  }
];

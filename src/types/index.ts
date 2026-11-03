export type Language = 'en' | 'gu' | 'hi';

export interface RoomItem {
  id: string;
  nameKey: string;
  descKey: string;
  image: string;
  occupancy: string;
  bedType: string;
  size: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  titleKey: string;
  category: 'exterior' | 'rooms' | 'restaurant' | 'banquet' | 'lawn' | 'events';
  image: string;
  alt: string;
  isIllustrative?: boolean;
}

export interface FacilityItem {
  id: string;
  nameKey: string;
  descKey: string;
  iconName: string;
  verified: boolean;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  adults: number;
  children: number;
  specialRequests: string;
}

export interface EventFormData {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  guestCount: string;
  venueType: string;
  eventDetails: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  enquiryType: string;
  message: string;
}

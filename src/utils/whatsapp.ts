import { HOTEL_INFO } from '../constants/hotelData';
import { BookingFormData, EventFormData } from '../types';

export const createWhatsAppUrl = (message: string): string => {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encoded}`;
};

export const createBookingWhatsAppUrl = (data: BookingFormData): string => {
  const message = `Namaste Hotel Ghunghat Team,

I would like to enquire about a room booking:
- Guest Name: ${data.name}
- Phone: ${data.phone}
- Email: ${data.email || 'Not provided'}
- Check-In: ${data.checkIn}
- Check-Out: ${data.checkOut}
- Room Preference: ${data.roomType}
- Guests: ${data.adults} Adults, ${data.children} Children
${data.specialRequests ? `- Special Requests: ${data.specialRequests}` : ''}

Please confirm current room availability and the best tariff rate. Thank you!`;

  return createWhatsAppUrl(message);
};

export const createEventWhatsAppUrl = (data: EventFormData): string => {
  const message = `Namaste Hotel Ghunghat Team,

I would like to enquire about venue booking for an event:
- Name: ${data.name}
- Phone: ${data.phone}
- Email: ${data.email || 'Not provided'}
- Event Date: ${data.eventDate}
- Event Type: ${data.eventType}
- Venue Preference: ${data.venueType}
- Estimated Guests: ${data.guestCount}
${data.eventDetails ? `- Requirements: ${data.eventDetails}` : ''}

Please check date availability and share banquet/lawn booking details. Thank you!`;

  return createWhatsAppUrl(message);
};

export const createGeneralWhatsAppUrl = (topic: string = 'General Enquiry'): string => {
  const message = `Namaste Hotel Ghunghat Team,
I am contacting regarding ${topic} at Hotel Ghunghat, Gandhinagar. Please assist me with further information.`;
  return createWhatsAppUrl(message);
};

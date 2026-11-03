import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Rooms } from './components/Rooms';
import { Restaurant } from './components/Restaurant';
import { BanquetHall } from './components/BanquetHall';
import { PartyLawn } from './components/PartyLawn';
import { Gallery } from './components/Gallery';
import { Facilities } from './components/Facilities';
import { GoogleReviews } from './components/GoogleReviews';
import { LocationMap } from './components/LocationMap';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { BookingModal } from './components/BookingModal';
import { EventEnquiryModal } from './components/EventEnquiryModal';
import { ThreeDBackground } from './components/ThreeDBackground';

export default function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [initialBookingDates, setInitialBookingDates] = useState<{
    checkIn?: string;
    checkOut?: string;
    adults?: number;
  }>({});

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedVenuePref, setSelectedVenuePref] = useState<string | undefined>();

  const handleOpenBooking = (datesOrRoom?: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    roomType?: string;
  }) => {
    if (datesOrRoom) {
      setInitialBookingDates({
        checkIn: datesOrRoom.checkIn,
        checkOut: datesOrRoom.checkOut,
        adults: datesOrRoom.adults
      });
      if (datesOrRoom.roomType) {
        setSelectedRoomId(datesOrRoom.roomType);
      }
    }
    setIsBookingOpen(true);
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsBookingOpen(true);
  };

  const handleOpenEventEnquiry = (venuePref?: string) => {
    setSelectedVenuePref(venuePref);
    setIsEventModalOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 font-sans selection:bg-[#C5A880]/30 selection:text-slate-900 relative">
        {/* 3D Atmospheric Depth & Floating Gold Particles Background */}
        <ThreeDBackground />
        
        {/* Sticky Header */}
        <Header onOpenBooking={() => handleOpenBooking()} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section with Quick Booking Strip */}
          <Hero onOpenBooking={(data) => handleOpenBooking(data)} />

          {/* About Hotel Ghunghat */}
          <About />

          {/* Rooms & Accommodation */}
          <Rooms onSelectRoom={handleSelectRoom} />

          {/* Restaurant & Dining (Gujarati & Punjabi) */}
          <Restaurant />

          {/* Indoor Banquet Hall */}
          <BanquetHall onOpenEventEnquiry={handleOpenEventEnquiry} />

          {/* Wedding & Celebration Party Lawn */}
          <PartyLawn onOpenEventEnquiry={handleOpenEventEnquiry} />

          {/* Categorized Filterable Gallery */}
          <Gallery />

          {/* Verified Amenities & Facilities */}
          <Facilities />

          {/* Verified Google Business Rating (4.1/5) & Reviews */}
          <GoogleReviews />

          {/* Location & Directions Map */}
          <LocationMap />

          {/* Frequently Asked Questions (FAQ) Section */}
          <FAQ
            onOpenBooking={() => handleOpenBooking()}
            onOpenEventEnquiry={handleOpenEventEnquiry}
          />

          {/* Contact & Inquiry Channels */}
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Action */}
        <WhatsAppFloatingButton />

        {/* Room Booking Enquiry Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false);
            setSelectedRoomId(undefined);
          }}
          initialRoomType={selectedRoomId}
          initialCheckIn={initialBookingDates.checkIn}
          initialCheckOut={initialBookingDates.checkOut}
          initialAdults={initialBookingDates.adults}
        />

        {/* Event & Banquet Enquiry Modal */}
        <EventEnquiryModal
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            setSelectedVenuePref(undefined);
          }}
          initialVenuePref={selectedVenuePref}
        />

      </div>
    </LanguageProvider>
  );
}

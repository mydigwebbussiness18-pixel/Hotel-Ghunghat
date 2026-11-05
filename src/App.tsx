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
import { LuxurySectionDivider } from './components/LuxurySectionDivider';
import { CustomScrollbar } from './components/CustomScrollbar';

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
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 font-sans selection:bg-[#C5A880]/30 selection:text-slate-900 relative w-full max-w-full overflow-x-clip">
        {/* 3D Atmospheric Depth & Floating Gold Particles Background */}
        <ThreeDBackground />

        {/* Premium Built-In Vertical Scrollbar */}
        <CustomScrollbar />
        
        {/* Sticky Header */}
        <Header onOpenBooking={() => handleOpenBooking()} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section with Quick Booking Strip */}
          <Hero onOpenBooking={(data) => handleOpenBooking(data)} />

          {/* Transition: Hero (Dark #0B1325) -> About (Light #FAF8F5) */}
          <LuxurySectionDivider type="curve-dark-to-light" fromColor="#0B1325" toColor="#FAF8F5" />

          {/* About Hotel Ghunghat */}
          <About />

          {/* Transition: About (Light) -> Rooms (Warm Light) */}
          <LuxurySectionDivider type="ornamental-gold" />

          {/* Rooms & Accommodation */}
          <Rooms onSelectRoom={handleSelectRoom} />

          {/* Transition: Rooms (Light #F4EFEA) -> Restaurant (Dark #0B1325) */}
          <LuxurySectionDivider type="curve-light-to-dark" fromColor="#F4EFEA" toColor="#0B1325" />

          {/* Restaurant & Dining (Gujarati & Punjabi) */}
          <Restaurant />

          {/* Transition: Restaurant (Dark #0B1325) -> BanquetHall (Light #FAF8F5) */}
          <LuxurySectionDivider type="curve-dark-to-light" fromColor="#0B1325" toColor="#FAF8F5" />

          {/* Indoor Banquet Hall */}
          <BanquetHall onOpenEventEnquiry={handleOpenEventEnquiry} />

          {/* Transition: BanquetHall (Light #FAF8F5) -> PartyLawn (Dark #0F1E36) */}
          <LuxurySectionDivider type="curve-light-to-dark" fromColor="#FAF8F5" toColor="#0F1E36" />

          {/* Wedding & Celebration Party Lawn */}
          <PartyLawn onOpenEventEnquiry={handleOpenEventEnquiry} />

          {/* Transition: PartyLawn (Dark #0F1E36) -> Gallery (Light #FAF8F5) */}
          <LuxurySectionDivider type="curve-dark-to-light" fromColor="#0F1E36" toColor="#FAF8F5" />

          {/* Categorized Filterable Gallery */}
          <Gallery />

          {/* Transition: Gallery (Light) -> Facilities (Light Neutral) */}
          <LuxurySectionDivider type="geometric-crest" />

          {/* Verified Amenities & Facilities */}
          <Facilities />

          {/* Transition: Facilities (Light) -> GoogleReviews (Light) */}
          <LuxurySectionDivider type="ornamental-gold" />

          {/* Verified Google Business Rating (4.1/5) & Reviews */}
          <GoogleReviews />

          {/* Transition: GoogleReviews (Light) -> LocationMap (Light) */}
          <LuxurySectionDivider type="geometric-crest" />

          {/* Location & Directions Map */}
          <LocationMap />

          {/* Transition: LocationMap (Light) -> FAQ (Light) */}
          <LuxurySectionDivider type="ornamental-gold" />

          {/* Frequently Asked Questions (FAQ) Section */}
          <FAQ
            onOpenBooking={() => handleOpenBooking()}
            onOpenEventEnquiry={handleOpenEventEnquiry}
          />

          {/* Transition: FAQ (Light) -> Contact (Warm Light) */}
          <LuxurySectionDivider type="geometric-crest" />

          {/* Contact & Inquiry Channels */}
          <Contact />

          {/* Transition: Contact (Light #F4EFEA) -> Footer (Dark #0B1325) */}
          <LuxurySectionDivider type="curve-light-to-dark" fromColor="#F4EFEA" toColor="#0B1325" />
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

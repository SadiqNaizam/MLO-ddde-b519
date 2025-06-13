import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import MainNavigationSidebar from '@/components/layout/MainNavigationSidebar';
import TripCalculatorWidget from '@/components/TripCalculatorWidget';
import Footer from '@/components/layout/Footer';
import ItinerarySuggestionCard from '@/components/ItinerarySuggestionCard';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
// import { Menu } from 'lucide-react'; // Not adding an explicit trigger button for sidebar to avoid clash with Header's

const sampleItineraries = [
  {
    id: "sg1",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    title: "Golden Triangle Express",
    description: "A whirlwind tour of Delhi, Agra, and Jaipur. Perfect for a first-time cultural immersion.",
    duration: "5 Days / 4 Nights",
    estimatedCost: 35000,
    type: "Classic",
  },
  {
    id: "sg2",
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ED402ea80693?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    title: "Goan Beach Holiday",
    description: "Relax on the sunny beaches of Goa, enjoy the vibrant nightlife and Portuguese heritage.",
    duration: "7 Days / 6 Nights",
    estimatedCost: 48000,
    type: "Beach Fun",
  },
];

const TripCalculatorPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  console.log('TripCalculatorPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-neutral-800">
      <Header />

      {/* MainNavigationSidebar is included and its state is managed.
          The Header component has its own mobile menu. This page doesn't add a new trigger
          for MainNavigationSidebar to avoid UI clutter, but the component is functional.
      */}
      <MainNavigationSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10 mt-4">
          <h1 className="text-4xl font-bold text-amber-700 tracking-tight sm:text-5xl">Plan Your Perfect Indian Getaway</h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Use our interactive calculator to estimate your trip costs and explore tailored suggestions for your dream vacation in India.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left column for TripCalculatorWidget (sticky on larger screens) */}
          <section id="trip-calculator-widget" className="w-full lg:w-2/5 lg:sticky lg:top-24">
            <TripCalculatorWidget />
          </section>

          {/* Right column for suggestions and actions */}
          <div className="w-full lg:w-3/5 space-y-10 lg:space-y-12">
            <section id="trip-actions" className="text-center">
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-amber-200 p-2 sm:p-4">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl text-amber-700">Ready for Your Adventure?</CardTitle>
                  <CardDescription className="text-neutral-600 mt-1 text-base">
                    Happy with your estimate? Let's move to the next step!
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-2">
                  <p className="text-sm text-muted-foreground mb-6">
                    Click below to finalize your details and proceed with booking your unforgettable journey through India. Your choices from the calculator can be pre-filled.
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 px-8 text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" 
                    asChild
                  >
                    <Link to="/booking">Book Now & Finalize Details</Link>
                  </Button>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground justify-center pt-4 mt-2">
                    <p>You can review and adjust all details on the booking page.</p>
                </CardFooter>
              </Card>
            </section>

            <section id="itinerary-suggestions">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-700 mb-3">
                Need Some Inspiration?
              </h2>
              <p className="text-center text-neutral-600 mb-8 max-w-xl mx-auto">
                Here are a few popular itineraries. Your actual suggestions might be tailored based on your calculator inputs in a full implementation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sampleItineraries.map((itinerary) => (
                  <ItinerarySuggestionCard key={itinerary.id} {...itinerary} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TripCalculatorPage;
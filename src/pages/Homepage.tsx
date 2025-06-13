import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DestinationCard from '@/components/DestinationCard';
import OfferHighlightCard from '@/components/OfferHighlightCard';
import ItinerarySuggestionCard from '@/components/ItinerarySuggestionCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from '@/components/ui/aspect-ratio'; // For Carousel items
import { ArrowRight, Compass, Sparkles, Route } from 'lucide-react';

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  const carouselItems = [
    {
      imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Taj Mahal, Agra",
      title: "Discover Iconic India",
      subtitle: "From majestic monuments to serene landscapes.",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1549996647-190b7190c862?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Kerala Backwaters",
      title: "Tranquil Backwaters & Lush Nature",
      subtitle: "Experience the serene beauty of South India.",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1599661046283-a79b9a543c50?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Rajasthan Fort",
      title: "Royal Rajasthan Awaits",
      subtitle: "Explore vibrant culture and majestic forts.",
    },
  ];

  const popularDestinations = [
    { id: "agra", imageUrl: "https://images.unsplash.com/photo-1587135940150-435222871a9b?q=80&w=800&auto=format&fit=crop", name: "Agra", tagline: "Witness the timeless beauty of the Taj Mahal and Mughal grandeur." },
    { id: "jaipur", imageUrl: "https://images.unsplash.com/photo-1603261974089-3a69353d89c0?q=80&w=800&auto=format&fit=crop", name: "Jaipur", tagline: "Explore the Pink City's royal palaces, vibrant bazaars, and rich history." },
    { id: "kerala", imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc089963?q=80&w=800&auto=format&fit=crop", name: "Kerala", tagline: "Discover serene backwaters, lush tea plantations, and tranquil beaches." },
  ];

  const highlightedOffer = {
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop",
    title: "Early Bird Summer Deals",
    description: "Book your summer escape now and enjoy up to 25% off on select tours and hotel stays across India. Limited time offer!",
    discountBadge: "Up to 25% OFF",
    ctaText: "Explore Summer Offers",
    ctaLink: "/exclusive-offers",
  };

  const suggestedItineraries = [
    { id: "golden-triangle", imageUrl: "https://images.unsplash.com/photo-1588422206415-5d70ea5e0852?q=80&w=800&auto=format&fit=crop", title: "Classic Golden Triangle", description: "A whirlwind tour of Delhi, Agra, and Jaipur – India's historical heartland.", duration: "7 Days / 6 Nights", estimatedCost: 45000, type: "Most Popular" as const },
    { id: "south-india-splendor", imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800&auto=format&fit=crop", title: "South India Splendor", description: "Temples, beaches, and backwaters – experience the diverse charm of the South.", duration: "10 Days / 9 Nights", estimatedCost: 65000, type: "Cultural Immersion" as const },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-amber-50/30">
      <Header />
      <main className="flex-grow">
        {/* Hero Carousel Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
          <Carousel
            opts={{ loop: true }}
            className="w-full h-full"
            autoplayDelay={5000}
          >
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative w-full h-full">
                    <AspectRatio ratio={16 / 9} className="h-full">
                      <img src={item.imageUrl} alt={item.alt} className="object-cover w-full h-full" />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight animate-fade-in-down">{item.title}</h1>
                      <p className="mt-2 md:mt-4 text-lg md:text-xl text-gray-200 max-w-2xl animate-fade-in-up delay-200">{item.subtitle}</p>
                      <Button asChild size="lg" className="mt-6 md:mt-8 bg-amber-500 hover:bg-amber-600 text-white animate-fade-in-up delay-500">
                        <Link to="/explore-destinations">
                          Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
          </Carousel>
        </section>

        {/* Introduction/Value Proposition Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4">
              Your Journey to Incredible India Begins Here
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              IndiVoyage is your personal travel concierge, dedicated to helping you discover, plan, and book
              your perfect Indian adventure. From majestic mountains to serene backwaters, vibrant cities to ancient temples,
              let us guide you through the wonders of India.
            </p>
            <div className="flex justify-center gap-4">
                <Button asChild size="lg" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700">
                    <Link to="/explore-destinations">
                        <Compass className="mr-2 h-5 w-5" /> Explore Destinations
                    </Link>
                </Button>
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                    <Link to="/trip-calculator">
                        <Route className="mr-2 h-5 w-5" /> Plan Your Trip
                    </Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section className="py-12 md:py-16 bg-amber-50/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-700 mb-10">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {popularDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  id={dest.id}
                  imageUrl={dest.imageUrl}
                  name={dest.name}
                  tagline={dest.tagline}
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild size="lg" variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-100">
                <Link to="/explore-destinations">
                  View All Destinations <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Exclusive Offer Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="lg:w-1/2 text-center lg:text-left">
                    <Sparkles className="h-12 w-12 text-amber-300 mx-auto lg:mx-0 mb-4" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't Miss Our Exclusive Offers!</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Discover amazing deals and discounts on tours, stays, and experiences across India.
                        Our curated offers make your dream trip even more accessible.
                    </p>
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        <Link to={highlightedOffer.ctaLink}>
                            {highlightedOffer.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
                <div className="lg:w-1/2 w-full max-w-md mx-auto">
                     <OfferHighlightCard {...highlightedOffer} />
                </div>
            </div>
          </div>
        </section>

        {/* Curated Itineraries Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-700 mb-10">
              Inspiring Itineraries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {suggestedItineraries.map((itinerary) => (
                <ItinerarySuggestionCard
                  key={itinerary.id}
                  {...itinerary}
                />
              ))}
            </div>
             <div className="text-center mt-10">
                <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                    <Link to="/explore-destinations"> {/* Or a dedicated itineraries page if exists */}
                        Discover More Itineraries <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
        
        {/* Trip Calculator CTA Section */}
        <section className="py-12 md:py-20 bg-amber-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Adventure?</h2>
            <p className="text-lg max-w-xl mx-auto mb-8">
              Use our intuitive Trip Calculator to estimate costs and tailor your journey to your preferences.
              Planning your Indian dream trip has never been easier!
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white text-amber-700 hover:bg-amber-50 border-transparent">
              <Link to="/trip-calculator">
                Launch Trip Calculator <Route className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
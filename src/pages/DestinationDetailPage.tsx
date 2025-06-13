import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MainNavigationSidebar from '@/components/layout/MainNavigationSidebar';

// Shadcn/ui Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Lucide React Icons
import { MapPin, Landmark, Image as ImageIcon, CalendarClock, Lightbulb, Users, HelpCircle, Star, ChevronRight, Ticket, Route } from 'lucide-react';

const destinationData = {
  name: "Jaipur, The Pink City",
  tagline: "Explore the majestic forts, vibrant bazaars, and rich history of Rajasthan's capital.",
  images: [
    { src: "https://images.unsplash.com/photo-1602309882023-77a74d1ee00a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFpcHVyJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", alt: "Hawa Mahal facade in Jaipur" },
    { src: "https://images.unsplash.com/photo-1594009003518-875f1575cbb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YW1iZXIlMjBmb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60", alt: "Amber Fort overlooking Maota Lake" },
    { src: "https://images.unsplash.com/photo-1600900547272-c74998378c99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amFsJTIwbWFoYWwlMjBqYWlwdXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60", alt: "Jal Mahal palace in Man Sagar Lake" },
    { src: "https://images.unsplash.com/photo-1567202474093-a7c8877a0778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2l0eSUyMHBsYWNlJTIwamFpcHVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60", alt: "City Palace courtyard in Jaipur" },
  ],
  culturalSignificance: "Jaipur, the capital of Rajasthan, is renowned for its distinctive pink-hued buildings, earning it the nickname 'The Pink City'. Founded in 1727 by Maharaja Sawai Jai Singh II, it was one of India's first planned cities. Its architecture is a splendid blend of Rajput and Mughal styles. The city is a vibrant tapestry of ancient traditions, bustling markets, and royal heritage, forming a key part of India's famous Golden Triangle tourist circuit.",
  keyAttractions: [
    { name: "Amber Fort", description: "A majestic fort-palace with intricate carvings, sprawling courtyards, and stunning views of Maota Lake." },
    { name: "Hawa Mahal", description: "The 'Palace of Winds', an iconic five-story honeycomb-like facade with 953 small windows (jharokhas)." },
    { name: "City Palace", description: "A royal residence complex with museums showcasing historical artifacts, royal costumes, and art." },
    { name: "Jantar Mantar", description: "A UNESCO World Heritage site, it's an astronomical observatory with nineteen colossal architectural instruments built in the early 18th century." },
    { name: "Nahargarh Fort", description: "Perched on the Aravalli Hills, it offers panoramic views of the city, especially breathtaking at sunset." },
    { name: "Albert Hall Museum", description: "The oldest museum of Rajasthan, housing a rich collection of artifacts including paintings, carpets, ivory, stone, metal sculptures, and colorful crystal works." },
  ],
  bestTimeToVisit: "The best time to visit Jaipur is during the winter months, from October to March. During this period, the weather is pleasant, with daytime temperatures ranging from 15°C to 25°C (59°F to 77°F), making it ideal for sightseeing and outdoor activities. Summers (April to June) are extremely hot, and monsoons (July to September) bring humidity, though the city looks beautiful post-rain.",
  localTips: [
    "Bargain respectfully in local markets like Johari Bazaar (jewelry) and Bapu Bazaar (textiles, handicrafts).",
    "Try authentic Rajasthani cuisine, especially Dal Baati Churma, Laal Maas, and Ghewar (sweet).",
    "Dress modestly when visiting religious sites (temples, mosques). Covering shoulders and knees is advisable.",
    "Consider hiring a government-approved local guide for a richer historical context at forts and palaces.",
    "Auto-rickshaws and ride-hailing apps are common for local transport; agree on fares beforehand for autos.",
  ],
  userReviews: [
    { id: 'r1', user: "Aisha K.", rating: 5, comment: "Absolutely stunning city! The forts are incredible, and the local food is a must-try. Hawa Mahal at sunrise was magical." },
    { id: 'r2', user: "John B.", rating: 4, comment: "Loved the vibrant markets and the rich history. It can get a bit crowded in peak season, so plan accordingly. Amber Fort is a highlight!" },
    { id: 'r3', user: "Priya S.", rating: 5, comment: "Jaipur has so much character. The City Palace was fascinating. People are friendly. Highly recommend a guided tour for Jantar Mantar." },
  ],
  faqs: [
    { id: 'f1', question: "How many days are ideal for visiting Jaipur?", answer: "A minimum of 2-3 days is recommended to cover the main attractions comfortably. If you want to explore more deeply and enjoy shopping, 4-5 days would be better." },
    { id: 'f2', question: "Is Jaipur safe for solo female travelers?", answer: "Jaipur is generally considered safe for solo female travelers. However, like any major tourist destination, it's important to take standard precautions, be aware of your surroundings, especially at night, and dress modestly to respect local culture." },
    { id: 'f3', question: "What is the local language in Jaipur?", answer: "The primary languages spoken are Hindi and Rajasthani (including dialects like Dhundhari). English is widely understood in tourist areas, hotels, and shops." },
  ],
};

const DestinationDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  console.log('DestinationDetailPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-stone-800">
      <Header />
      <MainNavigationSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/explore-destinations">Explore Destinations</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{destinationData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Destination Title and Tagline */}
        <section className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-700 mb-2 tracking-tight">
            {destinationData.name}
          </h1>
          <p className="text-lg sm:text-xl text-orange-600">
            {destinationData.tagline}
          </p>
        </section>

        {/* Image Carousel */}
        <section className="mb-12">
          <Carousel
            opts={{ loop: true }}
            className="w-full max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden"
          >
            <CarouselContent>
              {destinationData.images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img src={image.src} alt={image.alt} className="object-cover w-full h-full" />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </Carousel>
        </section>

        {/* Tabs for Detailed Information */}
        <section className="mb-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-amber-100 p-1 h-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white py-2.5"><Landmark className="inline-block h-5 w-5 mr-2" />Overview</TabsTrigger>
              <TabsTrigger value="attractions" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white py-2.5"><ImageIcon className="inline-block h-5 w-5 mr-2" />Attractions</TabsTrigger>
              <TabsTrigger value="best-time" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white py-2.5"><CalendarClock className="inline-block h-5 w-5 mr-2" />Best Time</TabsTrigger>
              <TabsTrigger value="tips" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white py-2.5"><Lightbulb className="inline-block h-5 w-5 mr-2" />Local Tips</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="py-6 px-2 sm:px-4 bg-white rounded-b-md shadow">
              <h3 className="text-2xl font-semibold text-amber-700 mb-3">Cultural Significance</h3>
              <p className="text-stone-700 leading-relaxed">{destinationData.culturalSignificance}</p>
            </TabsContent>
            <TabsContent value="attractions" className="py-6 px-2 sm:px-4 bg-white rounded-b-md shadow">
              <h3 className="text-2xl font-semibold text-amber-700 mb-4">Key Attractions</h3>
              <ul className="space-y-4">
                {destinationData.keyAttractions.map((attraction, index) => (
                  <li key={index} className="flex items-start">
                    <MapPin className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-stone-800">{attraction.name}</h4>
                      <p className="text-sm text-stone-600">{attraction.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="best-time" className="py-6 px-2 sm:px-4 bg-white rounded-b-md shadow">
              <h3 className="text-2xl font-semibold text-amber-700 mb-3">Best Time to Visit</h3>
              <p className="text-stone-700 leading-relaxed">{destinationData.bestTimeToVisit}</p>
            </TabsContent>
            <TabsContent value="tips" className="py-6 px-2 sm:px-4 bg-white rounded-b-md shadow">
              <h3 className="text-2xl font-semibold text-amber-700 mb-4">Local Tips & Etiquette</h3>
              <ul className="space-y-3 list-disc list-inside text-stone-700">
                {destinationData.localTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </section>

        {/* Accordion for Reviews and FAQs */}
        <section className="mb-12 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-amber-700"><Users className="h-6 w-6 mr-2 text-orange-500" /> Traveller Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {destinationData.userReviews.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {destinationData.userReviews.map((review) => (
                    <AccordionItem value={review.id} key={review.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full">
                          <span>{review.user}</span>
                          <div className="flex items-center">
                            {Array(review.rating).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                            {Array(5 - review.rating).fill(0).map((_, i) => <Star key={i+review.rating} className="h-4 w-4 text-gray-300" />)}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-stone-600">{review.comment}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-stone-600">No reviews yet for this destination.</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-amber-700"><HelpCircle className="h-6 w-6 mr-2 text-orange-500" /> Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {destinationData.faqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {destinationData.faqs.map((faq) => (
                    <AccordionItem value={faq.id} key={faq.id}>
                      <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-stone-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-stone-600">No FAQs available for this destination.</p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Call to Action Buttons */}
        <section className="py-8 text-center bg-amber-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-amber-800 mb-4">Ready to Explore {destinationData.name}?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base shadow-md transition-transform hover:scale-105">
              <Link to="/booking">
                <Ticket className="mr-2 h-5 w-5" /> Book Your Trip
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-semibold text-base shadow-md transition-transform hover:scale-105">
              <Link to="/trip-calculator">
                <Route className="mr-2 h-5 w-5" /> Plan with Trip Calculator
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationDetailPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MainNavigationSidebar from '@/components/layout/MainNavigationSidebar';
import DestinationCard from '@/components/DestinationCard';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button'; // For potential filter actions or if sidebar needs an explicit trigger
import { Search, Filter } from 'lucide-react';

// Sample data for destinations
const sampleDestinations = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=80',
    name: 'Taj Mahal, Agra',
    tagline: 'An ivory-white marble mausoleum, a timeless symbol of eternal love and architectural grandeur.',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1593604340848-54df918358aff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=400&q=80',
    name: 'Kerala Backwaters',
    tagline: 'Serene network of lagoons, lakes, and canals offering tranquil houseboat experiences amidst lush greenery.',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1599553139884-538007509542?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmFyYW5hc2l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=80',
    name: 'Varanasi Ghats',
    tagline: 'Spiritual heart of India, with ancient ghats along the Ganges, vibrant rituals, and profound experiences.',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1544983354-098ed638397d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFqYXN0aGFuJTIwZm9ydHxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=400&q=80',
    name: 'Jaipur, Rajasthan',
    tagline: 'The Pink City, famed for its majestic forts, opulent palaces, and rich Rajputana heritage.',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1600947740944-9dedf9515098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hJTIwYmVhY2hlc3xlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=400&q=80',
    name: 'Goa Beaches',
    tagline: 'Sun-kissed shores, vibrant nightlife, Portuguese architecture, and a laid-back tropical vibe.',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1585372204771-2111ac506121?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmlzaGlrZXNofGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=80',
    name: 'Rishikesh & Himalayas',
    tagline: 'Yoga capital of the world, nestled in the Himalayan foothills, offering adventure and spiritual solace.',
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1603288905120-56695e4c08a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVubmFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=80',
    name: 'Munnar Tea Gardens',
    tagline: 'Rolling hills carpeted with verdant tea plantations, offering breathtaking vistas and cool climes.',
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1577100685290-e0193103634d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=80',
    name: 'Hampi Ruins',
    tagline: 'UNESCO World Heritage site with ancient temples, royal enclosures, and intriguing boulder-strewn landscapes.',
  }
];

const regionOptions = ["North India", "South India", "West India", "East India", "Central India", "North-East India"];
const interestOptions = ["Historical", "Spiritual", "Adventure", "Wildlife", "Beaches", "Mountains", "Cultural", "Urban"];

const ExploreDestinationsPage: React.FC = () => {
  console.log('ExploreDestinationsPage loaded');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');

  // Placeholder for pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sampleDestinations.length / 8); // Assuming 8 items per page

  // Placeholder for filtering logic
  const filteredDestinations = sampleDestinations.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
    // Further filtering logic for region and interest can be added here
  ).slice((currentPage - 1) * 8, currentPage * 8);


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-neutral-800">
      <Header />
      <MainNavigationSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section aria-labelledby="page-title" className="mb-10 text-center">
          <h1 id="page-title" className="text-4xl sm:text-5xl font-extrabold text-amber-700 mb-3 tracking-tight">
            Explore Incredible India
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Embark on a journey through diverse landscapes, ancient traditions, and vibrant cultures. Find your next adventure here.
          </p>
        </section>

        {/* Filter and Search Controls */}
        <section aria-labelledby="filter-controls-heading" className="mb-10 p-6 bg-white rounded-xl shadow-lg border border-neutral-200">
          <h2 id="filter-controls-heading" className="text-xl font-semibold text-neutral-700 mb-6 flex items-center">
            <Filter className="w-6 h-6 mr-3 text-amber-600" />
            Refine Your Search
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="md:col-span-1">
              <label htmlFor="search-destination" className="block text-sm font-medium text-neutral-700 mb-1">
                Search Destination
              </label>
              <div className="relative">
                <Input
                  id="search-destination"
                  type="search"
                  placeholder="e.g., Taj Mahal, Goa, Kerala..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              </div>
            </div>
            <div>
              <label htmlFor="filter-region" className="block text-sm font-medium text-neutral-700 mb-1">
                Filter by Region
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger id="filter-region" className="w-full">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Regions</SelectLabel>
                    <SelectItem value="">All Regions</SelectItem>
                    {regionOptions.map(region => (
                      <SelectItem key={region} value={region.toLowerCase().replace(/\s+/g, '-')}>{region}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="filter-interest" className="block text-sm font-medium text-neutral-700 mb-1">
                Filter by Interest
              </label>
              <Select value={selectedInterest} onValueChange={setSelectedInterest}>
                <SelectTrigger id="filter-interest" className="w-full">
                  <SelectValue placeholder="All Interests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Interests</SelectLabel>
                    <SelectItem value="">All Interests</SelectItem>
                    {interestOptions.map(interest => (
                      <SelectItem key={interest} value={interest.toLowerCase().replace(/\s+/g, '-')}>{interest}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* A Search/Filter button could be added if needed, e.g., for more complex filtering logic not on-change
            <Button className="md:col-start-3">Apply Filters</Button> */}
          </div>
        </section>

        {/* Destination Grid */}
        <section aria-labelledby="destinations-grid-heading">
          <h2 id="destinations-grid-heading" className="sr-only">Available Destinations</h2>
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  id={destination.id}
                  imageUrl={destination.imageUrl}
                  name={destination.name}
                  tagline={destination.tagline}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-500">No destinations match your current filters.</p>
              <p className="text-neutral-400 mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {filteredDestinations.length > 0 && totalPages > 1 && (
          <section aria-label="Pagination" className="flex justify-center mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(currentPage - 1); }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === i + 1}
                      onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* Example Ellipsis, can be made dynamic */}
                {/* <PaginationItem><PaginationEllipsis /></PaginationItem> */}
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(currentPage + 1);}}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ExploreDestinationsPage;
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OfferHighlightCard from '@/components/OfferHighlightCard';
import MainNavigationSidebar from '@/components/layout/MainNavigationSidebar';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


// Lucide Icons
import { Menu as MenuIcon, Filter, PackageOpen, Search } from 'lucide-react';

interface Offer {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  discountBadge?: string;
  ctaText: string;
  ctaLink: string; // e.g., "/booking?offerId=123" or "/destination-detail/some-destination"
  category: string; // For filtering
  searchTags: string[]; // For text search
  validity: string;
}

const sampleOffersData: Offer[] = [
  {
    id: 'offer1',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop', // Taj Mahal
    title: 'Iconic Taj Mahal Getaway',
    description: 'Experience the majestic Taj Mahal and explore Agra\'s rich history. Includes guided tours and 2 nights stay. Valid until Nov 30, 2024.',
    discountBadge: '15% OFF',
    ctaText: 'Explore Offer',
    ctaLink: '/destination-detail?id=agra-taj-mahal',
    category: 'cultural',
    searchTags: ['taj mahal', 'agra', 'mughal', 'heritage', 'iconic'],
    validity: 'Valid until Nov 30, 2024',
  },
  {
    id: 'offer2',
    imageUrl: 'https://images.unsplash.com/photo-1526772857099-1bf47fSAef28?q=80&w=800&auto=format&fit=crop', // Kerala
    title: 'Serene Kerala Backwaters Cruise',
    description: 'Relax on a traditional houseboat cruising through Kerala\'s tranquil backwaters. Includes all meals. Valid until Dec 15, 2024.',
    discountBadge: 'Save ₹5000',
    ctaText: 'Book Cruise',
    ctaLink: '/booking?offerId=kerala-backwaters',
    category: 'nature',
    searchTags: ['kerala', 'backwaters', 'houseboat', 'nature', 'relax'],
    validity: 'Valid until Dec 15, 2024',
  },
  {
    id: 'offer3',
    imageUrl: 'https://images.unsplash.com/photo-1599661046283-9ba8f6060756?q=80&w=800&auto=format&fit=crop', // Rajasthan
    title: 'Royal Rajasthan Heritage Tour',
    description: 'Discover the forts and palaces of Rajasthan. 7-day tour covering Jaipur, Udaipur, and Jodhpur. Valid for September bookings.',
    discountBadge: 'Early Bird Special',
    ctaText: 'View Itinerary',
    ctaLink: '/destination-detail?id=rajasthan-heritage',
    category: 'cultural',
    searchTags: ['rajasthan', 'forts', 'palaces', 'heritage', 'jaipur', 'udaipur'],
    validity: 'Valid for September bookings',
  },
  {
    id: 'offer4',
    imageUrl: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=800&auto=format&fit=crop', // Goa
    title: 'Goa Beach Paradise Package',
    description: 'Enjoy sun, sand, and sea with our all-inclusive Goa package. 3 nights stay at a beach resort. Valid for monsoon season.',
    ctaText: 'Claim Deal',
    ctaLink: '/booking?offerId=goa-beach-package',
    category: 'beaches',
    searchTags: ['goa', 'beach', 'sun', 'sand', 'resort'],
    validity: 'Valid for monsoon season',
  },
  {
    id: 'offer5',
    imageUrl: 'https://images.unsplash.com/photo-1519904285928-dd50076c8a5c?q=80&w=800&auto=format&fit=crop', // Himalayas
    title: 'Himalayan Adventure Trek',
    description: 'Embark on a thrilling trek in the Indian Himalayas. Experienced guides and equipment included. Offer valid for groups of 4+.',
    discountBadge: 'Group Discount!',
    ctaText: 'Start Adventure',
    ctaLink: '/destination-detail?id=himalayan-trek',
    category: 'adventure',
    searchTags: ['himalayas', 'trekking', 'adventure', 'mountains'],
    validity: 'Offer valid for groups of 4+',
  },
  {
    id: 'offer6',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e078aa2?q=80&w=800&auto=format&fit=crop', // Wildlife Safari
    title: 'Wildlife Safari Expedition',
    description: 'Explore India\'s rich biodiversity with a guided wildlife safari in a national park. Jeep & guide included. Valid for weekday bookings.',
    ctaText: 'Book Safari',
    ctaLink: '/booking?offerId=wildlife-safari',
    category: 'nature',
    searchTags: ['wildlife', 'safari', 'national park', 'nature', 'animals'],
    validity: 'Valid for weekday bookings',
  },
    {
    id: 'offer7',
    imageUrl: 'https://images.unsplash.com/photo-1600928457438-252f7580c704?q=80&w=800&auto=format&fit=crop', // Varanasi
    title: 'Spiritual Varanasi Experience',
    description: 'Immerse yourself in the spiritual heart of India with a guided tour of Varanasi\'s ghats and temples. Includes boat ride. Valid until Jan 2025.',
    discountBadge: '10% OFF',
    ctaText: 'Discover Varanasi',
    ctaLink: '/destination-detail?id=varanasi-spiritual',
    category: 'cultural',
    searchTags: ['varanasi', 'ganges', 'spiritual', 'temples', 'ghats'],
    validity: 'Valid until Jan 2025',
  },
];

const filterCategories = [
  { value: "all", label: "All Categories" },
  { value: "cultural", label: "Cultural & Heritage" },
  { value: "nature", label: "Nature & Wildlife" },
  { value: "beaches", label: "Beach Holidays" },
  { value: "adventure", label: "Adventure & Trekking" },
];

const ITEMS_PER_PAGE = 6;

const ExclusiveOffersPage = () => {
  console.log('ExclusiveOffersPage loaded');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // States for filter inputs, applied after clicking "Apply Filters"
  const [currentSearchTermInput, setCurrentSearchTermInput] = useState('');
  const [currentCategoryInput, setCurrentCategoryInput] = useState('all');

  const handleApplyFilters = () => {
    setSearchTerm(currentSearchTermInput);
    setSelectedCategory(currentCategoryInput);
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const handleResetFilters = () => {
    setCurrentSearchTermInput('');
    setCurrentCategoryInput('all');
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const filteredOffers = useMemo(() => {
    return sampleOffersData.filter(offer => {
      const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
      const matchesSearch = searchTerm.trim() === '' ||
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.searchTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredOffers.length / ITEMS_PER_PAGE);
  const paginatedOffers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOffers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOffers, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-orange-50/30">
      <Header />
      <MainNavigationSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <ScrollArea className="flex-1">
        <main className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-amber-700 sm:text-4xl lg:text-5xl">
                Exclusive Travel Offers
              </h1>
              <p className="mt-2 text-base text-gray-600 sm:text-lg">
                Discover amazing deals for your next Indian adventure.
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden flex-shrink-0 border-amber-500 text-amber-600 hover:bg-amber-50"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>

          {/* Filters Section */}
          <Card className="mb-8 md:mb-12 shadow-lg border-orange-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-amber-700 flex items-center">
                <Filter className="mr-2 h-5 w-5" /> Find Your Perfect Deal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                <div className="lg:col-span-2">
                  <Label htmlFor="search-offer" className="text-sm font-medium text-gray-700">
                    Search by Keyword
                  </Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="search-offer"
                      type="text"
                      placeholder="e.g., Goa, Taj Mahal, Safari"
                      value={currentSearchTermInput}
                      onChange={(e) => setCurrentSearchTermInput(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category-select" className="text-sm font-medium text-gray-700">
                    Filter by Category
                  </Label>
                  <Select value={currentCategoryInput} onValueChange={setCurrentCategoryInput}>
                    <SelectTrigger id="category-select" className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterCategories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 md:gap-2 lg:col-span-1 md:col-span-3 ">
                  <Button onClick={handleApplyFilters} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Apply Filters
                  </Button>
                   <Button onClick={handleResetFilters} variant="outline" className="w-full">
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Offers Grid */}
          {paginatedOffers.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {paginatedOffers.map(offer => (
                <OfferHighlightCard
                  key={offer.id}
                  imageUrl={offer.imageUrl}
                  title={offer.title}
                  description={`${offer.description} (Validity: ${offer.validity})`}
                  discountBadge={offer.discountBadge}
                  ctaText={offer.ctaText}
                  ctaLink={offer.ctaLink}
                />
              ))}
            </section>
          ) : (
            <div className="text-center py-16">
              <PackageOpen className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">No Offers Found</h3>
              <p className="mt-2 text-md text-gray-500">
                Try adjusting your filters or check back later for new deals!
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <section className="flex justify-center mt-10 md:mt-16">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                  {/* Basic pagination links - for more complex scenarios, add ellipsis logic */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(pageNumber); }}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </section>
          )}
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default ExclusiveOffersPage;
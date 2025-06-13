import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays, IndianRupee, Info, Plane } from 'lucide-react';

interface ItinerarySuggestionCardProps {
  id: string; // Unique identifier for the itinerary
  imageUrl: string;
  title: string;
  description: string;
  duration: string; // e.g., "7 Days / 6 Nights"
  estimatedCost: number;
  type?: 'Peak Season' | 'Off-Beat' | 'Budget-Friendly' | string; // For the badge
}

const ItinerarySuggestionCard: React.FC<ItinerarySuggestionCardProps> = ({
  id,
  imageUrl,
  title,
  description,
  duration,
  estimatedCost,
  type,
}) => {
  console.log('ItinerarySuggestionCard loaded for:', title);

  return (
    <Card className="w-full max-w-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-white group">
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <Link to={`/destination-detail?itineraryId=${id}`}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Beautiful+India'}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </AspectRatio>
        {type && (
          <Badge 
            variant={type === 'Budget-Friendly' ? 'secondary' : 'default'} 
            className="absolute top-3 right-3 z-10 bg-amber-500 text-white border-amber-500"
          >
            {type}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="p-4 md:p-6 space-y-3 flex-grow">
        <CardTitle className="text-xl lg:text-2xl font-bold text-amber-700 hover:text-amber-800 transition-colors">
          <Link to={`/destination-detail?itineraryId=${id}`}>{title}</Link>
        </CardTitle>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        
        <div className="space-y-2 pt-2">
          <div className="flex items-center text-sm text-gray-700">
            <CalendarDays className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-base font-medium text-green-700">
            <IndianRupee className="w-5 h-5 mr-1 text-green-600 flex-shrink-0" />
            <span>{estimatedCost.toLocaleString('en-IN')} (Estimated)</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 md:p-5 bg-slate-50 border-t flex flex-col sm:flex-row gap-2 sm:justify-between">
        <Button variant="outline" asChild className="w-full sm:w-auto border-amber-600 text-amber-700 hover:bg-amber-50 hover:text-amber-800">
          <Link to={`/destination-detail?itineraryId=${id}`} className="flex items-center justify-center">
            <Info className="w-4 h-4 mr-2" /> View Details
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white">
          <Link to="/booking" className="flex items-center justify-center">
            <Plane className="w-4 h-4 mr-2" /> Book Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ItinerarySuggestionCard;
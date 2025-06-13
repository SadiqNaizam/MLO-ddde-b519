import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Eye } from 'lucide-react';

interface DestinationCardProps {
  id?: string | number; // Optional ID, useful for list keys
  imageUrl: string;
  name: string;
  tagline: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  imageUrl,
  name,
  tagline,
}) => {
  console.log('DestinationCard loaded for:', name);

  const detailPagePath = "/destination-detail"; // As per App.tsx

  return (
    <Card className="group w-full overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.03] border border-gray-200 hover:border-gray-300">
      <div className="relative overflow-hidden">
        <AspectRatio ratio={4 / 3}>
          <img
            src={imageUrl || 'https://via.placeholder.com/400x300?text=Explore+India'}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-4 space-y-1 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-indigo-700 transition-colors duration-200">
          {name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]"> {/* Approx 2 lines of text-sm */}
          {tagline}
        </p>
        
        <div className="pt-2 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-300 ease-in-out overflow-hidden">
          <Button asChild variant="outline" size="sm" className="w-full text-indigo-600 border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-400">
            <Link to={detailPagePath}>
              <Eye className="mr-2 h-4 w-4" />
              View More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
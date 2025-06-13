import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn

interface OfferHighlightCardProps {
  imageUrl: string;
  title: string;
  description: string;
  discountBadge?: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

const OfferHighlightCard: React.FC<OfferHighlightCardProps> = ({
  imageUrl,
  title,
  description,
  discountBadge,
  ctaText,
  ctaLink,
  className,
}) => {
  console.log('OfferHighlightCard loaded for:', title);

  return (
    <Card className={cn("w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-gradient-to-br from-amber-50 via-orange-50 to-red-50", className)}>
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || 'https://via.placeholder.com/400x225?text=Exclusive+Offer'}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
        {discountBadge && (
          <Badge
            variant="destructive"
            className="absolute top-3 right-3 text-sm px-3 py-1 font-semibold"
          >
            {discountBadge}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="p-4 md:p-6 space-y-3">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="p-4 md:p-6 bg-gray-50/50 border-t">
        <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-base transition-all duration-300 transform group-hover:scale-105">
          <Link to={ctaLink}>
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OfferHighlightCard;
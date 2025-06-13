import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid, // Explore Destinations
  BedDouble,  // Book Your Stay
  CarFront,   // Arrange Transport
  Calculator, // Trip Calculator
  Gift,       // Exclusive Offers
  User,       // My Trips/Profile
  HomeIcon,   // Home
  XIcon       // Close icon
} from 'lucide-react';

interface MainNavigationSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/explore-destinations", label: "Explore Destinations", icon: LayoutGrid },
  { href: "/booking", label: "Book Your Stay", icon: BedDouble },
  // The 'Arrange Transport' link uses a placeholder path '/arrange-transport'
  // as this specific route is not defined in the provided App.tsx.
  // It might be part of the general booking flow or a future page.
  { href: "/arrange-transport", label: "Arrange Transport", icon: CarFront },
  { href: "/trip-calculator", label: "Trip Calculator", icon: Calculator },
  { href: "/exclusive-offers", label: "Exclusive Offers", icon: Gift },
  { href: "/user-profile", label: "My Trips/Profile", icon: User },
];

const MainNavigationSidebar: React.FC<MainNavigationSidebarProps> = ({ isOpen, onOpenChange }) => {
  console.log('MainNavigationSidebar loaded');
  const location = useLocation();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] sm:w-[320px] p-0 flex flex-col bg-background text-foreground">
        <SheetHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-semibold">Menu</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" aria-label="Close sidebar">
                <XIcon className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto">
          <nav className="py-4 px-2">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.label}>
                    <SheetClose asChild>
                      <Link
                        to={item.href}
                        className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors
                                    ${isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted hover:text-muted-foreground'
                                    }`}
                        onClick={() => onOpenChange(false)} // Ensure close on mobile
                      >
                        <IconComponent className="mr-3 h-5 w-5 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t mt-auto">
          <p className="text-xs text-center text-muted-foreground">
            Your Indian Adventure Starts Here
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MainNavigationSidebar;
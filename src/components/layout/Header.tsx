import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Aperture, User, Menu, Home, Percent, Calculator as CalculatorIcon, UserCircle } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header component loaded');

  const navLinks = [
    { label: 'Explore', href: '/explore-destinations', icon: <Home className="mr-2 h-5 w-5" /> },
    { label: 'Offers', href: '/exclusive-offers', icon: <Percent className="mr-2 h-5 w-5" /> },
    { label: 'Calculator', href: '/trip-calculator', icon: <CalculatorIcon className="mr-2 h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-amber-600 hover:text-amber-700 transition-colors"
          aria-label="IndiVoyage Home"
        >
          <Aperture className="h-7 w-7" />
          <span className="hidden sm:inline-block">IndiVoyage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop User Account & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex asChild" asChild>
            <Link to="/user-profile" aria-label="User Profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Mobile Navigation Trigger (for MainNavigationSidebar or built-in sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className="flex items-center gap-2 text-lg font-bold text-amber-600 hover:text-amber-700 transition-colors"
                      aria-label="IndiVoyage Home"
                    >
                      <Aperture className="h-7 w-7" />
                      <span>IndiVoyage</span>
                    </Link>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 grid gap-1 p-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      to={link.href}
                      className="flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {React.cloneElement(link.icon, { className: "mr-3 h-5 w-5 text-muted-foreground group-hover:text-accent-foreground" })}
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <hr className="my-3" />
                <SheetClose asChild>
                  <Link
                    to="/user-profile"
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <UserCircle className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-accent-foreground" />
                    My Account
                  </Link>
                </SheetClose>
              </div>
              {/* Note: The MainNavigationSidebar component, if it contains more links,
                  could be integrated here or this Sheet could be replaced by its trigger. */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
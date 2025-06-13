import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import BookingPage from "./pages/BookingPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import ExclusiveOffersPage from "./pages/ExclusiveOffersPage";
import ExploreDestinationsPage from "./pages/ExploreDestinationsPage";
import Homepage from "./pages/Homepage";
import TripCalculatorPage from "./pages/TripCalculatorPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/destination-detail" element={<DestinationDetailPage />} />
          <Route path="/exclusive-offers" element={<ExclusiveOffersPage />} />
          <Route path="/explore-destinations" element={<ExploreDestinationsPage />} />
          <Route path="/trip-calculator" element={<TripCalculatorPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;

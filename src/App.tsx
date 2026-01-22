import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EditTour from "./pages/tours/EditTour";
import Locations from "./pages/Locations";
import Hotels from "./pages/Hotels";
import Holidays from "./pages/Holidays";
import RentCars from "./pages/RentCars";
import Blogs from "./pages/Blogs";
import Reviews from "./pages/Reviews";
import Tours from "./pages/Tours";
import ThingsToDo from "./pages/ThingsToDo";
import Visa from "./pages/Visa";
import Gallery from "./pages/Gallery";
import Discounts from "./pages/Discounts";
import IconPages from "./pages/IconPages";
import TourSettings from "./pages/TourSettings";
import FooterSettings from "./pages/FooterSettings";
import HomepageSettings from "./pages/HomepageSettings";
import SiteSettings from "./pages/SiteSettings";
import ROAI from "./pages/ROAI";
import Bookings from "./pages/Bookings";
import EmailTemplates from "./pages/EmailTemplates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/holidays/add" element={<Holidays />} />
          <Route path="/cars" element={<RentCars />} />
          <Route path="/cars/add" element={<RentCars />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/add" element={<Blogs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/pending" element={<Reviews />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/add" element={<EditTour />} />
          <Route path="/tours/edit" element={<EditTour />} />
          <Route path="/things-to-do" element={<ThingsToDo />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/visa/applications" element={<Visa />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/icon-pages" element={<IconPages />} />
          <Route path="/tour-settings" element={<TourSettings />} />
          <Route path="/footer-settings" element={<FooterSettings />} />
          <Route path="/homepage-settings" element={<HomepageSettings />} />
          <Route path="/site-settings" element={<SiteSettings />} />
          <Route path="/email-templates" element={<EmailTemplates />} />
          <Route path="/roai" element={<ROAI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

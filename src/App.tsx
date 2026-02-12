import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TourDetails from "./pages/TourDetails";
import ToursListing from "./pages/ToursListing";
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
import AdminLogin from "./pages/AdminLogin";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/tours-listing" element={<ToursListing />} />
          <Route path="/tour/:slug" element={<TourDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin (protected) */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/bookings" element={<AdminRoute><Bookings /></AdminRoute>} />
          <Route path="/locations" element={<AdminRoute><Locations /></AdminRoute>} />
          <Route path="/hotels" element={<AdminRoute><Hotels /></AdminRoute>} />
          <Route path="/holidays" element={<AdminRoute><Holidays /></AdminRoute>} />
          <Route path="/holidays/add" element={<AdminRoute><Holidays /></AdminRoute>} />
          <Route path="/cars" element={<AdminRoute><RentCars /></AdminRoute>} />
          <Route path="/cars/add" element={<AdminRoute><RentCars /></AdminRoute>} />
          <Route path="/blogs" element={<AdminRoute><Blogs /></AdminRoute>} />
          <Route path="/blogs/add" element={<AdminRoute><Blogs /></AdminRoute>} />
          <Route path="/reviews" element={<AdminRoute><Reviews /></AdminRoute>} />
          <Route path="/reviews/pending" element={<AdminRoute><Reviews /></AdminRoute>} />
          <Route path="/tours" element={<AdminRoute><Tours /></AdminRoute>} />
          <Route path="/tours/add" element={<AdminRoute><EditTour /></AdminRoute>} />
          <Route path="/tours/edit/:id" element={<AdminRoute><EditTour /></AdminRoute>} />
          <Route path="/things-to-do" element={<AdminRoute><ThingsToDo /></AdminRoute>} />
          <Route path="/visa" element={<AdminRoute><Visa /></AdminRoute>} />
          <Route path="/visa/applications" element={<AdminRoute><Visa /></AdminRoute>} />
          <Route path="/gallery" element={<AdminRoute><Gallery /></AdminRoute>} />
          <Route path="/discounts" element={<AdminRoute><Discounts /></AdminRoute>} />
          <Route path="/icon-pages" element={<AdminRoute><IconPages /></AdminRoute>} />
          <Route path="/tour-settings" element={<AdminRoute><TourSettings /></AdminRoute>} />
          <Route path="/footer-settings" element={<AdminRoute><FooterSettings /></AdminRoute>} />
          <Route path="/homepage-settings" element={<AdminRoute><HomepageSettings /></AdminRoute>} />
          <Route path="/site-settings" element={<AdminRoute><SiteSettings /></AdminRoute>} />
          <Route path="/email-templates" element={<AdminRoute><EmailTemplates /></AdminRoute>} />
          <Route path="/roai" element={<AdminRoute><ROAI /></AdminRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

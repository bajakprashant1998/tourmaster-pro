import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EditTour from "./pages/tours/EditTour";
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
          <Route path="/tours/edit" element={<EditTour />} />
          <Route path="/tours/add" element={<EditTour />} />
          <Route path="/tours" element={<Navigate to="/tours/edit" replace />} />
          {/* Placeholder routes */}
          <Route path="/locations" element={<Dashboard />} />
          <Route path="/hotels" element={<Dashboard />} />
          <Route path="/holidays" element={<Dashboard />} />
          <Route path="/holidays/add" element={<Dashboard />} />
          <Route path="/cars" element={<Dashboard />} />
          <Route path="/cars/add" element={<Dashboard />} />
          <Route path="/blogs" element={<Dashboard />} />
          <Route path="/blogs/add" element={<Dashboard />} />
          <Route path="/reviews" element={<Dashboard />} />
          <Route path="/reviews/pending" element={<Dashboard />} />
          <Route path="/things-to-do" element={<Dashboard />} />
          <Route path="/visa" element={<Dashboard />} />
          <Route path="/visa/applications" element={<Dashboard />} />
          <Route path="/gallery" element={<Dashboard />} />
          <Route path="/discounts" element={<Dashboard />} />
          <Route path="/icon-pages" element={<Dashboard />} />
          <Route path="/tour-settings" element={<Dashboard />} />
          <Route path="/footer-settings" element={<Dashboard />} />
          <Route path="/homepage-settings" element={<Dashboard />} />
          <Route path="/site-settings" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

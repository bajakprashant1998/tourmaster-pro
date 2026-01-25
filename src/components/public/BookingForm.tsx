import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Minus, Plus, ShieldCheck, User, Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCreateBooking } from "@/hooks/useBookings";

interface PricingOption {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
}

interface BookingFormProps {
  tourId?: string;
  pricingOptions: PricingOption[];
  basePrice: number;
  originalPrice?: number;
}

export function BookingForm({ tourId, pricingOptions, basePrice, originalPrice }: BookingFormProps) {
  const [date, setDate] = useState<Date>();
  const [selectedOption, setSelectedOption] = useState<string>(pricingOptions[0]?.id || "");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const createBooking = useCreateBooking();

  const selectedPricing = pricingOptions.find((opt) => opt.id === selectedOption);
  const pricePerPerson = selectedPricing?.price || basePrice;
  const totalPrice = pricePerPerson * adults + (pricePerPerson * 0.5 * children);

  const handleBookNow = () => {
    if (!date) {
      return;
    }
    setShowBookingDialog(true);
  };

  const handleSubmitBooking = async () => {
    if (!tourId || !date || !customerName || !customerEmail) return;

    try {
      const result = await createBooking.mutateAsync({
        tour_id: tourId,
        pricing_option_id: selectedOption !== "default" ? selectedOption : undefined,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || undefined,
        tour_date: format(date, "yyyy-MM-dd"),
        adults,
        children,
        total_amount: totalPrice,
      });
      
      setBookingSuccess(result.booking_ref);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <>
      <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
        {/* Price Header */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">
              AED {pricePerPerson}
            </span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                AED {originalPrice}
              </span>
            )}
            <span className="text-muted-foreground">/ person</span>
          </div>
          {originalPrice && (
            <span className="inline-block mt-1 text-sm font-medium text-success">
              Save {Math.round(((originalPrice - pricePerPerson) / originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Booking Options */}
        <div className="space-y-4">
          {/* Pricing Option */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Package
            </label>
            <Select value={selectedOption} onValueChange={setSelectedOption}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a package" />
              </SelectTrigger>
              <SelectContent>
                {pricingOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{option.title}</span>
                      <span className="ml-4 font-medium">AED {option.price}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedPricing?.description && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                {selectedPricing.description}
              </p>
            )}
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guest Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Guests
            </label>
            <div className="space-y-3">
              {/* Adults */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Adults</p>
                  <p className="text-xs text-muted-foreground">Ages 12+</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                    disabled={adults <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{adults}</span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Children</p>
                  <p className="text-xs text-muted-foreground">Ages 3-11 (50% off)</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                    disabled={children <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{children}</span>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground">
                AED {totalPrice.toFixed(0)}
              </span>
            </div>
            <Button 
              onClick={handleBookNow}
              disabled={!date}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              Book Now
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span>Free cancellation up to 24 hours before</span>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {bookingSuccess ? "Booking Confirmed!" : "Complete Your Booking"}
            </DialogTitle>
            <DialogDescription>
              {bookingSuccess 
                ? `Your booking reference is ${bookingSuccess}. We'll send a confirmation email shortly.`
                : "Please provide your contact details to complete the booking."
              }
            </DialogDescription>
          </DialogHeader>

          {bookingSuccess ? (
            <div className="space-y-4">
              <div className="bg-success/10 text-success p-4 rounded-lg text-center">
                <p className="font-semibold text-lg">{bookingSuccess}</p>
                <p className="text-sm mt-1">Save this reference number</p>
              </div>
              <Button 
                onClick={() => {
                  setShowBookingDialog(false);
                  setBookingSuccess(null);
                }}
                className="w-full"
              >
                Done
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p><strong>Date:</strong> {date ? format(date, "PPP") : "-"}</p>
                <p><strong>Guests:</strong> {adults} Adults{children > 0 ? `, ${children} Children` : ""}</p>
                <p><strong>Total:</strong> AED {totalPrice.toFixed(0)}</p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSubmitBooking}
                disabled={!customerName || !customerEmail || createBooking.isPending}
                className="w-full"
              >
                {createBooking.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

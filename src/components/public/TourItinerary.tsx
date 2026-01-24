import { Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

interface TourItineraryProps {
  itinerary: ItineraryItem[];
}

export function TourItinerary({ itinerary }: TourItineraryProps) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">Tour Itinerary</h2>
      <Accordion type="single" collapsible className="w-full">
        {itinerary.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.time}</span>
                </div>
                <span className="font-medium text-foreground">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground pl-[76px]">{item.description}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

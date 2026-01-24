import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface FilterState {
  search: string;
  categories: string[];
  locations: string[];
  priceRange: [number, number];
  durations: string[];
}

interface TourFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  locations: string[];
  durations: string[];
  maxPrice: number;
}

export function TourFilters({
  filters,
  onFiltersChange,
  categories,
  locations,
  durations,
  maxPrice,
}: TourFiltersProps) {
  const activeFilterCount =
    filters.categories.length +
    filters.locations.length +
    filters.durations.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocations = checked
      ? [...filters.locations, location]
      : filters.locations.filter((l) => l !== location);
    onFiltersChange({ ...filters, locations: newLocations });
  };

  const handleDurationChange = (duration: string, checked: boolean) => {
    const newDurations = checked
      ? [...filters.durations, duration]
      : filters.durations.filter((d) => d !== duration);
    onFiltersChange({ ...filters, durations: newDurations });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      categories: [],
      locations: [],
      priceRange: [0, maxPrice],
      durations: [],
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories" className="border-b border-border">
          <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-3">
            Categories
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-3">
                  <Checkbox
                    id={`cat-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`cat-${category}`}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Locations */}
      <Accordion type="single" collapsible defaultValue="locations">
        <AccordionItem value="locations" className="border-b border-border">
          <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-3">
            Location
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {locations.map((location) => (
                <div key={location} className="flex items-center gap-3">
                  <Checkbox
                    id={`loc-${location}`}
                    checked={filters.locations.includes(location)}
                    onCheckedChange={(checked) =>
                      handleLocationChange(location, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`loc-${location}`}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Price Range */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price" className="border-b border-border">
          <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-3">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-4">
              <Slider
                value={[filters.priceRange[0], filters.priceRange[1]]}
                onValueChange={handlePriceChange}
                max={maxPrice}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  AED {filters.priceRange[0]}
                </span>
                <span className="text-muted-foreground">
                  AED {filters.priceRange[1]}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Duration */}
      <Accordion type="single" collapsible defaultValue="duration">
        <AccordionItem value="duration" className="border-b-0">
          <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-3">
            Duration
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {durations.map((duration) => (
                <div key={duration} className="flex items-center gap-3">
                  <Checkbox
                    id={`dur-${duration}`}
                    checked={filters.durations.includes(duration)}
                    onCheckedChange={(checked) =>
                      handleDurationChange(duration, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`dur-${duration}`}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {duration}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full mt-4"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Filters */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Filters</h3>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="rounded-full">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="rounded-full ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function TourSearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search tours, activities, attractions..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-10 py-6 text-base rounded-xl border-border bg-card"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

interface ActiveFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  maxPrice: number;
}

export function ActiveFilters({ filters, onFiltersChange, maxPrice }: ActiveFiltersProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.locations.length > 0 ||
    filters.durations.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < maxPrice;

  if (!hasActiveFilters) return null;

  const removeCategory = (category: string) => {
    onFiltersChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== category),
    });
  };

  const removeLocation = (location: string) => {
    onFiltersChange({
      ...filters,
      locations: filters.locations.filter((l) => l !== location),
    });
  };

  const removeDuration = (duration: string) => {
    onFiltersChange({
      ...filters,
      durations: filters.durations.filter((d) => d !== duration),
    });
  };

  const resetPriceRange = () => {
    onFiltersChange({
      ...filters,
      priceRange: [0, maxPrice],
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.categories.map((category) => (
        <Badge
          key={category}
          variant="secondary"
          className="gap-1 pr-1 cursor-pointer hover:bg-destructive/10"
          onClick={() => removeCategory(category)}
        >
          {category}
          <X className="w-3 h-3" />
        </Badge>
      ))}
      {filters.locations.map((location) => (
        <Badge
          key={location}
          variant="secondary"
          className="gap-1 pr-1 cursor-pointer hover:bg-destructive/10"
          onClick={() => removeLocation(location)}
        >
          {location}
          <X className="w-3 h-3" />
        </Badge>
      ))}
      {filters.durations.map((duration) => (
        <Badge
          key={duration}
          variant="secondary"
          className="gap-1 pr-1 cursor-pointer hover:bg-destructive/10"
          onClick={() => removeDuration(duration)}
        >
          {duration}
          <X className="w-3 h-3" />
        </Badge>
      ))}
      {(filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) && (
        <Badge
          variant="secondary"
          className="gap-1 pr-1 cursor-pointer hover:bg-destructive/10"
          onClick={resetPriceRange}
        >
          AED {filters.priceRange[0]} - {filters.priceRange[1]}
          <X className="w-3 h-3" />
        </Badge>
      )}
    </div>
  );
}

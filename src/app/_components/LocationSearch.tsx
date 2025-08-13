'use client';
import { useState, useMemo } from 'react';
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Plane, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetCitiesQuery } from '@/hooks/api/useGetCitiesQuery';
import { City, Location } from '@/types';

interface LocationSearchProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  name: FieldPath<T>;
  control: Control<T>;
  error?: string;
  className?: string;
}

export function LocationSearch<T extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  error,
  className,
}: LocationSearchProps<T>) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { data, isLoading } = useGetCitiesQuery(
    { keyword: debouncedSearchValue },
    open
  );

  const locationDetails: Location[] = useMemo(() => {
    if (!data?.data || !data?.included?.airports) return [];

    const airports = data.included.airports;

    return data.data.map((city: City) => {
      const airportId = city.relationships?.[0]?.id;
      const airport = airportId ? airports?.[airportId] : undefined;

      return {
        cityName: city.name ?? '',
        airportName: airport?.name ?? '',
        countryName: city.address?.countryCode ?? '',
        cityCode: airport?.iataCode ?? '',
      };
    });
  }, [data]);

  const handleLocationSelect = (
    location: Location,
    onChange: (value: string) => void
  ) => {
    onChange(location.cityCode);
    setSelectedLocation(location);
    setOpen(false);
    setSearchValue('');
  };

  return (
    <div className={cn('relative', className)}>
      <Label className="text-xs text-left lg:text-center font-medium text-gray-600 uppercase tracking-wide block mb-2">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field: { value, onChange } }) => {
          if (!selectedLocation && value) {
            const match = locationDetails.find((loc) => loc.cityCode === value);
            if (match) setSelectedLocation(match);
          }

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer border-0 min-w-[180px] p-0 h-8 text-base font-medium focus-visible:ring-0 shadow-none bg-transparent pr-8 flex items-center">
                  {selectedLocation ? (
                    <span>{selectedLocation.cityName}</span>
                  ) : (
                    <span className="text-gray-500">{placeholder}</span>
                  )}
                  <MapPin className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search cities or airports..."
                    value={searchValue}
                    onValueChange={setSearchValue}
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>
                      {isLoading ? (
                        <div className="flex flex-col items-center py-6 text-center">
                          <Loader2 className="h-8 w-8 mb-2 text-gray-300 animate-spin" />
                          <p className="text-sm text-gray-500">
                            Searching locations...
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-6 text-center">
                          <MapPin className="h-8 w-8 mb-2 text-gray-300" />
                          <p className="text-sm text-gray-500">
                            No locations found
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Try searching for a city or airport name
                          </p>
                        </div>
                      )}
                    </CommandEmpty>

                    <CommandGroup
                      heading={
                        searchValue ? 'Search Results' : 'Popular Destinations'
                      }
                    >
                      <ScrollArea className="h-72">
                        {locationDetails.map((location, index) => (
                          <CommandItem
                            key={location.cityCode + index}
                            value={`${location.cityCode} ${location.cityName} ${location.airportName}`}
                            onSelect={() =>
                              handleLocationSelect(location, onChange)
                            }
                            className="flex items-center gap-3 p-3 cursor-pointer"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Plane className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                  {location.cityName}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ({location.cityCode})
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 truncate">
                                {location.airportName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {location.countryName}
                              </div>
                            </div>
                            {value === location.cityCode && (
                              <Check className="h-4 w-4 text-blue-600" />
                            )}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

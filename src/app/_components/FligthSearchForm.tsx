'use client';

import { LocationSearch } from '@/app/_components/LocationSearch';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { FlightSearchParams } from '@/types';
import { formatDate, formatDateForInput } from '@/utils/formateDate';
import { CalendarIcon, Plane } from 'lucide-react';
import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { PassengerSelector } from './PassengerSelector';

export interface SearchFormData {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
    travelClass: 'economy' | 'business';
  };
  tripType: 'one-way' | 'round-trip';
}

export function FlightSearchForm({
  setSearchParams,
  isLoading,
}: {
  setSearchParams: (params: FlightSearchParams) => void;
  isLoading: boolean;
}) {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const [departDate, setDepartDate] = useState<Date>(today);
  const [returnDate, setReturnDate] = useState<Date | undefined>(tomorrow);
  const [passengers, setPassengers] = useState<SearchFormData['passengers']>({
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'economy',
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      tripType: 'one-way',
      departDate: formatDateForInput(today),
      returnDate: formatDateForInput(tomorrow),
      origin: '',
      destination: '',
      passengers,
    },
  });

  const tripType = watch('tripType');

  // const handleSwap = () => {
  //   const currentOrigin = getValues('origin');
  //   const currentDestination = getValues('destination');
  //   setValue('origin', currentDestination);
  //   setValue('destination', currentOrigin);
  // };

  const handleTripTypeChange = (type: 'one-way' | 'round-trip') => {
    setValue('tripType', type);
    if (type === 'one-way') {
      setReturnDate(undefined);
      setValue('returnDate', '');
    }
  };

  function handleFormSubmit(data: SearchFormData) {
    setSearchParams({
      originLocationCode: data.origin,
      destinationLocationCode: data.destination,
      departureDate: data.departDate,
      returnDate: data.returnDate,
      adults: data.passengers.adults,
      children: data.passengers.children,
      infants: data.passengers.infants,
      travelClass: data.passengers.travelClass.toUpperCase() as
        | 'ECONOMY'
        | 'BUSINESS',
    });
  }

  return (
    <div className="animate-fade-in-up animation-delay-900 w-full ">
      <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0  max-w-lg lg:max-w-6xl m-auto w-full">
        <CardContent className="p-3 md:p-6">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
              <div className="flex">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleTripTypeChange('one-way')}
                  className={cn(
                    'relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 min-w-[140px] justify-center',
                    tripType === 'one-way'
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  <Plane className="h-4 w-4" />
                  One Way
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleTripTypeChange('round-trip')}
                  className={cn(
                    'relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 min-w-[140px] justify-center',
                    tripType === 'round-trip'
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  <Plane className="h-4 w-4" />
                  Round Trip
                </Button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className=" lg:flex relative">
                <div className="flex-1 relative">
                  <div className="p-4 border-r border-gray-200">
                    <LocationSearch
                      label="Flying from"
                      placeholder="City"
                      name="origin"
                      control={control as unknown as Control<SearchFormData>}
                      error={errors.origin?.message}
                    />
                  </div>
                  {/* <button
                    type="button"
                    onClick={handleSwap}
                    className="absolute top-1/2 -right-5 transform -translate-y-1/2 p-2 rounded-full bg-green-100 hover:bg-green-200 transition-all duration-300 hover:scale-110 group border-2 border-white shadow-md z-10"
                  >
                    <ArrowLeftRightIcon className="h-4 w-4 text-green-600 group-hover:rotate-180 transition-transform duration-300" />
                  </button> */}
                </div>

                <div className="flex-1 border-r border-gray-200">
                  <div className="p-4 pl-8">
                    <LocationSearch
                      label="Flying to"
                      placeholder="City"
                      name="destination"
                      control={control as unknown as Control<SearchFormData>}
                      error={errors.destination?.message}
                    />
                  </div>
                </div>

                <div className="flex-1 border-r border-gray-200">
                  <div className="p-4">
                    <Label className="text-xs text-left lg:text-center font-medium text-gray-600 uppercase tracking-wide block mb-2">
                      Depart
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            'w-full justify-start text-left font-normal p-0 h-8 hover:bg-transparent',
                            !departDate && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departDate
                            ? formatDate(departDate)
                            : formatDate(today)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={departDate}
                          onSelect={(date) => {
                            setDepartDate(date as Date);
                            setValue(
                              'departDate',
                              date ? formatDateForInput(date) : ''
                            );
                          }}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {tripType === 'round-trip' && (
                  <div className="flex-1 border-r border-gray-200">
                    <div className="p-4">
                      <Label className="text-xs text-left lg:text-center font-medium text-gray-600 uppercase tracking-wide block mb-2">
                        Return
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              'w-full justify-start text-left font-normal p-0 h-8 hover:bg-transparent',
                              !returnDate && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {returnDate
                              ? formatDate(returnDate)
                              : formatDate(tomorrow)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={(date) => {
                              setReturnDate(date as Date);
                              setValue(
                                'returnDate',
                                date ? formatDateForInput(date) : ''
                              );
                            }}
                            disabled={(date) =>
                              date < new Date() ||
                              (departDate && date < departDate)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}

                <div className="flex-1 border-r border-gray-200">
                  <div className="p-4">
                    <Label className="text-xs text-left lg:text-center font-medium text-gray-600 uppercase tracking-wide block mb-2">
                      Travelers
                    </Label>
                    <PassengerSelector
                      value={passengers}
                      onChange={(newPassengers) => {
                        setPassengers(newPassengers);
                        setValue('passengers', newPassengers);
                      }}
                    />
                  </div>
                </div>

                <div className="w-full px-2 lg:px-0 mb-4 lg:mb-0 lg:w-32">
                  <Button
                    type="submit"
                    className="w-full h-full text-white font-bold text-sm uppercase tracking-wide rounded-md lg:rounded-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Searching...
                      </div>
                    ) : (
                      'SEARCH'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

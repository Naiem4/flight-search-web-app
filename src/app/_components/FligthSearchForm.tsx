'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ArrowLeftRightIcon, CalendarIcon, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PassengerSelector } from './PassengerSelector';

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

export function FlightSearchForm() {
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'economy' as 'economy' | 'business',
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      tripType: 'one-way',
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
        travelClass: 'economy',
      },
    },
  });

  const tripType = watch('tripType');

  const handleSwap = () => {
    const currentOrigin = getValues('origin');
    const currentDestination = getValues('destination');
    setValue('origin', currentDestination);
    setValue('destination', currentOrigin);
  };

  const handleTripTypeChange = (type: 'one-way' | 'round-trip') => {
    setValue('tripType', type);
    if (type === 'one-way') {
      setReturnDate(undefined);
      setValue('returnDate', '');
    }
  };

  const isSearching = false; // Replace with actual loading state if needed

  const handleFormSubmit = (data: SearchFormData) => {
    console.log({
      ...data,
      passengers,
      departDate: departDate ? formatDateForInput(departDate) : '',
      returnDate: returnDate ? formatDateForInput(returnDate) : '',
    });
  };

  return (
    <div className="animate-fade-in-up animation-delay-900">
      <Card className="bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 max-w-6xl w-full">
        <CardContent className="p-3 md:p-6">
          <div className="mb-6">
            <div className="flex items-center justify-center">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
                <div className="flex">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleTripTypeChange('one-way')}
                    className={cn(
                      'relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 min-w-[140px] justify-center',
                      tripType === 'one-way'
                        ? 'bg-white text-gray-900 shadow-lg transform scale-105 hover:bg-white hover:text-gray-900'
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
                        ? 'bg-white text-gray-900 shadow-lg transform scale-105 hover:bg-white hover:text-gray-900'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Plane className="h-4 w-4" />
                    Round Trip
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Mobile Layout - Column-wise */}
              {/* Desktop Layout - Horizontal */}
              <div className="hidden lg:flex relative">
                <div className="flex-1 relative">
                  <div className="p-4 border-r border-gray-200">
                    <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
                      Flying from
                    </Label>
                    <Input
                      placeholder="Delhi,India"
                      {...register('origin', {
                        required: 'Origin is required',
                      })}
                      className="border-0 p-0 h-8 text-base font-medium focus-visible:ring-0 shadow-none bg-transparent"
                    />
                    {errors.origin && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.origin.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="absolute top-1/2 -right-5 transform -translate-y-1/2 p-2 rounded-full bg-green-100 hover:bg-green-200 transition-all duration-300 hover:scale-110 group border-2 border-white shadow-md z-10"
                  >
                    <ArrowLeftRightIcon className="h-4 w-4 text-green-600 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                </div>
                <div className="flex-1 border-r border-gray-200">
                  <div className="p-4 pl-8">
                    <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
                      Flying to
                    </Label>
                    <Input
                      placeholder="Mumbai,India"
                      {...register('destination', {
                        required: 'Destination is required',
                      })}
                      className="border-0 p-0 h-8 text-base font-medium focus-visible:ring-0 shadow-none bg-transparent"
                    />
                    {errors.destination && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.destination.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-1 border-r border-gray-200">
                  <div className="p-4">
                    <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
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
                          {departDate ? formatDate(departDate) : '15-08-2025'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={departDate}
                          onSelect={(date) => {
                            setDepartDate(date);
                            setValue(
                              'departDate',
                              date ? formatDateForInput(date) : ''
                            );
                          }}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.departDate && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.departDate.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Return Date */}
                {tripType === 'round-trip' && (
                  <div className="flex-1 border-r border-gray-200">
                    <div className="p-4">
                      <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
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
                            {returnDate ? formatDate(returnDate) : '16-08-2025'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={(date) => {
                              setReturnDate(date);
                              setValue(
                                'returnDate',
                                date ? formatDateForInput(date) : ''
                              );
                            }}
                            disabled={(date) =>
                              date < new Date() ||
                              (departDate && date < departDate)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.returnDate && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.returnDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex-1 border-r border-gray-200">
                  <div className="p-4">
                    <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide block mb-2">
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
                <div className="w-32">
                  <Button
                    type="submit"
                    className="w-full h-full text-white font-bold text-sm uppercase tracking-wide rounded-none"
                    disabled={isSearching}
                  >
                    {isSearching ? (
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

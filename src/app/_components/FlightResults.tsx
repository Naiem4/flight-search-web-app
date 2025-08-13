'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlaneIcon, ClockIcon } from 'lucide-react';
import { Flight } from '@/types';



interface FlightResultsProps {
  flights: Flight[];
  isSearching: boolean;
  onSelectFlight?: (flight: Flight) => void;
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FlightCard({
  flight,
  onSelect,
}: {
  flight: Flight;
  onSelect?: (flight: Flight) => void;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-200 bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <PlaneIcon className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{flight.airline}</h3>
                <p className="text-sm text-gray-600">
                  {flight.flightNumber} • {flight.aircraft}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold">{flight.departure}</p>
                <p className="text-sm text-gray-600 font-medium">
                  {flight.origin}
                </p>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <ClockIcon className="h-4 w-4" />
                  {flight.duration}
                </div>
                <div className="w-full h-px bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white px-2">
                      {flight.stops === 0 ? (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-700"
                        >
                          Direct
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {flight.stops} stop{flight.stops > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold">{flight.arrival}</p>
                <p className="text-sm text-gray-600 font-medium">
                  {flight.destination}
                </p>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="hidden lg:block h-20" />

          <div className="flex flex-col items-center lg:items-end gap-3">
            <div className="text-center lg:text-right">
              <p className="text-3xl font-bold text-teal-600">
                ${flight.price}
              </p>
              <p className="text-sm text-gray-600">per person</p>
            </div>
            <Button
              className="w-full lg:w-auto bg-teal-600 hover:bg-teal-700"
              onClick={() => onSelect?.(flight)}
            >
              Select Flight
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function FlightResults({ flights, isSearching }: FlightResultsProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {isSearching ? 'Searching...' : `${flights.length} flights found`}
          </h2>
          {!isSearching && flights.length > 0 && (
            <p className="text-gray-600">Sorted by best value</p>
          )}
        </div>

        {isSearching ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid gap-4">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MinusIcon, PlusIcon, UsersIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerSelectorProps {
  value: PassengerCounts & { travelClass: 'economy' | 'business' };
  onChange: (
    value: PassengerCounts & { travelClass: 'economy' | 'business' }
  ) => void;
}

export function PassengerSelector({ value, onChange }: PassengerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateCount = (type: keyof PassengerCounts, increment: boolean) => {
    const newValue = { ...value };
    if (increment) {
      newValue[type] = Math.min(newValue[type] + 1, 9);
    } else {
      if (type === 'adults') {
        newValue[type] = Math.max(newValue[type] - 1, 1); // At least 1 adult required
      } else {
        newValue[type] = Math.max(newValue[type] - 1, 0);
      }
    }
    onChange(newValue);
  };

  const updateTravelClass = (travelClass: 'economy' | 'business') => {
    onChange({ ...value, travelClass });
  };

  const getTotalPassengers = () => {
    return value.adults + value.children + value.infants;
  };

  const getDisplayText = () => {
    const total = getTotalPassengers();
    return `${total} Passenger${total > 1 ? '(s)' : ''}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-left font-normal p-0 h-8 hover:bg-transparent"
        >
          <UsersIcon className="mr-2 h-4 w-4" />
          {getDisplayText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-6 space-y-6">
          {/* Passenger Types */}
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Adults</Label>
                <p className="text-xs text-gray-500">&gt;12 years</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => updateCount('adults', false)}
                  disabled={value.adults <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">
                  {value.adults}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => updateCount('adults', true)}
                  disabled={value.adults >= 9}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Children</Label>
                <p className="text-xs text-gray-500">2-12 years</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => updateCount('children', false)}
                  disabled={value.children <= 0}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">
                  {value.children}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => updateCount('children', true)}
                  disabled={value.children >= 9}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Infants</Label>
                <p className="text-xs text-gray-500">&lt;2 years</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => updateCount('infants', false)}
                  disabled={value.infants <= 0}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">
                  {value.infants}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => updateCount('infants', true)}
                  disabled={value.infants >= 9}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Travel Class */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Travel Class</Label>
            <div className="space-y-2">
              <Label className="flex items-center gap-3 cursor-pointer">
                <Input
                  type="radio"
                  name="travelClass"
                  value="economy"
                  checked={value.travelClass === 'economy'}
                  onChange={() => updateTravelClass('economy')}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                />
                <span className="text-sm">Economy</span>
              </Label>
              <Label className="flex items-center gap-3 cursor-pointer">
                <Input
                  type="radio"
                  name="travelClass"
                  value="business"
                  checked={value.travelClass === 'business'}
                  onChange={() => updateTravelClass('business')}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                />
                <span className="text-sm">Business</span>
              </Label>
            </div>
          </div>

          {/* Done Button */}
          <Button
            className="w-full bg-black hover:bg-gray-800 text-white"
            onClick={() => setIsOpen(false)}
          >
            DONE
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

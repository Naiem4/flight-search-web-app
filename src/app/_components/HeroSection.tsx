'use client';

import type React from 'react';
import { BackgroundSlider } from './BackgroundSlider';
import { FlightSearchForm } from './FligthSearchForm';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <div className="relative min-h-[600px] overflow-hidden">
      <BackgroundSlider
        autoplayDelay={2000}
        showPagination={false}
        effect="fade"
      />

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            FlightFinder
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl animate-fade-in-up animation-delay-300 px-2">
            Discover the best flights at unbeatable prices. Search, compare, and
            book your perfect journey.
          </p>
        </div>

        <div className="flex justify-center mb-4 animate-fade-in-up animation-delay-600">
          <div className="flex bg-white/20 backdrop-blur-sm rounded-lg p-1">
            <Button className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-md font-medium bg-teal-600 hover:bg-teal-700  text-white shadow-lg  transition-colors text-sm sm:text-base">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Flights
            </Button>
          </div>
        </div>

        <FlightSearchForm />
      </div>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { PlaneIcon } from 'lucide-react';

export function MobileAppSectionBanner() {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 lg:p-12 border border-teal-100">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <PlaneIcon className="h-4 w-4" />
                Mobile App
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Take FlightFinder with you everywhere
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Download our mobile app for exclusive deals, instant
                notifications, and seamless booking on the go. Get 10% off your
                first mobile booking!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-base font-semibold">
                  Download for iOS
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 text-base font-semibold bg-transparent"
                >
                  Download for Android
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                  <PlaneIcon className="h-24 w-24 lg:h-32 lg:w-32 text-white transform rotate-45" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

MobileAppSectionBanner.displayName = 'MobileAppSectionBanner';

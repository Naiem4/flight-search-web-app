import {
  PlaneIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-600 rounded-xl">
                <PlaneIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-teal-400">SkyPlan</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for finding the best flight deals worldwide.
              Compare prices and book with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Search Flights
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  My Bookings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Check-in
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Flight Status
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 SkyPlan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

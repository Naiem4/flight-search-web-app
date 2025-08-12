import { Feature } from '@/types';

export const defaultFeatures: Feature[] = [
  {
    title: 'Best Price Guarantee',
    description:
      "Find a cheaper flight elsewhere? We'll match the price and give you an additional 5% discount.",
    gradientFrom: 'from-teal-400',
    gradientTo: 'to-teal-600',
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
  },
  {
    title: 'Flexible Booking',
    description:
      'Free cancellation within 24 hours and easy rebooking options for your peace of mind.',
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-emerald-600',
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    description:
      'Our dedicated support team is available around the clock to assist with your travel needs.',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-blue-600',
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
        />
      </svg>
    ),
  },
];

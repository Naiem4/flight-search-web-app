'use client';

import { defaultFeatures } from '@/config/static/featuresData';
import { Feature } from '@/types';
import { FeatureCard } from './FeatureCard';

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export function FeaturesSection({
  title = 'Why choose FlightFinder?',
  subtitle = "We're committed to providing you with the best flight booking experience possible",
  features = defaultFeatures,
}: FeaturesSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

FeaturesSection.displayName = 'FeaturesSection';

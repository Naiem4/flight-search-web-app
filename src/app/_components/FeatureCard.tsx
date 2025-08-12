import { Card, CardContent } from '@/components/ui/card';
import { Feature } from '@/types';

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <CardContent className="p-8 text-center">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </CardContent>
    </Card>
  );
}

FeatureCard.displayName = 'FeatureCard';

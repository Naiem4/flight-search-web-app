import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { HeroSection } from './_components/HeroSection';
import { MobileAppSectionBanner } from './_components/MobileAppSectionBanner';
import { FeaturesSection } from './_components/FeaturesSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <MobileAppSectionBanner />
      <Footer />
    </div>
  );
};

export default HomePage;

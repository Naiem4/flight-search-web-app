import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { HeroSection } from './_components/HeroSection';
import { MobileAppSectionBanner } from './_components/MobileAppSectionBanner';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <MobileAppSectionBanner />
      <Footer />
    </div>
  );
};

export default HomePage;

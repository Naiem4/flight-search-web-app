import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { HeroSection } from './_components/HeroSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;

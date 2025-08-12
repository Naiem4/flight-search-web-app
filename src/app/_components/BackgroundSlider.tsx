'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Slider1 from '@/assets/images/airplane-on-tarmac-aerial.png';
import Slider2 from '@/assets/images/modern-airplane-sunset-clouds.png';
import Slider3 from '@/assets/images/golden-hour-runway.png';
import Slider4 from '@/assets/images/airplane-takeoff.png';

const images = [Slider1, Slider2, Slider3, Slider4];

interface BackgroundSliderProps {
  autoplayDelay?: number;
  showPagination?: boolean;
  effect?: 'fade' | 'slide' | 'cube' | 'coverflow' | 'flip';
  className?: string;
}

export function BackgroundSlider({
  autoplayDelay = 5000,
  showPagination = true,
  effect = 'fade',
  className = '',
}: BackgroundSliderProps) {
  return (
    <div className={`absolute inset-0 h-full w-full ${className}`}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect={effect}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
                bulletClass:
                  'swiper-pagination-bullet bg-slider-pagination-bullet',
                bulletActiveClass:
                  'swiper-pagination-bullet-active bg-slider-pagination-bullet-active',
              }
            : false
        }
        loop={true}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image.src})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const BannerSection = () => {
  // Banner data - replace with your actual images and content
  const bannerSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Expert Legal Solutions",
      subtitle: "Trusted by thousands of clients worldwide",
      description: "Professional legal services with decades of experience in corporate law, litigation, and legal consulting.",
      buttonText: "Get Consultation",
      buttonLink: "/consultation"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Your Success Is Our Priority",
      subtitle: "Dedicated legal representation",
      description: "We fight for your rights and ensure the best possible outcome for your legal matters.",
      buttonText: "Our Services",
      buttonLink: "/services"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1565689228644-83e87ac3d1de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Experience You Can Trust",
      subtitle: "Proven track record of success",
      description: "With over 20 years of combined experience, our legal team delivers exceptional results.",
      buttonText: "Meet Our Team",
      buttonLink: "/about"
    }
  ];

  return (
    <section className="relative h-[80vh] w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}" style="background-color: #CBA054; width: 12px; height: 12px; margin: 0 6px;"></span>`;
          },
        }}
        navigation={{
          nextEl: '.banner-swiper-button-next',
          prevEl: '.banner-swiper-button-prev',
        }}
        loop={true}
        className="h-full w-full"
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-linear-to-r from-[#0A1A2F]/80 to-[#0A1A2F]/60"></div>
            </div>
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-2xl">
                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl text-[#CBA054] font-semibold mb-6">
                    {slide.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>
                  
                  {/* Button */}
                  <button 
                    onClick={() => window.location.href = slide.buttonLink}
                    className="bg-[#CBA054] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#DBAE5D] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Left and Right Sides */}
      <div className="absolute inset-y-0 left-4 flex items-center z-10">
        {/* Previous Button - Left Side */}
        <button className="banner-swiper-button-prev group bg-white/20 hover:bg-[#CBA054] backdrop-blur-sm rounded-full p-4 transition-all duration-300">
          <ChevronLeft className="w-6 h-6 text-white group-hover:text-white" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center z-10">
        {/* Next Button - Right Side */}
        <button className="banner-swiper-button-next group bg-white/20 hover:bg-[#CBA054] backdrop-blur-sm rounded-full p-4 transition-all duration-300">
          <ChevronRight className="w-6 h-6 text-white group-hover:text-white" />
        </button>
      </div>

      {/* Custom Pagination Dots - Positioned at bottom center */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background-color: #CBA054 !important;
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          opacity: 0.5 !important;
          transition: all 0.3s ease !important;
        }
        
        :global(.swiper-pagination-bullet-active) {
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
        
        :global(.swiper-pagination) {
          bottom: 30px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
        }
      `}</style>
    </section>
  );
};

export default BannerSection;
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const BannerSection = ({ 
  bannerData = [], 
  designVariant = "default", // 'default', 'minimal', 'centered', 'overlay', 'split'
  autoPlay = true,
  showControls = true,
  showPagination = true
}) => {
  console.log(bannerData);
  
  const storageUrl = import.meta.env.VITE_APP_BASE_URL;
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Filter only active banners
  const activeBanners = bannerData.filter((banner) => banner.is_show == 1);

  // Handle autoplay toggle
  const toggleAutoplay = () => {
    if (swiperInstance) {
      if (isPlaying) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Responsive breakpoints for Swiper
  const swiperBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  };

  // Default placeholder for no banners
  if (activeBanners.length === 0) {
    return (
      <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Welcome to Our Law Firm
          </h1>
          <p className="text-lg md:text-xl text-[#CBA054]">
            Professional Legal Services
          </p>
        </div>
      </section>
    );
  }

  // Design Variant: Minimal
  const renderMinimalDesign = (banner) => (
    <div className="relative h-full flex items-center justify-center text-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: banner.title }}
          />
          <p
            className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: banner.description }}
          />
          {banner.button_name && (
            <button
              onClick={() => banner.button_url && (window.location.href = banner.button_url)}
              className="px-6 md:px-8 py-3 md:py-4 border-2 border-[#CBA054] text-[#CBA054] bg-transparent rounded-lg font-medium text-base md:text-lg transition-all duration-300 hover:bg-[#CBA054] hover:text-white"
            >
              {banner.button_name}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Design Variant: Centered
  const renderCenteredDesign = (banner) => (
    <div className="relative h-full flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#CBA054] mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: banner.title }}
          />
          <div className="w-20 h-1 bg-[#CBA054] mx-auto mb-6"></div>
          <p
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: banner.description }}
          />
          {banner.button_name && (
            <button
              onClick={() => banner.button_url && (window.location.href = banner.button_url)}
              className="px-8 md:px-10 py-4 md:py-5 bg-[#CBA054] text-white rounded-xl font-semibold text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {banner.button_name}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Design Variant: Overlay
  const renderOverlayDesign = (banner) => (
    <div className="relative h-full flex items-end pb-8 md:pb-12 lg:pb-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8 rounded-t-2xl">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
            dangerouslySetInnerHTML={{ __html: banner.title }}
          />
          <p
            className="text-sm md:text-base text-white/80 mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: banner.description }}
          />
          {banner.button_name && (
            <button
              onClick={() => banner.button_url && (window.location.href = banner.button_url)}
              className="px-6 md:px-8 py-3 md:py-4 bg-[#CBA054] text-white rounded-lg font-medium text-sm md:text-base transition-all duration-300 hover:bg-[#DBAE5D]"
            >
              {banner.button_name}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Design Variant: Split
  const renderSplitDesign = (banner) => (
    <div className="relative h-full flex items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#CBA054] mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: banner.title }}
            />
            <p
              className="text-base md:text-lg text-white/90 mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: banner.description }}
            />
            {banner.button_name && (
              <button
                onClick={() => banner.button_url && (window.location.href = banner.button_url)}
                className="px-8 py-4 bg-[#CBA054] text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                {banner.button_name}
              </button>
            )}
          </div>
          {/* Right side intentionally left empty for visual balance */}
          <div></div>
        </div>
      </div>
    </div>
  );

  // Design Variant: Default
  const renderDefaultDesign = (banner) => (
    <div className="relative h-full flex items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#CBA054] mb-4 md:mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: banner.title }}
          />
          <p
            className="text-base md:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed max-w-lg"
            dangerouslySetInnerHTML={{ __html: banner.description }}
          />
          {banner.button_name && (
            <button
              onClick={() => banner.button_url && (window.location.href = banner.button_url)}
              className="px-6 md:px-8 py-3 md:py-4 bg-[#CBA054] text-white rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {banner.button_name}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Select design renderer based on variant
  const renderDesign = (banner) => {
    switch (designVariant) {
      case "minimal":
        return renderMinimalDesign(banner);
      case "centered":
        return renderCenteredDesign(banner);
      case "overlay":
        return renderOverlayDesign(banner);
      case "split":
        return renderSplitDesign(banner);
      default:
        return renderDefaultDesign(banner);
    }
  };

  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={autoPlay ? {
          delay: 5000,
          disableOnInteraction: false,
        } : false}
        pagination={showPagination ? {
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}" style="background-color: #CBA054; width: 10px; height: 10px; margin: 0 4px; border-radius: 50%;"></span>`;
          },
        } : false}
        navigation={showControls ? {
          nextEl: ".banner-swiper-button-next",
          prevEl: ".banner-swiper-button-prev",
        } : false}
        loop={activeBanners.length > 1}
        breakpoints={swiperBreakpoints}
        className="h-full w-full"
        onSwiper={setSwiperInstance}
      >
        {activeBanners.map((banner) => (
          <SwiperSlide key={banner.id}>
            {/* Background Image with responsive sizing */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${storageUrl}${banner.image})`,
              }}
            >
              {/* Overlay with gradient - responsive opacity */}
              <div className={`absolute inset-0 ${
                designVariant === "minimal" 
                  ? "bg-[#0A1A2F]/70" 
                  : designVariant === "overlay"
                  ? "bg-gradient-to-b from-transparent via-black/40 to-black/80"
                  : "bg-linear-to-r from-[#0A1A2F]/80 to-[#0A1A2F]/60"
              }`}></div>
            </div>

            {/* Content */}
            {renderDesign(banner)}

            {/* SEO Meta Information */}
            <div className="hidden" aria-hidden="true">
              {banner.title_meta && <meta name="title" content={banner.title_meta} />}
              {banner.description_meta && <meta name="description" content={banner.description_meta} />}
              {banner.image_alt && <meta name="image-alt" content={banner.image_alt} />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {/* {showControls && activeBanners.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-2 md:left-4 flex items-center z-10">
            <button
              className="banner-swiper-button-prev group bg-white/20 hover:bg-[#CBA054] backdrop-blur-sm rounded-full p-2 md:p-3 lg:p-4 transition-all duration-300"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-2 md:right-4 flex items-center z-10">
            <button
              className="banner-swiper-button-next group bg-white/20 hover:bg-[#CBA054] backdrop-blur-sm rounded-full p-2 md:p-3 lg:p-4 transition-all duration-300"
              aria-label="Next banner"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
            </button>
          </div>
        </>
      )} */}

      {/* Autoplay Control */}
      {/* {autoPlay && activeBanners.length > 1 && (
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10">
          <button
            onClick={toggleAutoplay}
            className="bg-white/20 hover:bg-[#CBA054] backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-300"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 md:w-5 md:h-5 text-white" />
            ) : (
              <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
            )}
          </button>
        </div>
      )} */}

      {/* Progress Bar for Autoplay */}
      {autoPlay && activeBanners.length > 1 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-20">
          <div
            className="h-full bg-[#CBA054] transition-all duration-1000 ease-linear"
            style={{
              animation: isPlaying 
                ? `progressBar 5s linear infinite` 
                : 'none'
            }}
          />
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        :global(.swiper-pagination-bullet) {
          background-color: #cba054 !important;
          width: 10px !important;
          height: 10px !important;
          margin: 0 4px !important;
          opacity: 0.5 !important;
          transition: all 0.3s ease !important;
        }

        :global(.swiper-pagination-bullet-active) {
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }

        :global(.swiper-pagination) {
          bottom: 20px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
        }

        /* Mobile-first responsive typography */
        @media (max-width: 640px) {
          :global(.swiper-pagination) {
            bottom: 15px !important;
          }
        }
      `}</style>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            numberOfItems: activeBanners.length,
            itemListElement: activeBanners.map((banner, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "CreativeWork",
                name: banner.title_meta || banner.title,
                description: banner.description_meta || banner.description,
                image: `${storageUrl}${banner.image}`,
                ...(banner.button_url && {
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    url: banner.button_url,
                  },
                }),
              },
            })),
          }),
        }}
      />
    </section>
  );
};

export default BannerSection;
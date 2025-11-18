import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const BannerSection = ({ bannerData = [] }) => {
  const storageUrl = import.meta.env.VITE_APP_BASE_URL;

  // console.log(bannerData);
  

  

  // Filter only active banners (is_show === "1")
  const activeBanners = bannerData.filter((banner) => banner.is_show === "1");

  // If no active banners, return null or a placeholder
  if (activeBanners.length === 0) {
    return (
      <section className="relative h-[60vh] w-full bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Law Firm</h1>
          <p className="text-xl text-[#CBA054]">Professional Legal Services</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[70vh] w-full">
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
          nextEl: ".banner-swiper-button-next",
          prevEl: ".banner-swiper-button-prev",
        }}
        loop={true}
        className="h-full w-full"
      >
        {activeBanners.map((banner) => (
          <SwiperSlide key={banner.id}>
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${storageUrl}${banner.image})`,
              }}
            >
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-linear-to-r from-[#0A1A2F]/80 to-[#0A1A2F]/60"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-2xl">
                  {/* Title - Use title_meta for SEO if available, otherwise use title */}
                  <h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#CBA054] mb-4 leading-tight"
                    aria-label={banner.title_meta || banner.title}
                    dangerouslySetInnerHTML={{
                      __html:  banner.title,
                    }}

                  />

                  {/* Description - Use description_meta for SEO if available, otherwise use description */}
                  <p
                    className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg"
                    aria-label={banner.description_meta || banner.description}
                    dangerouslySetInnerHTML={{
                      __html: banner.description,
                    }}
                  />

                  {/* Button - Only show if button_name exists */}
                  {banner.button_name && (
                    <button
                      onClick={() =>
                        banner.button_url &&
                        (window.location.href = banner.button_url)
                      }
                      aria-label={banner.button_meta || banner.button_name}
                      className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                        banner.button_url
                          ? "bg-[#CBA054] text-white hover:bg-[#DBAE5D] cursor-pointer"
                          : "bg-[#CBA054] text-white hover:bg-[#DBAE5D] cursor-pointer"
                      }`}
                      disabled={!banner.button_url}
                      title={!banner.button_url ? "Button URL not set" : ""}
                    >
                      {banner.button_name}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SEO Meta Information - Hidden but accessible for SEO */}
            <div className="hidden" aria-hidden="true">
              {banner.title_meta && (
                <meta name="title" content={banner.title_meta} />
              )}
              {banner.description_meta && (
                <meta name="description" content={banner.description_meta} />
              )}
              {banner.image_alt && (
                <meta name="image-alt" content={banner.image_alt} />
              )}
              {banner.button_meta && (
                <meta name="button-meta" content={banner.button_meta} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Only show if more than one banner */}
      {activeBanners.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-4 flex items-center z-10">
            {/* Previous Button - Left Side */}
            <button
              className="banner-swiper-button-prev group bg-white/20 hover:bg-[#CBA054] backdrop-blur-sm rounded-full p-4 transition-all duration-300"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-white" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-4 flex items-center z-10">
            {/* Next Button - Right Side */}
            <button
              className="banner-swiper-button-next group bg-white/20 hover:bg-[#CBA054] backdrop-blur-sm rounded-full p-4 transition-all duration-300"
              aria-label="Next banner"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-white" />
            </button>
          </div>
        </>
      )}

      {/* Custom Pagination Dots - Only show if more than one banner */}
      {activeBanners.length > 1 && (
        <style jsx>{`
          :global(.swiper-pagination-bullet) {
            background-color: #cba054 !important;
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
      )}

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

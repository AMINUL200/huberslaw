import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  Scale,
  Building,
  Users,
  Home,
  Shield,
  ChevronRight,
  Phone,
  ArrowRight,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, useNavigate } from "react-router-dom";
import { getServiceIcon } from "../../utils/getServiceIcon";

const OurPracticeAreas = ({ servicesData = [] }) => {
  



  // Swiper breakpoints configuration
  const swiperBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  };

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
         

           <h1
            className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight"
            itemProp="headline"
          >
            {servicesData[0]?.page_heading }
          </h1>

         <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            itemProp="description"
          >
            {servicesData[0]?.page_description}
          </p>
        </div>

        {/* Swiper Cards Section */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={swiperBreakpoints}
            loop={true}
            speed={3000} // smooth continuous-like movement
            autoplay={{
              delay: 0, // nonstop sliding
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="practice-areas-swiper"
          >
            {servicesData.slice(0,7).map((service) => (
              <SwiperSlide key={service.id}>
                <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 group flex flex-col h-full">
                  {/* Header */}
                  <div className="bg-linear-to-br from-[#0A1A2F] to-[#1E354F] p-6 text-center flex-shrink-0">
                    <div className="w-16 h-16 bg-linear-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {getServiceIcon(service.service_name)}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {service.service_name}
                    </h2>
                    <p className="text-[#E8EEF4] text-sm leading-relaxed min-h-[60px]">
                      {service.service_description}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-grow flex flex-col">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {service.feature &&
                        service.feature
                          .slice(0, 4)
                          .map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-2 h-2 bg-[#CBA054] rounded-full"></div>
                              <span className="text-[#0A1A2F] text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                    </ul>

                    <Link
                      to={`/services/${service.slug}`}
                      className="w-full bg-gradient-to-r from-[#CBA054] to-[#DBAE5D] text-white py-3 rounded-lg font-semibold hover:from-[#0A1A2F] hover:to-[#0A1A2F] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mt-auto"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="custom-pagination flex justify-center space-x-2 mt-8"></div>
        </div>
      </div>

      <style jsx>{`
        .practice-areas-swiper {
          padding: 20px 10px 60px;
        }

        /* Custom Pagination Styles */
        .custom-pagination {
          position: relative;
          z-index: 20;
        }

        .custom-bullet {
          width: 12px;
          height: 12px;
          background: #0a1a2f;
          border-radius: 50%;
          margin: 0 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .custom-bullet-active {
          background: #cba054;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(203, 160, 84, 0.5);
        }

        .custom-bullet:hover {
          background: #dbae5d;
          transform: scale(1.1);
        }

        /* Custom Navigation Button Styles */
        .custom-nav-btn {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border: 2px solid #e8eef4;
          color: #0a1a2f;
        }

        .custom-nav-btn:hover {
          border-color: #cba054;
        }

        /* Swiper Slide Animation */
        .swiper-slide {
          opacity: 0.7;
          transform: scale(0.9);
          transition: all 0.4s ease;
          height: auto; /* Ensure slides take full height */
        }

        .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }

        /* Ensure all cards have the same height */
        .swiper-slide > div {
          height: 100%;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .custom-nav-btn {
            display: none;
          }

          .practice-areas-swiper {
            padding: 10px 5px 40px;
          }
        }

        @media (max-width: 640px) {
          .swiper-slide {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default OurPracticeAreas;

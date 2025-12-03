import {
  ArrowRight,
  Facebook,
  Linkedin,
  Mail,
  Twitter,
  Star,
  Award,
  GraduationCap,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const AboutOurPeople = ({ teamInfo = [] }) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;


  // Return null if teamInfo is empty, null, or undefined
  if (!teamInfo || teamInfo.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-[#0A1A2F]">
          Meet Our Legal Team
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experienced professionals dedicated to providing exceptional legal
          services with expertise and compassion.
        </p>
      </div>

      {/* Swiper Slider */}
      <div className="relative px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: function (index, className) {
              return `<span class="${className} bg-[#CBA054] opacity-20 hover:opacity-100 transition-opacity duration-300"></span>`;
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          className="team-swiper-modern"
        >
          {teamInfo.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden h-full flex flex-col">
                {/* Image Container with Overlay */}
                <div className="relative overflow-hidden">
                  <div
                    className="h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${baseUrl}${member.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Name and Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    {member.service?.service_name && (
                      <p className="text-[#CBA054] font-semibold text-sm">
                        {member.service.service_name}
                      </p>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#0A1A2F]/50 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6">
                    <div className="text-center text-white space-y-3">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      {member.service?.service_name && (
                        <p className="text-[#CBA054] font-semibold">
                          {member.service.service_name}
                        </p>
                      )}
                      <p className="text-sm text-gray-300">
                        Click to view full profile
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    {/* Designation */}
                    {member?.designation && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Designation
                        </span>
                        <span className="text-sm font-semibold text-[#CBA054]">
                          {member.designation}
                        </span>
                      </div>
                    )}

                    {/* Education */}
                    {member?.education && member.education[0] && (
                      <div className="flex items-center space-x-3 p-3 bg-[#F8F9FA] rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-[#CBA054]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500">Education</div>
                          <div className="text-sm font-semibold text-[#0A1A2F] line-clamp-2">
                            {member.education[0]}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Specialty */}
                    {member.service?.service_name && (
                      <div className="flex items-center space-x-3 p-3 bg-[#F8F9FA] rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-[#CBA054]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500">Specialty</div>
                          <div className="text-sm font-semibold text-[#0A1A2F]">
                            {member.service.service_name}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* View Profile Button */}
                  <Link
                    to={`/team/${member?.slug ? member.slug : member.name}`}
                    className="w-full mt-6 bg-gradient-to-r from-[#CBA054] to-[#D4B578] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#B89246] hover:to-[#CBA054] transition-all duration-300 flex items-center justify-center space-x-2 group/btn shadow-lg hover:shadow-xl"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#CBA054] hover:bg-[#CBA054] hover:text-white transition-all duration-300 transform -translate-x-6">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#CBA054] hover:bg-[#CBA054] hover:text-white transition-all duration-300 transform translate-x-6">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Custom CSS */}
        <style jsx>{`
          .team-swiper-modern {
            padding: 40px 20px 60px;
          }

          .team-swiper-modern .swiper-slide {
            height: auto;
          }

          .team-swiper-modern .swiper-pagination {
            bottom: 20px;
          }

          .team-swiper-modern .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            margin: 0 6px;
            transition: all 0.3s ease;
          }

          .team-swiper-modern .swiper-pagination-bullet-active {
            width: 24px;
            border-radius: 4px;
            background: #cba054;
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>

      {/* Global Share Section - Modernized */}
      <div className="bg-gradient-to-r from-[#0A1A2F] to-[#1E3A5F] rounded-3xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-3">Share Our Team</h3>
          <p className="text-gray-300 mb-6 text-lg">
            Help others discover our exceptional legal professionals
          </p>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[
              {
                icon: Facebook,
                href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`,
                title: "Share on Facebook",
                color: "hover:bg-[#1877F2]",
              },
              {
                icon: Twitter,
                href: `https://x.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}&text=Meet our exceptional legal team:`,
                title: "Share on X / Twitter",
                color: "hover:bg-[#1DA1F2]",
              },
              {
                icon: Linkedin,
                href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}`,
                title: "Share on LinkedIn",
                color: "hover:bg-[#0A66C2]",
              },
              {
                icon: Mail,
                href: `mailto:?subject=Meet Our Legal Team&body=Check out our exceptional legal professionals: ${encodeURIComponent(
                  window.location.href
                )}`,
                title: "Share via Email",
                color: "hover:bg-[#EA4335]",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-2xl ${social.color}`}
                title={social.title}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOurPeople;

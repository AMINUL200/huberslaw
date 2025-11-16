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
import { useNavigate } from "react-router-dom";

const OurPracticeAreas = () => {
  const [activeCategory, setActiveCategory] = useState("business");
  const navigate = useNavigate();

  const practiceAreas = {
    business: {
      title: "Business Law",
      icon: <Building className="w-8 h-8" />,
      description:
        "Expert legal support for business formation, contracts, compliance, and corporate governance.",
      features: [
        "Business Formation & Structure",
        "Contract Drafting & Review",
        "Mergers & Acquisitions",
        "Corporate Compliance",
        "Commercial Litigation",
        "Intellectual Property",
      ],
      cta: {
        title: "Protect Your Business",
        description:
          "Get comprehensive legal protection for your business operations and growth strategies.",
        phone: "0203 488 0953",
      },
    },
    personal: {
      title: "Personal Law",
      icon: <Users className="w-8 h-8" />,
      description:
        "Comprehensive personal legal services including family law, immigration, and estate planning.",
      features: [
        "Family Law & Divorce",
        "Immigration Services",
        "Estate Planning",
        "Personal Contracts",
        "Child Custody",
        "Mediation Services",
      ],
      cta: {
        title: "Protect Your Family",
        description:
          "Ensure your family's future with expert personal legal guidance.",
        phone: "0203 488 0953",
      },
    },
    property: {
      title: "Property Law",
      icon: <Home className="w-8 h-8" />,
      description:
        "Expert legal services for real estate transactions, leasing, and property disputes.",
      features: [
        "Real Estate Transactions",
        "Leasing & Tenancy",
        "Property Development",
        "Zoning Compliance",
        "Property Disputes",
        "Title Verification",
      ],
      cta: {
        title: "Secure Your Property",
        description:
          "Protect your most valuable assets with expert property law services.",
        phone: "0203 488 0953",
      },
    },
    dispute: {
      title: "Dispute Resolution",
      icon: <Scale className="w-8 h-8" />,
      description:
        "Expert litigation and alternative dispute resolution for civil and commercial matters.",
      features: [
        "Civil Litigation",
        "Commercial Disputes",
        "Mediation Services",
        "Arbitration",
        "Settlement Negotiations",
        "Appellate Practice",
      ],
      cta: {
        title: "Resolve Conflicts",
        description:
          "Effective dispute resolution strategies tailored to your situation.",
        phone: "0203 488 0953",
      },
    },
    defense: {
      title: "Criminal Defense",
      icon: <Shield className="w-8 h-8" />,
      description:
        "Aggressive defense representation for criminal charges at all levels.",
      features: [
        "Felony Defense",
        "Misdemeanor Cases",
        "Federal Crimes",
        "Appeals Process",
        "Record Expungement",
        "Bail Hearings",
      ],
      cta: {
        title: "Protect Your Rights",
        description:
          "Strong defense representation to protect your freedom and rights.",
        phone: "0203 488 0953",
      },
    },
  };

  const categories = [
    { id: "business", label: "Business Law" },
    { id: "personal", label: "Personal Law" },
    { id: "property", label: "Property Law" },
    { id: "dispute", label: "Dispute Resolution" },
    { id: "defense", label: "Criminal Defense" },
  ];

  const currentArea = practiceAreas[activeCategory];

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
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-6 shadow-sm border border-[#E8EEF4]">
            <span className="text-sm font-semibold text-[#CBA054] uppercase tracking-wide">
              Legal Expertise
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight">
            Our Practice Areas
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive legal services across multiple practice areas. Our
            experienced attorneys provide expert counsel and representation
            tailored to your specific needs.
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
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 group flex flex-col h-full">
                  {" "}
                  {/* Added flex classes for equal height */}
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-[#0A1A2F] to-[#1E354F] p-6 text-center flex-shrink-0">
                    {" "}
                    {/* Added flex-shrink-0 */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {practiceAreas[category.id].icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.label}
                    </h3>
                    <p className="text-[#E8EEF4] text-sm leading-relaxed min-h-[60px] flex items-center justify-center">
                      {" "}
                      {/* Added min-height for consistent description height */}
                      {practiceAreas[category.id].description}
                    </p>
                  </div>
                  {/* Card Features */}
                  <div className="p-6 flex-grow flex flex-col">
                    {" "}
                    {/* Added flex classes */}
                    <ul className="space-y-3 mb-6 flex-grow">
                      {" "}
                      {/* Added flex-grow */}
                      {practiceAreas[category.id].features
                        .slice(0, 4)
                        .map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 bg-[#CBA054] rounded-full flex-shrink-0"></div>
                            <span className="text-[#0A1A2F] text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                    </ul>
                    {/* Learn More Button */}
                    <button
                      onClick={() => navigate(`/services/${category.label}`)}
                      className="w-full bg-linear-to-r from-[#CBA054] to-[#DBAE5D] text-white py-3 rounded-lg font-semibold hover:bg-[#0A1A2F] hover:from-[#0A1A2F] hover:to-[#0A1A2F] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group/btn mt-auto"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
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

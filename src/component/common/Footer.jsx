import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
import FacebookFeed from "./FacebookFeed";

const Footer = ({ siteSettings = {}, servicesData = [] }) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const footerLinks = {
    practiceAreas: {
      title: "Practice Areas",
      links: servicesData.slice(0, 9).map((service) => ({
        name: service.service_name,
        url: `/services/${service.slug}`,
      })),
    },
  };

  // Dynamic contact info from siteSettings
  const contactInfo = [
    {
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: siteSettings?.address || "123 Legal Street, London, UK WC1A 1AA",
      url: siteSettings?.map || "#",
    },
    {
      icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: siteSettings?.phone || "0203 488 0953",
      url: `tel:${siteSettings?.phone || "+442034880953"}`,
    },
    {
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: siteSettings?.email || "info@huberslaw.com",
      url: `mailto:${siteSettings?.email || "info@huberslaw.com"}`,
    },
    {
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: `Mon-Fri: ${siteSettings?.mon?.split(" - ")[0] || "9:00 AM"} - ${
        siteSettings?.fri?.split(" - ")[1] || "6:00 PM"
      }`,
      url: "#",
    },
  ];

  // Dynamic social links from siteSettings
  const socialLinks = [
    {
      icon: <Facebook className="w-4 h-4" />,
      url: siteSettings?.facebook || "#",
      name: "Facebook",
    },
    {
      icon: <Twitter className="w-4 h-4" />,
      url: siteSettings?.twitter || "#",
      name: "Twitter",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      url: siteSettings?.linkedin || "#",
      name: "LinkedIn",
    },
    {
      icon: <Instagram className="w-4 h-4" />,
      url: siteSettings?.instagram || "#",
      name: "Instagram",
    },
  ];

  // Dynamic accreditation logos from siteSettings
  const accreditationLogos = [
    {
      name: "SRA",
      title: "SRA Accredited",
      logo: siteSettings?.sra_logo ? (
        <img
          src={`${baseUrl}${siteSettings?.sra_logo}`}
          alt={siteSettings?.sra_alt || "SRA Accreditation"}
          className=" w-full object-contain h-[50%]"
        />
      ) : (
        <svg
          width="60"
          height="30"
          viewBox="0 0 60 30"
          className="text-white sm:w-20 sm:h-10"
        >
          <rect width="60" height="30" fill="#0A1A2F" rx="3" />
          <text
            x="30"
            y="16"
            textAnchor="middle"
            fill="#CBA054"
            fontSize="8"
            fontWeight="bold"
          >
            SRA
          </text>
          <text x="30" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="5">
            REGULATED
          </text>
        </svg>
      ),
      url: siteSettings?.sra_url,
    },
    {
      name: "Law Society",
      title: "Law Society Member",
      logo: siteSettings?.law_socity_logo ? (
        <img
          src={`${baseUrl}${siteSettings?.law_socity_logo}`}
          alt={siteSettings?.law_socity_alt || "The Law Society Membership"}
          className="h-full w-full object-contain s"
        />
      ) : (
        <svg
          width="60"
          height="30"
          viewBox="0 0 60 30"
          className="text-white sm:w-20 sm:h-10"
        >
          <rect width="60" height="30" fill="#0A1A2F" rx="3" />
          <text
            x="30"
            y="14"
            textAnchor="middle"
            fill="#CBA054"
            fontSize="6"
            fontWeight="bold"
          >
            THE LAW SOCIETY
          </text>
          <text x="30" y="23" textAnchor="middle" fill="#FFFFFF" fontSize="5">
            ACCREDITED
          </text>
        </svg>
      ),
      url: siteSettings?.law_socity_url,
    },
  ];

  // Company name from siteSettings
  const companyName = siteSettings?.com_name || "Hubers Law";
  const companyDescription =
    siteSettings?.meta_description ||
    "Providing expert legal counsel and representation with over 20 years of experience. Your trusted partner for comprehensive legal solutions tailored to your unique needs.";
  const copyrightText =
    siteSettings?.copy_right ||
    `© ${new Date().getFullYear()} Hubers Law. All rights reserved.`;

  return (
    <footer className="bg-[#0A1A2F] text-white">
      {/* Main Footer Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Grid container for all sections - 12 column grid for precise control */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 px-2 sm:px-4">
          {/* Brand & Contact Section - 4 columns */}
          <div className="md:col-span-6 lg:col-span-4 space-y-6">
            {/* Brand */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
              {siteSettings?.logo ? (
                <Link className="block bg-[#1E354F] rounded-lg p-3 sm:p-4 border border-[#CBA054]/20 hover:border-[#CBA054] transition-all duration-300 transform hover:scale-105 max-w-xs">
                  <img
                    src={`${baseUrl}${siteSettings?.logo}`}
                    alt={siteSettings.logo_alt || companyName}
                    className="w-32 h-12 sm:w-40 sm:h-15 rounded-lg object-contain"
                  />
                </Link>
              ) : (
                <>
                  <div className="w-10 h-10 bg-[#CBA054] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path d="M16 24L24 14L32 24L24 34L16 24Z" fill="white" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {companyName}
                    </h2>
                    <p className="text-[#CBA054] text-sm font-semibold">
                      Legal Excellence Since 2003
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
              {companyDescription}
            </p>

            {/* Contact Information */}
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="flex items-start sm:items-center space-x-3 text-gray-300 hover:text-[#CBA054] transition-colors duration-200 group"
                >
                  <div className="text-[#CBA054] group-hover:scale-110 transition-transform duration-200 flex-shrink-0 mt-0.5 sm:mt-0">
                    {item.icon}
                  </div>
                  <span className="text-sm sm:text-base break-words">
                    {item.text}
                  </span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1E354F] rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#CBA054] hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Practice Areas Section - 2 columns */}
          <div className="md:col-span-3 lg:col-span-2 space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-white border-l-4 border-[#CBA054] pl-3">
              {footerLinks.practiceAreas.title}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.practiceAreas.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-[#CBA054] transition-colors duration-200 text-xs sm:text-sm hover:underline hover:underline-offset-2 block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Accreditation Section - 2 columns */}
          <div className="md:col-span-3 lg:col-span-3 space-y-3 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-white border-l-4 border-[#CBA054] pl-3">
              Accreditation
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {accreditationLogos.map((accreditation, index) => (
                <a
                  key={index}
                  href={accreditation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#1E354F] rounded-lg p-3 sm:p-4 border border-[#CBA054]/20 hover:border-[#CBA054] transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex justify-center">
                      {accreditation.logo}
                    </div>
                    <span className="text-xs text-gray-300 text-center">
                      {accreditation.title}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Facebook Feed Section - 4 columns */}
         <div className="md:col-span-12 lg:col-span-3 space-y-6 pr-0 lg:pr-4">

            <h3 className="text-base sm:text-lg font-semibold text-white border-l-4 border-[#CBA054] pl-3">
              LIKE US ON FACEBOOK
            </h3>
            <div className="transform w-full origin-top-left">
              <FacebookFeed />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1E354F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              {copyrightText}
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <span className="whitespace-nowrap">SRA Number: 123456</span>
              <span className="whitespace-nowrap">
                VAT Number: GB 123 4567 89
              </span>
              <span className="whitespace-nowrap">Regulated by the SRA</span>
            </div>

            {/* Accreditation Badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <div className="text-xs text-gray-400 bg-[#1E354F] px-2 py-1 sm:px-3 sm:py-1 rounded-full whitespace-nowrap">
                ⭐ Rated 4.9/5 by Clients
              </div>
              <div className="text-xs text-gray-400 bg-[#1E354F] px-2 py-1 sm:px-3 sm:py-1 rounded-full whitespace-nowrap">
                🏆 Legal 500 Recommended
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div className="bg-gradient-to-r from-[#CBA054] to-[#DBAE5D] py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0 text-center sm:text-left">
            <div className="text-[#0A1A2F] font-semibold text-xs sm:text-sm lg:text-base">
              📞 Emergency Legal Assistance Available 24/7
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#0A1A2F]" />
              <a
                href={`tel:${
                  siteSettings?.helpline_no ||
                  siteSettings?.phone ||
                  "+442034880953"
                }`}
                className="text-[#0A1A2F] font-bold text-base sm:text-lg hover:underline whitespace-nowrap"
              >
                {siteSettings?.helpline_no ||
                  siteSettings?.phone ||
                  "0203 488 0953"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

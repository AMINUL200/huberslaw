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
      links: servicesData.slice(0, 5).map((service) => ({
        name: service.service_name,
        url: `/services/${service.slug}`,
      })),
    },
  };

  // Dynamic contact info from siteSettings
  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      text: siteSettings?.address || "123 Legal Street, London, UK WC1A 1AA",
      url: siteSettings?.map || "#",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: siteSettings?.phone || "0203 488 0953",
      url: `tel:${siteSettings?.phone || "+442034880953"}`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: siteSettings?.email || "info@huberslaw.com",
      url: `mailto:${siteSettings?.email || "info@huberslaw.com"}`,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: `Mon-Fri: ${siteSettings?.mon?.split(" - ")[0] || "9:00 AM"} - ${
        siteSettings?.fri?.split(" - ")[1] || "6:00 PM"
      }`,
      url: "#",
    },
  ];

  // Dynamic social links from siteSettings
  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      url: siteSettings?.facebook || "#",
      name: "Facebook",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      url: siteSettings?.twitter || "#",
      name: "Twitter",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      url: siteSettings?.linkedin || "#",
      name: "LinkedIn",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
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
          className="h-full w-auto object-contain"
        />
      ) : (
        <svg width="80" height="40" viewBox="0 0 80 40" className="text-white">
          <rect width="80" height="40" fill="#0A1A2F" rx="4" />
          <text
            x="40"
            y="22"
            textAnchor="middle"
            fill="#CBA054"
            fontSize="10"
            fontWeight="bold"
          >
            SRA
          </text>
          <text x="40" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="6">
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
          className="h-full w-auto object-contain"
        />
      ) : (
        <svg width="80" height="40" viewBox="0 0 80 40" className="text-white">
          <rect width="80" height="40" fill="#0A1A2F" rx="4" />
          <text
            x="40"
            y="18"
            textAnchor="middle"
            fill="#CBA054"
            fontSize="8"
            fontWeight="bold"
          >
            THE LAW SOCIETY
          </text>
          <text x="40" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="6">
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
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Brand & Contact */}
          <div className="space-y-6 lg:col-span-4">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              {siteSettings?.logo ? (
                <Link className="block bg-[#1E354F] rounded-lg p-4 border border-[#CBA054]/20 hover:border-[#CBA054] transition-all duration-300 transform hover:scale-105">
                  <img
                    src={`${baseUrl}${siteSettings?.logo}`}
                    alt={siteSettings.logo_alt || companyName}
                    className="w-40 h-15 rounded-lg object-contain"
                  />
                </Link>
              ) : (
                <>
                  <div className="w-10 h-10 bg-[#CBA054] rounded-lg flex items-center justify-center">
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
                  <div>
                    <h2 className="text-2xl font-bold text-white">
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
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              {companyDescription}
            </p>

            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#CBA054] transition-colors duration-200 group"
                >
                  <div className="text-[#CBA054] group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-[#1E354F] rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#CBA054] hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Links Grid & Accreditation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:col-span-8">
            {/* Practice Areas Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-l-4 border-[#CBA054] pl-3">
                {footerLinks.practiceAreas.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.practiceAreas.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="text-gray-300 hover:text-[#CBA054] transition-colors duration-200 text-sm hover:underline hover:underline-offset-2"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accreditation Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-l-4 border-[#CBA054] pl-3">
                Accreditation
              </h3>

              <div className="space-y-4">
                {accreditationLogos.map((accreditation, index) => (
                  <a
                    key={index}
                    href={accreditation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#1E354F] rounded-lg p-4 border border-[#CBA054]/20 hover:border-[#CBA054] transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex justify-center ">
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

            {/* ⭐ Facebook Feed Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-l-4 border-[#CBA054] pl-3">
                LIKE US ON FACEBOOK
              </h3>

              <div className="bg-[#1E354F] p-3 rounded-lg border border-[#CBA054]/20">
                <FacebookFeed />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1E354F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">{copyrightText}</div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span>SRA Number: 123456</span>
              <span>VAT Number: GB 123 4567 89</span>
              <span>Regulated by the SRA</span>
            </div>

            {/* Accreditation Badges */}
            <div className="flex items-center space-x-4">
              <div className="text-xs text-gray-400 bg-[#1E354F] px-3 py-1 rounded-full">
                ⭐ Rated 4.9/5 by Clients
              </div>
              <div className="text-xs text-gray-400 bg-[#1E354F] px-3 py-1 rounded-full">
                🏆 Legal 500 Recommended
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div className="bg-gradient-to-r from-[#CBA054] to-[#DBAE5D] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-[#0A1A2F] font-semibold text-sm sm:text-base">
              📞 Emergency Legal Assistance Available 24/7
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#0A1A2F]" />
              <a
                href={`tel:${
                  siteSettings?.helpline_no ||
                  siteSettings?.phone ||
                  "+442034880953"
                }`}
                className="text-[#0A1A2F] font-bold text-lg hover:underline"
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

import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    practiceAreas: {
      title: "Practice Areas",
      links: [
        { name: "Corporate Law", url: "/practice-areas/corporate" },
        { name: "Litigation", url: "/practice-areas/litigation" },
        { name: "Family Law", url: "/practice-areas/family" },
        { name: "Real Estate Law", url: "/practice-areas/real-estate" },
        { name: "Criminal Defense", url: "/practice-areas/criminal" },
        { name: "Employment Law", url: "/practice-areas/employment" },
        { name: "Immigration Law", url: "/practice-areas/immigration" },
        { name: "Intellectual Property", url: "/practice-areas/ip" }
      ]
    },
    about: {
      title: "About Us",
      links: [
        { name: "Our People", url: "/about/our-people" },
        { name: "Client Care", url: "/about/client-care" },
        { name: "Why Choose Us", url: "/about/why-choose-us" },
        { name: "Testimonials", url: "/about/testimonials" },
        { name: "Careers", url: "/careers" },
        { name: "Contact Us", url: "/contact" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Blog & Insights", url: "/blog" },
        { name: "FAQ", url: "/faq" },
        { name: "Case Studies", url: "/case-studies" },
        { name: "Legal Guides", url: "/guides" },
        { name: "News & Updates", url: "/news" }
      ]
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Terms & Conditions", url: "/terms" },
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Cookie Policy", url: "/cookies" },
        { name: "Disclaimer", url: "/disclaimer" },
        { name: "Accessibility", url: "/accessibility" }
      ]
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "123 Legal Street, London, UK WC1A 1AA",
      url: "#"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: "0203 488 0953",
      url: "tel:+442034880953"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: "info@huberslaw.com",
      url: "mailto:info@huberslaw.com"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Mon-Fri: 9:00 AM - 6:00 PM",
      url: "#"
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: "#", name: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, url: "#", name: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, url: "#", name: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, url: "#", name: "Instagram" }
  ];

  return (
    <footer className="bg-[#0A1A2F] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Brand & Contact */}
          <div className="space-y-8">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#CBA054] rounded-lg flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" />
                  <path d="M16 24L24 14L32 24L24 34L16 24Z" fill="white" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Hubers Law</h2>
                <p className="text-[#CBA054] text-sm font-semibold">Legal Excellence Since 2003</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Providing expert legal counsel and representation with over 20 years of experience. 
              Your trusted partner for comprehensive legal solutions tailored to your unique needs.
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
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key} className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-l-4 border-[#CBA054] pl-3">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1E354F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Hubers Law. All rights reserved.
            </div>

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
                href="tel:+442034880953" 
                className="text-[#0A1A2F] font-bold text-lg hover:underline"
              >
                0203 488 0953
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,  
  Phone,
  Printer,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Navbar = ({ toggleMenu, togglePopup }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links with parent paths
  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    {
      id: "about",
      label: "About Us",
      path: "/about-us?tab=about",
      dropdown: [
        { id: "our-people", label: "Our People", path: "/about-us?tab=people" },
        {
          id: "client-care",
          label: "Client Care",
          path: "/about-us?tab=client-care",
        },
        {
          id: "terms-condition",
          label: "Terms And Condition",
          path: "/about-us?tab=terms",
        },
      ],
    },
    {
      id: "services",
      label: "Services",
      path: "/services",
      dropdown: [
        { id: "corporate-law", label: "Corporate Law", path: "/services/corporate-law" },
        {
          id: "family-law",
          label: "Family Law",
          path: "/services/family-law",
        },
        { id: "business-law", label: "Business Law", path: "/services/business-law" },
      ],
    },
    {
      id: "careers",
      label: "Careers",
      path: "/careers",
      dropdown: [
        {
          id: "why-work-with-us",
          label: "Why Work With Us",
          path: "/careers?tab=why-work",
        },
        { id: "vacensis", label: "Vacensis", path: "/careers?tab=vacancies" },
      ],
    },
    { id: "contact", label: "Contact Us", path: "/contact-us" },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, url: "#", name: "Facebook" },
    { icon: <Twitter className="w-4 h-4" />, url: "#", name: "Twitter" },
    { icon: <Linkedin className="w-4 h-4" />, url: "#", name: "LinkedIn" },
    { icon: <Instagram className="w-4 h-4" />, url: "#", name: "Instagram" },
  ];

  // Hover handlers
  const handleMouseEnter = (dropdownId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: true
    }));
  };

  const handleMouseLeave = (dropdownId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: false
    }));
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdowns({});
  };

  // Handle parent click - navigate to parent path
  const handleParentClick = (item) => {
    navigate(item.path);
    closeAllDropdowns();
  };

  // Handle dropdown item click
  const handleDropdownItemClick = (path) => {
    navigate(path);
    closeAllDropdowns();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
        }
      });
      if (clickedOutside) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  // Render dropdown items
  const renderDropdownItem = (item, level = 1) => {
    const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
    const dropdownKey = `${item.id}-sub-${level}`;
    const isOpen = openDropdowns[dropdownKey];

    return (
      <div 
        key={item.id} 
        className="relative group"
        onMouseEnter={() => hasSubDropdown && handleMouseEnter(dropdownKey)}
        onMouseLeave={() => hasSubDropdown && handleMouseLeave(dropdownKey)}
      >
        {hasSubDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-2 text-sm text-[#0A1A2F] hover:bg-[#F4EEDC] hover:text-[#CBA054] cursor-pointer transition-colors ${
              level > 1 ? "pl-8" : ""
            }`}
          >
            <span>{item.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        ) : (
          <RouterLink
            to={item.path}
            className={`block px-4 py-2 text-sm text-[#0A1A2F] hover:bg-[#F4EEDC] hover:text-[#CBA054] transition-colors ${
              level > 1 ? "pl-8" : ""
            }`}
            onClick={closeAllDropdowns}
          >
            {item.label}
          </RouterLink>
        )}

        {hasSubDropdown && isOpen && (
          <div className="absolute left-full top-0 w-64 bg-white border border-[#E8EEF4] rounded-lg shadow-lg z-50">
            <div className="py-2">
              {item.dropdown.map((subItem) =>
                renderDropdownItem(subItem, level + 1)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render navigation item
  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];

    return (
      <div
        key={item.id}
        className="relative"
        ref={(el) => (dropdownRefs.current[item.id] = el)}
        onMouseEnter={() => hasDropdown && handleMouseEnter(item.id)}
        onMouseLeave={() => hasDropdown && handleMouseLeave(item.id)}
      >
        {hasDropdown ? (
          <div className="relative">
            {/* Clickable parent link */}
            <div
              className={`text-[#0A1A2F] font-semibold hover:text-[#CBA054] cursor-pointer transition-colors px-2 py-1 flex items-center space-x-1 ${
                isOpen ? "text-[#CBA054]" : ""
              }`}
              onClick={() => handleParentClick(item)}
            >
              <span>{item.label}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
              <div 
                className="absolute top-6 left-0 mt-2 w-64 bg-white border border-[#E8EEF4] rounded-lg shadow-lg z-50"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
              >
                <div className="py-2">
                  {item.dropdown.map((dropdownItem) => (
                    <div key={dropdownItem.id}>
                      {dropdownItem.dropdown ? (
                        renderDropdownItem(dropdownItem)
                      ) : (
                        <RouterLink
                          to={dropdownItem.path}
                          className="block px-4 py-2 text-sm text-[#0A1A2F] hover:bg-[#F4EEDC] hover:text-[#CBA054] transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          {dropdownItem.label}
                        </RouterLink>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="text-[#0A1A2F] font-semibold hover:text-[#CBA054] cursor-pointer transition-colors px-2 py-1"
            onClick={() => handleParentClick(item)}
          >
            {item.label}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Top Contact Bar - Fixed at the very top */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#0A1A2F] text-white transition-all duration-300 z-40 ${
          scrolled
            ? "h-0 opacity-0 overflow-hidden -translate-y-full"
            : "h-12 opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          {/* Left Side - Contact Info */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#CBA054]" />
              <span>Tel: 0044 (0)203 488 0953</span>
            </div>
            <div className="flex items-center space-x-2">
              <Printer className="w-4 h-4 text-[#CBA054]" />
              <span>Fax: 0044 (0)203 004 1413</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#CBA054]" />
              <span>Email: info@huberslaw.co.uk</span>
            </div>
          </div>

          {/* Right Side - Social Icons */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="text-gray-300 hover:text-[#CBA054] transition-colors duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Header - Position depends on contact bar visibility */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-2 top-0"
            : "bg-white/95 backdrop-blur-sm py-4 top-12"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="text-2xl font-bold flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#0A1A2F"
                  strokeWidth="4"
                />
                <path d="M16 24L24 14L32 24L24 34L16 24Z" fill="#0A1A2F" />
              </svg>
              <h1 className="ml-2 text-xl font-semibold text-[#0A1A2F]">
                Hubers Law
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((item) => renderNavItem(item))}

            <button
              onClick={togglePopup}
              className="ml-4 bg-[#0A1A2F] text-white px-6 py-2 rounded-md hover:bg-[#CBA054] transition-all duration-300 flex items-center space-x-2"
            >
              <span>Book Appointment</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleMenu}
              className="text-[#0A1A2F] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "h-16" : "h-[6.5rem]"
        }`}
      />
    </>
  );
};

export default Navbar;
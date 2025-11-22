import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  ChevronRight,
  Home,
  Briefcase,
  Package,
  DollarSign,
  BookOpen,
  Mail,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const SideBar = ({
  toggleMenu,
  isOpen,
  servicesData = [],
  siteSettings = {},
}) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  // Sidebar navigation links with icons - Updated to match navbar structure
  const sidebarLinks = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "about",
      label: "About Us",
      icon: <User className="w-5 h-5" />,
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
      icon: <Briefcase className="w-5 h-5" />,
      path: "/services",
      dropdown: servicesData.map((service) => ({
        id: service.id,
        label: service.service_name,
        path: `/services/${service.slug}`,
      })),
    },
    {
      id: "careers",
      label: "Careers",
      icon: <Package className="w-5 h-5" />,
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
    {
      id: "contact",
      label: "Contact Us",
      path: "contact-us",
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  // Close sidebar when route changes
  useEffect(() => {
    if (isOpen) {
      toggleMenu();
    }
  }, [location.pathname]);

  // Toggle dropdown
  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  // Handle navigation
  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
      setOpenDropdowns({});
    }
  };

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
    toggleMenu();
  };

  // Check if current path matches
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Render dropdown items recursively
  const renderDropdownItem = (item, level = 1) => {
    const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
    const dropdownKey = `${item.id}-sub-${level}`;
    const isOpen = openDropdowns[dropdownKey];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="relative">
        {hasSubDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-all duration-200 ${
              level > 1 ? "pl-10" : "pl-6"
            } ${
              isOpen
                ? "bg-[#F4EEDC] text-[#CBA054]"
                : "text-[#0A1A2F] hover:bg-[#F4EEDC] hover:text-[#CBA054]"
            }`}
            onClick={() => toggleDropdown(dropdownKey)}
          >
            <span className="font-medium">{item.label}</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <div
            className={`flex items-center px-4 py-3 text-sm cursor-pointer transition-all duration-200 ${
              level > 1 ? "pl-10" : "pl-6"
            } ${
              isActive
                ? "bg-[#CBA054] text-white font-semibold"
                : "text-[#0A1A2F] hover:bg-[#F4EEDC] hover:text-[#CBA054]"
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            <span className="font-medium">{item.label}</span>
          </div>
        )}

        {/* Nested dropdown */}
        {hasSubDropdown && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-[#F4EEDC] border-l-2 border-[#CBA054] ml-4">
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
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="mb-1">
        {hasDropdown ? (
          <div
            className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200 rounded-lg mx-2 ${
              isOpen
                ? "bg-[#F4EEDC] text-[#CBA054]"
                : "text-[#0A1A2F] hover:bg-[#F4EEDC] hover:text-[#CBA054]"
            }`}
            onClick={() => toggleDropdown(item.id)}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span className="font-semibold">{item.label}</span>
            </div>
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <div
            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all duration-200 rounded-lg mx-2 ${
              isActive
                ? "bg-[#CBA054] text-white font-semibold shadow-md"
                : "text-[#0A1A2F] hover:bg-[#F4EEDC] hover:text-[#CBA054]"
            }`}
            onClick={() => handleNavClick(item.path)}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </div>
        )}

        {/* Dropdown menu */}
        {hasDropdown && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-1">
              {item.dropdown.map((dropdownItem) =>
                renderDropdownItem(dropdownItem)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8EEF4] bg-white">
          <div className="flex items-center space-x-3">
            {siteSettings.logo ? (
              <img
                src={`${baseUrl}${siteSettings.logo}`}
                alt={siteSettings.logo_alt || "Logo"}
                className="h-12 w-auto"
              />
            ) : (
              <>
                <svg
                  width="36"
                  height="36"
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
                <h2 className="text-xl font-bold text-[#0A1A2F]">Hubers Law</h2>
              </>
            )}
          </div>
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-[#F4EEDC] rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-[#0A1A2F]" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 h-[calc(100vh-180px)]">
          {sidebarLinks.map((item) => renderNavItem(item))}
        </nav>
      </aside>
    </>
  );
};

export default SideBar;

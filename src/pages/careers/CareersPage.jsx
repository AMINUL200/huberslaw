import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Home,
  Briefcase,
  User,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Award,
  Heart,
  Calendar,
} from "lucide-react";
import Vacancies from "../../component/careers/Vacanices";
import SelfEmployed from "../../component/careers/SelfEmployed";
import WhyWork from "../../component/careers/WhyWork";

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState("vacancies");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");

    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const tabs = [
    {
      id: "vacancies",
      label: "Vacancies",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      id: "self-employed",
      label: "Self-employed / Free Earner / Locum",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "why-work",
      label: "Why Work With Us",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  const breadcrumbs = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Careers", path: "/careers", current: true },
  ];

  // Dummy data for vacancies
  const vacancies = [
    {
      id: 1,
      title: "Senior Corporate Lawyer",
      department: "Corporate Law",
      location: "London, UK",
      type: "Full-time",
      salary: "£80,000 - £120,000",
      experience: "5+ years",
      description:
        "We are seeking an experienced Corporate Lawyer to join our growing team. The ideal candidate will have extensive experience in M&A, corporate governance, and commercial contracts.",
      requirements: [
        "Qualified solicitor in England and Wales",
        "5+ years of corporate law experience",
        "Strong knowledge of M&A transactions",
        "Excellent client management skills",
      ],
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Family Law Associate",
      department: "Family Law",
      location: "London, UK",
      type: "Full-time",
      salary: "£45,000 - £65,000",
      experience: "2+ years",
      description:
        "Join our family law team and help clients navigate complex family matters including divorce, child custody, and financial settlements.",
      requirements: [
        "Qualified solicitor in England and Wales",
        "2+ years of family law experience",
        "Strong empathy and communication skills",
        "Experience with mediation preferred",
      ],
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "Litigation Paralegal",
      department: "Litigation",
      location: "London, UK",
      type: "Full-time",
      salary: "£30,000 - £40,000",
      experience: "1+ years",
      description:
        "Support our litigation team in preparing cases, conducting legal research, and managing client communications.",
      requirements: [
        "Law degree or LPC qualification",
        "1+ years of litigation experience",
        "Strong research and writing skills",
        "Attention to detail",
      ],
      posted: "3 days ago",
    },
  ];

  // Dummy data for benefits
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Competitive Compensation",
      description:
        "Attractive salary packages with performance-based bonuses and comprehensive benefits.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Professional Development",
      description:
        "Continuous learning opportunities, training programs, and support for professional qualifications.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Career Advancement",
      description:
        "Clear career progression paths and opportunities for growth within the firm.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance, mental health support, and wellness programs.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Work-Life Balance",
      description:
        "Flexible working arrangements and generous holiday allowance.",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Modern Environment",
      description:
        "State-of-the-art offices with all the tools and technology you need to succeed.",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "vacancies":
        return <Vacancies vacancies={vacancies} />;

      case "self-employed":
        return <SelfEmployed />;

      case "why-work":
        return <WhyWork benefits={benefits} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.name} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                {crumb.current ? (
                  <span className="text-[#0A1A2F] font-semibold flex items-center">
                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="hover:text-[#CBA054] transition-colors duration-200 flex items-center"
                  >
                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-4">
            Careers at Hubers Law
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our team of legal professionals and build your career with a
            firm that values excellence, integrity, and growth.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto pb-2 mb-8">
          <div className="mx-auto flex space-x-1 bg-white rounded-2xl p-2 shadow-lg border border-[#E8EEF4]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#0A1A2F] text-white shadow-md"
                    : "text-[#0A1A2F] hover:bg-[#F4EEDC] hover:text-[#CBA054]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;

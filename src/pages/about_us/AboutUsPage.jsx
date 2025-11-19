import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Home,
  Users,
  Heart,
  FileText,
  Shield,
  Target,
  Clock,
} from "lucide-react";
import AboutINfo from "../../component/about-us/AboutINfo";
import AboutOurPeople from "../../component/about-us/AboutOurPeople";
import AboutClientCare from "../../component/about-us/AboutClientCare";
import AboutTerms from "../../component/about-us/AboutTerms";
import { toast } from "react-toastify";
import { api } from "../../utils/app";
import LegalLoader from "../../component/common/LegalLoader";

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [aboutInfo, setAboutInfo] = useState({});
  const [teamInfo, setTeamInfo] = useState([]);
  const [clientCareInfo, setClientCareInfo] = useState({});
  const [termsInfo, setTermsInfo] = useState([]);
  const [solicitorInfo, setSolicitorInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settingInfo, setSettingInfo] = useState(null);

  const location = useLocation();

  const fetchData = async () => {
    try {
      const res = await api.get("/about-us");
      if (res.data.status) {
        const data = res.data.data;
        // console.log("About Us Data:", data);
        setAboutInfo(data.about || {});
        setClientCareInfo(data.client_care || {});
        setTermsInfo(data.terms_condition || []);
        setTeamInfo(data.teams || []);
        setSolicitorInfo(data.solicitor_talent || []);
      }
    } catch (error) {
      console.error("Error fetching about us data:", error);
      toast.error(error.message || "Failed to load About Us data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      if (res.data.status) {
        setSettingInfo(res.data.data);
      }
      
    } catch (error) {
      console.error("Error fetching site settings:", error);
      toast.error(error.message || "Failed to load site settings.");
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");

    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  useEffect(() => {
    fetchData();
    fetchSettings();
  }, []);

  const tabs = [
    { id: "about", label: "About Us", icon: <Users className="w-5 h-5" /> },
    { id: "people", label: "Our People", icon: <Heart className="w-5 h-5" /> },
    {
      id: "client-care",
      label: "Client Care",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "terms",
      label: "Terms & Conditions",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const breadcrumbs = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "About Us", path: "/about", current: true },
  ];

  const teamMembers = [
    {
      name: "John Smith",
      role: "Senior Partner",
      specialty: "Corporate Law",
      experience: "15+ years",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Sarah Johnson",
      role: "Partner",
      specialty: "Family Law",
      experience: "12+ years",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Sarah Johnson",
      role: "Partner",
      specialty: "Family Law",
      experience: "12+ years",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Michael Brown",
      role: "Senior Associate",
      specialty: "Litigation",
      experience: "10+ years",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Emily Davis",
      role: "Associate",
      specialty: "Real Estate",
      experience: "8+ years",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
  ];

 

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <AboutINfo
            aboutInfo={aboutInfo}
            teamInfo={teamInfo}
            solicitorInfo={solicitorInfo}
          />
        );

      case "people":
        return <AboutOurPeople  teamInfo={teamInfo} />;

      case "client-care":
        return <AboutClientCare clientCareInfo={clientCareInfo} />;

      case "terms":
        return <AboutTerms termsInfo={termsInfo} settingInfo={settingInfo} />;

      default:
        return null;
    }
  };

  if (loading) return <LegalLoader />;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4] pt-32 pb-16">
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
            About Hubers Law
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our story, meet our team, and learn about our commitment to
            exceptional legal service.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto pb-2 mb-8">
          <div className=" mx-auto flex space-x-1 bg-white rounded-2xl p-2 shadow-lg border border-[#E8EEF4]">
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

export default AboutUsPage;

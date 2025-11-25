import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Home,
  Users,
  Heart,
  FileText,
  Shield,
} from "lucide-react";
import AboutINfo from "../../component/about-us/AboutINfo";
import AboutOurPeople from "../../component/about-us/AboutOurPeople";
import AboutClientCare from "../../component/about-us/AboutClientCare";
import AboutTerms from "../../component/about-us/AboutTerms";
import { toast } from "react-toastify";
import { api } from "../../utils/app";
import LegalLoader from "../../component/common/LegalLoader";

const breadcrumbMap = {
  about: "About Us",
  people: "Our People",
  "client-care": "Client Care",
  terms: "Terms & Conditions",
};

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [aboutInfo, setAboutInfo] = useState({});
  const [teamInfo, setTeamInfo] = useState([]);
  const [clientCareInfo, setClientCareInfo] = useState({});
  const [termsInfo, setTermsInfo] = useState({});
  const [solicitorInfo, setSolicitorInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabTransition, setTabTransition] = useState(false);
  const [settingInfo, setSettingInfo] = useState(null);

  const location = useLocation();

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [aboutRes, settingsRes] = await Promise.all([
        api.get("/about-us"),
        api.get("/settings"),
      ]);

      if (aboutRes.data.status) {
        const data = aboutRes.data.data;
        setAboutInfo(data.about || {});
        setClientCareInfo(data.client_care || {});
        setTermsInfo(data.terms_condition[0] || {});
        setTeamInfo(data.teams || []);
        setSolicitorInfo(data.solicitor_talent || []);
      }

      if (settingsRes.data.status) {
        setSettingInfo(settingsRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tabId) => {
    setTabTransition(true);
    setActiveTab(tabId);

    // Smooth transition effect
    setTimeout(() => {
      setTabTransition(false);
    }, 300);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");

    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  useEffect(() => {
    fetchAllData();
  }, [activeTab]);

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
    {
      name: breadcrumbMap[activeTab],
      path: `/about-us?tab=${activeTab}`,
      current: true,
    },
  ];

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="min-h-96 flex items-center justify-center">
          <LegalLoader />
        </div>
      );
    }

    return (
      <div
        className={`transition-opacity duration-300 ${
          tabTransition ? "opacity-50" : "opacity-100"
        }`}
      >
        {activeTab === "about" && (
          <AboutINfo
            aboutInfo={aboutInfo}
            teamInfo={teamInfo}
            solicitorInfo={solicitorInfo}
          />
        )}
        {activeTab === "people" && <AboutOurPeople teamInfo={teamInfo} />}
        {activeTab === "client-care" && (
          <AboutClientCare clientCareInfo={clientCareInfo} />
        )}
        {activeTab === "terms" && (
          <AboutTerms termsInfo={termsInfo} settingInfo={settingInfo} />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4] pt-15 md:pt-32 pb-16">
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
          <div className="mx-auto flex flex-col md:flex-row space-x-1 bg-white rounded-2xl p-2 shadow-lg border border-[#E8EEF4]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                disabled={tabTransition}
                className={`flex items-center space-x-2 px-16 md:px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#0A1A2F] text-white shadow-md"
                    : "text-[#0A1A2F] hover:bg-[#F4EEDC] hover:text-[#CBA054]"
                } ${tabTransition ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-4 md:p-8 min-h-96">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

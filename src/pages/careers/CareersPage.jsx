import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home, Briefcase, User, Star } from "lucide-react";
import Vacancies from "../../component/careers/Vacanices";
import SelfEmployed from "../../component/careers/SelfEmployed";
import WhyWork from "../../component/careers/WhyWork";
import { toast } from "react-toastify";
import { api } from "../../utils/app";
import LegalLoader from "../../component/common/LegalLoader";

const breadcrumbMap = {
  vacancies: "Vacancies",
  "self-employed": "Self-employed / Free Earner / Locum",
  "why-work": "Why Work With Us",
};

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState("vacancies");
  const [vacanciesData, setVacanciesData] = useState([]);
  const [whyWorkData, setWhyWorkData] = useState({});
  const [selfEmployedData, setSelfEmployedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabTransition, setTabTransition] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [settingInfo, setSettingInfo] = useState({});

  const location = useLocation();

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [careersRes, settingsRes] = await Promise.all([
        api.get("/careers"),
        api.get("/settings"),
      ]);

      if (careersRes.data.status) {
        const data = careersRes.data.data;
        setPageInfo({
          title: data.page_title,
          title_meta: data.page_meta,
          description: data.page_desc,
        });
        setVacanciesData(data.vacancy || []);
        setWhyWorkData(data.work_with_us || {});
        setSelfEmployedData(data.self_employee || []);
      } else {
        toast.error("Failed to load careers data.");
      }

      if (settingsRes.data.status) {
        setSettingInfo(settingsRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching careers data:", error);
      toast.error(error.message || "Failed to load careers data.");
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
    {
      name: breadcrumbMap[activeTab],
      path: `/careers?tab=${activeTab}`,
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
        {activeTab === "vacancies" && <Vacancies vacancies={vacanciesData} />}
        {activeTab === "self-employed" && (
          <SelfEmployed selfEmployedData={selfEmployedData} />
        )}
        {activeTab === "why-work" && (
          <WhyWork settingInfo={settingInfo} WorkData={whyWorkData} />
        )}
      </div>
    );
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
          <h1
            className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-4"
            aria-label={pageInfo.title_meta || "Careers at Our Firm"}
          >
            {pageInfo.title || "Careers at Our Firm"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {pageInfo.description ||
              "Join our team and build a rewarding career with us."}
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

export default CareersPage;

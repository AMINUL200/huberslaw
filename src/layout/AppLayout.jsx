import React, { useEffect, useState } from "react";
import SideBar from "../component/common/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "../component/common/Footer";
import Navbar from "../component/common/Navbar";
import BackToTop from "../component/common/BackToTop";
import AppointmentPopup from "../component/common/AppointmentPopup";
import { api } from "../utils/app";
import LegalLoader from "../component/common/LegalLoader";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servicesData, setServicesData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const togglePopup = () => setShowPopup(!showPopup);

  console.log(showPopup);
  // Fetch all required data in parallel
  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Use Promise.all to fetch multiple APIs simultaneously
      const [settingsResponse, serv_and_teamListRes] = await Promise.all([
        api.get("/settings"),
        api.get("/service-name"),
      ]);

      // Set site settings
      if (settingsResponse.data.status) {
        setSiteSettings(settingsResponse.data.data);
      } else {
        console.error("Failed to load site settings");
      }

      // Set services and team data
      setServicesData(serv_and_teamListRes.data.services || []);
      setTeamData(serv_and_teamListRes.data.teams || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) return <LegalLoader />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        toggleMenu={toggleSidebar}
        togglePopup={togglePopup}
        servicesData={servicesData}
        siteSettings={siteSettings}
      />
      <SideBar
        toggleMenu={toggleSidebar}
        isOpen={sidebarOpen}
        servicesData={servicesData}
        siteSettings={siteSettings}
      />
      <Outlet />
      <Footer siteSettings={siteSettings} servicesData={servicesData} />
      <BackToTop />

      {/* SHOW POPUP */}
      {showPopup && (
        <AppointmentPopup
          onClose={() => setShowPopup(false)}
          servicesData={servicesData}
          teamData={teamData}
        />
      )}
    </div>
  );
};

export default AppLayout;

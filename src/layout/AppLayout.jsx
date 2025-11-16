import React, { useState } from "react";
import SideBar from "../component/common/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "../component/common/Footer";
import Navbar from "../component/common/Navbar";
import BackToTop from "../component/common/BackToTop";
import AppointmentPopup from "../component/common/AppointmentPopup";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const togglePopup = () => setShowPopup(!showPopup);

  console.log(showPopup);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleMenu={toggleSidebar} togglePopup={togglePopup} />
      <SideBar toggleMenu={toggleSidebar} isOpen={sidebarOpen} />
      <Outlet />
      <Footer />
      <BackToTop />

      {/* SHOW POPUP */}
      {showPopup && <AppointmentPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default AppLayout;

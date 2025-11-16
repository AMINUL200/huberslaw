import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/landing/LandingPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import SiteSettings from "./pages/admin/settings/SiteSettings";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import AboutUsPage from "./pages/about_us/AboutUsPage";
import TeamMemberDetails from "./pages/team_details/TeamMemberDetails";
import ContactUs from "./pages/contact/ContactUs";
import CareersPage from "./pages/careers/CareersPage";
import Services from "./pages/services/Services";
import ServicesDetails from "./pages/services/ServicesDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUsPage/>} />
          <Route path="/team/:slug" element={<TeamMemberDetails/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/careers" element={<CareersPage/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/services/:serviceSlug" element={<ServicesDetails/>} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Additional admin routes can be added here */}
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

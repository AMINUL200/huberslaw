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
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import HandleBanner from "./pages/admin/homepage/HandleBanner";
import HandleSolicitorTalent from "./pages/admin/homepage/HandleSolicitorTalent";
import HandleTrulyListen from "./pages/admin/homepage/HandleTrulyListen";
import HandleServices from "./pages/admin/services/HandleServices";
import AddServices from "./pages/admin/services/AddServices";
import HandleTeam from "./pages/admin/team/HandleTeam";
import AddTeam from "./pages/admin/team/AddTeam";
import HandleContactUs from "./pages/admin/contact_us/HandleContactUs";
import HandleAbout from "./pages/admin/about/HandleAbout";
import HandleAboutTerms from "./pages/admin/about/HandleAboutTerms";
import HandleVacancies from "./pages/admin/careers/HandleVacancies";
import HandleWhyWorkWithUs from "./pages/admin/careers/HandleWhyWorkWithUs";
import HandleSelfEmployed from "./pages/admin/careers/HandleSelfEmployed";
import ViewApplyJob from "./pages/admin/careers/ViewApplyJob";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const { token, user } = useAuth();
  console.log(token);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<AppLayout />}>
            <Route index path="/" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/team/:slug" element={<TeamMemberDetails />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/services/:serviceSlug"
              element={<ServicesDetails />}
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="site-settings" element={<SiteSettings />} />
              <Route path="profile" element={<AdminProfile />} />

              <Route path="homepage/*">
                <Route path="banners" element={<HandleBanner />} />
                <Route
                  path="solicitor-talent"
                  element={<HandleSolicitorTalent />}
                />
                <Route path="truly-listen" element={<HandleTrulyListen />} />
              </Route>

              <Route path="handle-services" element={<HandleServices />} />
              <Route path="add-services" element={<AddServices />} />

              <Route path="handle-team" element={<HandleTeam />} />
              <Route path="add-team" element={<AddTeam />} />

              <Route path="contact-us-messages" element={<HandleContactUs />} />

              <Route path="handle-about" element={<HandleAbout />} />
              <Route path="handle-terms" element={<HandleAboutTerms />} />

              <Route path="handle-vacancies" element={<HandleVacancies />} />
              <Route
                path="handle-why-work-with-us"
                element={<HandleWhyWorkWithUs />}
              />
              <Route
                path="handle-self-employed"
                element={<HandleSelfEmployed />}
              />
              <Route path="view-apply-job" element={<ViewApplyJob />} />
            </Route>
          </Route>
        </Routes>
      </Router>

      {/* Toast Container should ideally be HERE */}
      <ToastContainer position="top-right" theme="light" />
    </>
  );
};

export default App;

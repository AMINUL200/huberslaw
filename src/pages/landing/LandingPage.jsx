import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Award,
  Globe,
  Code,
  Palette,
  Smartphone,
} from "lucide-react";
import BannerSection from "../../component/landing_component/BannerSection";
import WeAreSolicitors from "../../component/landing_component/WeAreSolicitors";
import WhyHireSolicitorTalent from "../../component/landing_component/WhyHireSolicitorTalent";
import WeTrulyListen from "../../component/landing_component/WeTrulyListen";
import BookingForm from "../../component/landing_component/BookingForm";
import OurPracticeAreas from "../../component/landing_component/OurPracticeAreas";
import FAQSection from "../../component/landing_component/FAQSection";
import LegalLoader from "../../component/common/LegalLoader";
import { api } from "../../utils/app";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // API data states
  const [bannerData, setBannerData] = useState([]);
  const [solicitorTalentData, setSolicitorTalentData] = useState([]);
  const [trulyListenData, setTrulyListenData] = useState({});
  const [servicesList, setServicesList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    fetchAllAPIs();
  }, []);

  const fetchAllAPIs = async () => {
    try {
      const [
        bannerResponse,
        solicitorTalentResponse,
        trulyListenResponse,
        serv_and_teamList,
        servicesResponse,
        aboutResponse,
      ] = await Promise.all([
        api.get("/banners"),
        api.get("/solicitor-talents"),
        api.get("/truly-listen"),
        api.get("/service-name"),
        api.get("/service"),
        api.get("/home-about"),
      ]);

      setBannerData(bannerResponse.data.data || []);
      setSolicitorTalentData(solicitorTalentResponse.data.data || []);
      setTrulyListenData(trulyListenResponse.data.data[0] || {});
      setServicesList(serv_and_teamList.data.services || []);
      setTeamList(serv_and_teamList.data.teams || []);
      setServicesData(servicesResponse.data.data || []);
      setAboutData(aboutResponse.data.data.about || {});
    } catch (error) {
      console.error("Error loading landing page data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LegalLoader />;

  // if(!loading){
  //   console.log("Truly Listen Data:", trulyListenData);
  // }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <BannerSection bannerData={bannerData} />

      <WeAreSolicitors aboutData={aboutData} />

      <WhyHireSolicitorTalent solicitorTalentData={solicitorTalentData} />
      <WeTrulyListen trulyListenData={trulyListenData} />
      <BookingForm servicesList={servicesList} teamList={teamList} />
      <OurPracticeAreas servicesData={servicesData} />
      {/* <FAQSection/> */}
    </div>
  );
};

export default LandingPage;

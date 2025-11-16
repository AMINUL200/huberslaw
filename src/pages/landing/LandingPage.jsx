import React, { useState } from "react";
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

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  if (loading) return <LegalLoader/>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <BannerSection/>

      <WeAreSolicitors/>

      <WhyHireSolicitorTalent/>
      <WeTrulyListen/>
      <BookingForm/>
      <OurPracticeAreas/>
      {/* <FAQSection/> */}

      

     
     
    </div>
  );
};

export default LandingPage;
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

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized performance for the best user experience",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Safe",
      description: "Enterprise-grade security to protect your data",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scalable",
      description: "Grows with your business needs seamlessly",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Work together effortlessly with your team",
    },
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom web applications built with modern technologies",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that users love",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile solutions",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Digital Marketing",
      description: "Grow your online presence and reach more customers",
      color: "from-orange-500 to-red-600",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content: "This platform has transformed how we do business. Absolutely incredible!",
      rating: 5,
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Michael Chen",
      role: "Founder, StartupX",
      content: "Best investment we've made. The results speak for themselves.",
      rating: 5,
      image: "https://via.placeholder.com/100",
    },
    {
      name: "Emily Davis",
      role: "Marketing Director",
      content: "User-friendly, powerful, and exactly what we needed.",
      rating: 5,
      image: "https://via.placeholder.com/100",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50+", label: "Countries" },
    { number: "98%", label: "Satisfaction" },
    { number: "24/7", label: "Support" },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: [
        "Up to 10 users",
        "Basic features",
        "5GB storage",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      features: [
        "Up to 50 users",
        "Advanced features",
        "50GB storage",
        "Priority support",
        "Custom integrations",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: [
        "Unlimited users",
        "All features",
        "Unlimited storage",
        "24/7 phone support",
        "Dedicated account manager",
        "Custom solutions",
      ],
      popular: false,
    },
  ];

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
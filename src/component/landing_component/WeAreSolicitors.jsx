import React from "react";
import { ArrowRight, Scale, Users, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";

const WeAreSolicitors = ({ aboutData = {} }) => {

  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  // Default data in case aboutData is empty
  const defaultData = {
    title: "We Are Solicitors",
    description:
      "<p>At Hubers Law, we combine decades of legal expertise with a client-first approach. Our dedicated team of solicitors is committed to providing exceptional legal services tailored to your unique needs and circumstances.</p>",
    experience: "20+ Years Experience",
    about_feature: [
      {
        title: "Legal Expertise",
        description:
          "Comprehensive legal knowledge across multiple practice areas",
      },
      {
        title: "Client Focused",
        description: "Personalized attention and tailored legal strategies",
      },
      {
        title: "Trust & Confidentiality",
        description: "Your privacy and interests are our top priority",
      },
      {
        title: "Proven Results",
        description: "Track record of successful case outcomes",
      },
    ],
    image: "uploads/about/law.webp",
    image_alt: "we are solicitors image",
    button_name: "Learn More",
  };

  // Use aboutData if available, otherwise use default data
  const data = Object.keys(aboutData).length > 0 ? aboutData : defaultData;

  // Icon mapping for features
  const iconMap = {
    "Legal Expertise": <Scale className="w-6 h-6" />,
    "Client Focused": <Users className="w-6 h-6" />,
    "Trust & Confidentiality": <Shield className="w-6 h-6" />,
    "Proven Results": <Award className="w-6 h-6" />,
  };

  // Get icon for feature, fallback to Scale icon
  const getFeatureIcon = (title) => {
    return iconMap[title] || <Scale className="w-6 h-6" />;
  };

  // Extract years from experience string for the badge
  const getExperienceYears = (experience) => {
    const match = experience?.match(/(\d+\+)/);
    return match ? match[1] : "20+";
  };

  return (
    <section className="py-10 lg:py-15 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Main Image */}
              <div
                className="w-full h-80 lg:h-96 rounded-2xl bg-cover bg-center shadow-2xl"
                style={{
                  backgroundImage: data.image
                    ? `url('${baseUrl}/${data.image}')`
                    : "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                }}
                alt={data.image_alt || "Legal professionals"}
              />

              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#CBA054] text-white p-6 rounded-2xl shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {getExperienceYears(data.experience)}
                  </div>
                  <div className="text-sm font-semibold">
                    {data.experience?.replace(/\d+\+\s*/, "") ||
                      "Years Experience"}
                  </div>
                </div>
              </div>

              {/* Pattern Overlay */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0A1A2F] rounded-2xl opacity-10"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-lg">
             

              {/* Title */}
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight">
                {data.title || "We Are Solicitors"}
              </h2>

              {/* Description - Using dangerouslySetInnerHTML for HTML content */}
              <div
                className="text-lg  text-gray-600 mb-8 leading-relaxed prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: data.description || defaultData.description,
                }}
              />

              {/* Features Grid */}
              <div className="grid grid-cols-1  gap-4 mb-8">
                {(data.about_feature || defaultData.about_feature).map(
                  (feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {/* <div className="flex-shrink-0 w-12 h-12 bg-[#F4EEDC] rounded-lg flex items-center justify-center">
                        <div className="text-[#CBA054]">
                          {getFeatureIcon(feature.title)}
                        </div>
                      </div> */}
                      <div>
                        <h3 className="font-semibold text-[#0A1A2F] mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/about-us?tab=about"
                  className="bg-[#0A1A2F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>{data.button_name || "Learn More About Us"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeAreSolicitors;

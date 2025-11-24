import React from "react";
import { HelpCircle, Users, Layers, Target } from "lucide-react";

const WhyHireSolicitorTalent = ({ solicitorTalentData = [] }) => {

  const sectionInfo = {
    title:
      solicitorTalentData[0]?.section_title || "Why Hire Solicitor Talent?",
    title_meta:
      solicitorTalentData[0]?.section_title_meta ||
      "Why Hire Solicitor Talent?",
    description:
      solicitorTalentData[0]?.section_description
  };

  

  // ------------------ FEATURES WITH ICON LOGIC ------------------
  const iconMap = {
    Helpful: <HelpCircle className="w-8 h-8" />,
    Experienced: <Users className="w-8 h-8" />,
    "Solid Foundation": <Layers className="w-8 h-8" />,
    "Different Approach": <Target className="w-8 h-8" />,
  };
  const colorMap = {
    Helpful: "from-[#CBA054] to-[#DBAE5D]",
    Experienced: "from-[#0A1A2F] to-[#1E354F]",
    "Solid Foundation": "from-[#CBA054] to-[#DBAE5D]",
    "Different Approach": "from-[#0A1A2F] to-[#1E354F]",
  };

  return (
    <section className="py-4 lg:py-8 bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight" aria-label={sectionInfo.title_meta || sectionInfo.title}>
            {sectionInfo.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 leading-relaxed">
            {sectionInfo.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solicitorTalentData.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Background */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-[#F4EEDC] to-transparent rounded-tr-2xl rounded-bl-2xl opacity-50"></div>

              {/* Icon */}
              <div
                className={`relative z-10 w-20 h-20 rounded-2xl bg-linear-to-br ${
                  colorMap[item.title] || "from-[#CBA054] to-[#DBAE5D]"
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">
                  {iconMap[item.title] || <HelpCircle className="w-8 h-8" />}
                </div>

                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <div className="w-2 h-2 rounded-full bg-[#CBA054]"></div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#0A1A2F] mb-4 group-hover:text-[#CBA054] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#CBA054] transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHireSolicitorTalent;

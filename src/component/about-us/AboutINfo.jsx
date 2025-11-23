import {
  Award,
  HelpCircle,
  Users,
  Layers,
  Target,
  ArrowRight,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AboutINfo = ({
  aboutInfo = {},
  teamInfo = [],
  solicitorInfo = [],
}) => {
  // console.log("About Info in AboutINfo Component:", aboutInfo);
  // console.log("Team Info in AboutINfo Component:", teamInfo);
  // console.log("Solicitor Info in AboutINfo Component:", solicitorInfo);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

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

  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Section 1: Icon Cards */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-4">
            {solicitorInfo[0]?.section_title || "Why Choose Us?"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {solicitorInfo[0]?.section_description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solicitorInfo.map((card, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#E8EEF4] text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">{iconMap[card.title] || <HelpCircle className="w-8 h-8" />}</div>
              </div>

              <h3 className="text-xl font-bold text-[#0A1A2F] mb-3 group-hover:text-[#CBA054] transition-colors duration-300">
                {card.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Admin Description with HTML */}
      <section className="bg-gradient-to-r from-[#F4EEDC] to-[#E8EEF4] rounded-2xl p-8 lg:p-12">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-8 text-center">
            Our Story & Mission
          </h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: aboutInfo?.mission }}
          />
        </div>
      </section>

      {/* Section 3: Meet Our Team - Only show if teamInfo has data */}
      {teamInfo && teamInfo.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get to know the experienced legal professionals who will be handling
              your case.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamInfo.slice(0, 4).map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E8EEF4] hover:shadow-2xl transition-all duration-300"
              >
                {member.image && (
                  <div
                    className="h-48 bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: `url(${baseUrl}${member.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{member?.name}</h3>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    {member?.service?.service_name && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Specialty</span>
                        <span className="text-sm font-semibold text-[#0A1A2F]">
                          {member.service.service_name}
                        </span>
                      </div>
                    )}
                    {member?.experience && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Experience</span>
                        <span className="text-sm font-semibold text-[#CBA054]">
                          {member.experience}
                        </span>
                      </div>
                    )}
                    {member?.education && member.education[0] && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Education</span>
                        <span className="text-sm font-semibold text-[#0A1A2F]">
                          {member.education[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/team/${member?.slug ? member?.slug : member?.name}`}
                    className="w-full bg-[#F4EEDC] text-[#0A1A2F] py-2 rounded-lg font-semibold hover:bg-[#CBA054] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Team Button */}
          {teamInfo.length > 4 && (
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/about-us?tab=people")}
                className="bg-[#0A1A2F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto group"
              >
                <span>View All Team Members</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default AboutINfo;
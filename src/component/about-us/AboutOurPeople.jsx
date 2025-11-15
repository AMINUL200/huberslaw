import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AboutOurPeople = ({ teamMembers = [] }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E8EEF4] group hover:shadow-2xl transition-all duration-300"
          >
            <div
              className="h-48 bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${member.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-[#CBA054] font-semibold">{member.role}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Specialty</span>
                  <span className="text-sm font-semibold text-[#0A1A2F]">
                    {member.specialty}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Experience</span>
                  <span className="text-sm font-semibold text-[#CBA054]">
                    {member.experience}
                  </span>
                </div>
              </div>
              <Link
                to={`/team/${member?.slug ? member.slug : member.name}`}
                className="w-full bg-[#F4EEDC] text-[#0A1A2F] py-2 mt-2 rounded-lg font-semibold hover:bg-[#CBA054] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
              >
                <span>View Profile</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutOurPeople;

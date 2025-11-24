import { ArrowRight, Facebook, Linkedin, Mail, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AboutOurPeople = ({ teamInfo = [] }) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  // console.log(encodeURIComponent(window.location.href));

  // Return null if teamInfo is empty, null, or undefined
  if (!teamInfo || teamInfo.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamInfo.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E8EEF4] group hover:shadow-2xl transition-all duration-300"
          >
            <div
              className="h-48 bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${baseUrl}${member.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{member.name}</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {/* Show specialty only if service_name exists */}
                {member.service?.service_name && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Specialty</span>
                    <span className="text-sm font-semibold text-[#0A1A2F]">
                      {member.service.service_name}
                    </span>
                  </div>
                )}

                {/* Show experience only if it exists */}
                {member.experience && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Experience</span>
                    <span className="text-sm font-semibold text-[#CBA054]">
                      {member.experience}
                    </span>
                  </div>
                )}

                {/* Show education only if it exists and has at least one item */}
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

      {/* Global Share Section */}
      <div className="mt-10 text-center">
        <h3 className="text-[#0A1A2F] font-semibold text-lg mb-4">SHARE :</h3>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
            title="Share on Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>

          {/* X / Twitter */}
          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )}&text=Meet our team members:`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
            title="Share on X / Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=Meet our legal team&body=${encodeURIComponent(
              window.location.href
            )}`}
            className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
            title="Share via Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutOurPeople;

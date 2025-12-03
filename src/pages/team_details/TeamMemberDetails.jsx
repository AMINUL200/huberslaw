import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Home,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  FileText,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../utils/app";

const TeamMemberDetails = () => {
  const { slug } = useParams();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [teamMember, setTeamMember] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  console.log(encodeURIComponent(window.location.href));

  const fetchTeamMember = async (slug) => {
    try {
      const res = await api.get(`/teams-details/${slug}`);
      if (res.data.status) {
        setTeamMember(res.data.data);
        console.log(res.data.data);
        
      } else {
        toast.error("Team member not found.");
      }
    } catch (error) {
      console.error("Error fetching team member details:", error);
      toast.error(error.message || "Failed to load team member details.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (slug) {
      fetchTeamMember(slug);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA054] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team member details...</p>
        </div>
      </div>
    );
  }

  if (!teamMember) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4">
            Team Member Not Found
          </h2>
          <Link
            to="/about-us?tab=people"
            className="text-[#CBA054] hover:underline"
          >
            Back to Our Team
          </Link>
        </div>
      </div>
    );
  }

  // Generate description HTML from API data
  const generateDescriptionHTML = () => {
    return `
      <div class="space-y-6">
        ${
          teamMember.description
            ? `
        <p class="text-lg text-gray-700 leading-relaxed">
          ${
            teamMember.name
              ? `<strong class="text-[#0A1A2F]">${teamMember.name}</strong>`
              : ""
          } 
          ${teamMember.description}
        </p>
        `
            : ""
        }

        ${
          teamMember.p_philosophy
            ? `
        <div class="bg-[#F4EEDC] rounded-xl p-6 border-l-4 border-[#CBA054]">
          <h3 class="text-xl font-bold text-[#0A1A2F] mb-3">Professional Philosophy</h3>
          <p class="text-gray-700 italic !p-0 !m-0">
            "${teamMember.p_philosophy}"
          </p>
        </div>
        `
            : ""
        }

        ${
          teamMember.expertise && teamMember.expertise.length > 0
            ? `
        <h3 class="text-2xl font-bold text-[#0A1A2F] mt-8 mb-4">${
          teamMember.expertise_heading || "Areas of Expertise"
        }</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            ${teamMember.expertise
              .slice(0, Math.ceil(teamMember.expertise.length / 2))
              .map((item) => `<li>${item}</li>`)
              .join("")}
          </ul>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            ${teamMember.expertise
              .slice(Math.ceil(teamMember.expertise.length / 2))
              .map((item) => `<li>${item}</li>`)
              .join("")}
          </ul>
        </div>
        `
            : ""
        }

        ${
          teamMember.cases && teamMember.cases.length > 0
            ? `
        <h3 class="text-2xl font-bold text-[#0A1A2F] mt-8 mb-4">${
          teamMember.cases_heading || "Notable Cases"
        }</h3>
        <div class="space-y-4">
          ${teamMember.cases
            .map(
              (caseItem) => `
            <div class="border-l-4 border-[#CBA054] pl-4">
              <h4 class="font-semibold text-[#0A1A2F]">${caseItem.title}</h4>
              <p class="text-gray-600 text-sm">${caseItem.description}</p>
            </div>
          `
            )
            .join("")}
        </div>
        `
            : ""
        }
      </div>
    `;
  };

  const breadcrumbs = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    {
      name: "Our Team",
      path: "/about-us?tab=people",
      icon: <Users className="w-4 h-4" />,
    },
    { name: teamMember.name, path: "#", current: true },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.name} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                {crumb.current ? (
                  <span className="text-[#0A1A2F] font-semibold flex items-center">
                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="hover:text-[#CBA054] transition-colors duration-200 flex items-center"
                  >
                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6 sticky top-32">
              {/* Profile Image */}
              {teamMember.image && (
                <div className="mb-6">
                  <img
                    src={`${baseUrl}${teamMember.image}`}
                    alt={teamMember.image_alt || teamMember.name}
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  {teamMember.name && (
                    <h1 className="text-2xl font-bold text-[#0A1A2F]">
                      {teamMember.name}
                    </h1>
                  )}
                  {teamMember.designation && (
                    <p className="text-[#CBA054] font-semibold text-lg">
                      {teamMember.designation}
                    </p>
                  )}
                  {teamMember.service?.service_name && (
                    <p className="text-gray-600">
                      {teamMember.service.service_name}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {teamMember.phone_no && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-[#CBA054]" />
                      <span className="text-gray-700">
                        {teamMember.phone_no}
                      </span>
                    </div>
                  )}
                  {teamMember.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-[#CBA054]" />
                      <span className="text-gray-700">{teamMember.email}</span>
                    </div>
                  )}
                  {teamMember.address && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-[#CBA054]" />
                      <span className="text-gray-700">
                        {teamMember.address}
                      </span>
                    </div>
                  )}
                  {teamMember.experience && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-[#CBA054]" />
                      <span className="text-gray-700">
                        {teamMember.experience} Experience
                      </span>
                    </div>
                  )}
                </div>

                {/* Share Profile */}
                <div className="pt-4 border-t border-[#E8EEF4]">
                  <h3 className="font-semibold text-[#0A1A2F] mb-2 flex items-center">
                    <Share2 className="w-4 h-4 text-[#CBA054] mr-2" />
                    Share Profile
                  </h3>

                  <div className="flex space-x-3">
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-[#1E354F] rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#CBA054] hover:text-white transition-all duration-300"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>

                    {/* Twitter */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-[#1E354F] rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#CBA054] hover:text-white transition-all duration-300"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-[#1E354F] rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#CBA054] hover:text-white transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>

                    {/* Copy Link */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied to clipboard!");
                      }}
                      className="w-9 h-9 bg-[#1E354F] rounded-lg flex items-center justify-center text-gray-300 hover:bg-[#CBA054] hover:text-white transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Education */}
                {teamMember.education && teamMember.education.length > 0 && (
                  <div className="pt-4 border-t border-[#E8EEF4]">
                    <h3 className="font-semibold text-[#0A1A2F] mb-2">
                      {teamMember.education_heading || "Education"}
                    </h3>
                    <div className="space-y-2">
                      {teamMember.education.map((item, index) => (
                        <p key={index} className="text-gray-600 text-sm">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bar Admission */}
                {teamMember.bar_association &&
                  teamMember.bar_association.length > 0 && (
                    <div className="pt-4 border-t border-[#E8EEF4]">
                      <h3 className="font-semibold text-[#0A1A2F] mb-2">
                        {teamMember.bar_association_heading || "Bar Admission"}
                      </h3>
                      <div className="space-y-2">
                        {teamMember.bar_association.map((item, index) => (
                          <p key={index} className="text-gray-600 text-sm">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Languages */}
                {teamMember.language && teamMember.language.length > 0 && (
                  <div className="pt-4 border-t border-[#E8EEF4]">
                    <h3 className="font-semibold text-[#0A1A2F] mb-2">
                      {teamMember.language_heading || "Languages"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {teamMember.language.map((language, index) => (
                        <span
                          key={index}
                          className="bg-[#F4EEDC] text-[#0A1A2F] px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Detailed Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Description - Only show if there's content */}
            {(teamMember.description ||
              teamMember.p_philosophy ||
              (teamMember.expertise && teamMember.expertise.length > 0) ||
              (teamMember.cases && teamMember.cases.length > 0)) && (
              <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-8">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: generateDescriptionHTML(),
                  }}
                />
              </div>
            )}

            {/* Awards & Recognition */}
            {teamMember.awards && teamMember.awards.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-8">
                <h2 className="text-2xl font-bold text-[#0A1A2F] mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-[#CBA054]" />
                  {teamMember.awards_heading || "Awards & Recognition"}
                </h2>
                <div className="space-y-4">
                  {teamMember.awards.map((award, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#CBA054] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetails;

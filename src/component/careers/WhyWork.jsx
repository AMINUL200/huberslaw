import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Award,
  ArrowRight,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import { Link } from "react-router-dom";

const WhyWork = ({ WorkData = {}, settingInfo = {} }) => {
  console.log("Why Work Data:", WorkData);
  console.log("Setting Info:", settingInfo);

  // Default data in case WorkData is empty
  const defaultData = {
    long_desc: `
      <div class="space-y-6">
        <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-6">
          Why Build Your Career at Hubers Law?
        </h2>

        <p class="text-lg text-gray-700 leading-relaxed">
          At <strong class="text-[#0A1A2F]">Hubers Law</strong>, we believe that our people are our greatest asset. 
          We've created an environment where legal professionals can thrive, grow, and make a meaningful impact 
          while maintaining a healthy work-life balance.
        </p>

        <div class="bg-[#F4EEDC] rounded-xl p-6 border-l-4 border-[#CBA054]">
          <h3 class="text-xl font-bold text-[#0A1A2F] mb-3">Our Commitment to You</h3>
          <p class="text-gray-700 italic">
            "We invest in our team's growth because when our people succeed, our clients succeed. 
            Your professional development is our priority."
          </p>
        </div>

        <h3 class="text-2xl font-bold text-[#0A1A2F] mt-8 mb-4">Professional Growth Opportunities</h3>
        <ul class="list-disc list-inside space-y-3 text-gray-700 ml-4">
          <li><strong>Mentorship Program:</strong> Learn from seasoned partners with 20+ years of experience</li>
          <li><strong>Continuous Learning:</strong> Annual training budget and regular professional development workshops</li>
          <li><strong>Career Progression:</strong> Clear pathways from junior associate to partnership</li>
          <li><strong>Specialization Support:</strong> Resources to develop expertise in your chosen practice area</li>
        </ul>

        <h3 class="text-2xl font-bold text-[#0A1A2F] mt-8 mb-4">What Sets Us Apart</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-[#CBA054] rounded-full"></div>
              <span class="text-gray-700">Collaborative team environment</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-[#CBA054] rounded-full"></div>
              <span class="text-gray-700">Modern case management systems</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-[#CBA054] rounded-full"></div>
              <span class="text-gray-700">Diverse and inclusive workplace</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-[#CBA054] rounded-full"></div>
              <span class="text-gray-700">Flexible working arrangements</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-[#CBA054] rounded-full"></div>
              <span class="text-gray-700">Cutting-edge legal technology</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-[#CBA054] rounded-full"></div>
              <span class="text-gray-700">Social and team-building events</span>
            </div>
          </div>
        </div>
      </div>
    `,
    button_name: "See Our Current Vacancies",
  };

  // Generate contact hours from settingInfo
  const generateContactHours = () => {
    if (!settingInfo.mon) return "Monday - Friday: 9:00 AM - 5:30 PM";

    const days = [
      { day: "Mon", hours: settingInfo.mon },
      { day: "Tue", hours: settingInfo.tues },
      { day: "Wed", hours: settingInfo.wed },
      { day: "Thu", hours: settingInfo.thus },
      { day: "Fri", hours: settingInfo.fri },
      { day: "Sat", hours: settingInfo.sat },
      { day: "Sun", hours: settingInfo.sun },
    ];

    const weekdays = days.slice(0, 5);
    const hasSameWeekdayHours = weekdays.every(
      (day) => day.hours === weekdays[0].hours
    );

    if (hasSameWeekdayHours) {
      return `Monday - Friday: ${weekdays[0].hours}`;
    }

    return "View website for detailed hours";
  };

  // Use WorkData if available, otherwise use default data
  const whyWorkData = {
    description: WorkData.long_desc || defaultData.long_desc,
    button_name: WorkData.button_name || defaultData.button_name,
    contactInfo: {
      recruitmentEmail: settingInfo.email || "careers@huberslaw.co.uk",
      phone: settingInfo.phone || "0203 488 095333",
      address: settingInfo.address || "123 Legal Street, London, UK WC1A 1AA",
      contactHours: generateContactHours(),
      helpline: settingInfo.helpline_no,
      fax: settingInfo.fax,
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Side - Description */}
      <div className="lg:col-span-2">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: whyWorkData.description }}
        />
        <div className="flex justify-center mt-4">
          <Link
            to="/careers?tab=vacancies"
            className="bg-[#0A1A2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 flex items-center"
          >
            {whyWorkData.button_name}
            <ArrowRight className="w-4 h-4 ml-2 inline-block" />
          </Link>
        </div>

        {/* Global Share Section */}
        <div className="flex items-center justify-start gap-4 mt-10 text-start">
          <h3 className="text-[#0A1A2F] font-semibold text-lg ">SHARE :</h3>

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

      {/* Right Side - Contact Information */}
      <div className="space-y-6">
        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] p-6">
          <h3 className="text-xl font-bold text-[#0A1A2F] mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2 text-[#CBA054]" />
            Get in Touch
          </h3>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-[#0A1A2F]">
                  Recruitment Email
                </div>
                <div className="text-gray-600 text-sm">
                  {whyWorkData.contactInfo.recruitmentEmail}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-[#0A1A2F]">Phone</div>
                <div className="text-gray-600 text-sm">
                  {whyWorkData.contactInfo.phone}
                </div>
              </div>
            </div>

            {/* Helpline (if available) */}
            {whyWorkData.contactInfo.helpline && (
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-[#0A1A2F]">Helpline</div>
                  <div className="text-gray-600 text-sm">
                    {whyWorkData.contactInfo.helpline}
                  </div>
                </div>
              </div>
            )}

            {/* Fax (if available) */}
            {whyWorkData.contactInfo.fax && (
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-[#0A1A2F]">Fax</div>
                  <div className="text-gray-600 text-sm">
                    {whyWorkData.contactInfo.fax}
                  </div>
                </div>
              </div>
            )}

            {/* Address */}
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-[#0A1A2F]">Address</div>
                <div className="text-gray-600 text-sm">
                  {whyWorkData.contactInfo.address}
                </div>
              </div>
            </div>

            {/* Contact Hours */}
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-[#0A1A2F]">
                  Contact Hours
                </div>
                <div className="text-gray-600 text-sm">
                  {whyWorkData.contactInfo.contactHours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyWork;

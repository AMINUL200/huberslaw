import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const WhyWork = () => {
  // Dummy data with HTML content
  const whyWorkData = {
    description: `
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

    contactInfo: {
      recruitmentEmail: "careers@huberslaw.co.uk",
      phone: "0203 488 0953",
      address: "123 Legal Street, London, UK WC1A 1AA",
      contactHours: "Monday - Friday: 9:00 AM - 5:30 PM",
      recruitmentManager: "Sarah Johnson",
      nextOpenDay: "15th January 2024",
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
        <div className="flex justify-center mt-4 ">
          <Link 
            to="/careers?tab=vacancies"
          className=" bg-[#0A1A2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300">
            See Our Current Vacancies
            <ArrowRight className="w-4 h-4 ml-2 inline-block" />
          </Link>
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

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-[#0A1A2F]">Phone</div>
                <div className="text-gray-600 text-sm">
                  {whyWorkData.contactInfo.phone}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
              <div>
                <div className="font-semibold text-[#0A1A2F]">Address</div>
                <div className="text-gray-600 text-sm">
                  {whyWorkData.contactInfo.address}
                </div>
              </div>
            </div>

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

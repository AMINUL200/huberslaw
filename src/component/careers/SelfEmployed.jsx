import { ArrowRight, Mail, Phone, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SelfEmployed = ({ selfEmployedData = [], settingInfo = {} }) => {
  console.log("SelfEmployed Component Data:", selfEmployedData);

  // Generate business hours from settingInfo
  const generateBusinessHours = () => {
    if (!settingInfo) {
      return "Mon-Fri: 9:00 AM - 6:00 PM";
    }

    const days = [
      { day: "Mon", time: settingInfo.mon },
      { day: "Tue", time: settingInfo.tues },
      { day: "Wed", time: settingInfo.wed },
      { day: "Thu", time: settingInfo.thus },
      { day: "Fri", time: settingInfo.fri },
      { day: "Sat", time: settingInfo.sat },
      { day: "Sun", time: settingInfo.sun },
    ];

    // Find the most common hours for weekdays
    const weekdayHours = days.slice(0, 5).map((day) => day.time);
    const allSameHours = weekdayHours.every((time) => time === weekdayHours[0]);

    if (allSameHours && weekdayHours[0]) {
      return `Mon-Fri: ${weekdayHours[0]}`;
    }

    // If hours vary, return the first available hours
    const availableHours = days.find(
      (day) => day.time && day.time !== "Closed"
    );
    return availableHours
      ? `${availableHours.day}: ${availableHours.time}`
      : "Mon-Fri: 9:00 AM - 6:00 PM";
  };
  const settings = {
    contactInfo: {
      email: settingInfo.email || "legal@huberslaw.co.uk",
      phone: settingInfo.phone || "0203 488 0953",
      helpline: settingInfo.helpline_no || "033256885",
      hours: generateBusinessHours(),
      address: settingInfo.address || "123 Legal Street, London, UK WC1A 1AA",
    },
  };

  // If no data is provided, show a loading state or empty message
  if (!selfEmployedData || selfEmployedData.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No self-employed opportunities available at the moment.
          </p>
          <p className="text-gray-400 mt-2">
            Please check back later or contact us for more information.
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Interested in Flexible Work?
          </h3>
          <p className="text-white/80 mb-6">
            Contact our recruitment team to discuss self-employed or locum
            opportunities.
          </p>
          <Link
            to="/contact-us"
            className="bg-[#CBA054] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#DBAE5D] transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Self-Employed Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* left side */}
        <div className="lg:col-span-2 ">
          {selfEmployedData.map((item) => (
            <div
              key={item.id}
              className="bg-white mb-2 rounded-2xl shadow-lg border border-[#E8EEF4] p-6 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-[#0A1A2F] mb-4">
                {item.title}
              </h3>

              {/* Render the description HTML safely */}
              <div
                className="self-employed-content prose "
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>
        {/* right side */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-[#0A1A2F] to-[#1E354F] rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <p className="text-white/80 mb-6 text-sm">
              Contact our legal team for any questions about our terms and
              conditions.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#CBA054]" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-white/80 text-sm">
                    {settings.contactInfo.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#CBA054]" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-white/80 text-sm">
                    {settings.contactInfo.phone}
                  </div>
                </div>
              </div>

              {settings.contactInfo.helpline && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#CBA054]" />
                  <div>
                    <div className="font-semibold">Helpline</div>
                    <div className="text-white/80 text-sm">
                      {settings.contactInfo.helpline}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#CBA054] rounded-full"></div>
                </div>
                <div>
                  <div className="font-semibold">Available</div>
                  <div className="text-white/80 text-sm">
                    {settings.contactInfo.hours}
                  </div>
                </div>
              </div>

              {settings.contactInfo.address && (
                <div className="flex items-start space-x-3 pt-2 border-t border-white/20">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-[#CBA054] rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-white/80 text-sm">
                      {settings.contactInfo.address}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Meet Our Team Section */}
          <div className="bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] rounded-2xl p-6 border border-[#CBA054]/20">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-[#CBA054] rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A1A2F] mb-2">
               Meet with ours team
              </h3>
              <p className="text-[#0A1A2F]/80 text-sm mb-4">
                Law firms are heavily regulate by the different authorities and
                we are required to confirm our work with the client as well as
                with the law society, legal aid agency and other interested
                parties with the regulatory powers. We can assure our clients
                that all the regulatory authorities have confirmed that we
                follow all the regulation.
              </p>
            </div>

            <Link
              to="/about-us?tab=people"
              className="w-full mt-4 inline-flex items-center justify-center bg-[#0A1A2F] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 group"
            >
              <Users className="w-4 h-4 mr-2" />
              Meet Our Team
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      <section className="my-16">
        <div className="bg-[#F4EEDC] rounded-2xl py-8 px-12 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left Side Text */}
            <p className="text-xl lg:text-2xl font-bold text-[#0A1A2F] lg:text-left text-center">
              Join many clients around the world that use Hubers Law to
              smoothens their legal matters
            </p>

            {/* Right Side Button */}
            <Link
              to="/careers?tab=vacancies"
              className="inline-flex items-center bg-[#0A1A2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#CBA054] hover:text-white transition-all duration-300 group"
            >
              Current Opening
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelfEmployed;

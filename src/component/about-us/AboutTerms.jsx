import React from "react";
import { FileText, Phone, Mail, Download } from "lucide-react";

const AboutTerms = ({ termsInfo = {}, settingInfo = {} }) => {
  console.log(termsInfo);
  
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  // Generate terms content from termsInfo
  const generateTermsContent = () => {
    if (!termsInfo || Object.keys(termsInfo).length === 0) {
      return `
        <div class="space-y-6">
          <section>
            <h3 class="text-2xl font-bold text-[#0A1A2F] mb-4">No Terms Available</h3>
            <p class="text-gray-600 leading-relaxed">
              Please check back later for our terms and conditions.
            </p>
          </section>
        </div>
      `;
    }

    return `
      <div class="space-y-6">
        <section>
          <div class="text-gray-600 leading-relaxed">
            ${termsInfo.description || "No description available."}
          </div>
        </section>
      </div>
    `;
  };

  // Generate documents list from termsInfo.files
  const generateDocuments = () => {
    if (!termsInfo.files || termsInfo.files.length === 0) {
      return [
        {
          id: 1,
          title: "No Documents Available",
          format: "PDF",
          size: "0 KB",
          icon: <FileText className="w-6 h-6" />,
          file_path: null,
        },
      ];
    }

    return termsInfo.files.map((file, index) => ({
      id: file.id || index + 1,
      title: file.file_name || `Document ${index + 1}`,
      format: "PDF",
      size: "1.2 MB", // You might want to calculate this from the actual file
      icon: <FileText className="w-6 h-6" />,
      file_path: file.file_path,
    }));
  };

  // Generate business hours from settingInfo
  const generateBusinessHours = () => {
    if (!settingInfo) {
      return "Mon-Fri: 9:00 AM - 6:00 PM";
    }

    const days = [
      { day: 'Mon', time: settingInfo.mon },
      { day: 'Tue', time: settingInfo.tues },
      { day: 'Wed', time: settingInfo.wed },
      { day: 'Thu', time: settingInfo.thus },
      { day: 'Fri', time: settingInfo.fri },
      { day: 'Sat', time: settingInfo.sat },
      { day: 'Sun', time: settingInfo.sun }
    ];

    // Find the most common hours for weekdays
    const weekdayHours = days.slice(0, 5).map(day => day.time);
    const allSameHours = weekdayHours.every(time => time === weekdayHours[0]);
    
    if (allSameHours && weekdayHours[0]) {
      return `Mon-Fri: ${weekdayHours[0]}`;
    }

    // If hours vary, return the first available hours
    const availableHours = days.find(day => day.time && day.time !== 'Closed');
    return availableHours ? `${availableHours.day}: ${availableHours.time}` : "Mon-Fri: 9:00 AM - 6:00 PM";
  };

  const termsData = {
    title: "Terms & Conditions",
    description:
      "Please read these terms and conditions carefully before using our services.",
    termsContent: generateTermsContent(),
    documents: generateDocuments(),
    contactInfo: {
      email: settingInfo.email || "legal@huberslaw.co.uk",
      phone: settingInfo.phone || "0203 488 0953",
      helpline: settingInfo.helpline_no || "033256885",
      hours: generateBusinessHours(),
      address: settingInfo.address || "123 Legal Street, London, UK WC1A 1AA"
    },
  };

  const handleDownload = (document) => {
    if (document.file_path) {
      const fullUrl = `${baseUrl}/${document.file_path}`;
      window.open(fullUrl, "_blank");
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Terms Description */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: termsData.termsContent }}
            />
          </div>
        </div>

        {/* Right Side - Documents & Contact */}
        <div className="space-y-6">
          {/* Documents Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] p-6">
            <h3 className="text-xl font-bold text-[#0A1A2F] mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#CBA054]" />
              Legal Documents
            </h3>
            <div 
              className="space-y-3 max-h-96 overflow-y-auto pr-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#CBA054 #F4EEDC'
              }}
            >
              {/* Custom scrollbar styles for Webkit browsers */}
              <style jsx>{`
                .max-h-96::-webkit-scrollbar {
                  width: 6px;
                }
                .max-h-96::-webkit-scrollbar-track {
                  background: #F4EEDC;
                  border-radius: 3px;
                }
                .max-h-96::-webkit-scrollbar-thumb {
                  background: #CBA054;
                  border-radius: 3px;
                }
                .max-h-96::-webkit-scrollbar-thumb:hover {
                  background: #A8823A;
                }
              `}</style>
              
              {termsData.documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => handleDownload(doc)}
                  className="w-full flex items-center justify-between p-4 bg-[#F4EEDC] rounded-lg hover:bg-[#CBA054] hover:text-white transition-all duration-300 group"
                  disabled={!doc.file_path}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-[#0A1A2F] group-hover:text-white">
                      {doc.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm group-hover:text-white">
                        {doc.title}
                      </div>
                      <div className="text-xs text-gray-600 group-hover:text-white/80">
                        {doc.format} • {doc.size}
                      </div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* New Section - Image and Short Description */}
          {(termsInfo.image || termsInfo.short_desc) && (
            <div className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] p-6">
              {/* <h3 className="text-xl font-bold text-[#0A1A2F] mb-4">
                {termsInfo.heading || "Overview"}
              </h3> */}
              
              {termsInfo.image && (
                <div className="mb-4">
                  <img 
                    src={`${baseUrl}/${termsInfo.image}`}
                    alt={termsInfo.image_alt || termsInfo.heading || "Legal Services"}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              {termsInfo.short_desc && (
                <div className="text-gray-600 leading-relaxed text-sm">
                  {termsInfo.short_desc}
                </div>
              )}
            </div>
          )}

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
                    {termsData.contactInfo.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#CBA054]" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-white/80 text-sm">
                    {termsData.contactInfo.phone}
                  </div>
                </div>
              </div>

              {termsData.contactInfo.helpline && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#CBA054]" />
                  <div>
                    <div className="font-semibold">Helpline</div>
                    <div className="text-white/80 text-sm">
                      {termsData.contactInfo.helpline}
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
                    {termsData.contactInfo.hours}
                  </div>
                </div>
              </div>

              {termsData.contactInfo.address && (
                <div className="flex items-start space-x-3 pt-2 border-t border-white/20">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-[#CBA054] rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-white/80 text-sm">
                      {termsData.contactInfo.address}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTerms;
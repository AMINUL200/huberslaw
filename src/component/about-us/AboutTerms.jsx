import React from "react";
import { FileText, Phone, Mail, Download } from "lucide-react";

const AboutTerms = () => {
  // Dummy object data with HTML content
  const termsData = {
    title: "Terms & Conditions",
    description: "Please read these terms and conditions carefully before using our services.",
    
    termsContent: `
      <div class="space-y-6">
        <section>
          <h3 class="text-2xl font-bold text-[#0A1A2F] mb-4">1. Legal Services</h3>
          <p class="text-gray-600 leading-relaxed">
            <strong>Hubers Law</strong> provides legal services in accordance with the 
            <span class="text-[#CBA054] font-semibold"> Solicitors Regulation Authority (SRA)</span> 
            standards and regulations. All legal advice is provided by qualified solicitors 
            practicing in England and Wales.
          </p>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-[#0A1A2F] mb-4">2. Client Responsibilities</h3>
          <p class="text-gray-600 leading-relaxed">
            Clients are required to provide <strong>accurate and complete information</strong>, 
            cooperate with legal proceedings, and adhere to agreed payment terms. 
            Failure to do so may affect our ability to provide effective representation.
          </p>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-[#0A1A2F] mb-4">3. Fees and Payments</h3>
          <p class="text-gray-600 leading-relaxed">
            Our fee structure will be <span class="text-[#CBA054] font-semibold">clearly explained and agreed upon</span> 
            before commencement of work. We offer various payment options including hourly rates, 
            fixed fees, and where appropriate, conditional fee arrangements.
          </p>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-[#0A1A2F] mb-4">4. Confidentiality</h3>
          <p class="text-gray-600 leading-relaxed">
            We maintain <strong>strict confidentiality</strong> regarding all client matters in 
            accordance with professional conduct rules and data protection legislation.
          </p>
        </section>

        <section>
          <h3 class="text-2xl font-bold text-[#0A1A2F] mb-4">5. Complaints Procedure</h3>
          <p class="text-gray-600 leading-relaxed">
            We are committed to providing <span class="text-[#CBA054] font-semibold">high-quality legal services</span>. 
            If you are dissatisfied with any aspect of our service, please contact our 
            complaints partner who will investigate and respond promptly.
          </p>
        </section>

        <div class="bg-[#F4EEDC] rounded-xl p-6 border-l-4 border-[#CBA054] mt-8">
          <h4 class="text-xl font-bold text-[#0A1A2F] mb-3">Important Notice</h4>
          <p class="text-gray-600 leading-relaxed">
            These terms are <strong>subject to change</strong> and should be reviewed regularly. 
            This document does not create a solicitor-client relationship until formal 
            engagement procedures are completed.
          </p>
        </div>
      </div>
    `,

    documents: [
      {
        id: 1,
        title: "Full Terms & Conditions",
        format: "PDF",
        size: "2.4 MB",
        icon: <FileText className="w-6 h-6" />
      },
      {
        id: 2,
        title: "Privacy Policy",
        format: "PDF", 
        size: "1.8 MB",
        icon: <FileText className="w-6 h-6" />
      },
      {
        id: 3,
        title: "Client Agreement",
        format: "DOCX",
        size: "1.2 MB",
        icon: <FileText className="w-6 h-6" />
      },
      {
        id: 4,
        title: "Fee Agreement",
        format: "PDF",
        size: "1.5 MB",
        icon: <FileText className="w-6 h-6" />
      }
    ],

    contactInfo: {
      email: "legal@huberslaw.co.uk",
      phone: "0203 488 0953",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM"
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      {/* <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-6">
          {termsData.title}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          {termsData.description}
        </p>
      </div> */}

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
            <div className="space-y-3">
              {termsData.documents.map((doc) => (
                <button
                  key={doc.id}
                  className="w-full flex items-center justify-between p-4 bg-[#F4EEDC] rounded-lg hover:bg-[#CBA054] hover:text-white transition-all duration-300 group"
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

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-[#0A1A2F] to-[#1E354F] rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <p className="text-white/80 mb-6 text-sm">
              Contact our legal team for any questions about our terms and conditions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#CBA054]" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-white/80 text-sm">{termsData.contactInfo.email}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#CBA054]" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-white/80 text-sm">{termsData.contactInfo.phone}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#CBA054] rounded-full"></div>
                </div>
                <div>
                  <div className="font-semibold">Available</div>
                  <div className="text-white/80 text-sm">{termsData.contactInfo.hours}</div>
                </div>
              </div>
            </div>

            {/* <button className="w-full mt-6 bg-[#CBA054] text-white py-3 rounded-lg font-semibold hover:bg-[#DBAE5D] transition-all duration-300">
              Contact Legal Team
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTerms;
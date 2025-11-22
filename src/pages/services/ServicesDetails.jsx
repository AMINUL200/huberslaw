import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Home,
  FileText,
  Download,
  Clock,
  Award,
  Users,
  Phone,
  Mail,
  Building,

} from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../utils/app";
import LegalLoader from "../../component/common/LegalLoader";
import { getServiceIcon } from "../../utils/getServiceIcon";

const ServicesDetails = () => {
  const { serviceSlug } = useParams();
  const [serviceData, setServiceData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [contactInfo, setContactInfo] = React.useState(null);

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/service-details/${serviceSlug}`);

      if (response.data.status) {
        setServiceData(response.data.data);
      } else {
        toast.error("Failed to load service details.");
      }
    } catch (error) {
      console.error("Error fetching service details:", error);
      toast.error("Failed to load service details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchContactInfo = async () => {
    try {
      const response = await api.get("/settings");
      if (response.data.status) {
        // Use contact info as needed
        setContactInfo(response.data.data);
      } else {
        toast.error("Failed to load contact information.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to load contact information.");
    }
  };

  React.useEffect(() => {
    if (serviceSlug) {
      fetchServiceData();
      fetchContactInfo();
    }
  }, [serviceSlug]);

  if (loading) {
    return <LegalLoader />;
  }

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-[#0A1A2F]">
            Service not found
          </h1>
          <Link to="/services" className="text-[#CBA054] hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Services", path: "/services" },
    { name: serviceData.service_name, path: "#", current: true },
  ];

  // Default contact information (fallback)
  const defaultContactInfo = {
    specialist: "Our Legal Team",
    email: contactInfo?.email || "info@huberslaw.co.uk",
    phone: contactInfo?.phone || "0203 488 0953",
    consultation: "Free Initial Consultation",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs with structured data */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol
            className="flex items-center space-x-2 text-sm text-gray-600"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbs.map((crumb, index) => (
              <li
                key={crumb.name}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                {crumb.current ? (
                  <span
                    className="text-[#0A1A2F] font-semibold flex items-center"
                    itemProp="name"
                    aria-current="page"
                  >
                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="hover:text-[#CBA054] transition-colors duration-200 flex items-center"
                    itemProp="item"
                  >
                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                    <span itemProp="name">{crumb.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Service Description */}
          <div className="lg:col-span-3">
            <div
              className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-8"
              itemScope
              itemType="https://schema.org/LegalService"
            >
              {/* Service Header */}
              <div className="flex items-center space-x-4 mb-6 flex-col md:flex-row">
                <div className="w-16 h-16 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center">
                  <div className="text-white">
                    {getServiceIcon(serviceData.service_name)}
                  </div>
                </div>
                <div>
                  <h1
                    className="text-3xl lg:text-4xl font-bold text-[#0A1A2F]"
                    itemProp="name"
                  >
                    {serviceData.service_name}
                  </h1>
                  <p className="text-gray-600 mt-2" itemProp="description">
                    {serviceData.service_description}
                  </p>
                </div>
              </div>

              {/* Long Description */}
              {serviceData.long_desc ? (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: serviceData.long_desc }}
                  itemProp="disambiguatingDescription"
                />
              ) : (
                <div className="prose prose-lg max-w-none">
                  <p>
                    Detailed information about {serviceData.service_name} is
                    coming soon.
                  </p>
                </div>
              )}

              {/* Features Section */}
              {serviceData.feature && serviceData.feature.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-[#0A1A2F] mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceData.feature.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#CBA054] rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Documents & Contact */}
          <div className="space-y-6">
            {/* Documents Section */}
            {serviceData.pdfs && serviceData.pdfs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
                <h3 className="text-xl font-bold text-[#0A1A2F] mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-[#CBA054]" />
                  Legal Resources
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Download our free guides and resources related to{" "}
                  {serviceData.service_name}.
                </p>

                <div className="space-y-3">
                  {serviceData.pdfs.map((pdf) => (
                    <a
                      key={pdf.id}
                      href={`${baseUrl}/${pdf.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 bg-[#F4EEDC] rounded-lg hover:bg-[#CBA054] hover:text-white transition-all duration-300 group block"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-[#0A1A2F] group-hover:text-white">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-sm group-hover:text-white">
                            {pdf.pdf_name}
                          </div>
                          <div className="text-xs text-gray-600 group-hover:text-white/80">
                            PDF Document
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 group-hover:text-white/80">
                          PDF
                        </span>
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Card */}
            <div className="bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Need {serviceData.service_name} Help?
                  </h3>
                  <p className="text-white/80 text-sm">
                    Free initial consultation
                  </p>
                </div>
              </div>

              <p className="text-white/80 text-sm mb-4">
                Contact us for a free initial consultation to discuss your{" "}
                {serviceData.service_name.toLowerCase()} needs.
              </p>

              <div className="space-y-3 text-sm mb-6">
                {/* Opening Hours Section */}
                <div className="mb-4">
                  <h4 className="font-semibold text-[#CBA054] mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Opening Hours
                  </h4>
                  <div className="space-y-1 text-white/80">
                    <div className="flex justify-between">
                      <span>Monday:</span>
                      <span>{contactInfo?.mon || "9:00 AM - 6:00 PM"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tuesday:</span>
                      <span>{contactInfo?.tues || "9:00 AM - 7:00 PM"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wednesday:</span>
                      <span>{contactInfo?.wed || "9:00 AM - 6:00 PM"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thursday:</span>
                      <span>{contactInfo?.thus || "9:00 AM - 6:00 PM"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday:</span>
                      <span>{contactInfo?.fri || "9:00 AM - 6:00 PM"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>{contactInfo?.sat || "10:00 AM - 2:00 PM"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span
                        className={
                          contactInfo?.sun === "Closed" ? "text-red-300" : ""
                        }
                      >
                        {contactInfo?.sun || "Closed"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#CBA054]" />
                  <span>Free Initial Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#CBA054]" />
                  <span>Specialist: Our Legal Team</span>
                </div>
                {contactInfo?.address && (
                  <div className="flex items-start space-x-2">
                    <Building className="w-4 h-4 text-[#CBA054] mt-0.5 flex-shrink-0" />
                    <span className="text-xs">{contactInfo.address}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${contactInfo?.phone || defaultContactInfo.phone}`}
                  className="w-full bg-[#CBA054] text-white py-3 rounded-lg font-semibold hover:bg-[#DBAE5D] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>
                    Call: {contactInfo?.phone || defaultContactInfo.phone}
                  </span>
                </a>
                <a
                  href={`mailto:${
                    contactInfo?.email || defaultContactInfo.email
                  }`}
                  className="w-full border border-white/30 text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Us</span>
                </a>
                {contactInfo?.helpline_no && (
                  <a
                    href={`tel:${contactInfo.helpline_no}`}
                    className="w-full border border-white/30 text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Helpline: {contactInfo.helpline_no}</span>
                  </a>
                )}
              </div>

              {/* Canonical URL - You can use this for SEO purposes */}
              {contactInfo?.canonical_url && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs text-white/60 text-center">
                    Visit us at:{" "}
                    <a
                      href={contactInfo.canonical_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#CBA054] hover:underline"
                    >
                      {contactInfo.canonical_url.replace("https://", "")}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetails;

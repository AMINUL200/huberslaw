import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Home,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
import { api } from "../../utils/app";
import LegalLoader from "../../component/common/LegalLoader";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    lawyer: "",
    organisation: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [services, setServices] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const breadcrumbs = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Contact Us", path: "/contact", current: true },
  ];

  // Fetch services and teams data
  const fetchContactData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/service-name");

      if (response.data.status) {
        setServices(response.data.services || []);
        setTeams(response.data.teams || []);
      } else {
        console.error("Failed to load contact data");
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchContactInfo = async () => {
    try {
      const response = await api.get("/settings");
      if (response.data.status) {
        setContactInfo(response.data.data);
      } else {
        console.error("Failed to load contact information.");
      }
    } catch (error) {
      console.log(error);
      console.error(error?.message || "Failed to load contact information.");
    }
  };

  useEffect(() => {
    fetchContactData();
    fetchContactInfo();
  }, []);

  const getServiceNameById = (id) => {
    const service = services.find((s) => s.id === Number(id));
    return service ? service.service_name : "";
  };

  const getLawyerNameById = (id) => {
    if (id === "any") return "Any Available Lawyer";
    const team = teams.find((t) => t.id === Number(id));
    return team ? team.name : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const payload = {
      full_name: formData.name,
      email: formData.email,
      phone_no: formData.phone,
      organisation: formData.organisation,
      service_name: getServiceNameById(formData.caseType),
      preferred_lawyer: getLawyerNameById(formData.lawyer),
      message: formData.message,
    };

    console.log("FINAL PAYLOAD:", payload);

    try {
      const response = await api.post("/contacts", payload);
      
      if (response.data.status) {
        setIsSubmitted(true);
        console.log("Submit response:", response.data);
        toast.success(response.data.message || "Message sent successfully!");
      } else {
        toast.error(response.data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
      setSubmitLoading(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        caseType: "",
        lawyer: "",
        organisation: "",
        message: "",
      });
    }
  };

  const convertToEmbedUrl = (url, address) => {
    // If URL already contains embed code
    if (url.includes("/embed?")) return url;

    const coords = url.match(/@([-0-9.]+),([-0-9.]+)/);
    if (coords) {
      return `https://www.google.com/maps?q=${coords[1]},${coords[2]}&z=15&output=embed`;
    }

    // Fallback using address
    return `https://www.google.com/maps?q=${encodeURIComponent(
      address
    )}&output=embed`;
  };

  if (loading) {
    return <LegalLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16">
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

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our legal team. We're here to help you with your
            legal matters and answer any questions you may have.
          </p>
        </div>

        {/* Google Maps Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] overflow-hidden">
            {contactInfo?.map ? (
              <div className="h-64 lg:h-96">
                <iframe
                  src={convertToEmbedUrl(
                    contactInfo?.map,
                    contactInfo?.address
                  )}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                ></iframe>
              </div>
            ) : (
              <div className="h-64 lg:h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#CBA054] mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">Location Map</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {contactInfo?.address ||
                      "123 Legal Street, London, UK WC1A 1AA"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form and Office Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#0A1A2F] mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="Full Name *"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    />

                    <CustomInput
                      label="Email Address *"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                      label="Phone Number *"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    />

                    <CustomInput
                      label="Organisation"
                      type="text"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      className="border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                        Case Type *
                      </label>
                      <select
                        name="caseType"
                        value={formData.caseType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] duration-300 border border-[#E8EEF4] transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                      >
                        <option value="">Select Case Type</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.service_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                        Preferred Lawyer
                      </label>
                      <select
                        name="lawyer"
                        value={formData.lawyer}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] duration-300 border border-[#E8EEF4] transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                      >
                        <option value="">Choose a Lawyer</option>
                        {teams.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                        <option value="any">Any Available Lawyer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Please describe your legal matter in detail..."
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] duration-300 border border-[#E8EEF4] transition-all shadow-sm hover:shadow-md focus:shadow-lg resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform flex items-center justify-center space-x-3 group ${
                      submitLoading
                        ? "bg-gray-400 text-white cursor-not-allowed hover:scale-100"
                        : "bg-[#0A1A2F] text-white hover:bg-[#CBA054] hover:scale-105"
                    }`}
                  >
                    {submitLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Office Details - Right Side */}
          <div className="space-y-6">
            {/* Office Information */}
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
              <h3 className="text-xl font-bold text-[#0A1A2F] mb-6">
                Office Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0A1A2F]">Address</div>
                    <div className="text-gray-600 text-sm">
                      {contactInfo?.address ||
                        "123 Legal Street, London, UK WC1A 1AA"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0A1A2F]">Phone</div>
                    <div className="text-gray-600 text-sm">
                      {contactInfo?.phone || "0203 488 0953"}
                    </div>
                  </div>
                </div>

                {contactInfo?.fax && (
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-[#0A1A2F]">Fax</div>
                      <div className="text-gray-600 text-sm">
                        {contactInfo.fax}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0A1A2F]">Email</div>
                    <div className="text-gray-600 text-sm">
                      {contactInfo?.email || "info@huberslaw.co.uk"}
                    </div>
                  </div>
                </div>

                {contactInfo?.helpline_no && (
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-[#0A1A2F]">
                        Helpline
                      </div>
                      <div className="text-gray-600 text-sm">
                        {contactInfo.helpline_no}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#CBA054]" />
                Opening Hours
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Monday</span>
                  <span className="font-semibold text-[#CBA054] text-sm">
                    {contactInfo?.mon || "9:00 AM - 6:00 PM"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Tuesday</span>
                  <span className="font-semibold text-[#CBA054] text-sm">
                    {contactInfo?.tues || "9:00 AM - 7:00 PM"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Wednesday</span>
                  <span className="font-semibold text-[#CBA054] text-sm">
                    {contactInfo?.wed || "9:00 AM - 6:00 PM"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Thursday</span>
                  <span className="font-semibold text-[#CBA054] text-sm">
                    {contactInfo?.thus || "9:00 AM - 6:00 PM"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Friday</span>
                  <span className="font-semibold text-[#CBA054] text-sm">
                    {contactInfo?.fri || "9:00 AM - 6:00 PM"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Saturday</span>
                  <span className="font-semibold text-[#CBA054] text-sm">
                    {contactInfo?.sat || "10:00 AM - 2:00 PM"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Sunday</span>
                  <span className="font-semibold text-red-300 text-sm">
                    {contactInfo?.sun || "Closed"}
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-[#F4EEDC] rounded-2xl p-6 border-l-4 border-[#CBA054]">
              <h3 className="text-lg font-bold text-[#0A1A2F] mb-3">
                Emergency Legal Assistance
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Available 24/7 for urgent legal matters
              </p>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#CBA054]" />
                <span className="font-semibold text-[#0A1A2F]">
                  {contactInfo?.helpline_no ||
                    contactInfo?.phone ||
                    "0203 488 0953"}
                </span>
              </div>
            </div>

            {/* Website Link */}
            {contactInfo?.canonical_url && (
              <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
                <h3 className="text-xl font-bold text-[#0A1A2F] mb-4">
                  Visit Our Website
                </h3>
                <a
                  href={contactInfo.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CBA054] hover:text-[#0A1A2F] transition-colors duration-300 font-semibold break-all"
                >
                  {contactInfo.canonical_url.replace("https://", "")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

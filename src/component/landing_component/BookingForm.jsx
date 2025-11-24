import React, { useState } from "react";
import { Calendar, Clock, User, Send, RefreshCw } from "lucide-react";
import CustomInput from "../form/CustomInput";
import { toast } from "react-toastify";
import { api } from "../../utils/app";

const BookingForm = ({ servicesList = [], teamList = [] }) => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    lawyer: "",
    organization: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getServiceNameById = (id) => {
    const service = servicesList.find((s) => s.id === Number(id));
    return service ? service.service_name : "";
  };

  const getLawyerNameById = (id) => {
    if (id === "any") return "Any Available Lawyer";
    const team = teamList.find((t) => t.id === Number(id));
    return team ? team.name : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    // Handle form submission here
    const payload = {
      full_name: formData.name,
      email: formData.email,
      phone_no: formData.phone,
      organisation: formData.organization,
      service_name: getServiceNameById(formData.caseType),
      preferred_lawyer: getLawyerNameById(formData.lawyer),
      message: formData.message,
    };

    try {
      const response = await api.post("/contacts", payload);

      if (response.data.status) {
        toast.success(response.data.message || "Message sent successfully!");
      } else {
        toast.error(response.data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setSubmitLoading(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        caseType: "",
        lawyer: "",
        organization: "",
        message: "",
      });
    }
  };

  return (
    <section className="py-10 lg:py-15 bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight">
              Book your appointment
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill in below form as complete as possible and one of our
              Solicitors will be in touch with you shortly
            </p>
          </div>

          {/* Main Content Container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <CustomInput
                        label="Full Name *"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                      />
                    </div>

                    <div>
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
                  </div>

                  {/* Contact & Organization Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <CustomInput
                        label="Phone Number *"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                      />
                    </div>

                    <div>
                      <CustomInput
                        label="Name of Organisation"
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                      />
                    </div>
                  </div>

                  {/* Case Type & Lawyer Selection Row */}
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
                        {servicesList.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.service_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                        Choose Lawyer
                      </label>
                      <select
                        name="lawyer"
                        value={formData.lawyer}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] duration-300 border border-[#E8EEF4] transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                      >
                        <option value="">Choose a Lawyer</option>
                        {teamList.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Please describe your legal matter in detail..."
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] duration-300 border border-[#E8EEF4] transition-all shadow-sm hover:shadow-md focus:shadow-lg resize-none"
                    />
                  </div>

                  {/* Note Text */}
                  <div className="bg-[#F4EEDC] rounded-lg p-4 border-l-4 border-[#CBA054]">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#CBA054] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">i</span>
                      </div>
                      <div>
                        <p className="text-sm text-[#0A1A2F] font-medium">
                          All information provided is confidential and protected
                          by attorney-client privilege. We will contact you
                          within 24 hours to schedule your consultation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
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
                          <span>Submit Booking Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Side - SVG Animation */}
              <div className="bg-gradient-to-br from-[#0A1A2F] to-[#1E354F] p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
                <div className="w-full max-w-md relative z-10">
                  <svg
                    viewBox="0 0 600 600"
                    className="w-full h-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Advanced Gradients */}
                      <linearGradient
                        id="goldShine"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#CBA054">
                          <animate
                            attributeName="stop-color"
                            values="#CBA054;#E5C16B;#CBA054"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="50%" stopColor="#DBAE5D">
                          <animate
                            attributeName="stop-color"
                            values="#DBAE5D;#F4D484;#DBAE5D"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </stop>
                        <stop offset="100%" stopColor="#B8944A">
                          <animate
                            attributeName="stop-color"
                            values="#B8944A;#CBA054;#B8944A"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </stop>
                      </linearGradient>

                      <linearGradient
                        id="paperGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#F4EEDC"
                          stopOpacity="0.98"
                        />
                        <stop
                          offset="100%"
                          stopColor="#E8E2D0"
                          stopOpacity="0.95"
                        />
                      </linearGradient>

                      <linearGradient
                        id="darkGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#1E354F" />
                        <stop offset="100%" stopColor="#0A1A2F" />
                      </linearGradient>

                      <radialGradient id="glowEffect" cx="50%" cy="50%" r="50%">
                        <stop
                          offset="0%"
                          stopColor="#CBA054"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#CBA054"
                          stopOpacity="0"
                        />
                      </radialGradient>

                      <radialGradient id="spotLight" cx="50%" cy="50%" r="50%">
                        <stop
                          offset="0%"
                          stopColor="#FFFFFF"
                          stopOpacity="0.1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FFFFFF"
                          stopOpacity="0"
                        />
                      </radialGradient>

                      {/* Shadow Filters */}
                      <filter
                        id="paperShadow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
                        <feOffset dx="3" dy="6" result="offsetblur" />
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.4" />
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      <filter
                        id="glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      <filter
                        id="softGlow"
                        x="-100%"
                        y="-100%"
                        width="300%"
                        height="300%"
                      >
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Animated Background Grid */}
                    <g opacity="0.05">
                      <line
                        x1="0"
                        y1="100"
                        x2="600"
                        y2="100"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="0"
                        y1="200"
                        x2="600"
                        y2="200"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          begin="0.5s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="0"
                        y1="300"
                        x2="600"
                        y2="300"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          begin="1s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="0"
                        y1="400"
                        x2="600"
                        y2="400"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          begin="1.5s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="0"
                        y1="500"
                        x2="600"
                        y2="500"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          begin="2s"
                          repeatCount="indefinite"
                        />
                      </line>

                      <line
                        x1="100"
                        y1="0"
                        x2="100"
                        y2="600"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          begin="0.3s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="200"
                        y1="0"
                        x2="200"
                        y2="600"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          begin="0.8s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="300"
                        y1="0"
                        x2="300"
                        y2="600"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          begin="1.3s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="400"
                        y1="0"
                        x2="400"
                        y2="600"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          begin="1.8s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line
                        x1="500"
                        y1="0"
                        x2="500"
                        y2="600"
                        stroke="#CBA054"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.05;0.15;0.05"
                          dur="4s"
                          begin="2.3s"
                          repeatCount="indefinite"
                        />
                      </line>
                    </g>

                    {/* Large Spotlight Effect */}
                    <circle cx="300" cy="200" r="200" fill="url(#spotLight)">
                      <animate
                        attributeName="r"
                        values="200;250;200"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Animated Background Circles */}
                    <circle
                      cx="120"
                      cy="120"
                      r="70"
                      fill="url(#glowEffect)"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        values="70;90;70"
                        dur="5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0.2;0.5"
                        dur="5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="480"
                      cy="480"
                      r="90"
                      fill="url(#glowEffect)"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        values="90;110;90"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.4;0.15;0.4"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="500"
                      cy="150"
                      r="60"
                      fill="url(#glowEffect)"
                      opacity="0.3"
                    >
                      <animate
                        attributeName="r"
                        values="60;75;60"
                        dur="7s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.3;0.1;0.3"
                        dur="7s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Main Legal Document Stack */}
                    <g transform="translate(200, 80)">
                      {/* Back Document Layer */}
                      <rect
                        x="12"
                        y="16"
                        width="180"
                        height="260"
                        rx="6"
                        fill="#0A1A2F"
                        opacity="0.2"
                        filter="url(#paperShadow)"
                      >
                        <animate
                          attributeName="y"
                          values="16;10;16"
                          dur="7s"
                          repeatCount="indefinite"
                          ease="ease-in-out"
                        />
                      </rect>
                      <rect
                        x="8"
                        y="12"
                        width="180"
                        height="260"
                        rx="6"
                        fill="#1E354F"
                        opacity="0.3"
                        filter="url(#paperShadow)"
                      >
                        <animate
                          attributeName="y"
                          values="12;6;12"
                          dur="6.5s"
                          repeatCount="indefinite"
                          ease="ease-in-out"
                        />
                      </rect>

                      {/* Main Document Body */}
                      <rect
                        x="0"
                        y="0"
                        width="200"
                        height="280"
                        rx="8"
                        fill="url(#paperGradient)"
                        stroke="#CBA054"
                        strokeWidth="2.5"
                        filter="url(#paperShadow)"
                      >
                        <animate
                          attributeName="y"
                          values="0;-10;0"
                          dur="6s"
                          repeatCount="indefinite"
                          ease="ease-in-out"
                        />
                      </rect>

                      {/* Document Corner Fold */}
                      <path
                        d="M 180 0 L 180 25 L 200 25 Z"
                        fill="#E8E2D0"
                        stroke="#CBA054"
                        strokeWidth="1"
                        opacity="0.8"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.8;0.5;0.8"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* Header Section with Gradient */}
                      <rect
                        x="0"
                        y="0"
                        width="200"
                        height="45"
                        rx="8"
                        fill="url(#goldShine)"
                        opacity="0.2"
                      />

                      {/* Law Firm Badge */}
                      <g transform="translate(100, 25)">
                        <circle
                          cx="0"
                          cy="0"
                          r="18"
                          fill="url(#darkGradient)"
                          stroke="#CBA054"
                          strokeWidth="2"
                          filter="url(#softGlow)"
                        >
                          <animate
                            attributeName="r"
                            values="18;20;18"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        {/* Scales Icon in Badge */}
                        <line
                          x1="-10"
                          y1="-3"
                          x2="10"
                          y2="-3"
                          stroke="#CBA054"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        >
                          <animate
                            attributeName="stroke-width"
                            values="1.5;2;1.5"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </line>
                        <circle
                          cx="-10"
                          cy="3"
                          r="4"
                          fill="none"
                          stroke="#CBA054"
                          strokeWidth="1.5"
                        >
                          <animate
                            attributeName="cy"
                            values="3;1;3"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle
                          cx="10"
                          cy="3"
                          r="4"
                          fill="none"
                          stroke="#CBA054"
                          strokeWidth="1.5"
                        >
                          <animate
                            attributeName="cy"
                            values="3;5;3"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <line
                          x1="0"
                          y1="-3"
                          x2="0"
                          y2="8"
                          stroke="#CBA054"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </g>

                      {/* Decorative Header Lines */}
                      <line
                        x1="20"
                        y1="55"
                        x2="180"
                        y2="55"
                        stroke="#CBA054"
                        strokeWidth="1"
                        opacity="0.3"
                      />

                      {/* Animated Document Content Lines */}
                      <g>
                        {/* Title Line */}
                        <rect
                          x="40"
                          y="75"
                          width="120"
                          height="4"
                          rx="2"
                          fill="#1E354F"
                          opacity="0"
                        >
                          <animate
                            attributeName="opacity"
                            values="0;0.8;0.8"
                            dur="0.5s"
                            fill="freeze"
                          />
                          <animate
                            attributeName="width"
                            values="0;120"
                            dur="1s"
                            fill="freeze"
                          />
                        </rect>

                        {/* Content Lines with Typing Effect */}
                        <line
                          x1="20"
                          y1="100"
                          x2="20"
                          y2="100"
                          stroke="#1E354F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.7"
                        >
                          <animate
                            attributeName="x2"
                            values="20;180;180"
                            dur="1.5s"
                            fill="freeze"
                            begin="0.5s"
                          />
                        </line>
                        <line
                          x1="20"
                          y1="120"
                          x2="20"
                          y2="120"
                          stroke="#1E354F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.7"
                        >
                          <animate
                            attributeName="x2"
                            values="20;160;160"
                            begin="1s"
                            dur="1.5s"
                            fill="freeze"
                          />
                        </line>
                        <line
                          x1="20"
                          y1="140"
                          x2="20"
                          y2="140"
                          stroke="#1E354F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.7"
                        >
                          <animate
                            attributeName="x2"
                            values="20;170;170"
                            begin="1.5s"
                            dur="1.5s"
                            fill="freeze"
                          />
                        </line>
                        <line
                          x1="20"
                          y1="160"
                          x2="20"
                          y2="160"
                          stroke="#1E354F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.6"
                        >
                          <animate
                            attributeName="x2"
                            values="20;150;150"
                            begin="2s"
                            dur="1.5s"
                            fill="freeze"
                          />
                        </line>
                        <line
                          x1="20"
                          y1="180"
                          x2="20"
                          y2="180"
                          stroke="#1E354F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.6"
                        >
                          <animate
                            attributeName="x2"
                            values="20;165;165"
                            begin="2.5s"
                            dur="1.5s"
                            fill="freeze"
                          />
                        </line>
                        <line
                          x1="20"
                          y1="200"
                          x2="20"
                          y2="200"
                          stroke="#1E354F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.6"
                        >
                          <animate
                            attributeName="x2"
                            values="20;140;140"
                            begin="3s"
                            dur="1.5s"
                            fill="freeze"
                          />
                        </line>
                      </g>

                      {/* Animated Checkbox/Bullet Points */}
                      <g>
                        <circle
                          cx="25"
                          cy="100"
                          r="3"
                          fill="none"
                          stroke="#CBA054"
                          strokeWidth="1.5"
                          opacity="0"
                        >
                          <animate
                            attributeName="opacity"
                            values="0;1"
                            dur="0.3s"
                            fill="freeze"
                            begin="2.5s"
                          />
                        </circle>
                        <circle
                          cx="25"
                          cy="120"
                          r="3"
                          fill="none"
                          stroke="#CBA054"
                          strokeWidth="1.5"
                          opacity="0"
                        >
                          <animate
                            attributeName="opacity"
                            values="0;1"
                            dur="0.3s"
                            fill="freeze"
                            begin="3s"
                          />
                        </circle>
                        <circle
                          cx="25"
                          cy="140"
                          r="3"
                          fill="none"
                          stroke="#CBA054"
                          strokeWidth="1.5"
                          opacity="0"
                        >
                          <animate
                            attributeName="opacity"
                            values="0;1"
                            dur="0.3s"
                            fill="freeze"
                            begin="3.5s"
                          />
                        </circle>
                      </g>

                      {/* Important Section Box */}
                      <rect
                        x="20"
                        y="215"
                        width="160"
                        height="35"
                        rx="4"
                        fill="none"
                        stroke="#CBA054"
                        strokeWidth="1.5"
                        strokeDasharray="5 3"
                        opacity="0"
                      >
                        <animate
                          attributeName="opacity"
                          values="0;0.6"
                          dur="0.5s"
                          fill="freeze"
                          begin="4s"
                        />
                      </rect>
                      <text
                        x="100"
                        y="235"
                        textAnchor="middle"
                        fill="#CBA054"
                        fontSize="11"
                        fontWeight="bold"
                        opacity="0"
                      >
                        CONFIDENTIAL
                        <animate
                          attributeName="opacity"
                          values="0;0.8"
                          dur="0.5s"
                          fill="freeze"
                          begin="4.2s"
                        />
                      </text>

                      {/* Animated Stamp Seal */}
                      <g transform="translate(155, 250)" opacity="0">
                        <circle
                          cx="0"
                          cy="0"
                          r="25"
                          fill="none"
                          stroke="#CBA054"
                          strokeWidth="3"
                          opacity="0.7"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r="20"
                          fill="none"
                          stroke="#CBA054"
                          strokeWidth="1.5"
                          opacity="0.5"
                        />
                        <text
                          x="0"
                          y="-5"
                          textAnchor="middle"
                          fill="#CBA054"
                          fontSize="8"
                          fontWeight="bold"
                          opacity="0.9"
                        >
                          APPROVED
                        </text>
                        <text
                          x="0"
                          y="5"
                          textAnchor="middle"
                          fill="#CBA054"
                          fontSize="7"
                          fontWeight="bold"
                          opacity="0.8"
                        >
                          LEGAL
                        </text>
                        <text
                          x="0"
                          y="13"
                          textAnchor="middle"
                          fill="#CBA054"
                          fontSize="6"
                          opacity="0.7"
                        >
                          ★ 2024 ★
                        </text>

                        <animate
                          attributeName="opacity"
                          values="0;0;1"
                          dur="0.3s"
                          fill="freeze"
                          begin="4.5s"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          values="-10 155 250;5 155 250;-5 155 250;0 155 250"
                          dur="0.5s"
                          begin="4.5s"
                          fill="freeze"
                        />
                      </g>

                      {/* Signature Line */}
                      <line
                        x1="20"
                        y1="260"
                        x2="120"
                        y2="260"
                        stroke="#CBA054"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        opacity="0.5"
                      />
                      <text
                        x="70"
                        y="273"
                        textAnchor="middle"
                        fill="#1E354F"
                        fontSize="8"
                        opacity="0.5"
                      >
                        Authorized Signature
                      </text>

                      {/* Animated Signature */}
                      <path
                        d="M 25 260 Q 35 253 45 260 Q 60 268 75 260 Q 85 253 95 260 Q 105 268 115 257"
                        stroke="#1E354F"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0"
                        strokeDasharray="120"
                        strokeDashoffset="120"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="120;0"
                          dur="2s"
                          fill="freeze"
                          begin="5s"
                        />
                        <animate
                          attributeName="opacity"
                          values="0;0.9"
                          dur="0.3s"
                          fill="freeze"
                          begin="5s"
                        />
                      </path>
                    </g>

                    {/* Floating Gavel with Enhanced Animation */}
                    <g transform="translate(90, 360)" filter="url(#softGlow)">
                      <g>
                        {/* Gavel Shadow */}
                        <ellipse
                          cx="4"
                          cy="75"
                          rx="20"
                          ry="6"
                          fill="#0A1A2F"
                          opacity="0.3"
                        >
                          <animate
                            attributeName="opacity"
                            values="0.3;0.2;0.3"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </ellipse>

                        {/* Gavel Handle */}
                        <rect
                          x="0"
                          y="10"
                          width="10"
                          height="65"
                          rx="5"
                          fill="url(#goldShine)"
                          stroke="#B8944A"
                          strokeWidth="1"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 5 42.5;-20 5 42.5;0 5 42.5"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </rect>

                        {/* Gavel Head */}
                        <rect
                          x="-10"
                          y="0"
                          width="30"
                          height="18"
                          rx="4"
                          fill="url(#goldShine)"
                          stroke="#B8944A"
                          strokeWidth="1"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 5 9;-20 5 9;0 5 9"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </rect>

                        {/* Gavel Details */}
                        <line
                          x1="5"
                          y1="15"
                          x2="5"
                          y2="70"
                          stroke="#E5C16B"
                          strokeWidth="1"
                          opacity="0.5"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 5 42.5;-20 5 42.5;0 5 42.5"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </line>
                      </g>

                      <animate
                        attributeName="opacity"
                        values="1;0.85;1"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </g>

                    {/* Briefcase with Opening Animation */}
                    <g transform="translate(450, 330)" filter="url(#glow)">
                      {/* Briefcase Body */}
                      <rect
                        x="0"
                        y="15"
                        width="70"
                        height="50"
                        rx="5"
                        fill="url(#darkGradient)"
                        stroke="url(#goldShine)"
                        strokeWidth="2.5"
                      >
                        <animate
                          attributeName="y"
                          values="15;8;15"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      </rect>

                      {/* Briefcase Top Handle */}
                      <rect
                        x="22"
                        y="0"
                        width="26"
                        height="20"
                        rx="4"
                        fill="url(#goldShine)"
                        stroke="#B8944A"
                        strokeWidth="1.5"
                      >
                        <animate
                          attributeName="y"
                          values="0;-5;0"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      </rect>

                      {/* Briefcase Lock */}
                      <circle
                        cx="35"
                        cy="40"
                        r="5"
                        fill="#CBA054"
                        stroke="#E5C16B"
                        strokeWidth="1.5"
                      >
                        <animate
                          attributeName="r"
                          values="5;6;5"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <rect
                        x="33"
                        y="40"
                        width="4"
                        height="8"
                        rx="2"
                        fill="#CBA054"
                      />

                      {/* Briefcase Clasp Lines */}
                      <line
                        x1="10"
                        y1="40"
                        x2="25"
                        y2="40"
                        stroke="#CBA054"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="45"
                        y1="40"
                        x2="60"
                        y2="40"
                        stroke="#CBA054"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      {/* Papers Sticking Out */}
                      <g opacity="0.8">
                        <rect
                          x="15"
                          y="10"
                          width="3"
                          height="8"
                          fill="#F4EEDC"
                          opacity="0.9"
                        >
                          <animate
                            attributeName="y"
                            values="10;5;10"
                            dur="5s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="20"
                          y="8"
                          width="3"
                          height="10"
                          fill="#E8E2D0"
                          opacity="0.9"
                        >
                          <animate
                            attributeName="y"
                            values="8;3;8"
                            dur="5s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="25"
                          y="12"
                          width="3"
                          height="6"
                          fill="#F4EEDC"
                          opacity="0.9"
                        >
                          <animate
                            attributeName="y"
                            values="12;7;12"
                            dur="5s"
                            repeatCount="indefinite"
                          />
                        </rect>
                      </g>

                      {/* Shine Effect */}
                      <path
                        d="M 10 20 L 15 15 L 12 25 Z"
                        fill="#FFFFFF"
                        opacity="0.15"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.15;0.3;0.15"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>

                    {/* Law Books Stack */}
                    <g transform="translate(70, 490)" filter="url(#softGlow)">
                      {/* Book 1 - Bottom */}
                      <rect
                        x="0"
                        y="20"
                        width="80"
                        height="12"
                        rx="1"
                        fill="#1E354F"
                        stroke="#CBA054"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="2"
                        y="21"
                        width="76"
                        height="3"
                        fill="#CBA054"
                        opacity="0.3"
                      />
                      <text
                        x="40"
                        y="28"
                        textAnchor="middle"
                        fill="#CBA054"
                        fontSize="7"
                        fontWeight="bold"
                      >
                        LAW
                      </text>

                      {/* Book 2 - Middle */}
                      <rect
                        x="5"
                        y="8"
                        width="70"
                        height="12"
                        rx="1"
                        fill="#0A1A2F"
                        stroke="#CBA054"
                        strokeWidth="1.5"
                      >
                        <animate
                          attributeName="x"
                          values="5;3;5"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </rect>
                      <rect
                        x="7"
                        y="9"
                        width="66"
                        height="3"
                        fill="#E5C16B"
                        opacity="0.3"
                      />
                      <text
                        x="40"
                        y="16"
                        textAnchor="middle"
                        fill="#E5C16B"
                        fontSize="7"
                        fontWeight="bold"
                      >
                        CIVIL
                      </text>

                      {/* Book 3 - Top */}
                      <rect
                        x="10"
                        y="-4"
                        width="60"
                        height="12"
                        rx="1"
                        fill="#1E354F"
                        stroke="#CBA054"
                        strokeWidth="1.5"
                      >
                        <animate
                          attributeName="x"
                          values="10;12;10"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </rect>
                      <rect
                        x="12"
                        y="-3"
                        width="56"
                        height="3"
                        fill="#CBA054"
                        opacity="0.3"
                      />
                      <text
                        x="40"
                        y="4"
                        textAnchor="middle"
                        fill="#CBA054"
                        fontSize="7"
                        fontWeight="bold"
                      >
                        CODE
                      </text>
                    </g>

                    {/* Orbiting Legal Icons */}
                    <g transform="translate(300, 320)">
                      {/* Orbit Path Indicators */}
                      <circle
                        cx="0"
                        cy="0"
                        r="140"
                        fill="none"
                        stroke="#CBA054"
                        strokeWidth="0.5"
                        opacity="0.1"
                        strokeDasharray="5 10"
                      />
                      <circle
                        cx="0"
                        cy="0"
                        r="170"
                        fill="none"
                        stroke="#CBA054"
                        strokeWidth="0.5"
                        opacity="0.08"
                        strokeDasharray="5 10"
                      />

                      {/* Orbiting Contract Icon */}
                      <g opacity="0.8">
                        <rect
                          x="0"
                          y="-145"
                          width="16"
                          height="20"
                          rx="2"
                          fill="#F4EEDC"
                          stroke="#CBA054"
                          strokeWidth="1.5"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="20s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <line
                          x1="3"
                          y1="-140"
                          x2="13"
                          y2="-140"
                          stroke="#CBA054"
                          strokeWidth="1"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="20s"
                            repeatCount="indefinite"
                          />
                        </line>
                        <line
                          x1="3"
                          y1="-135"
                          x2="10"
                          y2="-135"
                          stroke="#1E354F"
                          strokeWidth="0.8"
                          opacity="0.5"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="20s"
                            repeatCount="indefinite"
                          />
                        </line>
                        <line
                          x1="3"
                          y1="-130"
                          x2="11"
                          y2="-130"
                          stroke="#1E354F"
                          strokeWidth="0.8"
                          opacity="0.5"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="20s"
                            repeatCount="indefinite"
                          />
                        </line>
                      </g>

                      {/* Orbiting Shield Icon */}
                      <g opacity="0.7">
                        <path
                          d="M 175 0 L 185 -15 L 185 0 L 175 -15 Z"
                          fill="url(#goldShine)"
                          stroke="#B8944A"
                          strokeWidth="1.5"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="25s"
                            repeatCount="indefinite"
                          />
                        </path>
                        <line
                          x1="180"
                          y1="-12"
                          x2="180"
                          y2="-3"
                          stroke="#FFFFFF"
                          strokeWidth="1"
                          opacity="0.3"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="25s"
                            repeatCount="indefinite"
                          />
                        </line>
                      </g>

                      {/* Orbiting Balance Icon */}
                      <g opacity="0.75">
                        <circle
                          cx="-120"
                          cy="90"
                          r="8"
                          fill="none"
                          stroke="#CBA054"
                          strokeWidth="2"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="18s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <line
                          x1="-120"
                          y1="82"
                          x2="-120"
                          y2="98"
                          stroke="#CBA054"
                          strokeWidth="2"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="18s"
                            repeatCount="indefinite"
                          />
                        </line>
                      </g>
                    </g>

                    {/* Floating Particles and Stars */}
                    <g>
                      <circle
                        cx="80"
                        cy="100"
                        r="3"
                        fill="#CBA054"
                        opacity="0.7"
                      >
                        <animate
                          attributeName="cy"
                          values="100;80;100"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.7;0.3;0.7"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      <circle
                        cx="520"
                        cy="200"
                        r="2.5"
                        fill="#E8EEF4"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="cx"
                          values="520;510;520"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.6;0.9;0.6"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      <circle
                        cx="150"
                        cy="480"
                        r="2"
                        fill="#DBAE5D"
                        opacity="0.8"
                      >
                        <animate
                          attributeName="cy"
                          values="480;460;480"
                          dur="4.5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.8;0.4;0.8"
                          dur="4.5s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      <circle
                        cx="480"
                        cy="120"
                        r="2"
                        fill="#CBA054"
                        opacity="0.5"
                      >
                        <animate
                          attributeName="cy"
                          values="120;100;120"
                          dur="5.5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.5;0.9;0.5"
                          dur="5.5s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      <circle
                        cx="220"
                        cy="520"
                        r="3"
                        fill="#F4EEDC"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="cx"
                          values="220;210;220"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.6;0.3;0.6"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>

                    {/* Advanced Sparkle Stars */}
                    <g opacity="0.9">
                      <path
                        d="M 130 200 L 134 208 L 142 212 L 134 216 L 130 224 L 126 216 L 118 212 L 126 208 Z"
                        fill="#CBA054"
                        filter="url(#softGlow)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.9;0.4;0.9"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="scale"
                          values="1;1.3;1"
                          dur="2.5s"
                          repeatCount="indefinite"
                          additive="sum"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          values="0 130 212;45 130 212;0 130 212"
                          dur="5s"
                          repeatCount="indefinite"
                          additive="sum"
                        />
                      </path>

                      <path
                        d="M 470 280 L 473 286 L 479 289 L 473 292 L 470 298 L 467 292 L 461 289 L 467 286 Z"
                        fill="#F4EEDC"
                        filter="url(#softGlow)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.7;1;0.7"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="scale"
                          values="1;1.4;1"
                          dur="3s"
                          repeatCount="indefinite"
                          additive="sum"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          values="0 470 289;-45 470 289;0 470 289"
                          dur="6s"
                          repeatCount="indefinite"
                          additive="sum"
                        />
                      </path>

                      <path
                        d="M 390 480 L 392 484 L 396 486 L 392 488 L 390 492 L 388 488 L 384 486 L 388 484 Z"
                        fill="#E5C16B"
                        filter="url(#softGlow)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.8;0.3;0.8"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="scale"
                          values="1;1.2;1"
                          dur="2s"
                          repeatCount="indefinite"
                          additive="sum"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          values="0 390 486;90 390 486;0 390 486"
                          dur="4s"
                          repeatCount="indefinite"
                          additive="sum"
                        />
                      </path>

                      <path
                        d="M 180 440 L 182 444 L 186 446 L 182 448 L 180 452 L 178 448 L 174 446 L 178 444 Z"
                        fill="#CBA054"
                        filter="url(#softGlow)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.6;0.95;0.6"
                          dur="3.5s"
                          repeatCount="indefinite"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="scale"
                          values="1;1.35;1"
                          dur="3.5s"
                          repeatCount="indefinite"
                          additive="sum"
                        />
                      </path>

                      <path
                        d="M 520 380 L 521 382 L 523 383 L 521 384 L 520 386 L 519 384 L 517 383 L 519 382 Z"
                        fill="#F4EEDC"
                        filter="url(#softGlow)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.5;0.9;0.5"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="scale"
                          values="1;1.5;1"
                          dur="2.8s"
                          repeatCount="indefinite"
                          additive="sum"
                        />
                      </path>
                    </g>

                    {/* Decorative Corner Elements */}
                    <g opacity="0.15">
                      <path d="M 0 0 L 50 0 L 0 50 Z" fill="#CBA054" />
                      <path d="M 600 0 L 550 0 L 600 50 Z" fill="#CBA054" />
                      <path d="M 0 600 L 50 600 L 0 550 Z" fill="#CBA054" />
                      <path
                        d="M 600 600 L 550 600 L 600 550 Z"
                        fill="#CBA054"
                      />
                    </g>

                    {/* Animated Legal Seal in Corner */}
                    <g
                      transform="translate(500, 520)"
                      filter="url(#softGlow)"
                      opacity="0.6"
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r="35"
                        fill="none"
                        stroke="#CBA054"
                        strokeWidth="2.5"
                      >
                        <animate
                          attributeName="r"
                          values="35;37;35"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx="0"
                        cy="0"
                        r="28"
                        fill="none"
                        stroke="#CBA054"
                        strokeWidth="1.5"
                      >
                        <animate
                          attributeName="r"
                          values="28;30;28"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <text
                        x="0"
                        y="-8"
                        textAnchor="middle"
                        fill="#CBA054"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        HUBERS
                      </text>
                      <text
                        x="0"
                        y="2"
                        textAnchor="middle"
                        fill="#CBA054"
                        fontSize="8"
                        fontWeight="bold"
                      >
                        LAW
                      </text>
                      <text
                        x="0"
                        y="12"
                        textAnchor="middle"
                        fill="#CBA054"
                        fontSize="7"
                      >
                        EST. 2024
                      </text>
                      <path
                        d="M -15 18 L 0 22 L 15 18"
                        stroke="#CBA054"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle cx="0" cy="-18" r="2" fill="#CBA054">
                        <animate
                          attributeName="opacity"
                          values="1;0.4;1"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>

                    {/* Pen Writing Animation */}
                    <g transform="translate(400, 420)">
                      <g>
                        {/* Pen Body */}
                        <rect
                          x="0"
                          y="0"
                          width="8"
                          height="45"
                          rx="4"
                          fill="url(#goldShine)"
                          stroke="#B8944A"
                          strokeWidth="1"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 4 22.5;-25 4 22.5;0 4 22.5"
                            dur="6s"
                            repeatCount="indefinite"
                          />
                        </rect>

                        {/* Pen Clip */}
                        <rect
                          x="8"
                          y="8"
                          width="2"
                          height="12"
                          rx="1"
                          fill="#E5C16B"
                          opacity="0.8"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 4 22.5;-25 4 22.5;0 4 22.5"
                            dur="6s"
                            repeatCount="indefinite"
                          />
                        </rect>

                        {/* Pen Nib */}
                        <path d="M 2 45 L 4 52 L 6 45 Z" fill="#1E354F">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 4 22.5;-25 4 22.5;0 4 22.5"
                            dur="6s"
                            repeatCount="indefinite"
                          />
                        </path>

                        {/* Pen Shine */}
                        <line
                          x1="2"
                          y1="5"
                          x2="2"
                          y2="40"
                          stroke="#FFFFFF"
                          strokeWidth="1"
                          opacity="0.3"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 4 22.5;-25 4 22.5;0 4 22.5"
                            dur="6s"
                            repeatCount="indefinite"
                          />
                        </line>
                      </g>

                      {/* Ink trail */}
                      <path
                        d="M 4 52 Q 10 58 15 62"
                        stroke="#1E354F"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.6"
                        strokeDasharray="20"
                        strokeDashoffset="20"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="20;0;20"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>

                    {/* Connecting Lines Network */}
                    <g opacity="0.08" stroke="#CBA054" strokeWidth="0.5">
                      <line x1="300" y1="200" x2="450" y2="330">
                        <animate
                          attributeName="opacity"
                          values="0.08;0.15;0.08"
                          dur="5s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line x1="200" y1="200" x2="90" y2="360">
                        <animate
                          attributeName="opacity"
                          values="0.08;0.15;0.08"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line x1="400" y1="200" x2="500" y2="520">
                        <animate
                          attributeName="opacity"
                          values="0.08;0.15;0.08"
                          dur="7s"
                          repeatCount="indefinite"
                        />
                      </line>
                      <line x1="300" y1="360" x2="70" y2="490">
                        <animate
                          attributeName="opacity"
                          values="0.08;0.15;0.08"
                          dur="6.5s"
                          repeatCount="indefinite"
                        />
                      </line>
                    </g>

                    {/* Pulsing Dots at Connections */}
                    <g>
                      <circle
                        cx="300"
                        cy="200"
                        r="3"
                        fill="#CBA054"
                        opacity="0.5"
                      >
                        <animate
                          attributeName="r"
                          values="3;5;3"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.5;0.8;0.5"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx="450"
                        cy="330"
                        r="3"
                        fill="#CBA054"
                        opacity="0.5"
                      >
                        <animate
                          attributeName="r"
                          values="3;5;3"
                          dur="3.5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.5;0.8;0.5"
                          dur="3.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx="90"
                        cy="360"
                        r="3"
                        fill="#CBA054"
                        opacity="0.5"
                      >
                        <animate
                          attributeName="r"
                          values="3;5;3"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.5;0.8;0.5"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>

                    {/* Final Decorative Wave */}
                    <path
                      d="M 0 550 Q 150 530 300 550 T 600 550"
                      stroke="#CBA054"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.1"
                      strokeDasharray="10 5"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;30;0"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="d"
                        values="M 0 550 Q 150 530 300 550 T 600 550;M 0 545 Q 150 565 300 545 T 600 545;M 0 550 Q 150 530 300 550 T 600 550"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>{" "}
                  {/* Text Content */}
                  <div className="text-center mt-8">
                    <h3 className="text-2xl font-bold text-[#F4EEDC] mb-4">
                      Professional Legal Consultation
                    </h3>
                    <p className="text-[#E8EEF4] text-lg">
                      Trust our experienced team to handle your legal matters
                      with expertise and confidentiality.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#CBA054]">
                          500+
                        </div>
                        <div className="text-sm text-[#F4EEDC]">
                          Cases Handled
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#CBA054]">
                          98%
                        </div>
                        <div className="text-sm text-[#F4EEDC]">
                          Success Rate
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#CBA054]">
                          24/7
                        </div>
                        <div className="text-sm text-[#F4EEDC]">Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BookingForm;

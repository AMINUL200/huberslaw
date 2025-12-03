import React, { useState, useEffect } from "react";
import { Phone, Building, Shield, Send, RefreshCw, Calendar, Clock } from "lucide-react";
import CustomInput from "../form/CustomInput";
import { api } from "../../utils/app";
import { toast } from "react-toastify";
import BookingConfirmation from "../../pages/booking/BookingConfirm";
import { useNavigate } from "react-router-dom";

const AppointmentPopup = ({ onClose, servicesData = [], teamData = [] }) => {
  // console.log("popup");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    lawyer: "",
    organization: "",
    message: "",
    date: "",
    time: ""
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Get tomorrow's date for min date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get date 3 months from now for max date
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  // Smooth opening animation
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => clearTimeout(contentTimer);
  }, []);

  // Smooth close handler
  const handleClose = () => {
    setShowContent(false);

    setTimeout(() => {
      setIsClosing(true);
      setIsOpen(false);
    }, 300);

    setTimeout(() => {
      onClose();
    }, 1100);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getServiceNameById = (id) => {
    const service = servicesData.find((s) => s.id === Number(id));
    return service ? service.service_name : "";
  };

  const getLawyerNameById = (id) => {
    if (id === "any") return "Any Available Lawyer";
    const team = teamData.find((t) => t.id === Number(id));
    return team ? team.name : "";
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate date and time
    if (!formData.date || !formData.time) {
      toast.error("Please select both date and time for your appointment.");
      return;
    }

    // Validate that date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error("Please select a future date for your appointment.");
      return;
    }

    // Validate time format (basic validation)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(formData.time)) {
      toast.error("Please enter a valid time in HH:MM format (e.g., 14:30 or 09:00)");
      return;
    }

    console.log("Appointment form submitted:", formData);
    setSubmitLoading(true);
    
    const payload = {
      full_name: formData.name,
      email: formData.email,
      phone_no: formData.phone,
      organisation: formData.organization,
      service_name: getServiceNameById(formData.caseType),
      preferred_lawyer: getLawyerNameById(formData.lawyer),
      message: formData.message,
      date: formData.date,
      time: formData.time,
    };

    try {
      const response = await api.post("/booking/store", payload);

      if (response.data.status) {
        toast.success(response.data.message || "Appointment booked successfully!");
        navigate('/booking/confirm');
      } else {
        toast.error(response.data.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An error occurred while booking your appointment.");
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
        date: "",
        time: ""
      });
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-4"
      style={{ perspective: "1500px" }}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ease-out ${
          isOpen && !isClosing ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Main Popup Container */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-screen overflow-hidden transform-gpu transition-all duration-800 ease-out ${
          isOpen && !isClosing
            ? "opacity-100 scale-100 rotate-x-0 rotate-y-0"
            : "opacity-0 scale-75 -rotate-x-12 rotate-y-12"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transitionProperty: "transform, opacity",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Header - Fixed */}
        <div
          className={`bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] p-6 text-white relative transition-all duration-700 ease-out ${
            showContent
              ? "translate-y-0 opacity-100"
              : "-translate-y-8 opacity-0"
          }`}
        >
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Book Your Appointment</h2>
              <p className="text-[#E8EEF4] mt-1">
                Schedule a consultation with our legal experts
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-[#CBA054] transition-all duration-300 p-2 rounded-full hover:bg-white/10 transform hover:scale-110 active:scale-95"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div
          className={`overflow-y-auto transition-all duration-700 ease-out max-h-[calc(85vh-120px)] custom-scrollbar ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                label="Name of Organisation"
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
              />
            </div>

            {/* Appointment Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Field */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-[#CBA054]" />
                  Preferred Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={getTomorrowDate()}
                    max={getMaxDate()}
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] duration-300 border border-[#E8EEF4] transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {formData.date && (
                  <p className="text-xs text-green-600 mt-1">
                    Selected: {formatDateForDisplay(formData.date)}
                  </p>
                )}
              </div>

              {/* Time Field */}
              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-[#CBA054]" />
                  Preferred Time *
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 14:30 or 09:00"
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] duration-300 border border-[#E8EEF4] transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                  />
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter time in 24-hour format (HH:MM)
                </p>
              </div>
            </div>

            {/* Case Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {servicesData.map((option) => (
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
                  {teamData.map((lawyer) => (
                    <option key={lawyer.id} value={lawyer.id}>
                      {lawyer.name}
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
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#0A1A2F] font-medium">
                    All information provided is confidential and protected by
                    attorney-client privilege. We will contact you within 24
                    hours to confirm your appointment schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Buttons - Always visible at bottom */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-2 sticky bottom-0 bg-white">
              <button
                type="button"
                disabled={submitLoading}
                onClick={handleClose}
                className="flex-1 border-2 border-[#0A1A2F] text-[#0A1A2F] px-6 py-3 rounded-lg font-semibold hover:bg-[#0A1A2F] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitLoading}
                onClick={handleSubmit}
                className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform flex items-center justify-center space-x-3 group ${
                  submitLoading
                    ? "bg-gray-400 text-white cursor-not-allowed hover:scale-100"
                    : "bg-[#0A1A2F] text-white hover:bg-[#CBA054] hover:scale-105"
                }`}
              >
                {submitLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Booking Appointment...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Book Appointment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cba054 #f4eedc;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f4eedc;
          border-radius: 4px;
          margin: 4px 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cba054;
          border-radius: 4px;
          border: 2px solid #f4eedc;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #dbae5d;
        }

        .rotate-x-0 {
          transform: rotateX(0deg);
        }

        .-rotate-x-12 {
          transform: rotateX(-12deg) rotateY(12deg) scale(0.75);
        }

        /* Ensure smooth scrolling */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default AppointmentPopup;
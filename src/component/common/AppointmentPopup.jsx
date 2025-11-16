import React, { useState, useEffect } from "react";
import { Phone, Building, Shield, Send } from "lucide-react";
import CustomInput from "../form/CustomInput";

const AppointmentPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    lawyer: "",
    organization: "",
    message: ""
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const caseTypes = [
    { value: "", label: "Select Case Type" },
    { value: "corporate", label: "Corporate Law" },
    { value: "litigation", label: "Litigation" },
    { value: "family", label: "Family Law" },
    { value: "real-estate", label: "Real Estate" },
    { value: "criminal", label: "Criminal Defense" },
    { value: "immigration", label: "Immigration" },
    { value: "employment", label: "Employment Law" },
    { value: "intellectual-property", label: "Intellectual Property" },
    { value: "other", label: "Other" }
  ];

  const lawyers = [
    { value: "", label: "Choose a Lawyer" },
    { value: "john-doe", label: "John Doe - Senior Partner" },
    { value: "jane-smith", label: "Jane Smith - Corporate Law" },
    { value: "mike-wilson", label: "Mike Wilson - Litigation" },
    { value: "sarah-brown", label: "Sarah Brown - Family Law" },
    { value: "david-lee", label: "David Lee - Real Estate" },
    { value: "any", label: "Any Available Lawyer" }
  ];

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
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment form submitted:', formData);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4" style={{ perspective: '1500px' }}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-700 ease-out ${
          isOpen && !isClosing ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Main Popup Container */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden transform-gpu transition-all duration-800 ease-out ${
          isOpen && !isClosing 
            ? 'opacity-100 scale-100 rotate-x-0 rotate-y-0' 
            : 'opacity-0 scale-75 -rotate-x-12 rotate-y-12'
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
          transitionProperty: 'transform, opacity',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        
        {/* Header - Fixed */}
        <div 
          className={`bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] p-6 text-white relative transition-all duration-700 ease-out ${
            showContent ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div 
          className={`overflow-y-auto transition-all duration-700 ease-out max-h-[calc(85vh-120px)] custom-scrollbar ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
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
                  {caseTypes.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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
                  {lawyers.map(lawyer => (
                    <option key={lawyer.value} value={lawyer.value}>
                      {lawyer.label}
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
                    All information provided is confidential and protected by attorney-client privilege. 
                    We will contact you within 24 hours to schedule your consultation.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Buttons - Always visible at bottom */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-2 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 border-2 border-[#0A1A2F] text-[#0A1A2F] px-6 py-3 rounded-lg font-semibold hover:bg-[#0A1A2F] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 bg-[#0A1A2F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Submit Booking Request</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #CBA054 #F4EEDC;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F4EEDC;
          border-radius: 4px;
          margin: 4px 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CBA054;
          border-radius: 4px;
          border: 2px solid #F4EEDC;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #DBAE5D;
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
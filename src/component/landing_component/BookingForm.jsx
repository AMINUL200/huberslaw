import React, { useState } from 'react';
import { Calendar, Clock, User, Send } from 'lucide-react';
import CustomInput from '../form/CustomInput';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caseType: '',
    lawyer: '',
    organization: '',
    message: ''
  });

  const caseTypes = [
    { value: '', label: 'Select Case Type' },
    { value: 'corporate', label: 'Corporate Law' },
    { value: 'litigation', label: 'Litigation' },
    { value: 'family', label: 'Family Law' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'criminal', label: 'Criminal Defense' },
    { value: 'immigration', label: 'Immigration' },
    { value: 'employment', label: 'Employment Law' },
    { value: 'intellectual-property', label: 'Intellectual Property' },
    { value: 'other', label: 'Other' }
  ];

  const lawyers = [
    { value: '', label: 'Choose a Lawyer' },
    { value: 'john-doe', label: 'John Doe - Senior Partner' },
    { value: 'jane-smith', label: 'Jane Smith - Corporate Law' },
    { value: 'mike-wilson', label: 'Mike Wilson - Litigation' },
    { value: 'sarah-brown', label: 'Sarah Brown - Family Law' },
    { value: 'david-lee', label: 'David Lee - Real Estate' },
    { value: 'any', label: 'Any Available Lawyer' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section className="py-10 lg:py-16 bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            {/* <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
              <span className="text-sm font-semibold text-[#CBA054] uppercase tracking-wide">
                Schedule Consultation
              </span>
            </div> */}

            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight">
              Book your appointment
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to discuss your legal matters? Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
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
                  rows={6}
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
                      All information provided is confidential and protected by attorney-client privilege. 
                      We will contact you within 24 hours to schedule your consultation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-[#0A1A2F] text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-[#CBA054] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Submit Booking Request</span>
                </button>
              </div>

              
            </form>
          </div>

        
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
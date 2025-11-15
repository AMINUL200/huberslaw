import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, MapPin, Phone, Mail, Clock,  Send, CheckCircle } from 'lucide-react';
import CustomInput from '../../component/form/CustomInput';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caseType: '',
    lawyer: '',
    organisation: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const breadcrumbs = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Contact Us', path: '/contact', current: true }
  ];

  const caseTypes = [
    { value: '', label: 'Select Case Type' },
    { value: 'corporate', label: 'Corporate Law' },
    { value: 'litigation', label: 'Litigation' },
    { value: 'family', label: 'Family Law' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'criminal', label: 'Criminal Defense' },
    { value: 'employment', label: 'Employment Law' },
    { value: 'immigration', label: 'Immigration' },
    { value: 'intellectual-property', label: 'Intellectual Property' },
    { value: 'other', label: 'Other' }
  ];

  const lawyers = [
    { value: '', label: 'Choose a Lawyer' },
    { value: 'john-smith', label: 'John Smith - Corporate Law' },
    { value: 'sarah-johnson', label: 'Sarah Johnson - Family Law' },
    { value: 'michael-brown', label: 'Michael Brown - Litigation' },
    { value: 'emily-davis', label: 'Emily Davis - Real Estate' },
    { value: 'any', label: 'Any Available Lawyer' }
  ];

  const officeDetails = {
    address: '123 Legal Street, London, UK WC1A 1AA',
    phone: '0203 488 0953',
    fax: '0203 004 1413',
    email: 'info@huberslaw.co.uk',
    openingHours: [
      { day: 'Monday - Thursday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
      { day: 'Sunday', hours: 'Closed' }
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        caseType: '',
        lawyer: '',
        organisation: '',
        message: ''
      });
    }, 3000);
  };

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
                  <Link to={crumb.path} className="hover:text-[#CBA054] transition-colors duration-200 flex items-center">
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
            Get in touch with our legal team. We're here to help you with your legal matters and answer any questions you may have.
          </p>
        </div>

        {/* Google Maps Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] overflow-hidden">
            <div className="h-64 lg:h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#CBA054] mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Google Maps Integration</p>
                <p className="text-gray-500 text-sm mt-2">123 Legal Street, London, UK WC1A 1AA</p>
              </div>
              {/* Replace this div with actual Google Maps component */}
              {/* <GoogleMapReact ... /> */}
            </div>
          </div>
        </div>

        {/* Contact Form and Office Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-8">
              {isSubmitted ? (
                /* Success Message */
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#0A1A2F] mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Contact Form */
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
                        {caseTypes.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
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
                        {lawyers.map(lawyer => (
                          <option key={lawyer.value} value={lawyer.value}>
                            {lawyer.label}
                          </option>
                        ))}
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
                    className="w-full bg-[#0A1A2F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Office Details - Right Side */}
          <div className="space-y-6">
            {/* Office Information */}
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
              <h3 className="text-xl font-bold text-[#0A1A2F] mb-6">Office Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0A1A2F]">Address</div>
                    <div className="text-gray-600 text-sm">{officeDetails.address}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0A1A2F]">Phone</div>
                    <div className="text-gray-600 text-sm">{officeDetails.phone}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0A1A2F]">Fax</div>
                    <div className="text-gray-600 text-sm">{officeDetails.fax}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#CBA054] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0A1A2F]">Email</div>
                    <div className="text-gray-600 text-sm">{officeDetails.email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#CBA054]" />
                Opening Hours
              </h3>
              
              <div className="space-y-3">
                {officeDetails.openingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">{schedule.day}</span>
                    <span className="font-semibold text-[#CBA054] text-sm">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-[#F4EEDC] rounded-2xl p-6 border-l-4 border-[#CBA054]">
              <h3 className="text-lg font-bold text-[#0A1A2F] mb-3">Emergency Legal Assistance</h3>
              <p className="text-gray-600 text-sm mb-4">
                Available 24/7 for urgent legal matters
              </p>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#CBA054]" />
                <span className="font-semibold text-[#0A1A2F]">0203 488 0953</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
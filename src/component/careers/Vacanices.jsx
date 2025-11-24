import {
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  IndianRupee,
  X,
  Upload,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/app";
import { toast } from "react-toastify";

const Vacancies = ({ vacancies = [] }) => {
  const currentPageUrl = encodeURIComponent(window.location.href);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [formData, setFormData] = useState({
    recruitment_id: "",
    name: "",
    email: "",
    phone: "",
    expectation: "",
    location: "",
    message: "",
    cv: null,
  });
  const [formLoading, setFormLoading] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Job link copied to clipboard!");
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle Apply Now button click
  const handleApplyClick = (vacancy) => {
    setSelectedVacancy(vacancy);
    setFormData({
      recruitment_id: vacancy.id,
      name: "",
      email: "",
      phone: "",
      expectation: "",
      location: "",
      message: "",
      cv: null,
    });
    setShowPopup(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type (PDF, DOC, DOCX)
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF, DOC, or DOCX file");
        return;
      }

      // Check file size (4MB max)
      if (file.size > 4 * 1024 * 1024) {
        alert("File size should be less than 4MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        cv: file,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.cv) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setFormLoading(true);

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("recruitment_id", formData.recruitment_id);
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("expectation", formData.expectation);
      submitData.append("location", formData.location);
      submitData.append("message", formData.message);
      submitData.append("cv", formData.cv);

      const res = await api.post("/apply-job", submitData);
      if (res.data.status) {
        toast.success(res.data.message || "Application submitted successfully");
      } else {
        toast.error(res.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error.message || "Failed to submit application");
      setFormLoading(false);
    } finally {
      setFormLoading(false);
      setShowPopup(false);
      setSelectedVacancy(null);
      setFormData({
        recruitment_id: "",
        name: "",
        email: "",
        phone: "",
        expectation: "",
        location: "",
        message: "",
        cv: null,
      });
    }
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedVacancy(null);
  };

  // Return null if no vacancies
  if (!vacancies || vacancies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Vacancies List */}
      <div className="space-y-6">
        {vacancies.map((vacancy) => (
          <div
            key={vacancy.id}
            className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {vacancy.job_title && (
                    <h3 className="text-2xl font-bold text-[#0A1A2F]">
                      {vacancy.job_title}
                    </h3>
                  )}
                  {vacancy.status && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vacancy.status === "open"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {vacancy.status === "open" ? "Open" : "Closed"}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  {vacancy.job_location && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-[#CBA054]" />
                      <span>{vacancy.job_location}</span>
                    </div>
                  )}
                  {vacancy.job_type && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Briefcase className="w-4 h-4 text-[#CBA054]" />
                      <span>{vacancy.job_type}</span>
                    </div>
                  )}
                  {(vacancy.min_salary || vacancy.max_salary) && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-[#CBA054]" />
                      <span>
                        {vacancy.min_salary &&
                          `£${parseFloat(vacancy.min_salary).toLocaleString()}`}
                        {vacancy.min_salary && vacancy.max_salary && " - "}
                        {vacancy.max_salary &&
                          `£${parseFloat(vacancy.max_salary).toLocaleString()}`}
                      </span>
                    </div>
                  )}
                  {vacancy.experience && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4 text-[#CBA054]" />
                      <span>{vacancy.experience}</span>
                    </div>
                  )}
                </div>

                {vacancy.job_description && (
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {vacancy.job_description}
                  </p>
                )}

                {vacancy.requirment && vacancy.requirment.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#0A1A2F] mb-2">
                      Requirements:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {vacancy.requirment.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {vacancy.created_at && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 text-[#CBA054]" />
                    <span>Posted: {formatDate(vacancy.created_at)}</span>
                  </div>
                )}
                {/* Share Job Section */}
                <div className="mt-6 w-full">
                  <h3 className="text-[#0A1A2F] font-semibold tracking-wide text-base mb-3 text-center md:text-left">
                    SHARE JOB :
                  </h3>

                  <div
                    className="
    flex 
    items-center 
    justify-center 
    md:justify-start 
    gap-4 
    flex-wrap
  "
                  >
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${currentPageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
                      title="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>

                    {/* X / Twitter */}
                    <a
                      href={`https://x.com/intent/tweet?url=${currentPageUrl}&text=Check this job opening:`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
                      title="Share on X / Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentPageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
                      title="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>

                    {/* Instagram → Copy Link */}
                    <button
                      onClick={copyLink}
                      className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
                      title="Copy link for Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Apply Button Section */}
              {(vacancy.status === "open" || vacancy.status === "closed") && (
                <div className="flex flex-col items-center md:items-end  gap-3">
                  {vacancy.status === "open" ? (
                    <button
                      onClick={() => handleApplyClick(vacancy)}
                      className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 whitespace-nowrap text-center"
                    >
                      {vacancy.button_name || "Apply Now"}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed whitespace-nowrap"
                    >
                      Position Closed
                    </button>
                  )}

                  {vacancy.status === "closed" && (
                    <p className="text-xs text-gray-500 text-center max-w-[140px]">
                      This position is no longer accepting applications
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Application Popup */}
      {showPopup && selectedVacancy && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                {selectedVacancy.job_title && (
                  <h2 className="text-2xl font-bold text-[#0A1A2F]">
                    Apply for {selectedVacancy.job_title}
                  </h2>
                )}
                {(selectedVacancy.job_location || selectedVacancy.job_type) && (
                  <p className="text-gray-600 mt-1">
                    {selectedVacancy.job_location &&
                      selectedVacancy.job_location}
                    {selectedVacancy.job_location &&
                      selectedVacancy.job_type &&
                      " • "}
                    {selectedVacancy.job_type && selectedVacancy.job_type}
                  </p>
                )}
              </div>
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent"
                    placeholder="Enter your current location"
                  />
                </div>
              </div>

              {/* Salary Expectation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Expectation (£)
                </label>
                <input
                  type="text"
                  name="expectation"
                  value={formData.expectation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent"
                  placeholder="Enter your expected salary"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter / Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent"
                  placeholder="Tell us why you're interested in this position..."
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CV (PDF, DOC, DOCX) *
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#CBA054] transition-colors duration-200">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-600">
                        {formData.cv
                          ? formData.cv.name
                          : "Click to upload your CV"}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Max file size: 4MB • PDF, DOC, DOCX
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closePopup}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-[#0A1A2F] text-white px-6 py-2 rounded-lg hover:bg-[#CBA054] transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                >
                  {formLoading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vacancies;

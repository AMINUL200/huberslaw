import React, { useState, useEffect } from "react";
import { api } from "../../../utils/app";

const HandleServicePageHeading = () => {
  const [formData, setFormData] = useState({
    section_title: "",
    title_meta: "",
    section_para: "",
    description: "",
    image: null,
    image_alt: "",
    section_footer: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  // Fetch existing data
  useEffect(() => {
    fetchServiceHeading();
  }, []);

  const fetchServiceHeading = async () => {
    try {
      setLoading(true);
      const response = await api.get("/service-headings");
      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setFormData(data);
        // Set image preview if image exists and is a string (URL)
        if (data.image && typeof data.image === "string") {
              setImagePreview(`${baseUrl}${data.image}`);
        }
      }
    } catch (error) {
      console.error("Error fetching service heading:", error);
      setMessage("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview URL for the new image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview("");
    // Clear file input
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      });

      const response = await api.post("/service-headings/update", submitData);

      if (response.data.status) {
        setMessage("Service heading updated successfully!");
        // Refresh data to get updated image URL if any
        fetchServiceHeading();
      } else {
        setMessage("Error updating service heading");
      }
    } catch (error) {
      console.error("Error updating service heading:", error);
      setMessage("Error updating service heading");
    } finally {
      setSaving(false);
    }
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-[#0A1A2F]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#0A1A2F] px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Service Page Heading
            </h1>
            <p className="text-gray-300 mt-1">
              Manage the heading section for services page
            </p>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mx-6 mt-4 p-4 rounded-lg ${
                message.includes("Error")
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Section Title */}
            <div>
              <label
                htmlFor="section_title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Section Title *
              </label>
              <input
                type="text"
                id="section_title"
                name="section_title"
                value={formData.section_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1A2F] focus:border-transparent"
                placeholder="Enter section title (e.g., Our Practice Areas)"
                required
              />
            </div>

            {/* Title Meta */}
            <div>
              <label
                htmlFor="title_meta"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title Meta
              </label>
              <input
                type="text"
                id="title_meta"
                name="title_meta"
                value={formData.title_meta || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1A2F] focus:border-transparent"
                placeholder="Enter meta title for SEO"
              />
            </div>

            {/* Section Paragraph */}
            <div>
              <label
                htmlFor="section_para"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Section Paragraph *
              </label>
              <textarea
                id="section_para"
                name="section_para"
                value={formData.section_para}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1A2F] focus:border-transparent"
                placeholder="Enter section paragraph"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1A2F] focus:border-transparent"
                placeholder="Enter detailed description"
                required
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-48 w-auto object-cover rounded-lg border-2 border-gray-300"
                    />
                    {/* Remove Image Button */}
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                      title="Remove image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* File Input with Custom Styling */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="image"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A1A2F] cursor-pointer transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {imagePreview ? "Change Image" : "Choose Image"}
                </label>
                
                {imagePreview && (
                  <span className="text-sm text-gray-500">
                    Click above to change the image
                  </span>
                )}
                
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Help Text */}
              <p className="mt-1 text-sm text-gray-500">
                Upload a high-quality image for the services section. Recommended size: 1200x800px
              </p>
            </div>

            {/* Image Alt Text */}
            <div>
              <label
                htmlFor="image_alt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image Alt Text
              </label>
              <input
                type="text"
                id="image_alt"
                name="image_alt"
                value={formData.image_alt || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1A2F] focus:border-transparent"
                placeholder="Enter alt text for accessibility"
              />
            </div>

            {/* Section Footer */}
            <div>
              <label
                htmlFor="section_footer"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Section Footer
              </label>
              <input
                type="text"
                id="section_footer"
                name="section_footer"
                value={formData.section_footer || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1A2F] focus:border-transparent"
                placeholder="Enter section footer text"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#0A1A2F] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#CBA054] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HandleServicePageHeading;
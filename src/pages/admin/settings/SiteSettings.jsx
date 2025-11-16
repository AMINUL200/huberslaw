import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { api } from "../../../utils/app";

const SiteSettings = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [sraLogoPreview, setSraLogoPreview] = useState(null);
  const [lawSocietyLogoPreview, setLawSocietyLogoPreview] = useState(null);
  const [favIconPreview, setFavIconPreview] = useState(null);
  const [settings, setSettings] = useState({
    phone: "",
    email: "",
    fax: "",
    map: "",
    helpline_no: "",
    address: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    logo: null,
    logo_alt: "",
    com_name: "",
    copy_right: "",
    sra_logo: null,
    sra_url: "",
    sra_alt: "",
    law_socity_logo: null,
    law_socity_url: "",
    law_socity_alt: "",
    title: "",
    fav_icon: null,
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    canonical_url: "",
    mon: "",
    tues: "",
    wed: "",
    thus: "",
    fri: "",
    sat: "",
    sun: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const { token } = useAuth();
  const storageUrl = import.meta.env.VITE_APP_BASE_URL;

  // Track which images have been changed
  const [changedImages, setChangedImages] = useState({
    logo: false,
    sra_logo: false,
    law_socity_logo: false,
    fav_icon: false,
  });

  // Fetch settings data
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get("/settings");

      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setSettings(data);
        
        // Set previews if logos exist
        if (data.logo) {
          setLogoPreview(data.logo);
        }
        if (data.sra_logo) {
          setSraLogoPreview(data.sra_logo);
        }
        if (data.law_socity_logo) {
          setLawSocietyLogoPreview(data.law_socity_logo);
        }
        if (data.fav_icon) {
          setFavIconPreview(data.fav_icon);
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Validate image file (1MB max)
  const validateImage = (file, type) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!validTypes.includes(file.type)) {
      return `Please select a valid image format (JPG, PNG, WEBP) for ${type}`;
    }

    if (file.size > maxSize) {
      return `Image size should be less than 1MB for ${type}`;
    }

    return null;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file uploads
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateImage(file, type);

      if (error) {
        setImageErrors((prev) => ({
          ...prev,
          [type]: error,
        }));
        return;
      }

      // Clear any previous errors
      setImageErrors((prev) => ({
        ...prev,
        [type]: "",
      }));

      const previewUrl = URL.createObjectURL(file);

      switch (type) {
        case "logo":
          setLogoPreview(previewUrl);
          setChangedImages(prev => ({ ...prev, logo: true }));
          setSettings((prev) => ({ ...prev, logo: file }));
          break;
        case "sra_logo":
          setSraLogoPreview(previewUrl);
          setChangedImages(prev => ({ ...prev, sra_logo: true }));
          setSettings((prev) => ({ ...prev, sra_logo: file }));
          break;
        case "law_society_logo":
          setLawSocietyLogoPreview(previewUrl);
          setChangedImages(prev => ({ ...prev, law_socity_logo: true }));
          setSettings((prev) => ({ ...prev, law_socity_logo: file }));
          break;
        case "fav_icon":
          setFavIconPreview(previewUrl);
          setChangedImages(prev => ({ ...prev, fav_icon: true }));
          setSettings((prev) => ({ ...prev, fav_icon: file }));
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      const debugData = {};

      // Append all non-image fields
      Object.keys(settings).forEach((key) => {
        // Skip image fields that haven't been changed
        if (['logo', 'sra_logo', 'law_socity_logo', 'fav_icon'].includes(key)) {
          if (changedImages[key] && settings[key] instanceof File) {
            formData.append(key, settings[key]);
            debugData[key] = `File: ${settings[key].name}`;
          } else if (changedImages[key] && settings[key] === null) {
            // Handle case where image is removed
            formData.append(key, '');
            debugData[key] = 'Removed';
          }
          // If image hasn't been changed, don't send it
        } else {
          // Append all other fields
          if (settings[key] !== null && settings[key] !== undefined) {
            formData.append(key, settings[key]);
            debugData[key] = settings[key];
          }
        }
      });

      console.log("Form Data to be sent:", debugData);
      console.log("Changed images:", changedImages);

      const response = await api.post("/settings/1", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        alert("Settings updated successfully!");
        // Reset changed images tracking after successful update
        setChangedImages({
          logo: false,
          sra_logo: false,
          law_socity_logo: false,
          fav_icon: false,
        });
        // Refetch settings to get updated image paths
        fetchSettings();
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Error updating settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Helper function to get image preview URL
  const getImageUrl = (preview, existingPath) => {
    if (preview && preview.startsWith('blob:')) {
      return preview; // New uploaded image preview
    } else if (existingPath) {
      return `${storageUrl}${existingPath}`; // Existing image from server
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-white">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-[#0A1A2F] mb-6">Site Settings</h2>

      <form onSubmit={handleSubmit}>
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-10">
          {/* Logo Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main Logo */}
            <div>
              <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                Website Logo
              </h3>
              <div className="space-y-4">
                <div className="w-32 h-32 border-2 border-dashed border-[#E8EEF4] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  {getImageUrl(logoPreview, settings.logo) ? (
                    <img
                      src={getImageUrl(logoPreview, settings.logo)}
                      alt="Logo Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm text-center">
                      No Logo
                    </span>
                  )}
                </div>
                <label className="block px-4 py-2 bg-[#0A1A2F] text-white rounded-xl cursor-pointer hover:bg-[#CBA054] transition text-center">
                  Upload Logo
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "logo")}
                    accept=".jpg,.jpeg,.png,.webp"
                  />
                </label>
                {imageErrors.logo && (
                  <p className="text-red-600 text-sm mt-1">
                    {imageErrors.logo}
                  </p>
                )}
                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Logo Alt Text
                  </label>
                  <input
                    type="text"
                    name="logo_alt"
                    value={settings.logo_alt}
                    onChange={handleChange}
                    placeholder="Enter logo alt text for accessibility"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>
              </div>
            </div>

            {/* Favicon */}
            <div>
              <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                Favicon
              </h3>
              <div className="space-y-4">
                <div className="w-16 h-16 border-2 border-dashed border-[#E8EEF4] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  {getImageUrl(favIconPreview, settings.fav_icon) ? (
                    <img
                      src={getImageUrl(favIconPreview, settings.fav_icon)}
                      alt="Favicon Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs text-center">
                      No Favicon
                    </span>
                  )}
                </div>
                <label className="block px-4 py-2 bg-[#0A1A2F] text-white rounded-xl cursor-pointer hover:bg-[#CBA054] transition text-center">
                  Upload Favicon
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "fav_icon")}
                    accept=".jpg,.jpeg,.png,.webp"
                  />
                </label>
                {imageErrors.fav_icon && (
                  <p className="text-red-600 text-sm mt-1">
                    {imageErrors.fav_icon}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Recommended: 32x32px or 16x16px, max 1MB
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  required
                />
              </div>
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  required
                />
              </div>
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Fax Number
                </label>
                <input
                  type="text"
                  name="fax"
                  value={settings.fax}
                  onChange={handleChange}
                  placeholder="Enter fax number"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Company Address
                </label>
                <textarea
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  placeholder="Enter full company address"
                  rows={3}
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none"
                />
              </div>
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Helpline Number
                </label>
                <input
                  type="text"
                  name="helpline_no"
                  value={settings.helpline_no}
                  onChange={handleChange}
                  placeholder="Enter helpline number"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                />
              </div>
              <div className="md:col-span-3">
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Google Maps Embed URL
                </label>
                <input
                  type="url"
                  name="map"
                  value={settings.map}
                  onChange={handleChange}
                  placeholder="Enter Google Maps embed URL"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
              Social Media Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Facebook URL", name: "facebook", icon: "📘" },
                { label: "Twitter URL", name: "twitter", icon: "🐦" },
                { label: "LinkedIn URL", name: "linkedin", icon: "💼" },
                { label: "Instagram URL", name: "instagram", icon: "📸" },
              ].map((item, i) => (
                <div key={i}>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    {item.label}
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <input
                      type="url"
                      name={item.name}
                      value={settings[item.name]}
                      onChange={handleChange}
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                      className="flex-1 p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
              Opening Hours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Monday", name: "mon" },
                { label: "Tuesday", name: "tues" },
                { label: "Wednesday", name: "wed" },
                { label: "Thursday", name: "thus" },
                { label: "Friday", name: "fri" },
                { label: "Saturday", name: "sat" },
                { label: "Sunday", name: "sun" },
              ].map((day, i) => (
                <div key={i}>
                  <label className="text-[#0A1A2F] text-sm font-medium">
                    {day.label}
                  </label>
                  <input
                    type="text"
                    name={day.name}
                    value={settings[day.name]}
                    onChange={handleChange}
                    placeholder="e.g., 9:00 AM - 6:00 PM"
                    className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Accreditation Logos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SRA Logo */}
            <div>
              <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                SRA Accreditation
              </h3>
              <div className="space-y-4">
                <div className="w-32 h-32 border-2 border-dashed border-[#E8EEF4] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  {getImageUrl(sraLogoPreview, settings.sra_logo) ? (
                    <img
                      src={getImageUrl(sraLogoPreview, settings.sra_logo)}
                      alt="SRA Logo Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm text-center">
                      SRA Logo
                    </span>
                  )}
                </div>
                <label className="block px-4 py-2 bg-[#0A1A2F] text-white rounded-xl cursor-pointer hover:bg-[#CBA054] transition text-center">
                  Upload SRA Logo
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "sra_logo")}
                    accept=".jpg,.jpeg,.png,.webp"
                  />
                </label>
                {imageErrors.sra_logo && (
                  <p className="text-red-600 text-sm mt-1">
                    {imageErrors.sra_logo}
                  </p>
                )}
                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    SRA Website URL
                  </label>
                  <input
                    type="url"
                    name="sra_url"
                    value={settings.sra_url}
                    onChange={handleChange}
                    placeholder="Enter SRA website URL"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>
                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    SRA Logo Alt Text
                  </label>
                  <input
                    type="text"
                    name="sra_alt"
                    value={settings.sra_alt}
                    onChange={handleChange}
                    placeholder="Enter SRA logo alt text"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>
              </div>
            </div>

            {/* Law Society Logo */}
            <div>
              <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                Law Society Accreditation
              </h3>
              <div className="space-y-4">
                <div className="w-32 h-32 border-2 border-dashed border-[#E8EEF4] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  {getImageUrl(lawSocietyLogoPreview, settings.law_socity_logo) ? (
                    <img
                      src={getImageUrl(lawSocietyLogoPreview, settings.law_socity_logo)}
                      alt="Law Society Logo Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm text-center">
                      Law Society Logo
                    </span>
                  )}
                </div>
                <label className="block px-4 py-2 bg-[#0A1A2F] text-white rounded-xl cursor-pointer hover:bg-[#CBA054] transition text-center">
                  Upload Law Society Logo
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "law_society_logo")}
                    accept=".jpg,.jpeg,.png,.webp"
                  />
                </label>
                {imageErrors.law_society_logo && (
                  <p className="text-red-600 text-sm mt-1">
                    {imageErrors.law_society_logo}
                  </p>
                )}
                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Law Society Website URL
                  </label>
                  <input
                    type="url"
                    name="law_socity_url"
                    value={settings.law_socity_url}
                    onChange={handleChange}
                    placeholder="Enter Law Society website URL"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>
                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Law Society Logo Alt Text
                  </label>
                  <input
                    type="text"
                    name="law_socity_alt"
                    value={settings.law_socity_alt}
                    onChange={handleChange}
                    placeholder="Enter Law Society logo alt text"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  name="com_name"
                  value={settings.com_name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                />
              </div>
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Copyright Text
                </label>
                <input
                  type="text"
                  name="copy_right"
                  value={settings.copy_right}
                  onChange={handleChange}
                  placeholder="Enter copyright text"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                />
              </div>
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Website Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={settings.title}
                  onChange={handleChange}
                  placeholder="Enter website title"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div>
            <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
              SEO Settings
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={settings.meta_title}
                  onChange={handleChange}
                  placeholder="Enter meta title for SEO"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                />
              </div>
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  value={settings.meta_description}
                  onChange={handleChange}
                  placeholder="Enter meta description for SEO"
                  rows={3}
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none"
                />
              </div>
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  name="meta_keywords"
                  value={settings.meta_keywords}
                  onChange={handleChange}
                  placeholder="Enter meta keywords (comma separated)"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                />
              </div>
              <div>
                <label className="text-[#0A1A2F] text-sm font-medium">
                  Canonical URL
                </label>
                <input
                  type="url"
                  name="canonical_url"
                  value={settings.canonical_url}
                  onChange={handleChange}
                  placeholder="Enter canonical URL"
                  className="mt-1 w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-linear-to-r from-[#0A1A2F] to-[#1E354F] text-white rounded-xl shadow-lg hover:from-[#CBA054] hover:to-[#DBAE5D] transition-all text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;
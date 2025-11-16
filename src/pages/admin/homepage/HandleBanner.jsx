import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Save,
  X,
} from "lucide-react";
import { api } from "../../../utils/app";

const HandleBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [originalImage, setOriginalImage] = useState(null); // Track original image
  const storageUrl = import.meta.env.VITE_APP_BASE_URL;

  const [formData, setFormData] = useState({
    title: "",
    title_meta: "",
    description: "",
    description_meta: "",
    button_name: "",
    button_url: "",
    button_meta: "",
    image: null,
    image_name: "",
    image_alt: "",
    is_show: "1",
  });

  // Fetch banners list
  const fetchBanners = async () => {
    try {
      const response = await api.get("/banner");
      if (response.data.status) {
        setBanners(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Validate image - Updated to 1MB
  const validateImage = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!validTypes.includes(file.type)) {
      return "Please select a valid image format (JPG, PNG, WEBP)";
    }

    if (file.size > maxSize) {
      return "Image size should be less than 1MB";
    }

    return null;
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateImage(file);
      if (error) {
        setImageError(error);
        return;
      }

      setImageError("");
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        image: file,
        image_name: file.name,
      }));
    }
  };

  // Clear uploaded image
  const handleClearImage = () => {
    setImagePreview(editingBanner ? `${storageUrl}${originalImage}` : null);
    setFormData((prev) => ({
      ...prev,
      image: null,
      image_name: editingBanner ? formData.image_name : "",
    }));
    setImageError("");
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      title_meta: "",
      description: "",
      description_meta: "",
      button_name: "",
      button_url: "",
      button_meta: "",
      image: null,
      image_name: "",
      image_alt: "",
      is_show: "1",
    });
    setImagePreview(null);
    setImageError("");
    setEditingBanner(null);
    setOriginalImage(null);
    setShowForm(false);
  };

  // Handle form submission - FIXED: Only send image if changed
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = new FormData();

      // Add all fields except image
      Object.keys(formData).forEach((key) => {
        if (
          key !== "image" &&
          formData[key] !== null &&
          formData[key] !== undefined
        ) {
          submitData.append(key, formData[key]);
        }
      });

      // Only add image if it's a new file (not null and not the original)
      if (formData.image instanceof File) {
        submitData.append("image", formData.image);
      }

      console.log("Submitting data:");
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }

      let response;
      if (editingBanner) {
        response = await api.post(
          `/banner/update/${editingBanner.id}`,
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // For new banner, image is required
        if (!formData.image) {
          alert("Please upload a banner image");
          setSaving(false);
          return;
        }
        response = await api.post("/banner", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.data.status) {
        alert(`Banner ${editingBanner ? "updated" : "created"} successfully!`);
        resetForm();
        fetchBanners();
      }
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Error saving banner. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Edit banner - FIXED: Track original image
  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setOriginalImage(banner.image); // Store original image path
    setFormData({
      title: banner.title || "",
      title_meta: banner.title_meta || "",
      description: banner.description || "",
      description_meta: banner.description_meta || "",
      button_name: banner.button_name || "",
      button_url: banner.button_url || "",
      button_meta: banner.button_meta || "",
      image: null, // Set to null initially
      image_name: banner.image_name || "",
      image_alt: banner.image_alt || "",
      is_show: banner.is_show || "1",
    });
    // Set preview to original image URL
    setImagePreview(banner.image ? `${storageUrl}${banner.image}` : null);
    setShowForm(true);
  };

  // Delete banner
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        const response = await api.delete(`/banner/delete/${id}`);
        if (response.data.status) {
          alert("Banner deleted successfully!");
          fetchBanners();
        }
      } catch (error) {
        console.error("Error deleting banner:", error);
        alert("Error deleting banner. Please try again.");
      }
    }
  };

  // Toggle banner visibility
  const toggleVisibility = async (banner) => {
    try {
      const response = await api.post(`/banner/status/${banner.id}`);
      if (response.data.status) {
        fetchBanners();
      }
    } catch (error) {
      console.error("Error updating banner visibility:", error);
      alert("Error updating banner visibility. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#0A1A2F]">Manage Banners</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] text-white rounded-xl hover:from-[#CBA054] hover:to-[#DBAE5D] transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Banner</span>
        </button>
      </div>

      {/* Banner Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#0A1A2F]">
              {editingBanner ? "Edit Banner" : "Create New Banner"}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-[#0A1A2F] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Text Content */}
              <div className="space-y-6">
                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Banner Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter banner title"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    required
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Title Meta Tag
                  </label>
                  <input
                    type="text"
                    name="title_meta"
                    value={formData.title_meta}
                    onChange={handleChange}
                    placeholder="Enter meta title for SEO"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter banner description"
                    rows={4}
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Description Meta Tag
                  </label>
                  <textarea
                    name="description_meta"
                    value={formData.description_meta}
                    onChange={handleChange}
                    placeholder="Enter meta description for SEO"
                    rows={3}
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none"
                  />
                </div>
              </div>

              {/* Right Column - Image & Button Settings */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Banner Image {!editingBanner && "*"}
                    <span className="text-xs text-gray-500 ml-2">
                      (Max 1MB, JPG, PNG, WEBP)
                    </span>
                  </label>
                  <div className="space-y-4">
                    <div className="w-full h-48 border-2 border-dashed border-[#E8EEF4] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden relative">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Banner preview"
                            className="w-full h-full object-cover"
                          />
                          {formData.image && (
                            <button
                              type="button"
                              onClick={handleClearImage}
                              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                              title="Remove uploaded image"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">No Image</span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <label className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#0A1A2F] text-white rounded-xl cursor-pointer hover:bg-[#CBA054] transition text-center flex-1">
                        <Upload className="w-4 h-4" />
                        <span>
                          {imagePreview && formData.image
                            ? "Change Image"
                            : "Upload Banner Image"}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageUpload}
                          accept=".jpg,.jpeg,.png,.webp"
                        />
                      </label>

                      {formData.image && (
                        <button
                          type="button"
                          onClick={handleClearImage}
                          className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {imageError && (
                      <p className="text-red-600 text-sm">{imageError}</p>
                    )}

                    {/* Image Name Field */}
                    <div>
                      <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                        Image Name
                      </label>
                      <input
                        type="text"
                        name="image_name"
                        value={formData.image_name}
                        onChange={handleChange}
                        placeholder="Enter image name for reference"
                        className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                      />
                    </div>

                    <div>
                      <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                        Image Alt Text
                      </label>
                      <input
                        type="text"
                        name="image_alt"
                        value={formData.image_alt}
                        onChange={handleChange}
                        placeholder="Image alt text for accessibility"
                        className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Button Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                      Button Text
                    </label>
                    <input
                      type="text"
                      name="button_name"
                      value={formData.button_name}
                      onChange={handleChange}
                      placeholder="Enter button text"
                      className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    />
                  </div>

                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                      Button URL
                    </label>
                    <input
                      type="url"
                      name="button_url"
                      value={formData.button_url}
                      onChange={handleChange}
                      placeholder="Enter button URL"
                      className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    />
                  </div>

                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                      Button Meta Tag
                    </label>
                    <input
                      type="text"
                      name="button_meta"
                      value={formData.button_meta}
                      onChange={handleChange}
                      placeholder="Enter button meta tag"
                      className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    />
                  </div>

                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                      Banner Status
                    </label>
                    <select
                      name="is_show"
                      value={formData.is_show}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border-2 border-[#0A1A2F] text-[#0A1A2F] rounded-xl hover:bg-[#0A1A2F] hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || (!editingBanner && !formData.image)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] text-white rounded-xl hover:from-[#CBA054] hover:to-[#DBAE5D] transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>
                  {saving
                    ? "Saving..."
                    : editingBanner
                    ? "Update Banner"
                    : "Create Banner"}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Banners List */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-[#0A1A2F] mb-6">Banners List</h3>

        {banners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No banners found</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-6 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors"
            >
              Create First Banner
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="flex items-center justify-between p-4 border border-[#E8EEF4] rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 flex-1">
                  {/* Banner Image */}
                  <div className="w-20 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {banner.image ? (
                      <img
                        src={`${storageUrl}${banner.image}`}
                        alt={banner.image_alt || "Banner"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No Image</span>
                    )}
                  </div>

                  {/* Banner Info */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#0A1A2F]">
                      {banner.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {banner.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          banner.is_show === "1"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {banner.is_show === "1" ? "Active" : "Inactive"}
                      </span>
                      {banner.button_name && (
                        <span className="text-xs text-gray-500">
                          Button: {banner.button_name}
                        </span>
                      )}
                      {banner.image_name && (
                        <span className="text-xs text-blue-500">
                          Image: {banner.image_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleVisibility(banner)}
                    className={`p-2 rounded-lg transition-colors ${
                      banner.is_show === "1"
                        ? "text-green-600 hover:bg-green-100"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title={
                      banner.is_show === "1" ? "Hide Banner" : "Show Banner"
                    }
                  >
                    {banner.is_show === "1" ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleEdit(banner)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Edit Banner"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete Banner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleBanner;

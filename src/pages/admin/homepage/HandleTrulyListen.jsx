import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
} from "lucide-react";
import { api } from "../../../utils/app";

const HandleTrulyListen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const storageUrl = import.meta.env.VITE_APP_BASE_URL;

  const [formData, setFormData] = useState({
    section_title: "",
    sec_title_meta: "",
    title: "",
    title_meta: "",
    description: "",
    description_meta: "",
    image: null,
    image_alt: "",
  });

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await api.get("/truly-listenrs");
      if (response.data.status && response.data.data) {
        setData(response.data.data);
        // Set preview if image exists
        if (response.data.data.image) {
          setImagePreview(`${storageUrl}${response.data.data.image}`);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Validate image - 1MB max
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
      setHasImageChanged(true);
      setFormData((prev) => ({ 
        ...prev, 
        image: file,
      }));
    }
  };

  // Clear uploaded image
  const handleClearImage = () => {
    if (data && data.image) {
      // When editing, clearing means we want to remove the existing image
      setImagePreview(null);
      setHasImageChanged(true);
      setFormData((prev) => ({ 
        ...prev, 
        image: null, // Set to null to indicate removal
      }));
    } else {
      // When creating new, just reset to initial state
      setImagePreview(null);
      setHasImageChanged(false);
      setFormData((prev) => ({ 
        ...prev, 
        image: null,
      }));
    }
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
      section_title: data?.section_title || "",
      sec_title_meta: data?.sec_title_meta || "",
      title: data?.title || "",
      title_meta: data?.title_meta || "",
      description: data?.description || "",
      description_meta: data?.description_meta || "",
      image: null,
      image_alt: data?.image_alt || "",
    });
    setImagePreview(data?.image ? `${storageUrl}${data.image}` : null);
    setImageError("");
    setHasImageChanged(false);
    setShowForm(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = new FormData();
      
      // Add all fields except image
      Object.keys(formData).forEach((key) => {
        if (key !== 'image' && formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      });

      // Only add image if it's changed (new upload or removal)
      if (hasImageChanged) {
        if (formData.image instanceof File) {
          // New image uploaded
          submitData.append('image', formData.image);
        } else if (formData.image === null && data) {
          // Image was removed during edit
          submitData.append('image', ''); // Send empty to remove image
        }
      }

      console.log("Submitting data:");
      console.log("Has image changed:", hasImageChanged);
      console.log("Image data:", formData.image);
      Object.keys(formData).forEach((key) => {
        console.log(key, formData[key]);
      });

      let response;
      if (data) {
        // Update existing
        response = await api.post(
          `/truly-listenrs/update`,
          submitData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        );
      } else {
        // Create new
        response = await api.post("/truly-listenrs", submitData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
      }

      if (response.data.status) {
        alert(`Data ${data ? "updated" : "created"} successfully!`);
        resetForm();
        fetchData();
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Edit data
  const handleEdit = () => {
    setFormData({
      section_title: data?.section_title || "",
      sec_title_meta: data?.sec_title_meta || "",
      title: data?.title || "",
      title_meta: data?.title_meta || "",
      description: data?.description || "",
      description_meta: data?.description_meta || "",
      image: null,
      image_alt: data?.image_alt || "",
    });
    setImagePreview(data?.image ? `${storageUrl}${data.image}` : null);
    setHasImageChanged(false);
    setShowForm(true);
  };

  // Delete data
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      try {
        const response = await api.delete(`/truly-listen/delete/${data.id}`);
        if (response.data.status) {
          alert("Content deleted successfully!");
          setData(null);
          resetForm();
        }
      } catch (error) {
        console.error("Error deleting content:", error);
        alert("Error deleting content. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#0A1A2F]">We Truly Listen</h2>
        {data ? (
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] text-white rounded-xl hover:from-[#CBA054] hover:to-[#DBAE5D] transition-all transform hover:scale-105"
            >
              <Edit2 className="w-5 h-5" />
              <span>Edit Content</span>
            </button>
            {/* <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Content</span>
            </button> */}
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] text-white rounded-xl hover:from-[#CBA054] hover:to-[#DBAE5D] transition-all transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Create Content</span>
          </button>
        )}
      </div>

      {/* Display Current Data */}
      {data && !showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#0A1A2F] mb-6">Current Content</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div>
              <h4 className="text-lg font-semibold text-[#0A1A2F] mb-4">Image</h4>
              <div className="w-full h-64 border-2 border-dashed border-[#E8EEF4] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                {data.image ? (
                  <img
                    src={`${storageUrl}${data.image}`}
                    alt={data.image_alt || "We Truly Listen"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image Uploaded</span>
                )}
              </div>
              {data.image_alt && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Alt Text:</strong> {data.image_alt}
                </p>
              )}
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-[#0A1A2F] mb-4">Content</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium">Section Title</label>
                    <p className="text-gray-800 mt-1 p-3 bg-gray-50 rounded-xl">
                      {data.section_title || "Not set"}
                    </p>
                  </div>

                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium">Title</label>
                    <p className="text-gray-800 mt-1 p-3 bg-gray-50 rounded-xl">
                      {data.title || "Not set"}
                    </p>
                  </div>

                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium">Description</label>
                    <p className="text-gray-800 mt-1 p-3 bg-gray-50 rounded-xl whitespace-pre-wrap">
                      {data.description || "Not set"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Meta Information */}
              <div>
                <h4 className="text-lg font-semibold text-[#0A1A2F] mb-4">SEO Information</h4>
                <div className="space-y-3 text-sm">
                  {data.sec_title_meta && (
                    <div>
                      <label className="text-[#0A1A2F] font-medium">Section Title Meta:</label>
                      <p className="text-gray-600 mt-1">{data.sec_title_meta}</p>
                    </div>
                  )}
                  {data.title_meta && (
                    <div>
                      <label className="text-[#0A1A2F] font-medium">Title Meta:</label>
                      <p className="text-gray-600 mt-1">{data.title_meta}</p>
                    </div>
                  )}
                  {data.description_meta && (
                    <div>
                      <label className="text-[#0A1A2F] font-medium">Description Meta:</label>
                      <p className="text-gray-600 mt-1">{data.description_meta}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="mt-6 pt-6 border-t border-[#E8EEF4]">
            <div className="text-sm text-gray-500">
              <div>Created: {new Date(data.created_at).toLocaleDateString()}</div>
              <div>Updated: {new Date(data.updated_at).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      )}

      {/* Content Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#0A1A2F]">
              {data ? "Edit Content" : "Create New Content"}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-[#0A1A2F] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image Upload */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-[#0A1A2F] border-b pb-2">
                  Image Settings
                </h4>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Upload Image
                    <span className="text-xs text-gray-500 ml-2">(Max 1MB, JPG, PNG, WEBP)</span>
                  </label>
                  <div className="space-y-4">
                    <div className="w-full h-64 border-2 border-dashed border-[#E8EEF4] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden relative">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          {(formData.image instanceof File || hasImageChanged) && (
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
                          {imagePreview ? "Change Image" : "Upload Image"}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageUpload}
                          accept=".jpg,.jpeg,.png,.webp"
                        />
                      </label>
                      
                      {imagePreview && (
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
                    
                    {data && !hasImageChanged && (
                      <p className="text-green-600 text-sm">
                        Using existing image. Upload a new image to replace it.
                      </p>
                    )}
                  </div>
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
                    placeholder="Enter image alt text for accessibility"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-[#0A1A2F] border-b pb-2">
                  Content Settings
                </h4>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Section Title
                  </label>
                  <input
                    type="text"
                    name="section_title"
                    value={formData.section_title}
                    onChange={handleChange}
                    placeholder="Enter section title"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Section Title Meta Tag
                  </label>
                  <input
                    type="text"
                    name="sec_title_meta"
                    value={formData.sec_title_meta}
                    onChange={handleChange}
                    placeholder="Enter meta title for SEO"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter main title"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
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
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    rows={6}
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none"
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
                disabled={saving}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] text-white rounded-xl hover:from-[#CBA054] hover:to-[#DBAE5D] transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>
                  {saving
                    ? "Saving..."
                    : data
                    ? "Update Content"
                    : "Create Content"}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HandleTrulyListen;
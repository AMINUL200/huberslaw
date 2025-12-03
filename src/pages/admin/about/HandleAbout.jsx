import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, FileText, Eye } from "lucide-react";
import CustomTextEditor from "../../../component/form/TextEditor";
import { api } from "../../../utils/app";
import { toast } from "react-toastify";

const HandleAbout = () => {
  const [aboutData, setAboutData] = useState({
    title: "",
    title_meta: "",
    description: "",
    desc_meta: "",
    about_feature: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ],
    experience: "",
    mission: "",
    image: null,
    image_alt: "",
    button_name: "",
    client_desc: "",
    client_desc_meta: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  // Fetch about data
  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/about/edit"); // Adjust endpoint as needed

      console.log("Fetched about data:", response);
      if (response.data.status) {
        const { about, client_care } = response.data.data;


        // Merge about and client_care data
        setAboutData({
          title: about.title || "",
          title_meta: about.title_meta || "",
          description: about.description || "",
          desc_meta: about.desc_meta || "",
          about_feature: about.about_feature || [
            { title: "", description: "" },
            { title: "", description: "" },
            { title: "", description: "" },
            { title: "", description: "" },
          ],
          experience: about.experience || "",
          mission: about.mission || "",
          image: about.image || null,
          image_alt: about.image_alt || "",
          button_name: about.button_name || "",
          client_desc: client_care.client_desc || "",
          client_desc_meta: client_care.client_desc_meta || "",
        });

        // Set image preview if image exists
        if (about.image) {
          setImagePreview(`${baseUrl}${about.image}`);
        }
      } else {
        console.error("Failed to load about data");
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAboutData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview for new image
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
    }
  };

  // Handle text editor changes
  const handleEditorChange = (field, value) => {
    setAboutData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle feature changes
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...aboutData.about_feature];
    updatedFeatures[index][field] = value;
    setAboutData((prev) => ({
      ...prev,
      about_feature: updatedFeatures,
    }));
  };

  // Add new feature
  const addFeature = () => {
    setAboutData((prev) => ({
      ...prev,
      about_feature: [...prev.about_feature, { title: "", description: "" }],
    }));
  };

  // Remove feature
  const removeFeature = (index) => {
    if (aboutData.about_feature.length > 1) {
      const updatedFeatures = aboutData.about_feature.filter(
        (_, i) => i !== index
      );
      setAboutData((prev) => ({
        ...prev,
        about_feature: updatedFeatures,
      }));
    }
  };

  // Handle form submit
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append about fields
      formDataToSend.append("title", aboutData.title);
      formDataToSend.append("title_meta", aboutData.title_meta || "");
      formDataToSend.append("description", aboutData.description);
      formDataToSend.append("desc_meta", aboutData.desc_meta || "");
      formDataToSend.append("experience", aboutData.experience || "");
      formDataToSend.append("mission", aboutData.mission || "");
      formDataToSend.append("image_alt", aboutData.image_alt || "");
      formDataToSend.append("button_name", aboutData.button_name || "");

      // Append features as individual entries (not as JSON string)
      aboutData.about_feature.forEach((feature, index) => {
        formDataToSend.append(
          `about_feature[${index}][title]`,
          feature.title || ""
        );
        formDataToSend.append(
          `about_feature[${index}][description]`,
          feature.description || ""
        );
      });

      // Append client care fields
      formDataToSend.append("client_desc", aboutData.client_desc || "");
      formDataToSend.append(
        "client_desc_meta",
        aboutData.client_desc_meta || ""
      );

      // Append image file if selected
      if (aboutData.image instanceof File) {
        formDataToSend.append("image", aboutData.image);
      }

      // Debugging: Log form data entries
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await api.post("/about/update", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        console.log("About data saved successfully");
        // Refresh data to get updated image path
        fetchAboutData();
      } else {
        console.error("Failed to save about data");
        toast.error(response.data.message || "Failed to save about data.");
      }
    } catch (error) {
      console.error("Error saving about data:", error);
      toast.error(
        error?.message || "An error occurred while saving about data."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading about data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A1A2F]">
            About Us Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your about us page content, features, and client care
            information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* About Information Section */}
          <div className="bg-white rounded-lg shadow-md border border-[#E8EEF4] p-6">
            <h2 className="text-xl font-bold text-[#0A1A2F] mb-6 border-b border-[#E8EEF4] pb-3">
              About Information
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={aboutData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                    placeholder="Enter main title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    Title Meta
                  </label>
                  <input
                    type="text"
                    name="title_meta"
                    value={aboutData.title_meta}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                    placeholder="Meta description for title"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    About Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0A1A2F] file:text-white hover:file:bg-[#CBA054]"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: High-quality image that represents your firm
                    (JPEG, PNG, WebP)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    name="image_alt"
                    value={aboutData.image_alt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                    placeholder="Alt text for about image"
                  />
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="bg-gray-50 rounded-lg p-4 border border-[#E8EEF4]">
                  <h4 className="text-sm font-semibold text-[#0A1A2F] mb-3">
                    Image Preview
                  </h4>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-white border border-[#E8EEF4] rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        Current about image
                      </p>
                      <div className="flex space-x-3 mt-2">
                        <a
                          href={imagePreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-sm text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Full Size</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                  Description *
                </label>
                <CustomTextEditor
                  value={aboutData.description}
                  onChange={(value) => handleEditorChange("description", value)}
                  placeholder="Enter detailed description about your firm..."
                  height={300}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                  Description Meta
                </label>
                <textarea
                  name="desc_meta"
                  value={aboutData.desc_meta}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300 resize-none"
                  placeholder="Meta description for content"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={aboutData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                    placeholder="e.g., 20+ Years Experience"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    Button Name
                  </label>
                  <input
                    type="text"
                    name="button_name"
                    value={aboutData.button_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                    placeholder="e.g., Learn More"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                  Mission Statement
                </label>
                <CustomTextEditor
                  value={aboutData.mission}
                  onChange={(value) => handleEditorChange("mission", value)}
                  placeholder="Enter your firm's mission statement..."
                  height={400}
                />

              </div>
            </div>
          </div>

          {/* Horizontal Separator */}
          <div className="border-t border-[#E8EEF4] my-8"></div>

          {/* About Features Section */}
          <div className="bg-white rounded-lg shadow-md border border-[#E8EEF4] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#0A1A2F]">
                About Features
              </h2>
              <button
                type="button"
                onClick={addFeature}
                className="bg-[#0A1A2F] text-white px-4 py-2 rounded-lg hover:bg-[#CBA054] transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Feature</span>
              </button>
            </div>

            <div className="space-y-6">
              {aboutData.about_feature.map((feature, index) => (
                <div
                  key={index}
                  className="border border-[#E8EEF4] rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#0A1A2F]">
                      Feature {index + 1}
                    </h3>
                    {aboutData.about_feature.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                        Feature Title
                      </label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) =>
                          handleFeatureChange(index, "title", e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                        placeholder="Enter feature title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                        Feature Description
                      </label>
                      <textarea
                        value={feature.description}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300 resize-none"
                        placeholder="Enter feature description"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Separator */}
          <div className="border-t border-[#E8EEF4] my-8"></div>

          {/* Client Care Section */}
          <div className="bg-white rounded-lg shadow-md border border-[#E8EEF4] p-6">
            <h2 className="text-xl font-bold text-[#0A1A2F] mb-6 border-b border-[#E8EEF4] pb-3">
              Client Care Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                  Client Care Description *
                </label>
                <CustomTextEditor
                  value={aboutData.client_desc}
                  onChange={(value) => handleEditorChange("client_desc", value)}
                  placeholder="Enter detailed client care description..."
                  height={300}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                  Client Care Description Meta
                </label>
                <textarea
                  name="client_desc_meta"
                  value={aboutData.client_desc_meta}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300 resize-none"
                  placeholder="Meta description for client care content"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={submitLoading}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                submitLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#0A1A2F] text-white hover:bg-[#CBA054]"
              }`}
            >
              {submitLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save About Content</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HandleAbout;

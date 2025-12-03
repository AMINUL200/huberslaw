import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  FileText,
  Eye,
  Download,
  Upload,
} from "lucide-react";
import { api } from "../../../utils/app";
import CustomTextEditor from "../../../component/form/TextEditor";

const HandleAboutTerms = () => {
  const [terms, setTerms] = useState(null);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    heading: "",
    heading_meta: "",
    description: "",
    desc_meta: "",
    short_desc: "",
    image: "",
    image_alt: "",
    files: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fileInputs, setFileInputs] = useState([{ file_name: "", file: null }]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [hasImageChanged, setHasImageChanged] = useState(false);

  // Fetch terms data
  const fetchTerms = async () => {
    try {
      setLoading(true);
      const response = await api.get("/terms-conditions");

      if (response.data.status) {
        setTerms(response.data.data);
        // Set image preview if image exists
        if (response.data.data.image) {
          setImagePreview(`${baseUrl}${response.data.data.image}`);
        }
      } else {
        console.error("Failed to load terms");
      }
    } catch (error) {
      console.error("Error fetching terms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
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
    if (terms && terms.image) {
      setImagePreview(null);
      setHasImageChanged(true);
      setFormData((prev) => ({
        ...prev,
        image: null,
      }));
    } else {
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle text editor changes
  const handleEditorChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  // Handle file input changes
  const handleFileInputChange = (index, field, value) => {
    const updatedInputs = [...fileInputs];
    updatedInputs[index][field] = value;
    setFileInputs(updatedInputs);
  };

  // Add new file input
  const addFileInput = () => {
    setFileInputs([...fileInputs, { file_name: "", file: null }]);
  };

  // Remove file input
  const removeFileInput = async (input) => {
    console.log(input.id);

    // if(input) return;

    if (window.confirm("Are you sure you want to delete this term?")) {
      try {
        const response = await api.delete(`/terms-conditions/${input.id}`);

        if (response.data.status) {
          fetchTerms();
          resetForm();
        } else {
          console.error("Failed to delete term");
          alert("Error deleting data. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting term:", error);
        alert("Error deleting data. Please try again.");
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: terms?.id || "",
      heading: terms?.heading || "",
      heading_meta: terms?.heading_meta || "",
      description: terms?.description || "",
      desc_meta: terms?.desc_meta || "",
      short_desc: terms?.short_desc || "",
      image: null,
      image_alt: terms?.image_alt || "",
      files: terms?.files || [],
    });
    setFileInputs(
      terms?.files && terms.files.length > 0
        ? terms.files.map((file) => ({
            file_name: file.file_name,
            file: null,
            existing_file_path: file.file_path,
          }))
        : [{ file_name: "", file: null }]
    );
    setImagePreview(terms?.image ? `${baseUrl}/${terms.image}` : null);
    setHasImageChanged(false);
    setImageError("");
    setIsEditing(false);
    setShowForm(false);
  };

  // Handle form submit (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append all fields
      formDataToSend.append("heading", formData.heading);
      formDataToSend.append("heading_meta", formData.heading_meta || "");
      formDataToSend.append("description", formData.description);
      formDataToSend.append("desc_meta", formData.desc_meta || "");
      formDataToSend.append("short_desc", formData.short_desc || "");
      formDataToSend.append("image_alt", formData.image_alt || "");

      // Handle image
      if (hasImageChanged) {
        if (formData.image instanceof File) {
          formDataToSend.append("image", formData.image);
        } else if (formData.image === null && terms) {
          formDataToSend.append("image", "");
        }
      }

      // Append files
      fileInputs.forEach((fileInput, index) => {
        if (fileInput.file_name) {
          formDataToSend.append(
            `files[${index}][file_name]`,
            fileInput.file_name || ""
          );
        }
        // CASE 1 → New file uploaded → file_path = File object
        if (fileInput.file instanceof File) {
          formDataToSend.append(`files[${index}][file_path]`, fileInput.file);
          
        } else {
          formDataToSend.append(
            `files[${index}][file_path]`,
            fileInput.file_path || ""
          );
        }
      });

      // Debug formData:
      console.log("------- DEBUG FORMDATA START -------");

      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      console.log("------- DEBUG FORMDATA END -------");

      let response;
      if (terms) {
        // Update existing term
        response = await api.post(`/terms-conditions/update`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new term
        response = await api.post("/terms-conditions", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      console.log(response);

      if (response.data.success) {
        alert(
          `Terms & Conditions ${terms ? "updated" : "created"} successfully!`
        );
        resetForm();
        fetchTerms();
      } else {
        console.error("Failed to save term:", response.data.message);
        alert("Error saving data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving term:", error);
      alert("Error saving data. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Edit term
  const handleEdit = () => {
    setFormData({
      id: terms?.id || "",
      heading: terms?.heading || "",
      heading_meta: terms?.heading_meta || "",
      description: terms?.description || "",
      desc_meta: terms?.desc_meta || "",
      short_desc: terms?.short_desc || "",
      image: null,
      image_alt: terms?.image_alt || "",
      files: terms?.files || [],
    });

    // Set file inputs for existing files
    if (terms?.files && terms.files.length > 0) {
      const inputs = terms.files.map((file) => ({
        id: file.id,
        file_name: file.file_name,
        file_path: file.file_path, // string path
        file: null,
      }));
      console.log(inputs);
      setFileInputs(inputs);
    } else {
      setFileInputs([{ file_name: "", file_path: "", file: null }]);
    }

    setImagePreview(terms?.image ? `${baseUrl}${terms.image}` : null);
    setHasImageChanged(false);
    setIsEditing(true);
    setShowForm(true);
  };

  // Delete term
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this term?")) {
      try {
        const response = await api.delete(`/terms-conditions/${terms.id}`);

        if (response.data.status) {
          alert("Terms & Conditions deleted successfully!");
          setTerms(null);
          resetForm();
        } else {
          console.error("Failed to delete term");
          alert("Error deleting data. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting term:", error);
        alert("Error deleting data. Please try again.");
      }
    }
  };

  // Get full file URL
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    return `${baseUrl}${filePath}`;
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading terms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#0A1A2F]">
          Terms & Conditions Management
        </h2>
        {terms ? (
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] text-white rounded-xl hover:from-[#CBA054] hover:to-[#DBAE5D] transition-all transform hover:scale-105"
            >
              <Edit className="w-5 h-5" />
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
      {terms && !showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#0A1A2F] mb-6">
            Current Content
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Image Section */}
            <div>
              <h4 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                Image
              </h4>
              <div className="w-full h-64 border-2 border-dashed border-[#E8EEF4] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                {terms.image ? (
                  <img
                    src={`${baseUrl}${terms.image}`}
                    alt={terms.image_alt || "Terms & Conditions"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">
                    No Image Uploaded
                  </span>
                )}
              </div>
              {terms.image_alt && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Alt Text:</strong> {terms.image_alt}
                </p>
              )}
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                  Content
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium">
                      Heading
                    </label>
                    <p className="text-gray-800 mt-1 p-3 bg-gray-50 rounded-xl">
                      {terms.heading || "Not set"}
                    </p>
                  </div>

                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium">
                      Short Description
                    </label>
                    <p className="text-gray-800 mt-1 p-3 bg-gray-50 rounded-xl">
                      {terms.short_desc || "Not set"}
                    </p>
                  </div>

                  <div>
                    <label className="text-[#0A1A2F] text-sm font-medium">
                      Description
                    </label>
                    <div
                      className="text-gray-800 mt-1 p-3 bg-gray-50 rounded-xl prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: terms.description || "Not set",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Files Section */}
              {terms.files && terms.files.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                    Attached Files
                  </h4>
                  <div className="space-y-2">
                    {terms.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-[#CBA054]" />
                          <span className="text-sm text-gray-700">
                            {file.file_name}
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          <a
                            href={getFileUrl(file.file_path)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-xs text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </a>
                          <a
                            href={getFileUrl(file.file_path)}
                            download
                            className="flex items-center space-x-1 text-xs text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta Information */}
              <div>
                <h4 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                  SEO Information
                </h4>
                <div className="space-y-3 text-sm">
                  {terms.heading_meta && (
                    <div>
                      <label className="text-[#0A1A2F] font-medium">
                        Heading Meta:
                      </label>
                      <p className="text-gray-600 mt-1">{terms.heading_meta}</p>
                    </div>
                  )}
                  {terms.desc_meta && (
                    <div>
                      <label className="text-[#0A1A2F] font-medium">
                        Description Meta:
                      </label>
                      <p className="text-gray-600 mt-1">{terms.desc_meta}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="mt-6 pt-6 border-t border-[#E8EEF4]">
            <div className="text-sm text-gray-500">
              <div>
                Created: {new Date(terms.created_at).toLocaleDateString()}
              </div>
              <div>
                Updated: {new Date(terms.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Form - Single Column Layout */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#0A1A2F]">
              {terms
                ? "Edit Terms & Conditions"
                : "Create New Terms & Conditions"}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-[#0A1A2F] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Single Column Layout */}
            <div className="space-y-6">
              {/* Image Settings */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#0A1A2F] border-b pb-2">
                  Image Settings
                </h4>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Upload Image
                    <span className="text-xs text-gray-500 ml-2">
                      (Max 1MB, JPG, PNG, WEBP)
                    </span>
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
                          {(formData.image instanceof File ||
                            hasImageChanged) && (
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

                    {terms && !hasImageChanged && (
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
                    onChange={handleInputChange}
                    placeholder="Enter image alt text for accessibility"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>
              </div>

              {/* Content Settings */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#0A1A2F] border-b pb-2">
                  Content Settings
                </h4>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Heading *
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter heading title"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Heading Meta Tag
                  </label>
                  <input
                    type="text"
                    name="heading_meta"
                    value={formData.heading_meta}
                    onChange={handleInputChange}
                    placeholder="Enter meta title for SEO"
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Short Description
                  </label>
                  <textarea
                    name="short_desc"
                    value={formData.short_desc}
                    onChange={handleInputChange}
                    placeholder="Enter short description"
                    rows={3}
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Description *
                  </label>
                  <CustomTextEditor
                    value={formData.description}
                    onChange={handleEditorChange}
                    placeholder="Enter detailed description..."
                    height={500}
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Description Meta Tag
                  </label>
                  <textarea
                    name="desc_meta"
                    value={formData.desc_meta}
                    onChange={handleInputChange}
                    placeholder="Enter meta description for SEO"
                    rows={3}
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none"
                  />
                </div>
              </div>

              {/* Files Section */}
              <div className="border-t border-[#E8EEF4] pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#0A1A2F]">
                    Files
                  </h3>
                  <button
                    type="button"
                    onClick={addFileInput}
                    className="bg-[#0A1A2F] text-white px-4 py-2 rounded-xl hover:bg-[#CBA054] transition-all duration-300 flex items-center space-x-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add File</span>
                  </button>
                </div>

                {fileInputs.map((fileInput, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                        File Name
                      </label>
                      <input
                        type="text"
                        value={fileInput.file_name}
                        onChange={(e) =>
                          handleFileInputChange(index, "file_name", e.target.value)
                        }
                        className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                        placeholder="File name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                        File
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileInputChange(
                            index,
                            "file",
                            e.target.files[0]
                          )
                        }
                        className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0A1A2F] file:text-white hover:file:bg-[#CBA054]"
                      />
                    </div>

                    <div className="flex items-end">
                      {fileInputs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFileInput(fileInput)}
                          className="w-full bg-red-600 text-white px-3 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    {/* Existing file preview */}
                    {fileInput.existing_file_path && (
                      <div className="col-span-3 flex items-center space-x-3 mt-2 p-3 bg-white rounded-xl border">
                        <FileText className="w-5 h-5 text-[#CBA054]" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">
                            {fileInput.file_name}
                          </p>
                          <div className="flex space-x-3 mt-1">
                            <a
                              href={getFileUrl(fileInput.existing_file_path)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-xs text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </a>
                            <a
                              href={getFileUrl(fileInput.existing_file_path)}
                              download
                              className="flex items-center space-x-1 text-xs text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
                disabled={submitLoading}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] text-white rounded-xl hover:from-[#CBA054] hover:to-[#DBAE5D] transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>
                  {submitLoading
                    ? "Saving..."
                    : terms
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

export default HandleAboutTerms;

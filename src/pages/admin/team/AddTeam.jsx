import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../../utils/app";
import CustomTextEditor from "../../../component/form/TextEditor";

const AddTeam = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const updateId = searchParams.get("update");
  const isEditMode = Boolean(updateId);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    service_id: "",
    phone_no: "",
    email: "",
    experience: "",
    address: "",
    description: "",
    p_philosophy: "",
    image_alt: "",
    education_heading: "Education Background",
    bar_association_heading: "Bar Registrations",
    language_heading: "Languages Known",
    expertise_heading: "Areas of Expertise",
    cases_heading: "Notable Cases",
    awards_heading: "Awards & Recognitions",
    education: [""],
    bar_association: [""],
    language: [""],
    expertise: [""],
    cases: [{ title: "", description: "" }],
    awards: [""],
  });

  const [services, setServices] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Fetch services list
  const fetchServices = async () => {
    try {
      const response = await api.get("/only-service");
      if (response.data.status) {
        setServices(response.data.data);
      }
    } catch (err) {
      setError("Failed to fetch services");
      console.error("Error fetching services:", err);
    }
  };

  // Fetch team member data when in edit mode
  useEffect(() => {
    fetchServices();
    if (isEditMode) {
      fetchTeamMemberData();
    }
  }, [updateId]);

  const fetchTeamMemberData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/teams/${updateId}`);
      if (response.data.status) {
        const member = response.data.data;
        setFormData({
          name: member.name || "",
          designation: member.designation || "",
          service_id: member.service_id || "",
          phone_no: member.phone_no || "",
          email: member.email || "",
          experience: member.experience || "",
          address: member.address || "",
          description: member.description || "",
          p_philosophy: member.p_philosophy || "",
          image_alt: member.image_alt || "",
          education_heading: member.education_heading || "Education Background",
          bar_association_heading:
            member.bar_association_heading || "Bar Registrations",
          language_heading: member.language_heading || "Languages Known",
          expertise_heading: member.expertise_heading || "Areas of Expertise",
          cases_heading: member.cases_heading || "Notable Cases",
          awards_heading: member.awards_heading || "Awards & Recognitions",
          education:
            member.education && member.education.length > 0
              ? member.education
              : [""],
          bar_association:
            member.bar_association && member.bar_association.length > 0
              ? member.bar_association
              : [""],
          language:
            member.language && member.language.length > 0
              ? member.language
              : [""],
          expertise:
            member.expertise && member.expertise.length > 0
              ? member.expertise
              : [""],
          cases:
            member.cases && member.cases.length > 0
              ? member.cases
              : [{ title: "", description: "" }],
          awards:
            member.awards && member.awards.length > 0 ? member.awards : [""],
        });
        if (member.image) {
          setImagePreview(`${baseUrl}${member.image}`);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to fetch team member data");
      console.error("Error fetching team member:", err);
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

  const handleDescriptionChange = (newContent) => {
    setFormData((prev) => ({
      ...prev,
      description: newContent,
    }));
  };

  const handlePhilosophyChange = (newContent) => {
    setFormData((prev) => ({
      ...prev,
      p_philosophy: newContent,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamic array handlers
  const handleArrayFieldChange = (fieldName, index, value) => {
    const updatedArray = [...formData[fieldName]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: updatedArray,
    }));
  };

  const addArrayField = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [
        ...prev[fieldName],
        fieldName === "cases" ? { title: "", description: "" } : "",
      ],
    }));
  };

  const removeArrayField = (fieldName, index) => {
    if (formData[fieldName].length > 1) {
      const updatedArray = formData[fieldName].filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        [fieldName]: updatedArray,
      }));
    }
  };

  // Cases specific handlers
  const handleCaseFieldChange = (index, field, value) => {
    const updatedCases = [...formData.cases];
    updatedCases[index] = {
      ...updatedCases[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      cases: updatedCases,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      setSuccess("");

      const submitData = new FormData();

      // Append basic fields
      Object.keys(formData).forEach((key) => {
        if (key !== "cases" && !Array.isArray(formData[key])) {
          submitData.append(key, formData[key]);
        }
      });

      // Append array fields individually
      const arrayFields = [
        "education",
        "bar_association",
        "language",
        "expertise",
        "awards",
      ];
      arrayFields.forEach((fieldName) => {
        const filteredArray = formData[fieldName].filter((item) =>
          typeof item === "string" ? item.trim() !== "" : true
        );
        filteredArray.forEach((item, index) => {
          submitData.append(`${fieldName}[${index}]`, item);
        });
      });

      // Append cases array
      const filteredCases = formData.cases.filter(
        (caseItem) =>
          caseItem.title.trim() !== "" || caseItem.description.trim() !== ""
      );
      filteredCases.forEach((caseItem, index) => {
        submitData.append(`cases[${index}][title]`, caseItem.title);
        submitData.append(`cases[${index}][description]`, caseItem.description);
      });

      // Append image if selected
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      let response;
      if (isEditMode) {
        response = await api.post(`/teams/update/${updateId}`, submitData);
      } else {
        response = await api.post("/teams", submitData);
      }

      if (response.data.status) {
        setSuccess(
          isEditMode
            ? "Team member updated successfully!"
            : "Team member created successfully!"
        );
        setTimeout(() => {
          navigate("/admin/handle-team");
        }, 1500);
      }
    } catch (err) {
      setError(
        err.message ||
          `Failed to ${isEditMode ? "update" : "create"} team member`
      );
      console.error("Error submitting team member:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/handle-team");
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#CBA054]">
          {/* Header */}
          <div className="bg-[#0A1A2F] px-6 py-4 border-b border-[#CBA054]">
            <h1 className="text-2xl font-bold text-white">
              {isEditMode ? "Edit Team Member" : "Add New Team Member"}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Success and Error Messages */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="Enter designation"
                  />
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Service *
                  </label>
                  <select
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.service_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="e.g., 12 Years"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="Enter address"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <input
                    type="text"
                    name="image_alt"
                    value={formData.image_alt}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="Image alt text"
                  />
                </div>
              </div>
            </div>

            {/* Description with Custom Text Editor */}
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Description *
              </label>
              <CustomTextEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Enter team member description..."
                height={200}
              />
            </div>

            {/* Personal Philosophy with Custom Text Editor */}
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Personal Philosophy
              </label>
              <CustomTextEditor
                value={formData.p_philosophy}
                onChange={handlePhilosophyChange}
                placeholder="Enter personal philosophy..."
                height={150}
              />
            </div>

            {/* Dynamic Array Fields */}
            {[
              "education",
              "bar_association",
              "language",
              "expertise",
              "awards",
            ].map((fieldName) => (
              <div key={fieldName}>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  {fieldName.replace("_", " ").toUpperCase()}
                </label>
                <div className="space-y-3">
                  {formData[fieldName].map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayFieldChange(
                            fieldName,
                            index,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                        placeholder={`${fieldName.replace("_", " ")} ${
                          index + 1
                        }`}
                      />
                      {formData[fieldName].length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField(fieldName, index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField(fieldName)}
                    className="px-4 py-2 bg-gray-200 text-[#0A1A2F] rounded-md hover:bg-gray-300 transition-colors duration-200"
                  >
                    + Add {fieldName.replace("_", " ")}
                  </button>
                </div>
              </div>
            ))}

            {/* Cases Section */}
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Notable Cases
              </label>
              <div className="space-y-4">
                {formData.cases.map((caseItem, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-md"
                  >
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="text"
                        value={caseItem.title}
                        onChange={(e) =>
                          handleCaseFieldChange(index, "title", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                        placeholder="Case title"
                      />
                      <textarea
                        value={caseItem.description}
                        onChange={(e) =>
                          handleCaseFieldChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows="3"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                        placeholder="Case description"
                      />
                    </div>
                    {formData.cases.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField("cases", index)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
                      >
                        Remove Case
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField("cases")}
                  className="px-4 py-2 bg-gray-200 text-[#0A1A2F] rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  + Add Case
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#0A1A2F] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#CBA054] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "Saving..."
                  : isEditMode
                  ? "Update Team Member"
                  : "Create Team Member"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-[#0A1A2F] py-3 px-4 rounded-md font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;

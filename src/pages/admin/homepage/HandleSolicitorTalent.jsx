import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { api } from "../../../utils/app";

const HandleSolicitorTalent = () => {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTalent, setEditingTalent] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    section_title: "",
    sec_title_meta: "",
    section_description: "",
    sec_desc_meta: "",
    title: "",
    title_meta: "",
    description: "",
    description_meta: "",
  });

  // Fetch talents list
  const fetchTalents = async () => {
    try {
      const response = await api.get("/solicitortalents");
      if (response.data.status) {
        setTalents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching talents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      section_title: "",
      sec_title_meta: "",
      section_description: "",
      sec_desc_meta: "",
      title: "",
      title_meta: "",
      description: "",
      description_meta: "",
    });
    setFormErrors({});
    setEditingTalent(null);
    setShowForm(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      let response;
      
      if (editingTalent) {
        response = await api.post(
          `/solicitortalents/update/${editingTalent.id}`,
          formData
        );
      } else {
        response = await api.post("/solicitortalents", formData);
      }

      if (response.data.status) {
        alert(`Talent ${editingTalent ? "updated" : "created"} successfully!`);
        resetForm();
        fetchTalents();
      }
    } catch (error) {
      console.error("Error saving talent:", error);
      alert("Error saving talent. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Edit talent
  const handleEdit = (talent) => {
    setEditingTalent(talent);
    setFormData({
      section_title: talent.section_title || "",
      sec_title_meta: talent.sec_title_meta || "",
      section_description: talent.section_description || "",
      sec_desc_meta: talent.sec_desc_meta || "",
      title: talent.title || "",
      title_meta: talent.title_meta || "",
      description: talent.description || "",
      description_meta: talent.description_meta || "",
    });
    setShowForm(true);
  };

  // Delete talent
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this talent?")) {
      try {
        const response = await api.delete(`/solicitortalents/${id}`);
        if (response.data.status) {
          alert("Talent deleted successfully!");
          fetchTalents();
        }
      } catch (error) {
        console.error("Error deleting talent:", error);
        alert("Error deleting talent. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading talents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#0A1A2F]">Manage Solicitor Talents</h2>
        {/* <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] text-white rounded-xl hover:from-[#CBA054] hover:to-[#DBAE5D] transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Talent</span>
        </button> */}
      </div>

      {/* Talent Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#0A1A2F]">
              {editingTalent ? "Edit Talent" : "Create New Talent"}
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
              {/* Left Column - Section Details */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-[#0A1A2F] border-b pb-2">
                  Section Information
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
                    Section Description
                  </label>
                  <textarea
                    name="section_description"
                    value={formData.section_description}
                    onChange={handleChange}
                    placeholder="Enter section description"
                    rows={4}
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Section Description Meta Tag
                  </label>
                  <textarea
                    name="sec_desc_meta"
                    value={formData.sec_desc_meta}
                    onChange={handleChange}
                    placeholder="Enter meta description for SEO"
                    rows={3}
                    className="w-full p-3 rounded-xl border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none"
                  />
                </div>
              </div>

              {/* Right Column - Talent Details */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-[#0A1A2F] border-b pb-2">
                  Talent Details
                </h4>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Talent Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter talent title"
                    className={`w-full p-3 rounded-xl border ${
                      formErrors.title ? 'border-red-500' : 'border-[#E8EEF4]'
                    } focus:border-[#CBA054] focus:ring-[#CBA054]/20`}
                  />
                  {formErrors.title && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Talent Title Meta Tag
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
                    Talent Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter talent description"
                    rows={4}
                    className={`w-full p-3 rounded-xl border ${
                      formErrors.description ? 'border-red-500' : 'border-[#E8EEF4]'
                    } focus:border-[#CBA054] focus:ring-[#CBA054]/20 resize-none`}
                  />
                  {formErrors.description && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.description}</p>
                  )}
                </div>

                <div>
                  <label className="text-[#0A1A2F] text-sm font-medium mb-2 block">
                    Talent Description Meta Tag
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
                    : editingTalent
                    ? "Update Talent"
                    : "Create Talent"}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Talents List */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-[#0A1A2F] mb-6">Talents List</h3>

        {talents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No talents found</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-6 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors"
            >
              Create First Talent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talents.map((talent) => (
              <div
                key={talent.id}
                className="border border-[#E8EEF4] rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50"
              >
                {/* Talent Header */}
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-[#0A1A2F] text-lg">
                    {talent.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(talent)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit Talent"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {/* <button
                      onClick={() => handleDelete(talent.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete Talent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button> */}
                  </div>
                </div>

                {/* Talent Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {talent.description}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 text-xs text-gray-500 border-t pt-4">
                  {talent.section_title && (
                    <div>
                      <span className="font-medium">Section Title:</span> {talent.section_title}
                    </div>
                  )}
                  {talent.section_description && (
                    <div>
                      <span className="font-medium">Section Desc:</span> {talent.section_description}
                    </div>
                  )}
                  {talent.title_meta && (
                    <div>
                      <span className="font-medium">Title Meta:</span> {talent.title_meta}
                    </div>
                  )}
                  {talent.description_meta && (
                    <div>
                      <span className="font-medium">Desc Meta:</span> {talent.description_meta}
                    </div>
                  )}
                </div>

                {/* Dates */}
                <div className="text-xs text-gray-400 mt-4 pt-3 border-t">
                  <div>Created: {new Date(talent.created_at).toLocaleDateString()}</div>
                  <div>Updated: {new Date(talent.updated_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleSolicitorTalent;
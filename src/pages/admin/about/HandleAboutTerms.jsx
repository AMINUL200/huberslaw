import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, FileText, Eye, Download } from "lucide-react";
import { api } from "../../../utils/app";
import CustomTextEditor from "../../../component/form/TextEditor";

const HandleAboutTerms = () => {
  const [terms, setTerms] = useState([]);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    heading: "",
    heading_meta: "",
    description: "",
    desc_meta: "",
    pdf_name: "",
    pdf: null,
    pdf_meta: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pdfPreview, setPdfPreview] = useState(null);

  // Fetch terms data
  const fetchTerms = async () => {
    try {
      setLoading(true);
      const response = await api.get("/terms-conditions");

      if (response.data.status) {
        setTerms(response.data.data);
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

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      pdf: file,
    }));

    // Create preview for new files
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfPreview(fileUrl);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: "",
      heading: "",
      heading_meta: "",
      description: "",
      desc_meta: "",
      pdf_name: "",
      pdf: null,
      pdf_meta: "",
    });
    setIsEditing(false);
    setShowForm(false);
    setPdfPreview(null);
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
      formDataToSend.append("pdf_name", formData.pdf_name || "");
      formDataToSend.append("pdf_meta", formData.pdf_meta || "");

      if (formData.pdf) {
        formDataToSend.append("pdf", formData.pdf);
      }

      let response;
      if (isEditing) {
        // Update existing term
        response = await api.post(
          `/terms-conditions/update/${formData.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new term
        response = await api.post("/terms-conditions", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.data.status) {
        resetForm();
        fetchTerms(); // Refresh the list
      } else {
        console.error("Failed to save term:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving term:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Edit term
  const handleEdit = (term) => {
    setFormData({
      id: term.id,
      heading: term.heading,
      heading_meta: term.heading_meta || "",
      description: term.description,
      desc_meta: term.desc_meta || "",
      pdf_name: term.pdf_name || "",
      pdf: null,
      pdf_meta: term.pdf_meta || "",
    });
    setIsEditing(true);
    setShowForm(true);
    
    // Set PDF preview for existing PDF
    if (term.pdf) {
      setPdfPreview(`${baseUrl}/${term.pdf}`);
    }
  };

  // Delete term
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this term?")) {
      try {
        const response = await api.delete(`/terms-conditions/${id}`);

        if (response.data.status) {
          fetchTerms(); // Refresh the list
        } else {
          console.error("Failed to delete term");
        }
      } catch (error) {
        console.error("Error deleting term:", error);
      }
    }
  };

  // Get full PDF URL
  const getPdfUrl = (pdfPath) => {
    if (!pdfPath) return null;
    return `${baseUrl}/${pdfPath}`;
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#0A1A2F]">
                Terms & Conditions Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your website's terms and conditions, client
                responsibilities, and legal policies
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg hover:bg-[#CBA054] transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Term</span>
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md border border-[#E8EEF4] p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#0A1A2F]">
                {isEditing ? "Edit Term" : "Add New Term"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-[#CBA054] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    Heading *
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                    placeholder="Enter heading title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    Heading Meta
                  </label>
                  <input
                    type="text"
                    name="heading_meta"
                    value={formData.heading_meta}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                    placeholder="Meta description for heading"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                  Description *
                </label>
                <CustomTextEditor
                  value={formData.description}
                  onChange={handleEditorChange}
                  placeholder="Enter detailed description..."
                  height={300}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                  Description Meta
                </label>
                <textarea
                  name="desc_meta"
                  value={formData.desc_meta}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300 resize-none"
                  placeholder="Meta description for content"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    PDF Name
                  </label>
                  <input
                    type="text"
                    name="pdf_name"
                    value={formData.pdf_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                    placeholder="Name for PDF document"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                    PDF File
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0A1A2F] file:text-white hover:file:bg-[#CBA054]"
                  />
                </div>
              </div>

              {/* PDF Preview */}
              {(pdfPreview || formData.pdf) && (
                <div className="bg-gray-50 rounded-lg p-4 border border-[#E8EEF4]">
                  <h4 className="text-sm font-semibold text-[#0A1A2F] mb-3">
                    PDF Preview
                  </h4>
                  <div className="flex items-center space-x-4">
                    <FileText className="w-8 h-8 text-[#CBA054]" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        {formData.pdf_name || "PDF Document"}
                      </p>
                      <div className="flex space-x-3 mt-2">
                        <a
                          href={pdfPreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-sm text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Preview</span>
                        </a>
                        <a
                          href={pdfPreview}
                          download
                          className="flex items-center space-x-1 text-sm text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-[#0A1A2F] mb-2">
                  PDF Meta
                </label>
                <input
                  type="text"
                  name="pdf_meta"
                  value={formData.pdf_meta}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-[#E8EEF4] focus:border-[#CBA054] focus:ring-2 focus:ring-[#CBA054]/20 transition-all duration-300"
                  placeholder="Meta description for PDF"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-[#CBA054] text-[#0A1A2F] rounded-lg hover:bg-[#F4EEDC] transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
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
                      <span>{isEditing ? "Update Term" : "Save Term"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Terms List */}
        <div className="bg-white rounded-lg shadow-md border border-[#E8EEF4] overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-[#E8EEF4]">
            <h3 className="text-lg font-semibold text-[#0A1A2F]">
              Terms & Conditions ({terms.length})
            </h3>
          </div>

          {terms.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No terms and conditions found
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Click "Add New Term" to create your first term
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E8EEF4]">
              {terms.map((term) => {
                const pdfUrl = getPdfUrl(term.pdf);
                return (
                  <div
                    key={term.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-[#0A1A2F] mb-2">
                          {term.heading}
                        </h4>
                        <div 
                          className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: term.description }}
                        />

                        {/* PDF Info */}
                        {term.pdf_name && pdfUrl && (
                          <div className="mt-3 flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-sm text-[#CBA054]">
                              <FileText className="w-4 h-4" />
                              <span>{term.pdf_name}</span>
                            </div>
                            <div className="flex space-x-3">
                              <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-sm text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View PDF</span>
                              </a>
                              <a
                                href={pdfUrl}
                                download
                                className="flex items-center space-x-1 text-sm text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleEdit(term)}
                          className="p-2 text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(term.id)}
                          className="p-2 text-[#0A1A2F] hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-4">
                      {term.heading_meta && (
                        <span>Heading Meta: {term.heading_meta}</span>
                      )}
                      {term.desc_meta && <span>Desc Meta: {term.desc_meta}</span>}
                      {term.pdf_meta && <span>PDF Meta: {term.pdf_meta}</span>}
                      <span>
                        Created: {new Date(term.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleAboutTerms;
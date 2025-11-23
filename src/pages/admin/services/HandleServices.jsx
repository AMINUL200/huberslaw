import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../utils/app";
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Eye, 
  X,
  Download,
  Upload,
  ChevronDown,
  ChevronUp,
  MoreVertical
} from "lucide-react";

const HandleServices = () => {
  const [services, setServices] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const storageUrl = import.meta.env.VITE_APP_BASE_URL;

  // States for PDF management
  const [showPdfForm, setShowPdfForm] = useState(false);
  const [showPdfList, setShowPdfList] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [pdfFormData, setPdfFormData] = useState({
    service_id: "",
    pdf_name: "",
    pdf: null,
  });

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);
  const [expandedService, setExpandedService] = useState(null);

  // Fetch services list
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/services");
      if (response.data.status) {
        setServices(
          Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data]
        );
      }
    } catch (err) {
      setError(err.message || "Failed to fetch services");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch PDFs for a specific service
  const fetchServicePdfs = async (serviceId) => {
    try {
      setPdfLoading(true);
      const response = await api.get(`/service-pdf/${serviceId}`);
      if (response.data.status) {
        setPdfs(response.data.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch PDFs");
      console.error("Error fetching PDFs:", err);
    } finally {
      setPdfLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle delete service
  const handleDelete = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await api.delete(`/services/${serviceId}`);
        fetchServices();
        setMobileMenuOpen(null);
      } catch (err) {
        setError(err.message || "Failed to delete service");
        console.error("Error deleting service:", err);
      }
    }
  };

  // Handle edit - navigate to update mode
  const handleEdit = (serviceId) => {
    navigate(`/admin/add-services?update=${serviceId}`);
    setMobileMenuOpen(null);
  };

  // Handle add new service
  const handleAddNew = () => {
    navigate("/admin/add-services");
  };

  // Handle Add PDF button click
  const handleAddPdf = (serviceId) => {
    setSelectedServiceId(serviceId);
    setPdfFormData({
      service_id: serviceId,
      pdf_name: "",
      pdf: null,
    });
    setShowPdfForm(true);
    setShowPdfList(false);
    setMobileMenuOpen(null);
  };

  // Handle View PDFs button click
  const handleViewPdfs = async (serviceId) => {
    setSelectedServiceId(serviceId);
    await fetchServicePdfs(serviceId);
    setShowPdfList(true);
    setShowPdfForm(false);
    setMobileMenuOpen(null);
  };

  // Handle PDF form input change
  const handlePdfFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pdf") {
      setPdfFormData((prev) => ({
        ...prev,
        pdf: files[0],
      }));
    } else {
      setPdfFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle PDF form submit
  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("service_id", pdfFormData.service_id);
      formData.append("pdf_name", pdfFormData.pdf_name);
      formData.append("pdf", pdfFormData.pdf);

      const response = await api.post("/service-pdf", formData);

      if (response.data.status) {
        setShowPdfForm(false);
        setPdfFormData({
          service_id: "",
          pdf_name: "",
          pdf: null,
        });
        if (showPdfList) {
          fetchServicePdfs(selectedServiceId);
        }
      }
    } catch (err) {
      setError(err.message || "Failed to upload PDF");
      console.error("Error uploading PDF:", err);
    }
  };

  // Handle PDF delete
  const handlePdfDelete = async (pdfId) => {
    if (window.confirm("Are you sure you want to delete this PDF?")) {
      try {
        await api.delete(`/service-pdf/${pdfId}`);
        fetchServicePdfs(selectedServiceId);
      } catch (err) {
        setError(err.message || "Failed to delete PDF");
        console.error("Error deleting PDF:", err);
      }
    }
  };

  // Close PDF sections
  const closePdfSections = () => {
    setShowPdfForm(false);
    setShowPdfList(false);
    setSelectedServiceId(null);
  };

  // Toggle service expansion on mobile
  const toggleServiceExpansion = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  // Mobile Service Card Component
  const MobileServiceCard = ({ service }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#0A1A2F] mb-1">
            {service.service_name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{service.slug}</p>
          <div className="text-xs text-gray-500">
            Created: {new Date(service.created_at).toLocaleDateString()}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setMobileMenuOpen(mobileMenuOpen === service.id ? null : service.id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
          {mobileMenuOpen === service.id && (
            <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg border border-gray-200 z-10 min-w-[140px]">
              <button
                onClick={() => handleEdit(service.id)}
                className="w-full text-left px-4 py-2 text-sm text-[#0A1A2F] hover:bg-gray-50 flex items-center space-x-2"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleAddPdf(service.id)}
                className="w-full text-left px-4 py-2 text-sm text-[#0A1A2F] hover:bg-gray-50 flex items-center space-x-2"
              >
                <Upload className="w-3 h-3" />
                <span>Add PDF</span>
              </button>
              <button
                onClick={() => handleViewPdfs(service.id)}
                className="w-full text-left px-4 py-2 text-sm text-[#0A1A2F] hover:bg-gray-50 flex items-center space-x-2"
              >
                <FileText className="w-3 h-3" />
                <span>View PDFs</span>
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => toggleServiceExpansion(service.id)}
        className="w-full flex items-center justify-between py-2 text-sm text-[#0A1A2F] hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span>View Details</span>
        {expandedService === service.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expandedService === service.id && (
        <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
            <p className="text-sm text-gray-600 line-clamp-3">
              {service.service_description}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Features</h4>
            <div className="flex flex-wrap gap-1">
              {service.feature?.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700"
                >
                  {feature}
                </span>
              ))}
              {service.feature?.length > 3 && (
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700">
                  +{service.feature.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen px-4 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64 px-4">
        <div className="text-red-500 text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1A2F]">
              Manage Services
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Manage your services and associated PDF documents
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-[#0A1A2F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-colors duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* PDF Management Sections */}
        {(showPdfForm || showPdfList) && (
          <div className="mb-6 sm:mb-8 bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#CBA054]">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A1A2F]">
                {showPdfForm ? "Add PDF" : "Service PDFs"}
              </h2>
              <button
                onClick={closePdfSections}
                className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors duration-200 p-1"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* PDF Upload Form */}
            {showPdfForm && (
              <form onSubmit={handlePdfSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    PDF Name *
                  </label>
                  <input
                    type="text"
                    name="pdf_name"
                    value={pdfFormData.pdf_name}
                    onChange={handlePdfFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F] text-sm sm:text-base"
                    placeholder="Enter PDF name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    PDF File *
                  </label>
                  <input
                    type="file"
                    name="pdf"
                    accept=".pdf"
                    onChange={handlePdfFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F] text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0A1A2F] file:text-white hover:file:bg-[#CBA054]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#0A1A2F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold hover:bg-[#CBA054] transition-colors duration-200 flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload PDF</span>
                </button>
              </form>
            )}

            {/* PDF List */}
            {showPdfList && (
              <div>
                {pdfLoading ? (
                  <div className="text-center py-4 text-[#0A1A2F]">
                    Loading PDFs...
                  </div>
                ) : pdfs.length === 0 ? (
                  <div className="text-center py-4 text-[#0A1A2F]">
                    No PDFs found for this service.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pdfs.map((pdf) => {
                      const pdfUrl = `${storageUrl}${pdf.pdf}`;
                      return (
                        <div
                          key={pdf.id}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 border border-gray-200 rounded-lg space-y-2 sm:space-y-0"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#0A1A2F] text-sm sm:text-base">
                              {pdf.pdf_name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Uploaded: {new Date(pdf.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-1"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>View</span>
                            </a>
                            <button
                              onClick={() => handlePdfDelete(pdf.id)}
                              className="bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-red-600 transition-colors duration-200 flex items-center space-x-1"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Services List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {services.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-[#0A1A2F]">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg sm:text-xl font-semibold mb-2">No services found</p>
              <p className="text-gray-600 text-sm sm:text-base">
                Click "Add New Service" to create your first service
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#0A1A2F]">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Service Name
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Features
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Created Date
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {services.map((service) => (
                      <tr
                        key={service.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#0A1A2F]">
                            {service.service_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {service.slug}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm text-[#0A1A2F] max-w-xs line-clamp-2">
                            {service.service_description}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm text-[#0A1A2F]">
                            {service.feature
                              ?.slice(0, 2)
                              .map((feature, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
                                >
                                  {feature}
                                </span>
                              ))}
                            {service.feature?.length > 2 && (
                              <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                                +{service.feature.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[#0A1A2F]">
                          {new Date(service.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(service.id)}
                                className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors duration-200 text-xs flex items-center space-x-1"
                              >
                                <Edit className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDelete(service.id)}
                                className="text-red-600 hover:text-red-800 transition-colors duration-200 text-xs flex items-center space-x-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAddPdf(service.id)}
                                className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors duration-200 flex items-center space-x-1"
                              >
                                <Upload className="w-3 h-3" />
                                <span>Add PDF</span>
                              </button>
                              <button
                                onClick={() => handleViewPdfs(service.id)}
                                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-1"
                              >
                                <FileText className="w-3 h-3" />
                                <span>View PDFs</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden p-4">
                {services.map((service) => (
                  <MobileServiceCard key={service.id} service={service} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleServices;
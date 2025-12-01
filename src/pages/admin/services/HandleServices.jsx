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
  Upload,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Search,
  Filter,
  List,
  Calendar,
  File,
  Hash
} from "lucide-react";

const HandleServices = () => {
  const [services, setServices] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState(null);
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

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter services based on search
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.service_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.slug?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

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

  // Service List Item Component (for all screen sizes)
  const ServiceListItem = ({ service }) => (
    <div className="border-b border-[#E8EEF4] bg-white hover:bg-gray-50 transition-colors">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Section: Service Info */}
          <div className="flex-1">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-10 w-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                <List className="w-5 h-5 text-[#CBA054]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-medium text-[#0A1A2F]">
                      {service.service_name}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Hash className="w-3 h-3" />
                        <span>{service.slug}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(service.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {service.service_description}
                  </p>
                </div>

                {service.feature && service.feature.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {service.feature.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.feature.length > 2 && (
                      <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700">
                        +{service.feature.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => handleEdit(service.id)}
              className="p-2 text-[#0A1A2F] hover:text-[#CBA054] hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Service"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAddPdf(service.id)}
              className="p-2 text-[#0A1A2F] hover:text-[#CBA054] hover:bg-gray-100 rounded-lg transition-colors"
              title="Add PDF"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleViewPdfs(service.id)}
              className="p-2 text-[#0A1A2F] hover:text-[#CBA054] hover:bg-gray-100 rounded-lg transition-colors"
              title="View PDFs"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(service.id)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Service"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - Fully Responsive */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1A2F]">
                Manage Services
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage your services and associated PDF documents
              </p>
            </div>
            <div className="flex items-center justify-end space-x-2 sm:space-x-3">
              <button
                onClick={handleAddNew}
                className="flex items-center px-3 sm:px-4 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Add New Service</span>
                <span className="sm:hidden">New Service</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-2 bg-[#F4EEDC] rounded-lg">
                <List className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total Services
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
                  {services.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-2 bg-[#F4EEDC] rounded-lg">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  With PDFs
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
                  {services.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-2 bg-[#F4EEDC] rounded-lg">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Active
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
                  {services.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-2 bg-[#F4EEDC] rounded-lg">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  PDF Uploads
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
                  {services.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section - Responsive */}
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 p-4 border border-[#E8EEF4]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services by name, description, or slug..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EEF4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CBA054]/20 text-[#0A1A2F] placeholder-gray-500 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="text-sm text-[#0A1A2F] text-center lg:text-right whitespace-nowrap">
              Showing {filteredServices.length} of {services.length} services
            </div>
          </div>
        </div>

        {/* PDF Management Sections */}
        {(showPdfForm || showPdfList) && (
          <div className="mb-6 sm:mb-8 bg-white rounded-lg shadow-md p-4 sm:p-6 border border-[#CBA054]">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
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
                  className="w-full sm:w-auto bg-[#0A1A2F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold hover:bg-[#CBA054] transition-colors duration-200 flex items-center justify-center space-x-2"
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
                            <div className="flex items-center space-x-3">
                              <File className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
                              <div>
                                <h3 className="font-semibold text-[#0A1A2F] text-sm sm:text-base">
                                  {pdf.pdf_name}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500">
                                  Uploaded: {new Date(pdf.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
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

        {/* Services List Container */}
        <div className="bg-white rounded-lg shadow border border-[#E8EEF4] overflow-hidden">
          {/* List Header for Desktop */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-[#E8EEF4]">
            <div className="col-span-5">
              <span className="text-xs font-medium text-gray-500 uppercase">Service Information</span>
            </div>
            <div className="col-span-4">
              <span className="text-xs font-medium text-gray-500 uppercase">Description & Features</span>
            </div>
            <div className="col-span-3 text-right">
              <span className="text-xs font-medium text-gray-500 uppercase">Actions</span>
            </div>
          </div>

          {/* Services List Items */}
          <div className="divide-y divide-[#E8EEF4]">
            {filteredServices.map((service) => (
              <ServiceListItem key={service.id} service={service} />
            ))}
          </div>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <List className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No services found
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {searchTerm 
                  ? "Try a different search term" 
                  : "Click 'Add New Service' to create your first service"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleServices;
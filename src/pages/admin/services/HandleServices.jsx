import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../utils/app";

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
      const response = await api.get(`/service-pdf/${serviceId}`); // Adjust endpoint
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
        await api.delete(`/services/delete/${serviceId}`);
        fetchServices(); // Refresh the list
      } catch (err) {
        setError(err.message || "Failed to delete service");
        console.error("Error deleting service:", err);
      }
    }
  };

  // Handle edit - navigate to update mode
  const handleEdit = (serviceId) => {
    navigate(`/admin/add-services?update=${serviceId}`);
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
  };

  // Handle View PDFs button click
  const handleViewPdfs = async (serviceId) => {
    setSelectedServiceId(serviceId);
    await fetchServicePdfs(serviceId);
    setShowPdfList(true);
    setShowPdfForm(false);
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
        // Refresh PDF list if it's open
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
        fetchServicePdfs(selectedServiceId); // Refresh the PDF list
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

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1A2F]">Manage Services</h1>
          <button
            onClick={handleAddNew}
            className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-colors duration-200"
          >
            Add New Service
          </button>
        </div>

        {/* PDF Management Sections */}
        {(showPdfForm || showPdfList) && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-[#CBA054]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0A1A2F]">
                {showPdfForm ? "Add PDF" : "Service PDFs"}
              </h2>
              <button
                onClick={closePdfSections}
                className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors duration-200"
              >
                Close
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#0A1A2F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#CBA054] transition-colors duration-200"
                >
                  Upload PDF
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
                  <div className="space-y-4">
                    {pdfs.map((pdf) => {
                      const pdfUrl = `${storageUrl}${pdf.pdf}`;
                      return (
                        <div
                          key={pdf.id}
                          className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <h3 className="font-semibold text-[#0A1A2F]">
                              {pdf.pdf_name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Uploaded:{" "}
                              {new Date(pdf.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
                            >
                              View
                            </a>
                            <button
                              onClick={() => handlePdfDelete(pdf.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
                            >
                              Delete
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
            <div className="text-center py-12 text-[#0A1A2F]">
              No services found. Click "Add New Service" to create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#0A1A2F]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Service Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Features
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#0A1A2F]">
                          {service.service_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#0A1A2F] max-w-xs truncate">
                          {service.service_description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#0A1A2F]">
                          {service.feature
                            ?.slice(0, 2)
                            .map((feature, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-1"
                              >
                                {feature}
                              </span>
                            ))}
                          {service.feature?.length > 2 && (
                            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                              +{service.feature.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0A1A2F]">
                        {new Date(service.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(service.id)}
                              className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors duration-200 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(service.id)}
                              className="text-red-600 hover:text-red-800 transition-colors duration-200 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddPdf(service.id)}
                              className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors duration-200"
                            >
                              Add PDF
                            </button>
                            <button
                              onClick={() => handleViewPdfs(service.id)}
                              className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors duration-200"
                            >
                              View PDFs
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleServices;

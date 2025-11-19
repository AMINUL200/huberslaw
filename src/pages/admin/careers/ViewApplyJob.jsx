import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Download, Mail, Phone, MapPin, Calendar, Briefcase, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '../../../utils/app';

const ViewApplyJob = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [baseUrl] = useState(import.meta.env.VITE_APP_BASE_URL);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/applications?page=${currentPage}&per_page=${itemsPerPage}`);
      if (res.data.status) {
        setApplications(res.data.data);
        setTotalItems(res.data.total || res.data.data.length);
      }
    } catch (error) {
      console.error('Error fetching job applications:', error);
      toast.error('Failed to load job applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [currentPage, itemsPerPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleView = (application) => {
    setSelectedApplication(application);
    setShowViewModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await api.delete(`/applications/${id}`);
      if (res.data.status) {
        toast.success('Application deleted successfully');
        fetchApplications();
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    }
  };

  const handleDownloadCV = (application) => {
    const cvUrl = `${baseUrl}/${application.cv}`;
    window.open(cvUrl, '_blank');
  };

  const closeModal = () => {
    setShowViewModal(false);
    setSelectedApplication(null);
  };

  // Pagination calculations
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA054] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading job applications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A1A2F]">Job Applications</h1>
          <p className="text-gray-600 mt-2">
            Manage and review all job applications
          </p>
        </div>

        {/* Top Controls - Items Per Page and Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Results Info */}
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {endIndex} of {totalItems} applications
          </div>
          
          {/* Items Per Page Dropdown */}
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CBA054] focus:border-transparent"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-6">
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Briefcase className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No job applications found</p>
              <p className="text-gray-400 mt-2">Applications will appear here when candidates apply for jobs</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {applications.map((application) => (
                <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-[#0A1A2F]">
                            {application.name}
                          </h3>
                          <p className="text-[#CBA054] font-medium">
                            Applied for: {application.recruitment.job_title}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleView(application)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                            title="View Application"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadCV(application)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-200"
                            title="Download CV"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(application.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-[#CBA054]" />
                          <span>{application.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-[#CBA054]" />
                          <span>{application.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-[#CBA054]" />
                          <span>{application.location}</span>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Job Type: </span>
                          <span className="text-gray-600">{application.recruitment.job_type}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Location: </span>
                          <span className="text-gray-600">{application.recruitment.job_location}</span>
                        </div>
                      </div>

                      {/* Salary Expectation */}
                      {application.expectation && (
                        <div className="mb-3">
                          <span className="font-medium text-gray-700">Salary Expectation: </span>
                          <span className="text-[#CBA054] font-semibold">{application.expectation}</span>
                        </div>
                      )}

                      {/* Message Preview */}
                      {application.message && (
                        <div className="mb-3">
                          <span className="font-medium text-gray-700">Message: </span>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {application.message}
                          </p>
                        </div>
                      )}

                      {/* Application Date */}
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-[#CBA054]" />
                        <span>Applied: {formatDate(application.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Results Info */}
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} • {totalItems} total applications
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-[#0A1A2F] text-white border-[#0A1A2F]'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* View Application Modal */}
        {showViewModal && selectedApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-[#0A1A2F]">
                    Application Details
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {selectedApplication.recruitment.job_title}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Candidate Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                      Candidate Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <p className="text-gray-900 font-semibold">{selectedApplication.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-600">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-gray-600">{selectedApplication.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <p className="text-gray-600">{selectedApplication.location}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                      Job Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <p className="text-gray-900 font-semibold">{selectedApplication.recruitment.job_title}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Job Type</label>
                        <p className="text-gray-600">{selectedApplication.recruitment.job_type}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <p className="text-gray-600">{selectedApplication.recruitment.job_location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Experience Required</label>
                        <p className="text-gray-600">{selectedApplication.recruitment.experience}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary Expectation */}
                {selectedApplication.expectation && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A1A2F] mb-3">
                      Salary Expectation
                    </h3>
                    <p className="text-[#CBA054] font-semibold text-lg">
                      {selectedApplication.expectation}
                    </p>
                  </div>
                )}

                {/* Message */}
                {selectedApplication.message && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A1A2F] mb-3">
                      Cover Letter / Message
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedApplication.message}
                      </p>
                    </div>
                  </div>
                )}

                {/* CV Download */}
                <div>
                  <h3 className="text-lg font-semibold text-[#0A1A2F] mb-3">
                    Curriculum Vitae
                  </h3>
                  <button
                    onClick={() => handleDownloadCV(selectedApplication)}
                    className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg hover:bg-[#CBA054] transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download CV</span>
                  </button>
                </div>

                {/* Application Date */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Application submitted: {formatDate(selectedApplication.created_at)}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
                <button
                  onClick={() => handleDelete(selectedApplication.id)}
                  className="px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Application</span>
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplyJob;
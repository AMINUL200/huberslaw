import React, { useState, useEffect } from "react";
import {
  Mail,
  User,
  Phone,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Search,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { api } from "../../../utils/app";

const HandleContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);

  // Fetch contacts data
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contacts");

      if (response.data.status) {
        setContacts(response.data.data);
      } else {
        console.error("Failed to load contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update contact status
  const updateStatus = async (contactId, newStatus) => {
    try {
      const response = await api.post(`/contacts/status/${contactId}`, {
        status: newStatus,
      });

      if (response.data.status) {
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === contactId
              ? {
                  ...contact,
                  status: newStatus,
                  updated_at: new Date().toISOString(),
                }
              : contact
          )
        );

        if (selectedContact?.id === contactId) {
          setSelectedContact((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts based on status and search
  const filteredContacts = contacts.filter((contact) => {
    const matchesFilter = filter === "all" || contact.status === filter;
    const matchesSearch =
      contact.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organisation?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = filteredContacts.slice(startIndex, endIndex);

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: {
        color: "bg-blue-100 text-blue-800",
        icon: <Clock className="w-3 h-3" />,
      },
      closed: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-3 h-3" />,
      },
    };

    const config = statusConfig[status] || statusConfig.new;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        <span className="ml-1 capitalize">{status}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openContactDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    setMobileMenuOpen(null);
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Organisation",
      "Service",
      "Preferred Lawyer",
      "Status",
      "Date",
    ];
    const csvData = filteredContacts.map((contact) => [
      contact.full_name,
      contact.email,
      contact.phone_no,
      contact.organisation,
      contact.service_name,
      contact.preferred_lawyer,
      contact.status,
      formatDate(contact.created_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((field) => `"${field}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Contact List Item Component (for all screen sizes)
  const ContactListItem = ({ contact }) => (
    <div className="bg-white rounded-lg shadow p-4 border border-[#E8EEF4] hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        {/* Left Section: Contact Info */}
        <div className="flex-1 mb-4 md:mb-0 md:pr-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 h-10 w-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#CBA054]" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                <h3 className="text-sm font-medium text-[#0A1A2F]">
                  {contact.full_name}
                </h3>
                <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                  {getStatusBadge(contact.status)}
                  <span className="text-xs text-gray-500 hidden sm:inline">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600 truncate">{contact.email}</span>
                </div>
                {contact.phone_no && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{contact.phone_no}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Building className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600 truncate">
                    {contact.organisation || "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Service Info & Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center justify-between md:space-y-2 lg:space-y-0 lg:space-x-4">
          <div className="mb-3 sm:mb-0 md:mb-2 lg:mb-0">
            <div className="text-sm font-medium text-[#0A1A2F]">
              {contact.service_name}
            </div>
            <div className="text-xs text-gray-500">
              Lawyer: {contact.preferred_lawyer}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button
              onClick={() => openContactDetails(contact)}
              className="p-2 text-[#0A1A2F] hover:text-[#CBA054] hover:bg-gray-50 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            {contact.status === "new" && (
              <button
                onClick={() => updateStatus(contact.id, "closed")}
                className="p-2 text-[#0A1A2F] hover:text-[#CBA054] hover:bg-gray-50 rounded-lg transition-colors"
                title="Mark as Closed"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
            {contact.status === "closed" && (
              <button
                onClick={() => updateStatus(contact.id, "new")}
                className="p-2 text-[#0A1A2F] hover:text-[#CBA054] hover:bg-gray-50 rounded-lg transition-colors"
                title="Reopen"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-only date */}
      <div className="mt-3 pt-3 border-t border-gray-100 md:hidden">
        <div className="text-xs text-gray-500">
          Submitted: {formatDate(contact.created_at)}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen px-4 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1A2F]">
                Contact Form Submissions
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage and review all contact form submissions from your website
              </p>
            </div>
            <div className="flex items-center justify-end space-x-2 sm:space-x-3">
              <button
                onClick={exportToCSV}
                className="flex items-center px-3 sm:px-4 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors text-sm"
                title="Export to CSV"
              >
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              <button
                onClick={fetchContacts}
                className="flex items-center px-3 sm:px-4 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors text-sm"
                title="Refresh Data"
              >
                <RefreshCw className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-2 bg-[#F4EEDC] rounded-lg">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
                  {contacts.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-2 bg-[#F4EEDC] rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  New
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
                  {contacts.filter((c) => c.status === "new").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-2 bg-[#F4EEDC] rounded-lg">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Closed
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
                  {contacts.filter((c) => c.status === "closed").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-2 bg-[#F4EEDC] rounded-lg">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Today
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#0A1A2F]">
                  {
                    contacts.filter(
                      (c) =>
                        new Date(c.created_at).toDateString() ===
                        new Date().toDateString()
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search - Responsive */}
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 p-4 border border-[#E8EEF4]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-[#0A1A2F]" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-[#CBA054] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CBA054]/20 text-[#0A1A2F] text-sm w-full sm:w-auto"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex-1 sm:w-64 lg:w-80">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, service, or organisation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#E8EEF4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CBA054]/20 text-[#0A1A2F] placeholder-gray-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="text-sm text-[#0A1A2F] text-center lg:text-right">
              Showing {filteredContacts.length} of {contacts.length} submissions
            </div>
          </div>
        </div>

        {/* Items Per Page and Pagination Controls - Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#0A1A2F]">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
              className="border border-[#CBA054] rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#CBA054]/20 text-[#0A1A2F]"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm text-[#0A1A2F]">entries per page</span>
          </div>

          <div className="text-sm text-[#0A1A2F]">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredContacts.length)} of{" "}
            {filteredContacts.length} entries
          </div>
        </div>

        {/* Contact List for All Screen Sizes */}
        <div className="space-y-3">
          {currentContacts.map((contact) => (
            <ContactListItem key={contact.id} contact={contact} />
          ))}
          
          {currentContacts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow border border-[#E8EEF4]">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No contact submissions found
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your search or filter"
                  : "All contact form submissions will appear here"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls - Bottom */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="text-sm text-[#0A1A2F]">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredContacts.length)} of{" "}
              {filteredContacts.length} entries
            </div>

            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border ${
                  currentPage === 1
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-[#CBA054] text-[#0A1A2F] hover:bg-[#CBA054] hover:text-white transition-colors"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? "bg-[#CBA054] text-white"
                      : "text-[#0A1A2F] hover:bg-[#F4EEDC] border border-[#E8EEF4] transition-colors"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border ${
                  currentPage === totalPages
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-[#CBA054] text-[#0A1A2F] hover:bg-[#CBA054] hover:text-white transition-colors"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Contact Details Modal */}
        {showModal && selectedContact && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8EEF4]">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0A1A2F]">
                      {selectedContact.full_name}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                      {getStatusBadge(selectedContact.status)}
                      <span className="text-sm text-gray-500">
                        Submitted {formatDate(selectedContact.created_at)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-[#CBA054]" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Email
                        </p>
                        <p className="text-[#0A1A2F] break-all">
                          {selectedContact.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-[#CBA054]" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Phone
                        </p>
                        <p className="text-[#0A1A2F]">
                          {selectedContact.phone_no}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-[#CBA054]" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Organisation
                        </p>
                        <p className="text-[#0A1A2F]">
                          {selectedContact.organisation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Service Needed
                      </p>
                      <p className="text-[#0A1A2F] font-medium">
                        {selectedContact.service_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Preferred Lawyer
                      </p>
                      <p className="text-[#0A1A2F]">
                        {selectedContact.preferred_lawyer}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Message
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 border border-[#E8EEF4]">
                    <p className="text-[#0A1A2F] whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-[#E8EEF4]">
                  {selectedContact.status === "new" ? (
                    <button
                      onClick={() => {
                        updateStatus(selectedContact.id, "closed");
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Closed
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateStatus(selectedContact.id, "new");
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors flex items-center justify-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reopen
                    </button>
                  )}
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-[#CBA054] text-[#0A1A2F] rounded-lg hover:bg-[#F4EEDC] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleContactUs;
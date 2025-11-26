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
  ChevronDown,
  MoreVertical,
  MapPin,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { api } from "../../../utils/app";

const HandleBookingAppointment = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);

  // Fetch bookings data
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/booking");

      if (response.data.status) {
        setBookings(response.data.data);
      } else {
        console.error("Failed to load bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const updateStatus = async (bookingId, newStatus) => {
    try {
      const response = await api.post(`/bookings/status/${bookingId}`, {
        status: newStatus,
      });

      if (response.data.status) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === bookingId
              ? {
                  ...booking,
                  status: newStatus,
                  updated_at: new Date().toISOString(),
                }
              : booking
          )
        );

        if (selectedBooking?.id === bookingId) {
          setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Update is_view status
  const updateViewStatus = async (bookingId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'closed' ? 'new' : 'closed';
      
      const response = await api.post(`booking/mark-read/${bookingId}`);

      if (response.data.status) {
        fetchBookings();
      }
    } catch (err) {
      console.error('Error updating view status:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings based on status and search
  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === "all" || booking.status === filter;
    const matchesSearch =
      booking.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.organisation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.preferred_lawyer?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: {
        color: "bg-blue-100 text-blue-800",
        icon: <Clock className="w-3 h-3" />,
      },
      accepted: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-3 h-3" />,
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-3 h-3" />,
      },
      rescheduled: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <RefreshCw className="w-3 h-3" />,
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

  const getViewStatusBadge = (is_view) => {
    const viewConfig = {
      new: {
        color: "bg-red-100 text-red-800",
        text: "New",
        dot: "bg-red-500"
      },
      read: {
        color: "bg-green-100 text-green-800",
        text: "Read",
        dot: "bg-green-500"
      },
      closed: {
        color: "bg-gray-100 text-gray-800",
        text: "Closed",
        dot: "bg-gray-500"
      },
    };

    const config = viewConfig[is_view] || viewConfig.new;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <span className={`w-2 h-2 rounded-full ${config.dot} mr-1`}></span>
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openBookingDetails = (booking) => {
    setSelectedBooking(booking);
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
      "Appointment Date",
      "Appointment Time",
      "Status",
      "View Status",
      "Created Date",
    ];
    const csvData = filteredBookings.map((booking) => [
      booking.full_name,
      booking.email,
      booking.phone_no,
      booking.organisation,
      booking.service_name,
      booking.preferred_lawyer,
      formatDate(booking.date),
      formatTime(booking.time),
      booking.status,
      booking.is_view,
      formatDateTime(booking.created_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((field) => `"${field}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `booking-appointments-${
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

  // Mobile booking card component
  const MobileBookingCard = ({ booking }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-[#E8EEF4]">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-10 w-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[#CBA054]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#0A1A2F]">
              {booking.full_name}
            </div>
            <div className="text-xs text-gray-500">{booking.email}</div>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setMobileMenuOpen(mobileMenuOpen === booking.id ? null : booking.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          {mobileMenuOpen === booking.id && (
            <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg border border-gray-200 z-10 min-w-[120px]">
              <button
                onClick={() => openBookingDetails(booking)}
                className="w-full text-left px-3 py-2 text-sm text-[#0A1A2F] hover:bg-gray-50 flex items-center space-x-2"
              >
                <Eye className="w-3 h-3" />
                <span>View</span>
              </button>
              <button
                onClick={() => updateViewStatus(booking.id, booking.is_view)}
                className="w-full text-left px-3 py-2 text-sm text-[#0A1A2F] hover:bg-gray-50 flex items-center space-x-2"
              >
                {booking.is_view === "closed" ? (
                  <>
                    <RefreshCw className="w-3 h-3" />
                    <span>Reopen</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    <span>Close</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Service:</span>
          <span className="text-[#0A1A2F] font-medium">{booking.service_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Lawyer:</span>
          <span className="text-[#0A1A2F]">{booking.preferred_lawyer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Date:</span>
          <span className="text-[#0A1A2F]">{formatDate(booking.date)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Time:</span>
          <span className="text-[#0A1A2F]">{formatTime(booking.time)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <div>{getStatusBadge(booking.status)}</div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">View Status:</span>
          <div>{getViewStatusBadge(booking.is_view)}</div>
        </div>
        {booking.organisation && (
          <div className="flex justify-between">
            <span className="text-gray-500">Organisation:</span>
            <span className="text-[#0A1A2F]">{booking.organisation}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen px-4 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1A2F]">
                Booking Appointments
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage and review all booking appointments from your website
              </p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={exportToCSV}
                className="flex items-center px-3 sm:px-4 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors text-sm sm:text-base"
              >
                <Download className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </button>
              <button
                onClick={fetchBookings}
                className="flex items-center px-3 sm:px-4 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors text-sm sm:text-base"
              >
                <RefreshCw className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Refresh</span>
                <span className="sm:hidden">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-1 sm:p-2 bg-[#F4EEDC] rounded-lg">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#CBA054]" />
              </div>
              <div className="ml-2 sm:ml-3 md:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A1A2F]">
                  {bookings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-1 sm:p-2 bg-[#F4EEDC] rounded-lg">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#CBA054]" />
              </div>
              <div className="ml-2 sm:ml-3 md:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A1A2F]">
                  {bookings.filter((b) => b.status === "accepted").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-1 sm:p-2 bg-[#F4EEDC] rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#CBA054]" />
              </div>
              <div className="ml-2 sm:ml-3 md:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">New</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A1A2F]">
                  {bookings.filter((b) => b.status === "new").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6 border border-[#E8EEF4]">
            <div className="flex items-center">
              <div className="p-1 sm:p-2 bg-[#F4EEDC] rounded-lg">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#CBA054]" />
              </div>
              <div className="ml-2 sm:ml-3 md:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A1A2F]">
                  {bookings.filter((b) => b.status === "cancelled").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 p-3 sm:p-4 border border-[#E8EEF4]">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-[#0A1A2F]" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-[#CBA054] rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#CBA054]/20 text-[#0A1A2F] text-sm w-full sm:w-auto"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="accepted">Accepted</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 border border-[#E8EEF4]">
                <Search className="w-4 h-4 text-[#0A1A2F]" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-[#0A1A2F] placeholder-gray-500 text-sm w-full"
                />
              </div>
            </div>

            <div className="text-sm text-[#0A1A2F] text-center sm:text-left">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </div>
          </div>
        </div>

        {/* Items Per Page and Pagination Controls - Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#0A1A2F]">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
              className="border border-[#CBA054] rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#CBA054]/20 text-[#0A1A2F]"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm text-[#0A1A2F]">entries</span>
          </div>

          <div className="text-sm text-[#0A1A2F]">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredBookings.length)} of{" "}
            {filteredBookings.length} entries
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow overflow-x-auto border border-[#E8EEF4]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#0A1A2F] uppercase tracking-wider">
                    Client Details
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#0A1A2F] uppercase tracking-wider">
                    Service & Lawyer
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#0A1A2F] uppercase tracking-wider">
                    Appointment
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#0A1A2F] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#0A1A2F] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-medium text-[#0A1A2F]">
                            {booking.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.phone_no}
                          </div>
                          {booking.organisation && (
                            <div className="text-xs text-gray-500">
                              {booking.organisation}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#0A1A2F]">
                        {booking.service_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.preferred_lawyer}
                      </div>
                      {booking.message && (
                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                          "{booking.message}"
                        </div>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#0A1A2F]">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(booking.time)}</span>
                        </div>
                        {booking.reschedule_date && (
                          <>
                            <div className="text-xs text-yellow-600 mt-1">
                              Rescheduled: {formatDate(booking.reschedule_date)}
                            </div>
                            <div className="text-xs text-yellow-600">
                              {formatTime(booking.reschedule_time)}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getStatusBadge(booking.status)}
                        <div className="text-xs">
                          {getViewStatusBadge(booking.is_view)}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => openBookingDetails(booking)}
                        className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateViewStatus(booking.id, booking.is_view)}
                        className="text-[#0A1A2F] hover:text-[#CBA054] ml-2 transition-colors"
                        title={booking.is_view === "closed" ? "Reopen" : "Mark as Closed"}
                      >
                        {booking.is_view === "closed" ? (
                          <RefreshCw className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {currentBookings.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-500 text-base sm:text-lg">
                No booking appointments found
              </p>
              <p className="text-gray-400 text-sm mt-1 sm:mt-2">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your search or filter"
                  : "All booking appointments will appear here"}
              </p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {currentBookings.map((booking) => (
            <MobileBookingCard key={booking.id} booking={booking} />
          ))}
          {currentBookings.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow border border-[#E8EEF4]">
              <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No booking appointments found</p>
              <p className="text-gray-400 text-sm mt-1">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your search or filter"
                  : "All booking appointments will appear here"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls - Bottom */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 space-y-3 sm:space-y-0">
            <div className="text-sm text-[#0A1A2F] text-center sm:text-left">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredBookings.length)} of{" "}
              {filteredBookings.length} entries
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Previous Button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`p-1 sm:p-2 rounded-lg border ${
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
                  className={`px-2 sm:px-3 py-1 rounded-lg text-sm font-medium ${
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
                className={`p-1 sm:p-2 rounded-lg border ${
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

        {/* Booking Details Modal */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8EEF4]">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0A1A2F]">
                      {selectedBooking.full_name}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1 sm:mt-2">
                      {getStatusBadge(selectedBooking.status)}
                      {getViewStatusBadge(selectedBooking.is_view)}
                      <span className="text-sm text-gray-500">
                        Submitted {formatDateTime(selectedBooking.created_at)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
                  >
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Email
                        </p>
                        <p className="text-[#0A1A2F] break-all">
                          {selectedBooking.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Phone
                        </p>
                        <p className="text-[#0A1A2F]">
                          {selectedBooking.phone_no}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-[#CBA054]" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Organisation
                        </p>
                        <p className="text-[#0A1A2F]">
                          {selectedBooking.organisation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Service Needed
                      </p>
                      <p className="text-[#0A1A2F] font-medium">
                        {selectedBooking.service_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Preferred Lawyer
                      </p>
                      <p className="text-[#0A1A2F]">
                        {selectedBooking.preferred_lawyer}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Appointment Date
                        </p>
                        <p className="text-[#0A1A2F]">
                          {formatDate(selectedBooking.date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Appointment Time
                        </p>
                        <p className="text-[#0A1A2F]">
                          {formatTime(selectedBooking.time)}
                        </p>
                      </div>
                    </div>

                    {selectedBooking.reschedule_date && (
                      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                        <p className="text-sm font-medium text-yellow-800 mb-1">
                          Rescheduled Appointment
                        </p>
                        <p className="text-yellow-700 text-sm">
                          {formatDate(selectedBooking.reschedule_date)} at{" "}
                          {formatTime(selectedBooking.reschedule_time)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedBooking.message && (
                  <div className="mb-4 sm:mb-6">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Message
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-[#E8EEF4]">
                      <p className="text-[#0A1A2F] whitespace-pre-wrap text-sm sm:text-base">
                        {selectedBooking.message}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-[#E8EEF4]">
                  <button
                    onClick={() => {
                      updateViewStatus(selectedBooking.id, selectedBooking.is_view);
                      setShowModal(false);
                    }}
                    className="px-3 sm:px-4 py-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors flex items-center justify-center text-sm sm:text-base"
                  >
                    {selectedBooking.is_view === "closed" ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-1 sm:mr-2" />
                        Reopen
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1 sm:mr-2" />
                        Mark as Closed
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-3 sm:px-4 py-2 border border-[#CBA054] text-[#0A1A2F] rounded-lg hover:bg-[#F4EEDC] transition-colors text-sm sm:text-base"
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

export default HandleBookingAppointment;
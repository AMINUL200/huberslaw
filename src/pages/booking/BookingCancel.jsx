import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Home,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  FileText,
  ArrowLeft,
  Award,
  XCircle,
  RefreshCw,
  LecternIcon,
} from "lucide-react";
import { api } from "../../utils/app";
import { toast } from "react-toastify";

const BookingCancel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/booking/cancel/${id}`);

        if (response.data.status) {
          setAppointment(response.data.data);
          setMessage(response.data.message);
        } else {
          setError(
            response.data.message || "Failed to fetch appointment details"
          );
          toast.error(
            response.data.message || "Failed to fetch appointment details"
          );
        }
      } catch (err) {
        console.error("Error fetching appointment:", err);
        setError("An error occurred while fetching appointment details");
        toast.error("An error occurred while fetching appointment details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAppointmentDetails();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Get status configuration based on appointment status
  const getStatusConfig = () => {
    if (!appointment) return null;

    switch (appointment.status) {
      case "accepted":
        return {
          icon: CheckCircle,
          iconColor: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-100",
          headerBg: "from-green-500 to-green-600",
          title: "Appointment Accepted!",
          subtitle: "Your consultation has been confirmed successfully",
          message: message,
        };
      case "cancelled":
        return {
          icon: XCircle,
          iconColor: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-100",
          headerBg: "from-red-500 to-red-600",
          title: "Appointment Cancelled",
          subtitle: "Your appointment has been cancelled",
          message: message,
        };
      case "rescheduled":
        return {
          icon: RefreshCw,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-100",
          borderColor: "border-blue-100",
          headerBg: "from-blue-500 to-blue-600",
          title: "Appointment Rescheduled!",
          subtitle: "Your appointment has been rescheduled",
          message: message,
        };
      default:
        return {
          icon: CheckCircle,
          iconColor: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-100",
          headerBg: "from-[#0A1A2F] to-[#1E354F]",
          title: "Appointment Confirmed!",
          subtitle: "Your consultation has been scheduled successfully",
          message: message,
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#CBA054] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F] text-lg font-semibold">
            Loading appointment details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#0A1A2F] mb-2">
            Appointment Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The requested appointment could not be found."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-[#0A1A2F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E8EEF4]">
      {/* Header */}
      <div className={`bg-gradient-to-r ${statusConfig.headerBg} text-white`}>
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-[#CBA054] hover:text-white transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-300">
              {appointment.status === "cancelled"
                ? "Appointment Cancelled"
                : appointment.status === "rescheduled"
                ? "Appointment Rescheduled"
                : "Appointment Confirmed"}
            </span>
          </nav>

          {/* Main Header */}
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 text-[#CBA054] hover:text-white transition-colors duration-200 mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
              <h1 className="text-4xl font-bold mb-2">{statusConfig.title}</h1>
              <p className="text-[#E8EEF4] text-lg">{statusConfig.subtitle}</p>
            </div>
            <div className="text-right">
              <div
                className={`w-20 h-20 ${statusConfig.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}
              >
                <StatusIcon className={`w-10 h-10 ${statusConfig.iconColor}`} />
              </div>
              <p
                className={`font-semibold capitalize ${
                  appointment.status === "accepted"
                    ? "text-green-400"
                    : appointment.status === "cancelled"
                    ? "text-red-400"
                    : appointment.status === "rescheduled"
                    ? "text-blue-400"
                    : "text-green-400"
                }`}
              >
                {appointment.status || "Confirmed"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status Card */}
          <div
            className={`bg-white rounded-2xl shadow-xl border ${statusConfig.borderColor} p-6`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 ${statusConfig.bgColor} rounded-full flex items-center justify-center`}
              >
                <StatusIcon className={`w-6 h-6 ${statusConfig.iconColor}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0A1A2F] capitalize">
                  {appointment.status === "accepted"
                    ? "Appointment Accepted"
                    : appointment.status === "cancelled"
                    ? "Appointment Cancelled"
                    : appointment.status === "rescheduled"
                    ? "Appointment Rescheduled"
                    : "Appointment Confirmed"}
                </h2>
                <p className="text-gray-600">{statusConfig.message}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
            <h3 className="text-xl font-bold text-[#0A1A2F] mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#CBA054]" />
              Appointment Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original Date & Time */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg">
                  <div className="w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#CBA054]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">
                      Appointment Date
                    </div>
                    <div className="font-semibold text-[#0A1A2F]">
                      {formatDate(appointment.date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg">
                  <div className="w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#CBA054]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">
                      Appointment Time
                    </div>
                    <div className="font-semibold text-[#0A1A2F]">
                      {formatTime(appointment.time)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rescheduled Date & Time or Service & Lawyer */}
              <div className="space-y-4">
                {/* Show rescheduled date/time if available */}
                {appointment.reschedule_date && (
                  <>
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-600 font-medium">
                          Rescheduled Date
                        </div>
                        <div className="font-semibold text-[#0A1A2F]">
                          {formatDate(appointment.reschedule_date)}
                        </div>
                      </div>
                    </div>

                    {appointment.reschedule_time && (
                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-blue-600 font-medium">
                            Rescheduled Time
                          </div>
                          <div className="font-semibold text-[#0A1A2F]">
                            {formatTime(appointment.reschedule_time)}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Show service and lawyer if no rescheduled date */}
                {!appointment.reschedule_date && (
                  <>
                    <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg">
                      <div className="w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#CBA054]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Service Type
                        </div>
                        <div className="font-semibold text-[#0A1A2F]">
                          {appointment.service_name || "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg">
                      <div className="w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#CBA054]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Assigned Lawyer
                        </div>
                        <div className="font-semibold text-[#0A1A2F]">
                          {appointment.preferred_lawyer || "To be assigned"}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Show service and lawyer below if rescheduled date is shown */}
            {appointment.reschedule_date && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg">
                    <div className="w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#CBA054]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Service Type</div>
                      <div className="font-semibold text-[#0A1A2F]">
                        {appointment.service_name || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg">
                    <div className="w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-[#CBA054]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Assigned Lawyer
                      </div>
                      <div className="font-semibold text-[#0A1A2F]">
                        {appointment.preferred_lawyer || "To be assigned"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Client Information Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
            <h3 className="text-xl font-bold text-[#0A1A2F] mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-[#CBA054]" />
              Client Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-[#CBA054]" />
                  <div>
                    <div className="text-sm text-gray-500">Full Name</div>
                    <div className="font-semibold text-[#0A1A2F]">
                      {appointment.full_name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#CBA054]" />
                  <div>
                    <div className="text-sm text-gray-500">Email Address</div>
                    <div className="font-semibold text-[#0A1A2F]">
                      {appointment.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#CBA054]" />
                  <div>
                    <div className="text-sm text-gray-500">Phone Number</div>
                    <div className="font-semibold text-[#0A1A2F]">
                      {appointment.phone_no}
                    </div>
                  </div>
                </div>

                {appointment.organisation && (
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-[#CBA054]" />
                    <div>
                      <div className="text-sm text-gray-500">Organization</div>
                      <div className="font-semibold text-[#0A1A2F]">
                        {appointment.organisation}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Card */}
          {appointment.message && (
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
              <h3 className="text-xl font-bold text-[#0A1A2F] mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#CBA054]" />
                Case Details
              </h3>
              <div className="bg-[#F8F9FA] rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {appointment.message}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center space-x-2 bg-[#0A1A2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Go to Homepage</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCancel;

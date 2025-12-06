// components/booking/BookingConfirmation.jsx
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  Briefcase,
  Loader2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./BookingConfirmation.css"; // We'll create this for animations

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [confettiActive, setConfettiActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  // Format date to readable format
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

  // Format time to AM/PM format
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";

    // If time is in 24-hour format (e.g., "18:10")
    if (timeString.includes(":")) {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    }

    // If already in AM/PM format
    return timeString;
  };

  // Get booking duration based on service (you can customize this)
  const getDuration = (serviceName) => {
    const durations = {
      "Civil Litigation": "60 minutes",
      "Corporate Law": "45 minutes",
      "Family Law": "60 minutes",
      "Criminal Defense": "90 minutes",
      "Real Estate": "45 minutes",
    };
    return durations[serviceName] || "60 minutes";
  };

  useEffect(() => {
    // Simulate API call or data processing
    const loadBookingData = () => {
      setIsLoading(true);

      // Simulate network delay
      setTimeout(() => {
        // Try to get data from location state or local storage
        let data = location.state?.bookingData;

        if (!data) {
          // Check if data was passed via navigation state
          const navigationState = history.state;
          if (navigationState?.bookingData) {
            data = navigationState.bookingData;
          } else {
            // Try to get from session storage (fallback)
            const storedData = sessionStorage.getItem("latestBooking");
            if (storedData) {
              data = JSON.parse(storedData);
            }
          }
        }

        // If still no data, use sample data (for demo purposes)
        if (!data) {
          data = getSampleData();
        } else {
          // Store in session storage for persistence
          sessionStorage.setItem("latestBooking", JSON.stringify(data));
        }

        setBookingData(data);
        setIsLoading(false);
        setIsVisible(true);
      }, 1000); // Simulate 1 second loading
    };

    loadBookingData();

    // Auto-hide confetti after 3 seconds
    const confettiTimer = setTimeout(() => {
      setConfettiActive(false);
    }, 3000);

    return () => {
      clearTimeout(confettiTimer);
    };
  }, [location]);

  function getSampleData() {
    return {
      bookingId: `HUBRES-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      time: new Date().getHours() + ":00",
      full_name: "Sample User",
      email: "sample@example.com",
      phone_no: "+91 98765 43210",
      service_name: "General Consultation",
      preferred_lawyer: "Available Lawyer",
      organisation: "Sample Org",
      message: "Sample message",
    };
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center shadow-2xl">
              <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Loading Your Booking Details
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch your information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti Effect */}
      {confettiActive && (
        <div className="confetti-container">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor:
                  i % 3 === 0 ? "#CBA054" : i % 3 === 1 ? "#0A1A2F" : "#10b981",
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          {/* Animated Success Card */}
          <div
            className={`w-full max-w-4xl transform transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Floating Success Icon */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center shadow-2xl animate-float">
                <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping-slow"></div>
                <CheckCircle className="h-16 w-16 text-green-600 animate-scale-in" />
              </div>

              {/* Orbiting Elements */}
              <div className="absolute top-12 left-1/2 w-full h-full">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-[#CBA054] rounded-full animate-orbit"
                    style={{
                      "--orbit-delay": `${i * 0.5}s`,
                      "--orbit-size": "80px",
                      animationDelay: `${i * 0.5}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Title with Gradient */}
            <div
              className={`text-center mb-6 transform transition-all duration-700 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-4xl pb-2 font-bold bg-gradient-to-r from-[#0A1A2F] via-[#1a2c4d] to-[#CBA054] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Booking Confirmed!
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#CBA054] to-emerald-500 mx-auto mt-4 rounded-full animate-width"></div>
            </div>

            {/* Description */}
            <div
              className={`text-center mb-8 transform transition-all duration-700 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                Your consultation has been successfully scheduled. Confirmation
                details have been sent to{" "}
                <span className="font-semibold text-[#0A1A2F]">
                  {bookingData.email}
                </span>
                .
              </p>
            </div>

            {/* Details Card */}
            <div
              className={`mb-10 transform transition-all duration-700 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0A1A2F] to-[#1a2c4d] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 backdrop-blur-sm bg-white/90">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Appointment Details */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-[#0A1A2F] mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Appointment Details
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="text-gray-600 font-medium">
                              Date
                            </span>
                          </div>
                          <span className="font-bold text-[#0A1A2F] text-lg text-right">
                            {formatDate(bookingData.date)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                              <Clock className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="text-gray-600 font-medium">
                              Time
                            </span>
                          </div>
                          <span className="font-bold text-[#0A1A2F] text-lg text-right">
                            {formatTime(bookingData.time)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                              <Phone className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="text-gray-600 font-medium">
                              Phone{" "}
                            </span>
                          </div>
                          <span className="font-bold text-[#0A1A2F] text-lg text-right">
                            {bookingData.phone_no}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Personal & Service Details */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-[#0A1A2F] mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Your Information
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                              <User className="h-5 w-5 text-amber-600" />
                            </div>
                            <span className="text-gray-600 font-medium">
                              Name
                            </span>
                          </div>
                          <span className="font-bold text-[#0A1A2F] text-lg text-right">
                            {bookingData.full_name}
                          </span>
                        </div>

                        <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                              <Mail className="h-5 w-5 text-red-600" />
                            </div>
                            <span className="text-gray-600 font-medium">
                              Email
                            </span>
                          </div>
                          <span className="font-bold text-[#0A1A2F] text-lg text-right break-all">
                            {bookingData.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Details Row */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <Briefcase className="h-5 w-5 text-indigo-600" />
                          </div>
                          <span className="text-gray-600 font-medium">
                            Service
                          </span>
                        </div>
                        <span className="font-bold text-[#0A1A2F] text-lg text-right">
                          {bookingData.service_name}
                        </span>
                      </div>

                      <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <User className="h-5 w-5 text-green-600" />
                          </div>
                          <span className="text-gray-600 font-medium">
                            Preferred Lawyer
                          </span>
                        </div>
                        <span className="font-bold text-[#0A1A2F] text-lg text-right">
                          {bookingData.preferred_lawyer || "Not specified"}
                        </span>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    {(bookingData.message || bookingData.organisation) && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-semibold text-[#0A1A2F] mb-4">
                          Additional Information
                        </h4>
                        <div className="bg-gray-50 rounded-xl p-4">
                          {bookingData.organisation && (
                            <p className="text-gray-700 mb-2">
                              <span className="font-medium">Organization:</span>{" "}
                              {bookingData.organisation}
                            </p>
                          )}
                          {bookingData.message && (
                            <p className="text-gray-700">
                              <span className="font-medium">Message:</span>{" "}
                              {bookingData.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-900 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Link
                to="/"
                className="group relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#0A1A2F] to-[#1a2c4d] rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#CBA054] to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center space-x-3">
                  <span>Back to Home</span>
                  <ArrowRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </Link>

              <button
                onClick={() => window.print()}
                className="group relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-[#0A1A2F] bg-white border-2 border-[#0A1A2F] rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <span className="relative flex items-center justify-center space-x-3">
                  <span>Print Confirmation</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 2 0 002 2h2m2 4h6a2 2 2 0 002-2v-4a2 2 2 0 00-2-2H9a2 2 2 0 00-2 2v4a2 2 2 0 002 2zm8-12V5a2 2 2 0 00-2-2H9a2 2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Home, 
  User, 
  Phone, 
  Mail, 
  Building, 
  FileText, 
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { api } from '../../utils/app';
import { toast } from 'react-toastify';

const BookingReschedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [rescheduleData, setRescheduleData] = useState({
    reschedule_date: '',
    reschedule_time: ''
  });

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/booking/reschedule/${id}`);
        
        if (response.data.status) {
          setAppointment(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch appointment details');
          toast.error(response.data.message || 'Failed to fetch appointment details');
        }
      } catch (err) {
        console.error('Error fetching appointment:', err);
        setError('An error occurred while fetching appointment details');
        toast.error('An error occurred while fetching appointment details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAppointmentDetails();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Get tomorrow's date for min date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get date 3 months from now for max date
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRescheduleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!rescheduleData.reschedule_date || !rescheduleData.reschedule_time) {
      toast.error('Please select both date and time for rescheduling');
      return;
    }

    // Validate that date is not in the past
    const selectedDate = new Date(rescheduleData.reschedule_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error('Please select a future date for rescheduling');
      return;
    }

    // Validate time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(rescheduleData.reschedule_time)) {
      toast.error('Please enter a valid time in HH:MM format (e.g., 14:30 or 09:00)');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        reschedule_date: rescheduleData.reschedule_date,
        reschedule_time: rescheduleData.reschedule_time
      };

      const response = await api.post(`/booking/reschedule/${id}`, payload);

      if (response.data.status) {
        toast.success(response.data.message || 'Appointment rescheduled successfully!');
        // Redirect to confirmation page or home
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(response.data.message || 'Failed to reschedule appointment');
      }
    } catch (err) {
      console.error('Error rescheduling appointment:', err);
      toast.error('An error occurred while rescheduling your appointment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#CBA054] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F] text-lg font-semibold">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#0A1A2F] mb-2">Appointment Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested appointment could not be found.'}</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E8EEF4]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] text-white">
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
            <span className="text-gray-300">Reschedule Appointment</span>
          </nav>

          {/* Main Header */}
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-[#CBA054] hover:text-white transition-colors duration-200 mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
              <h1 className="text-4xl font-bold mb-2">Reschedule Appointment</h1>
              <p className="text-[#E8EEF4] text-lg">
                Choose a new date and time for your consultation
              </p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-[#CBA054] rounded-full flex items-center justify-center mx-auto mb-2">
                <RefreshCw className="w-10 h-10 text-white" />
              </div>
              <p className="text-[#CBA054] font-semibold">Reschedule</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Reschedule Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-[#CBA054]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0A1A2F]">Select New Appointment Time</h2>
                <p className="text-gray-600">
                  Choose your preferred date and time for the rescheduled consultation
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reschedule Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* New Date Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-[#CBA054]" />
                    New Preferred Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="reschedule_date"
                      value={rescheduleData.reschedule_date}
                      onChange={handleInputChange}
                      required
                      min={getTomorrowDate()}
                      max={getMaxDate()}
                      className="w-full px-4 py-3 pl-10 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] duration-300 border border-[#E8EEF4] transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {rescheduleData.reschedule_date && (
                    <p className="text-xs text-green-600 mt-1">
                      Selected: {formatDate(rescheduleData.reschedule_date)}
                    </p>
                  )}
                </div>

                {/* New Time Field */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1A2F] mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-[#CBA054]" />
                    New Preferred Time *
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      name="reschedule_time"
                      value={rescheduleData.reschedule_time}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 14:30 or 09:00"
                      className="w-full px-4 py-3 pl-10 rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] duration-300 border border-[#E8EEF4] transition-all shadow-sm hover:shadow-md focus:shadow-lg"
                    />
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter time in 24-hour format (HH:MM)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex-1 bg-[#0A1A2F] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    submitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#CBA054] hover:scale-105'
                  }`}
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Rescheduling...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirm Reschedule</span>
                    </>
                  )}
                </button>

                <Link
                  to="/"
                  className="flex-1 border-2 border-[#0A1A2F] text-[#0A1A2F] py-3 px-6 rounded-lg font-semibold hover:bg-[#0A1A2F] hover:text-white transition-all duration-300 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          {/* Original Appointment Details Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
            <h3 className="text-xl font-bold text-[#0A1A2F] mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#CBA054]" />
              Original Appointment Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date & Time */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Original Date</div>
                    <div className="font-semibold text-[#0A1A2F]">
                      {formatDate(appointment.date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg border border-gray-200">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Original Time</div>
                    <div className="font-semibold text-[#0A1A2F]">
                      {formatTime(appointment.time)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service & Lawyer */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg">
                  <div className="w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#CBA054]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Service Type</div>
                    <div className="font-semibold text-[#0A1A2F]">
                      {appointment.service_name || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg">
                  <div className="w-10 h-10 bg-[#F4EEDC] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#CBA054]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Assigned Lawyer</div>
                    <div className="font-semibold text-[#0A1A2F]">
                      {appointment.preferred_lawyer || 'To be assigned'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default BookingReschedule;
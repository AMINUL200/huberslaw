import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  XCircle, 
  Home, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Building, 
  FileText, 
  ArrowLeft,
  RefreshCw,
  Calendar as CalendarIcon
} from 'lucide-react';
import { api } from '../../utils/app';
import { toast } from 'react-toastify';

const BookingCancel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rescheduleLoading, setRescheduleLoading] = useState(false);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/booking/cancel/${id}`);
        
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

  const handleReschedule = async () => {
    try {
      setRescheduleLoading(true);
      toast.info('Redirecting to rescheduling page...');
      setTimeout(() => {
        navigate('/book-appointment');
      }, 1000);
    } catch (err) {
      console.error('Error initiating reschedule:', err);
      toast.error('Failed to initiate rescheduling');
    } finally {
      setRescheduleLoading(false);
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
            <XCircle className="w-10 h-10 text-red-500" />
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
            <span className="text-gray-300">Appointment Cancelled</span>
          </nav>

          {/* Main Header */}
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-[#CBA054] hover:text-white transition-colors duration-200 mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
              <h1 className="text-4xl font-bold mb-2">Appointment Cancelled</h1>
              <p className="text-[#E8EEF4] text-lg">
                Your consultation has been cancelled as requested
              </p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              <p className="text-red-400 font-semibold">Cancelled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Cancellation Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0A1A2F]">Appointment Cancelled</h2>
                <p className="text-gray-600">
                  Your appointment has been successfully cancelled. We're sorry to see you go.
                </p>
              </div>
            </div>
          </div>

          {/* Cancelled Appointment Details Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
            <h3 className="text-xl font-bold text-[#0A1A2F] mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#CBA054]" />
              Cancelled Appointment Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date & Time */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg border border-red-100">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Original Date</div>
                    <div className="font-semibold text-[#0A1A2F] line-through">
                      {formatDate(appointment.date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-[#F8F9FA] rounded-lg border border-red-100">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Original Time</div>
                    <div className="font-semibold text-[#0A1A2F] line-through">
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
                Original Case Details
              </h3>
              <div className="bg-[#F8F9FA] rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {appointment.message}
                </p>
              </div>
            </div>
          )}

          {/* Cancellation Policy Card */}
          <div className="bg-red-50 rounded-2xl border-l-4 border-red-500 p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h4 className="font-bold text-[#0A1A2F] mb-2">Cancellation Policy</h4>
                <ul className="text-sm text-[#0A1A2F] space-y-2">
                  <li>• No cancellation fees for this booking</li>
                  <li>• You can rebook anytime in the future</li>
                  <li>• Your information remains confidential</li>
                  <li>• Contact us if you need assistance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
           

              <Link
                to="/"
                className="inline-flex items-center justify-center space-x-2 bg-[#0A1A2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1E354F] transition-all duration-300"
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
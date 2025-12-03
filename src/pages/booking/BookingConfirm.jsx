// components/booking/BookingConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { CheckCircle, Calendar, Clock, User, Sparkles, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './BookingConfirmation.css'; // We'll create this for animations

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [confettiActive, setConfettiActive] = useState(true);
  
  const bookingData = location.state?.bookingData || getSampleData();

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
    
    // Auto-hide confetti after 3 seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  function getSampleData() {
    return {
      bookingId: `HUBRES-${Date.now().toString().slice(-8)}`,
      date: 'Monday, November 20, 2023',
      time: '10:30 AM',
      duration: '60 minutes',
      lawyer: 'Sarah Johnson, Esq.',
      meetingType: 'Video Consultation'
    };
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
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: i % 3 === 0 ? '#CBA054' : i % 3 === 1 ? '#0A1A2F' : '#10b981'
            }}></div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
      

        {/* Main Content Area */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          {/* Animated Success Card */}
          <div className={`w-full max-w-md transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Floating Success Icon */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center shadow-2xl animate-float">
                <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping-slow"></div>
                <CheckCircle className="h-16 w-16 text-green-600 animate-scale-in" />
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute top-12 left-1/2  w-full h-full">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-4 h-4 bg-[#CBA054] rounded-full animate-orbit"
                    style={{
                      '--orbit-delay': `${i * 0.5}s`,
                      '--orbit-size': '80px',
                      animationDelay: `${i * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Title with Gradient */}
            <div className={`text-center mb-6 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl pb-2 font-bold bg-gradient-to-r from-[#0A1A2F] via-[#1a2c4d] to-[#CBA054] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Booking Confirmed!
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#CBA054] to-emerald-500 mx-auto mt-4 rounded-full animate-width"></div>
            </div>

            {/* Description */}
            <div className={`text-center mb-8 transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-gray-600 text-lg leading-relaxed">
                Your consultation has been successfully scheduled. 
                Check your email for confirmation details.
              </p>
            </div>

           

            {/* Details Card */}
            <div className={`mb-10 transform transition-all duration-700 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0A1A2F] to-[#1a2c4d] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-8 backdrop-blur-sm bg-white/90">
                  <div className="space-y-6">
                    {/* Date */}
                    <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-gray-600 font-medium">Date</span>
                      </div>
                      <span className="font-bold text-[#0A1A2F] text-lg">{bookingData.date}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <Clock className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="text-gray-600 font-medium">Time</span>
                      </div>
                      <span className="font-bold text-[#0A1A2F] text-lg">{bookingData.time}</span>
                    </div>

                   
                    {/* Lawyer */}
                    <div className="flex items-center justify-between group/item hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <User className="h-5 w-5 text-amber-600" />
                        </div>
                        <span className="text-gray-600 font-medium">Lawyer</span>
                      </div>
                      <span className="font-bold text-[#0A1A2F] text-lg">{bookingData.lawyer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className={`transform transition-all duration-700 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                to="/"
                className="group relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#0A1A2F] to-[#1a2c4d] rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#CBA054] to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button content */}
                <span className="relative flex items-center space-x-3">
                  <span>Back to Home</span>
                  <ArrowRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
                </span>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default BookingConfirmation;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, CheckCircle, Shield } from 'lucide-react';
import CustomInput from '../../component/form/CustomInput';
import { toast } from 'react-toastify';
import { api } from '../../utils/app';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Email step, 2: Reset password step
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    token: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate email step
  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate password step
  const validatePassword = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Please confirm your password";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (validateEmail()) {
      setIsLoading(true);
      try {
        const res = await api.post('/forgot-password', { email: formData.email });
        
        if (res.data.status) {
          setFormData(prev => ({ ...prev, token: res.data.token }));
          setStep(2);
          toast.success('Reset token sent successfully! Check your email.');
        }
      } catch (error) {
        toast.error(error.message || 'Failed to send reset token. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (validatePassword()) {
      setIsLoading(true);
      try {
        const res = await api.post('/reset-password', formData);
        
        if (res.data.status) {
          toast.success('Password reset successfully!');
          navigate('/login');
        }
      } catch (error) {
        toast.error(error.message || 'Failed to reset password. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#CBA054]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0A1A2F]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate('/admin/login')}
          className="mb-6 flex items-center space-x-2 text-[#0A1A2F] hover:text-[#CBA054] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Login</span>
        </button>

        {/* Reset Password Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#E8EEF4]">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-[#0A1A2F] to-[#1E354F] rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#0A1A2F] mb-2">
              Reset Password
            </h2>
            <p className="text-[#1E354F]">
              {step === 1 
                ? 'Enter your email to receive a reset token' 
                : 'Enter your new password'
              }
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              {/* Step 1 */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= 1 
                  ? 'bg-[#CBA054] border-[#CBA054] text-white' 
                  : 'border-[#E8EEF4] text-[#1E354F]'
              }`}>
                {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <div className={`w-16 h-1 mx-2 ${
                step >= 2 ? 'bg-[#CBA054]' : 'bg-[#E8EEF4]'
              }`}></div>
              {/* Step 2 */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= 2 
                  ? 'bg-[#CBA054] border-[#CBA054] text-white' 
                  : 'border-[#E8EEF4] text-[#1E354F]'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <CustomInput
                  label="Admin Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your admin email"
                  icon={Mail}
                  className={
                    errors.email
                      ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                      : "border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  }
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] hover:from-[#CBA054] hover:to-[#DBAE5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CBA054] transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending Token...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Send Reset Token</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: Password Reset */}
          {step === 2 && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <CustomInput
                  label="New Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  icon={Lock}
                  className={
                    errors.password
                      ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                      : "border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  }
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <CustomInput
                  label="Confirm Password"
                  name="password_confirmation"
                  type="password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  icon={Lock}
                  className={
                    errors.password_confirmation
                      ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                      : "border-[#E8EEF4] focus:border-[#CBA054] focus:ring-[#CBA054]/20"
                  }
                />
                {errors.password_confirmation && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.password_confirmation}
                  </p>
                )}
              </div>

              <div className="p-4 bg-[#F0F8FF] rounded-lg border border-[#E8EEF4]">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#CBA054] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#0A1A2F] font-medium">
                      Reset Token Sent
                    </p>
                    <p className="text-xs text-[#1E354F] mt-1">
                      A reset token has been sent to {formData.email}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] hover:from-[#CBA054] hover:to-[#DBAE5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CBA054] transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Reset Password</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-[#F4EEDC] rounded-lg border-l-4 border-[#CBA054]">
            <div className="flex items-start space-x-3">
              <Shield className="w-4 h-4 text-[#CBA054] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[#0A1A2F] font-medium">
                  Secure Password Reset
                </p>
                <p className="text-xs text-[#1E354F] mt-1">
                  {step === 1 
                    ? 'Enter your admin email to receive a secure reset token'
                    : 'Create a strong new password for your admin account'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft, Shield } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
import { api } from "../../utils/app";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        const res = await api.post("/admin/login", formData);
        const { token, role, name } = res.data;
        // Create user object
        const user = { name, role };
        login(user, token);
        toast.success("Login successful!");
        navigate("/admin");
      } catch (error) {
        console.log(error.message);
        toast.error(error.message || "Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle forgot password click
  const handleForgotPassword = () => {
    navigate("/forgot-password");
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
          onClick={() => navigate("/")}
          className="mb-6 flex items-center space-x-2 text-[#0A1A2F] hover:text-[#CBA054] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#E8EEF4]">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-[#0A1A2F] to-[#1E354F] rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#0A1A2F] mb-2">
              Admin Portal
            </h2>
            <p className="text-[#1E354F]">
              Secure access to Hubers Law admin panel
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <CustomInput
                label="Admin Email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
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

            {/* Password Field */}
            <div>
              <CustomInput
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#CBA054] focus:ring-[#CBA054] border-[#E8EEF4] rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[#0A1A2F] cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="font-semibold text-[#0A1A2F] hover:text-[#CBA054] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:ring-opacity-50 rounded px-2 py-1"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] hover:from-[#CBA054] hover:to-[#DBAE5D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CBA054] transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Access Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-[#F4EEDC] rounded-lg border-l-4 border-[#CBA054]">
            <div className="flex items-start space-x-3">
              <Shield className="w-4 h-4 text-[#CBA054] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[#0A1A2F] font-medium">
                  Secure Admin Access
                </p>
                <p className="text-xs text-[#1E354F] mt-1">
                  admin@gmail.com/password123
                </p>
              </div>
            </div>
          </div>

          {/* Admin Contact */}
          <div className="mt-4 text-center">
            <p className="text-xs text-[#1E354F]">
              Need help? Contact{" "}
              <a
                href="mailto:admin@huberslaw.co.uk"
                className="font-semibold text-[#0A1A2F] hover:text-[#CBA054] transition-colors"
              >
                system administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
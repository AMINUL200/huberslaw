import React, { useState, useEffect } from "react";
import { Save, Mail, Server, Lock, User, Shield } from "lucide-react";
import { api } from "../../../utils/app";

const EmailSetting = () => {
  const [emailSettings, setEmailSettings] = useState({
    mailer: "smtp",
    host: "",
    port: "",
    username: "",
    password: "",
    encryption: "tls",
    from_address: "",
    from_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch email settings
  const fetchEmailSettings = async () => {
    setLoading(true);
    try {
      const response = await api.get("/email-settings");

      if (response.data.status) {
        setEmailSettings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching email settings:", error);
      setMessage({ type: "error", text: "Failed to load email settings" });
    } finally {
      setLoading(false);
    }
  };

  // Update email settings
  const updateEmailSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await api.post("/email-settings/update", {
        mailer: emailSettings.mailer,
        host: emailSettings.host,
        port: emailSettings.port,
        username: emailSettings.username,
        password: emailSettings.password,
        encryption: emailSettings.encryption,
        from_address: emailSettings.from_address,
        from_name: emailSettings.from_name,
      });

      if (response.data.status) {
        setMessage({
          type: "success",
          text: "Email settings updated successfully!",
        });
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to update email settings",
        });
      }
    } catch (error) {
      console.error("Error updating email settings:", error);
      setMessage({ type: "error", text: "Failed to update email settings" });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEmailSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchEmailSettings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CBA054]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md border border-[#E8EEF4]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8EEF4]">
          <h2 className="text-xl font-semibold text-[#0A1A2F] flex items-center">
            <Mail className="w-5 h-5 mr-2 text-[#CBA054]" />
            Email Configuration
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Configure your email server settings for sending emails from the
            application
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mx-6 mt-4 p-4 rounded-md border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={updateEmailSettings} className="p-6 space-y-6">
          {/* Mailer Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2 flex items-center">
                <Server className="w-4 h-4 mr-2 text-[#CBA054]" />
                Mailer Type
              </label>
              <select
                value={emailSettings.mailer}
                onChange={(e) => handleInputChange("mailer", e.target.value)}
                className="w-full px-3 py-2 border border-[#E8EEF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-[#CBA054] text-[#0A1A2F] transition-colors"
              >
                <option value="smtp">SMTP</option>
                <option value="sendmail">Sendmail</option>
                <option value="mail">PHP Mail</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-[#CBA054]" />
                Encryption
              </label>
              <select
                value={emailSettings.encryption}
                onChange={(e) =>
                  handleInputChange("encryption", e.target.value)
                }
                className="w-full px-3 py-2 border border-[#E8EEF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-[#CBA054] text-[#0A1A2F] transition-colors"
              >
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
                <option value="">None</option>
              </select>
            </div>
          </div>

          {/* SMTP Server Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                SMTP Host
              </label>
              <input
                type="text"
                value={emailSettings.host}
                onChange={(e) => handleInputChange("host", e.target.value)}
                placeholder="smtp.gmail.com"
                className="w-full px-3 py-2 border border-[#E8EEF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-[#CBA054] text-[#0A1A2F] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                SMTP Port
              </label>
              <input
                type="text"
                value={emailSettings.port}
                onChange={(e) => handleInputChange("port", e.target.value)}
                placeholder="587"
                className="w-full px-3 py-2 border border-[#E8EEF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-[#CBA054] text-[#0A1A2F] transition-colors"
                required
              />
            </div>
          </div>

          {/* Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-[#CBA054]" />
                Username
              </label>
              <input
                type="text"
                value={emailSettings.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="your-email@gmail.com"
                className="w-full px-3 py-2 border border-[#E8EEF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-[#CBA054] text-[#0A1A2F] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-[#CBA054]" />
                Password
              </label>
              <input
                type="password"
                value={emailSettings.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Your email password or app password"
                className="w-full px-3 py-2 border border-[#E8EEF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-[#CBA054] text-[#0A1A2F] transition-colors"
                required
              />
            </div>
          </div>

          {/* From Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                From Email Address
              </label>
              <input
                type="email"
                value={emailSettings.from_address}
                onChange={(e) =>
                  handleInputChange("from_address", e.target.value)
                }
                placeholder="noreply@yourdomain.com"
                className="w-full px-3 py-2 border border-[#E8EEF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-[#CBA054] text-[#0A1A2F] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                From Name
              </label>
              <input
                type="text"
                value={emailSettings.from_name}
                onChange={(e) => handleInputChange("from_name", e.target.value)}
                placeholder="Your Application Name"
                className="w-full px-3 py-2 border border-[#E8EEF4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-[#CBA054] text-[#0A1A2F] transition-colors"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6 border-t border-[#E8EEF4]">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-2 bg-[#0A1A2F] text-white rounded-md hover:bg-[#CBA054] focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="px-6 py-4 bg-gray-50 border-t border-[#E8EEF4]">
          <h3 className="text-sm font-medium text-[#0A1A2F] mb-2">
            Configuration Notes:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • For Gmail, use SMTP Host: <code className="text-[#0A1A2F]">smtp.gmail.com</code>, Port:{" "}
              <code className="text-[#0A1A2F]">587</code>, Encryption: <code className="text-[#0A1A2F]">TLS</code>
            </li>
            <li>
              • You may need to generate an App Password if using Gmail with
              2-factor authentication
            </li>
            <li>
              • Test your settings after saving to ensure emails are being sent
              properly
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailSetting;
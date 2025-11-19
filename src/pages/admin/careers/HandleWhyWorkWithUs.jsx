import React, { useState, useEffect } from 'react';
import { Save, Edit2, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '../../../utils/app';
import CustomTextEditor from '../../../component/form/TextEditor';

const HandleWhyWorkWithUs = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    page_title: '',
    title_meta: '',
    page_desc: '',
    long_desc: '',
    button_name: ''
  });

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/work-with-us');
      if (res.data.status) {
        const data = res.data.data;
        setPageData(data);
        setFormData({
          page_title: data.page_title || '',
          title_meta: data.title_meta || '',
          page_desc: data.page_desc || '',
          long_desc: data.long_desc || '',
          button_name: data.button_name || ''
        });
      }
    } catch (error) {
      console.error('Error fetching page data:', error);
      toast.error('Failed to load page data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (value) => {
    setFormData(prev => ({
      ...prev,
      long_desc: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      const res = await api.post('/work-with-us/update', formData);
      
      if (res.data.status) {
        toast.success('Page content updated successfully');
        setIsEditing(false);
        fetchPageData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating page data:', error);
      toast.error(error.response?.data?.message || 'Failed to update page content');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original data
    if (pageData) {
      setFormData({
        page_title: pageData.page_title || '',
        title_meta: pageData.title_meta || '',
        page_desc: pageData.page_desc || '',
        long_desc: pageData.long_desc || '',
        button_name: pageData.button_name || ''
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA054] mx-auto"></div>
            <p className="mt-4 text-[#0A1A2F]">Loading page content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0A1A2F]">Why Work With Us</h1>
              <p className="text-[#0A1A2F] mt-2">Manage the careers page content</p>
            </div>
            
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg hover:bg-[#CBA054] transition-colors duration-200 flex items-center space-x-2 border border-[#0A1A2F] hover:border-[#CBA054]"
                >
                  <Edit2 className="w-5 h-5" />
                  <span>Edit Content</span>
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border border-[#0A1A2F] text-[#0A1A2F] rounded-lg hover:bg-[#0A1A2F] hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Form/Display */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#CBA054] p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Page Title */}
              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  name="page_title"
                  value={formData.page_title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-lg font-semibold text-[#0A1A2F]"
                  placeholder="Careers at Hubers Law"
                />
              </div>

              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Meta Title (SEO)
                </label>
                <input
                  type="text"
                  name="title_meta"
                  value={formData.title_meta}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  placeholder="Optional meta title for SEO"
                />
              </div>

              {/* Page Description */}
              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Page Description *
                </label>
                <textarea
                  name="page_desc"
                  value={formData.page_desc}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  placeholder="Join our team of legal professionals and build your career with a firm that values excellence, integrity, and growth."
                />
              </div>

              {/* Long Description - Custom Text Editor */}
              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Detailed Content *
                </label>
                <CustomTextEditor
                  value={formData.long_desc}
                  onChange={handleEditorChange}
                  placeholder="Why Build Your Career at Hubers Law? At Hubers Law, we believe that our people are our greatest asset..."
                  height={400}
                />
              </div>

              {/* Button Name */}
              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Button Text *
                </label>
                <input
                  type="text"
                  name="button_name"
                  value={formData.button_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  placeholder="See Our Current Vacancies"
                />
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-end pt-6 border-t border-[#CBA054]">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#0A1A2F] text-white px-8 py-3 rounded-lg hover:bg-[#CBA054] transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 border border-[#0A1A2F] hover:border-[#CBA054]"
                >
                  <Save className="w-5 h-5" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Preview Mode */
            <div className="space-y-6">
              {/* Page Title Preview */}
              <div>
                <h2 className="text-3xl font-bold text-[#0A1A2F] mb-4">
                  {pageData.page_title}
                </h2>
                
                {/* Meta Title Preview */}
                {pageData.title_meta && (
                  <div className="mb-4 p-3 bg-gray-100 rounded-lg border border-[#CBA054]">
                    <label className="text-sm font-medium text-[#0A1A2F] block mb-1">
                      Meta Title:
                    </label>
                    <p className="text-[#0A1A2F]">{pageData.title_meta}</p>
                  </div>
                )}
              </div>

              {/* Page Description Preview */}
              <div>
                <label className="text-sm font-medium text-[#0A1A2F] block mb-2">
                  Page Description:
                </label>
                <p className="text-lg text-[#0A1A2F] leading-relaxed bg-gray-50 p-4 rounded-lg border border-[#CBA054]">
                  {pageData.page_desc}
                </p>
              </div>

              {/* Long Description Preview */}
              <div>
                <label className="text-sm font-medium text-[#0A1A2F] block mb-2">
                  Detailed Content:
                </label>
                <div 
                  className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg border border-[#CBA054]"
                  dangerouslySetInnerHTML={{ __html: pageData.long_desc }}
                />
              </div>

              {/* Button Preview */}
              <div>
                <label className="text-sm font-medium text-[#0A1A2F] block mb-2">
                  Button Text:
                </label>
                <button className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg hover:bg-[#CBA054] transition-colors duration-200 border border-[#0A1A2F] hover:border-[#CBA054]">
                  {pageData.button_name}
                </button>
              </div>

              {/* Last Updated */}
              <div className="pt-6 border-t border-[#CBA054]">
                <p className="text-sm text-[#0A1A2F]">
                  Last updated: {pageData.updated_at ? 
                    new Date(pageData.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 
                    'Never'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        {!isEditing && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[#CBA054]">
            <div className="flex items-start space-x-3">
              <Eye className="w-5 h-5 text-[#0A1A2F] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-[#0A1A2F]">Preview Mode</h3>
                <p className="text-[#0A1A2F] text-sm mt-1">
                  You are currently viewing the page content. Click "Edit Content" to make changes to the careers page.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleWhyWorkWithUs;
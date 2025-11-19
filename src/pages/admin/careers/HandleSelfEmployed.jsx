import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '../../../utils/app';
import CustomTextEditor from '../../../component/form/TextEditor';

const HandleSelfEmployed = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    meta_title: '',
    description: ''
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get('/self-employed');
      if (res.data.status) {
        setItems(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching self-employed items:', error);
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
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
      description: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      meta_title: '',
      description: ''
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }

    try {
      setFormLoading(true);
      
      if (editingItem) {
        // Update existing item
        const res = await api.post(`/self-employed/update/${editingItem.id}`, formData);
        if (res.data.status) {
          toast.success('Item updated successfully');
          resetForm();
          fetchItems();
        }
      } else {
        // Create new item
        const res = await api.post('/self-employed', formData);
        if (res.data.status) {
          toast.success('Item created successfully');
          resetForm();
          fetchItems();
        }
      }
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error(error.response?.data?.message || 'Failed to save item');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      meta_title: item.meta_title || '',
      description: item.description
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const res = await api.delete(`/self-employed/${id}`);
      if (res.data.status) {
        toast.success('Item deleted successfully');
        fetchItems();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA054] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading self-employed services...</p>
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
          <h1 className="text-3xl font-bold text-[#0A1A2F]">Self-Employed Services</h1>
          <p className="text-gray-600 mt-2">Manage services for self-employed professionals</p>
        </div>

        {/* Add New Item Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#CBA054] text-white px-6 py-3 rounded-lg hover:bg-[#B8934C] transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0A1A2F]">
                {editingItem ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-lg font-semibold"
                  placeholder="e.g., Locum Solicitors"
                />
              </div>

              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title (SEO)
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent"
                  placeholder="Optional meta title for SEO"
                />
              </div>

              {/* Description - Custom Text Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <CustomTextEditor
                  value={formData.description}
                  onChange={handleEditorChange}
                  placeholder="We help self-employed individuals with tax filings, contract drafting, and financial advisory."
                  height={300}
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-[#CBA054] text-white px-6 py-2 rounded-lg hover:bg-[#B8934C] transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{formLoading ? 'Saving...' : (editingItem ? 'Update' : 'Create')}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Items List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#0A1A2F]">
              Current Services ({items.length})
            </h2>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Eye className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No services found</p>
              <p className="text-gray-400 mt-2">
                Click "Add New Service" to create your first self-employed service
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-[#0A1A2F]">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                            title="Edit Service"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Meta Title */}
                      {item.meta_title && (
                        <div className="mb-3">
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                            Meta Title:
                          </label>
                          <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                            {item.meta_title}
                          </p>
                        </div>
                      )}

                      {/* Description Preview */}
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">
                          Description:
                        </label>
                        <div 
                          className="prose prose-sm max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg"
                          dangerouslySetInnerHTML={{ 
                            __html: item.description.length > 200 
                              ? item.description.substring(0, 200) + '...' 
                              : item.description 
                          }}
                        />
                        {item.description.length > 200 && (
                          <p className="text-xs text-gray-500 mt-1">
                            * Content truncated - full content available in edit mode
                          </p>
                        )}
                      </div>

                      {/* Last Updated */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Last updated: {new Date(item.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Text */}
        {items.length > 0 && !showForm && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Eye className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900">Managing Services</h3>
                <p className="text-blue-700 text-sm mt-1">
                  You can edit or delete any service using the action buttons. The description supports rich text formatting including bold, italics, lists, and links.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleSelfEmployed;
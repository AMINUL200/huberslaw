import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../../../utils/app'
import CustomTextEditor from '../../../component/form/TextEditor'

const AddServices = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const updateId = searchParams.get('update')
  const isEditMode = Boolean(updateId)
  
  const [formData, setFormData] = useState({
    service_name: '',
    service_name_meta: '',
    service_description: '',
    page_heading: '',
    page_heading_meta: '',
    page_description: '',
    page_desc_meta: '',
    long_desc: '',
    features: ['']
  })
  
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')

  // Fetch service data when in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchServiceData()
    }
  }, [updateId])

  const fetchServiceData = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/services/${updateId}`)
      if (response.data.status) {
        const service = response.data.data
        setFormData({
          service_name: service.service_name || '',
          service_name_meta: service.service_name_meta || '',
          service_description: service.service_description || '',
          page_heading: service.page_heading || '',
          page_heading_meta: service.page_heading_meta || '',
          page_description: service.page_description || '',
          page_desc_meta: service.page_desc_meta || '',
          long_desc: service.long_desc || '',
          features: service.feature && service.feature.length > 0 ? service.feature : ['']
        })
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch service data')
      console.error('Error fetching service:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLongDescChange = (newContent) => {
    setFormData(prev => ({
      ...prev,
      long_desc: newContent
    }))
  }

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures[index] = value
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }))
  }

  const addFeatureField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeatureField = (index) => {
    if (formData.features.length > 1) {
      const updatedFeatures = formData.features.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        features: updatedFeatures
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      setError(null)
      setSuccess('')

      // Prepare data for API
      const submitData = {
        ...formData,
        feature: formData.features.filter(feature => feature.trim() !== '')
      }

      let response
      if (isEditMode) {
        response = await api.post(`/services/update/${updateId}`, submitData)
      } else {
        response = await api.post('/services', submitData)
      }

      if (response.data.status) {
        setSuccess(isEditMode ? 'Service updated successfully!' : 'Service created successfully!')
        setTimeout(() => {
          navigate('/admin/handle-services')
        }, 1500)
      }
    } catch (err) {
      setError(err.message || `Failed to ${isEditMode ? 'update' : 'create'} service`)
      console.error('Error submitting service:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate('/admin/handle-services')
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen px-6 py-8 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1A2F] mx-auto"></div>
          <p className="mt-4 text-[#0A1A2F]">Loading banners...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#CBA054]">
          {/* Header */}
          <div className="bg-[#0A1A2F] px-6 py-4 border-b border-[#CBA054]">
            <h1 className="text-2xl font-bold text-white">
              {isEditMode ? 'Edit Service' : 'Add New Service'}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Success and Error Messages */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Service Name *
              </label>
              <input
                type="text"
                name="service_name"
                value={formData.service_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                placeholder="Enter service name"
              />
            </div>

            {/* Service Name Meta */}
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Service Name Meta Tag
              </label>
              <input
                type="text"
                name="service_name_meta"
                value={formData.service_name_meta}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                placeholder="Enter meta tag for service name"
              />
            </div>

            {/* Service Description */}
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Service Description *
              </label>
              <textarea
                name="service_description"
                value={formData.service_description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                placeholder="Enter brief service description"
              />
            </div>

            {/* Long Description with Custom Text Editor */}
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Long Description
              </label>
              <CustomTextEditor
                value={formData.long_desc}
                onChange={handleLongDescChange}
                placeholder="Enter detailed service description with rich formatting..."
                height={300}
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                Features
              </label>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                      placeholder={`Feature ${index + 1}`}
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeatureField(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeatureField}
                  className="px-4 py-2 bg-gray-200 text-[#0A1A2F] rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  + Add Feature
                </button>
              </div>
            </div>

            {/* SEO Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Page Heading
                </label>
                <input
                  type="text"
                  name="page_heading"
                  value={formData.page_heading}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  placeholder="Enter page heading"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Page Heading Meta
                </label>
                <input
                  type="text"
                  name="page_heading_meta"
                  value={formData.page_heading_meta}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  placeholder="Enter page heading meta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Page Description
                </label>
                <textarea
                  name="page_description"
                  value={formData.page_description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  placeholder="Enter page description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Page Description Meta
                </label>
                <textarea
                  name="page_desc_meta"
                  value={formData.page_desc_meta}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  placeholder="Enter page description meta"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#0A1A2F] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#CBA054] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Saving...' : (isEditMode ? 'Update Service' : 'Create Service')}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-[#0A1A2F] py-3 px-4 rounded-md font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddServices
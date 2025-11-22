import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, MapPin, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import { api } from '../../../utils/app';

const HandleVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    job_title: '',
    job_description: '',
    job_location: '',
    job_type: 'Full-Time',
    min_salary: '',
    max_salary: '',
    experience: '',
    requirment: [''],
    button_name: 'Apply Now'
  });

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const res = await api.get('/recruitments');
      if (res.data.status) {
        setVacancies(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching vacancies:', error);
      toast.error('Failed to load vacancies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...formData.requirment];
    updatedRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirment: updatedRequirements
    }));
  };

  const addRequirementField = () => {
    setFormData(prev => ({
      ...prev,
      requirment: [...prev.requirment, '']
    }));
  };

  const removeRequirementField = (index) => {
    if (formData.requirment.length > 1) {
      const updatedRequirements = formData.requirment.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        requirment: updatedRequirements
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      job_title: '',
      job_description: '',
      job_location: '',
      job_type: 'Full-Time',
      min_salary: '',
      max_salary: '',
      experience: '',
      requirment: [''],
      button_name: 'Apply Now'
    });
    setEditingVacancy(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty requirements
    const filteredRequirements = formData.requirment.filter(req => req.trim() !== '');
    
    if (filteredRequirements.length === 0) {
      toast.error('Please add at least one requirement');
      return;
    }

    const submitData = {
      ...formData,
      requirment: filteredRequirements
    };

    try {
      setFormLoading(true);
      
      if (editingVacancy) {
        // Update existing vacancy
        const res = await api.post(`/recruitments/update/${editingVacancy.id}`, submitData);
        if (res.data.status) {
          toast.success('Vacancy updated successfully');
          resetForm();
          fetchVacancies();
        }
      } else {
        // Create new vacancy
        const res = await api.post('/recruitments', submitData);
        if (res.data.status) {
          toast.success('Vacancy created successfully');
          resetForm();
          fetchVacancies();
        }
      }
    } catch (error) {
      console.error('Error saving vacancy:', error);
      toast.error(error.response?.data?.message || 'Failed to save vacancy');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (vacancy) => {
    setFormData({
      job_title: vacancy.job_title,
      job_description: vacancy.job_description,
      job_location: vacancy.job_location,
      job_type: vacancy.job_type,
      min_salary: vacancy.min_salary,
      max_salary: vacancy.max_salary,
      experience: vacancy.experience,
      requirment: vacancy.requirment.length > 0 ? vacancy.requirment : [''],
      button_name: vacancy.button_name
    });
    setEditingVacancy(vacancy);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vacancy?')) {
      return;
    }

    try {
      const res = await api.delete(`/recruitment/delete/${id}`);
      if (res.data.status) {
        toast.success('Vacancy deleted successfully');
        fetchVacancies();
      }
    } catch (error) {
      console.error('Error deleting vacancy:', error);
      toast.error('Failed to delete vacancy');
    }
  };

  const toggleStatus = async (vacancy) => {
    try {
      const newStatus = vacancy.status === 'open' ? 'closed' : 'open';
      const res = await api.post(`/recruitments/status/${vacancy.id}`, { status: newStatus });
      
      if (res.data.status) {
        toast.success(`Vacancy ${newStatus === 'open' ? 'opened' : 'closed'} successfully`);
        fetchVacancies();
      }
    } catch (error) {
      console.error('Error updating vacancy status:', error);
      toast.error('Failed to update vacancy status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CBA054] mx-auto"></div>
            <p className="mt-4 text-[#0A1A2F]">Loading vacancies...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A1A2F]">Manage Vacancies</h1>
          <p className="text-[#0A1A2F] mt-2">Add, edit, and manage job vacancies</p>
        </div>

        {/* Add New Vacancy Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg hover:bg-[#CBA054] transition-colors duration-200 flex items-center space-x-2 border border-[#0A1A2F] hover:border-[#CBA054]"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Vacancy</span>
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl border border-[#CBA054] p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0A1A2F]">
                {editingVacancy ? 'Edit Vacancy' : 'Add New Vacancy'}
              </h2>
              <button
                onClick={resetForm}
                className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="e.g., Litigation Paralegal"
                  />
                </div>

                {/* Job Location */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Job Location *
                  </label>
                  <input
                    type="text"
                    name="job_location"
                    value={formData.job_location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="e.g., London, United Kingdom"
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Job Type *
                  </label>
                  <select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Experience Required *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="e.g., 5+ Years"
                  />
                </div>

                {/* Min Salary */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Minimum Salary (£)
                  </label>
                  <input
                    type="number"
                    name="min_salary"
                    value={formData.min_salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="30000"
                  />
                </div>

                {/* Max Salary */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                    Maximum Salary (£)
                  </label>
                  <input
                    type="number"
                    name="max_salary"
                    value={formData.max_salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                    placeholder="45000"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Job Description *
                </label>
                <textarea
                  name="job_description"
                  value={formData.job_description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  placeholder="Enter detailed job description..."
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Requirements *
                </label>
                <div className="space-y-3">
                  {formData.requirment.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleRequirementChange(index, e.target.value)}
                        
                        className="flex-1 px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                        placeholder={`Requirement ${index + 1}`}
                      />
                      {formData.requirment.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequirementField(index)}
                          className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addRequirementField}
                    className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Requirement</span>
                  </button>
                </div>
              </div>

              {/* Button Name */}
              <div>
                <label className="block text-sm font-medium text-[#0A1A2F] mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  name="button_name"
                  value={formData.button_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#CBA054] rounded-lg focus:ring-2 focus:ring-[#CBA054] focus:border-transparent text-[#0A1A2F]"
                  placeholder="Apply Now"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#CBA054]">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-[#0A1A2F] text-[#0A1A2F] rounded-lg hover:bg-[#0A1A2F] hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-[#0A1A2F] text-white px-6 py-2 rounded-lg hover:bg-[#CBA054] transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 border border-[#0A1A2F] hover:border-[#CBA054]"
                >
                  <Save className="w-5 h-5" />
                  <span>{formLoading ? 'Saving...' : (editingVacancy ? 'Update' : 'Create')}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Vacancies List */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#CBA054] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#CBA054]">
            <h2 className="text-xl font-bold text-[#0A1A2F]">Current Vacancies</h2>
          </div>

          {vacancies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#0A1A2F] text-lg">No vacancies found</p>
              <p className="text-[#0A1A2F] mt-2">Click "Add New Vacancy" to create your first job posting</p>
            </div>
          ) : (
            <div className="divide-y divide-[#CBA054]">
              {vacancies.map((vacancy) => (
                <div key={vacancy.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-[#0A1A2F]">
                          {vacancy.job_title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            vacancy.status === 'open'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {vacancy.status === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#0A1A2F] mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-[#CBA054]" />
                          <span>{vacancy.job_location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-[#CBA054]" />
                          <span>{vacancy.job_type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-[#CBA054]" />
                          <span>{vacancy.experience}</span>
                        </div>
                      </div>

                      {vacancy.min_salary && vacancy.max_salary && (
                        <p className="text-[#CBA054] font-semibold mb-3">
                          £{vacancy.min_salary} - £{vacancy.max_salary}
                        </p>
                      )}

                      <p className="text-[#0A1A2F] mb-4 line-clamp-2">
                        {vacancy.job_description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-medium text-[#0A1A2F] mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-[#0A1A2F]">
                          {vacancy.requirment.slice(0, 3).map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                          {vacancy.requirment.length > 3 && (
                            <li className="text-[#CBA054]">
                              +{vacancy.requirment.length - 3} more requirements
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleStatus(vacancy)}
                        className={`p-2 rounded-lg transition-colors duration-200 border ${
                          vacancy.status === 'open'
                            ? 'bg-[#0A1A2F] text-white hover:bg-[#CBA054] border-[#0A1A2F] hover:border-[#CBA054]'
                            : 'bg-[#0A1A2F] text-white hover:bg-[#CBA054] border-[#0A1A2F] hover:border-[#CBA054]'
                        }`}
                        title={vacancy.status === 'open' ? 'Close Vacancy' : 'Open Vacancy'}
                      >
                        {vacancy.status === 'open' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(vacancy)}
                        className="p-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors duration-200 border border-[#0A1A2F] hover:border-[#CBA054]"
                        title="Edit Vacancy"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {/* <button
                        onClick={() => handleDelete(vacancy.id)}
                        className="p-2 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#CBA054] transition-colors duration-200 border border-[#0A1A2F] hover:border-[#CBA054]"
                        title="Delete Vacancy"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add the missing Briefcase icon component
const Briefcase = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default HandleVacancies;
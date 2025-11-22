import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../utils/app'

const HandleTeam = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_APP_BASE_URL ;

  // Fetch team members list
  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/teams') // Adjust endpoint as needed
      if (response.data.status) {
        setTeamMembers(Array.isArray(response.data.data) ? response.data.data : [response.data.data])
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch team members')
      console.error('Error fetching team members:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  // Handle delete team member
  const handleDelete = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await api.delete(`/teams/${memberId}`) // Adjust endpoint
        fetchTeamMembers() // Refresh the list
      } catch (err) {
        setError(err.message || 'Failed to delete team member')
        console.error('Error deleting team member:', err)
      }
    }
  }

  // Handle edit - navigate to edit page
  const handleEdit = (memberId) => {
    navigate(`/admin/add-team?update=${memberId}`)
  }

  // Handle add new team member
  const handleAddNew = () => {
    navigate('/admin/add-team')
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

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1A2F]">Manage Team Members</h1>
          <button
            onClick={handleAddNew}
            className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-colors duration-200"
          >
            Add New Team Member
          </button>
        </div>

        {/* Team Members Grid */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {teamMembers.length === 0 ? (
            <div className="text-center py-12 text-[#0A1A2F]">
              No team members found. Click "Add New Team Member" to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  {/* Image Section */}
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {member.image ? (
                      <img 
                        src={`${baseUrl}${member.image}`} 
                        alt={member.image_alt || member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <p className="mt-2 text-sm">No Image</p>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    {/* Name and Designation */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-[#0A1A2F] truncate">{member.name}</h3>
                      <p className="text-sm text-[#CBA054] font-semibold">{member.designation}</p>
                      <p className="text-xs text-gray-500 mt-1">{member.service?.service_name}</p>
                    </div>

                    {/* Experience */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-[#0A1A2F]">Experience:</span> {member.experience}
                      </p>
                    </div>

                  

                    {/* Contact Info */}
                    <div className="mb-4 space-y-1">
                      <p className="text-xs text-gray-600 truncate">
                        <span className="font-semibold">Email:</span> {member.email}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">Phone:</span> {member.phone_no}
                      </p>
                    </div>

                   

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleEdit(member.id)}
                        className="text-[#0A1A2F] hover:text-[#CBA054] transition-colors duration-200 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HandleTeam
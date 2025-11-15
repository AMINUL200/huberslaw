import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Home, Users, Phone, Mail, MapPin, Calendar, Award, FileText } from 'lucide-react';

const TeamMemberDetails = () => {
    const { slug } = useParams();
    
    // Dummy data for team member details
    const teamMember = {
        id: 1,
        slug: 'john-smith',
        name: 'John Smith',
        role: 'Senior Partner',
        specialty: 'Corporate Law',
        experience: '15+ years',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        email: 'john.smith@huberslaw.co.uk',
        phone: '0203 488 0953',
        location: 'London Office',
        education: 'LLB (Hons), University of Law\nLLM, Cambridge University',
        barAdmission: 'Solicitor of England and Wales',
        languages: ['English', 'French', 'Spanish'],
        awards: [
            'Legal 500 Recommended Lawyer 2023',
            'Law Society Excellence Award 2022',
            'Corporate Law Specialist of the Year 2021'
        ],
        
        description: `
            <div class="space-y-6">
                <p class="text-lg text-gray-700 leading-relaxed">
                    <strong class="text-[#0A1A2F]">John Smith</strong> is a highly experienced Senior Partner specializing in Corporate Law with over 15 years of practice. He has built a reputation for providing strategic legal solutions to businesses of all sizes, from startups to multinational corporations.
                </p>

                <p class="text-lg text-gray-700 leading-relaxed">
                    John's expertise spans across <span class="text-[#CBA054] font-semibold">mergers and acquisitions, corporate governance, commercial contracts, and business restructuring</span>. He has successfully led numerous high-value transactions and has particular experience in cross-border deals.
                </p>

                <div class="bg-[#F4EEDC] rounded-xl p-6 border-l-4 border-[#CBA054]">
                    <h3 class="text-xl font-bold text-[#0A1A2F] mb-3">Professional Philosophy</h3>
                    <p class="text-gray-700 italic">
                        "I believe in building long-term partnerships with my clients. Understanding their business objectives and providing practical, commercially-focused legal advice is key to achieving successful outcomes."
                    </p>
                </div>

                <h3 class="text-2xl font-bold text-[#0A1A2F] mt-8 mb-4">Areas of Expertise</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                        <li>Mergers & Acquisitions</li>
                        <li>Corporate Governance</li>
                        <li>Commercial Contracts</li>
                        <li>Joint Ventures</li>
                    </ul>
                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                        <li>Business Restructuring</li>
                        <li>Corporate Compliance</li>
                        <li>Shareholder Agreements</li>
                        <li>Due Diligence</li>
                    </ul>
                </div>

                <h3 class="text-2xl font-bold text-[#0A1A2F] mt-8 mb-4">Notable Cases</h3>
                <div class="space-y-4">
                    <div class="border-l-4 border-[#CBA054] pl-4">
                        <h4 class="font-semibold text-[#0A1A2F]">£50M Cross-Border Acquisition</h4>
                        <p class="text-gray-600 text-sm">Led the legal team in a complex international acquisition involving multiple jurisdictions and regulatory approvals.</p>
                    </div>
                    <div class="border-l-4 border-[#CBA054] pl-4">
                        <h4 class="font-semibold text-[#0A1A2F]">Tech Startup Series B Funding</h4>
                        <p class="text-gray-600 text-sm">Advised a growing tech company through their Series B funding round, securing £15M in investment.</p>
                    </div>
                </div>
            </div>
        `,

        contactInfo: {
            directLine: '0203 488 0951',
            assistant: 'Sarah Johnson',
            assistantEmail: 'sarah.johnson@huberslaw.co.uk',
            appointmentHours: 'Monday - Thursday: 9:00 AM - 5:00 PM'
        }
    };

    const breadcrumbs = [
        { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
        { name: 'Our Team', path: '/about-us?tab=people', icon: <Users className="w-4 h-4" /> },
        { name: teamMember.name, path: '#', current: true }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        {breadcrumbs.map((crumb, index) => (
                            <li key={crumb.name} className="flex items-center">
                                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                                {crumb.current ? (
                                    <span className="text-[#0A1A2F] font-semibold flex items-center">
                                        {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                                        {crumb.name}
                                    </span>
                                ) : (
                                    <Link to={crumb.path} className="hover:text-[#CBA054] transition-colors duration-200 flex items-center">
                                        {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                                        {crumb.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Image and Basic Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6 sticky top-32">
                            {/* Profile Image */}
                            <div className="mb-6">
                                <img 
                                    src={teamMember.image} 
                                    alt={teamMember.name}
                                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                                />
                            </div>

                            {/* Basic Information */}
                            <div className="space-y-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-[#0A1A2F]">{teamMember.name}</h1>
                                    <p className="text-[#CBA054] font-semibold text-lg">{teamMember.role}</p>
                                    <p className="text-gray-600">{teamMember.specialty}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-4 h-4 text-[#CBA054]" />
                                        <span className="text-gray-700">{teamMember.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-4 h-4 text-[#CBA054]" />
                                        <span className="text-gray-700">{teamMember.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-4 h-4 text-[#CBA054]" />
                                        <span className="text-gray-700">{teamMember.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-4 h-4 text-[#CBA054]" />
                                        <span className="text-gray-700">{teamMember.experience} Experience</span>
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="pt-4 border-t border-[#E8EEF4]">
                                    <h3 className="font-semibold text-[#0A1A2F] mb-2">Education</h3>
                                    <p className="text-gray-600 text-sm whitespace-pre-line">{teamMember.education}</p>
                                </div>

                                {/* Bar Admission */}
                                <div className="pt-4 border-t border-[#E8EEF4]">
                                    <h3 className="font-semibold text-[#0A1A2F] mb-2">Bar Admission</h3>
                                    <p className="text-gray-600 text-sm">{teamMember.barAdmission}</p>
                                </div>

                                {/* Languages */}
                                <div className="pt-4 border-t border-[#E8EEF4]">
                                    <h3 className="font-semibold text-[#0A1A2F] mb-2">Languages</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {teamMember.languages.map((language, index) => (
                                            <span 
                                                key={index}
                                                className="bg-[#F4EEDC] text-[#0A1A2F] px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {language}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                               
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Detailed Description */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Main Description */}
                        <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-8">
                            <div 
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: teamMember.description }}
                            />
                        </div>

                        {/* Awards & Recognition */}
                        <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-8">
                            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-6 flex items-center">
                                <Award className="w-6 h-6 mr-2 text-[#CBA054]" />
                                Awards & Recognition
                            </h2>
                            <div className="space-y-4">
                                {teamMember.awards.map((award, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-[#CBA054] rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-700">{award}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamMemberDetails;
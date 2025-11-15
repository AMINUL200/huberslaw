import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Home, 
  Building, 
  Scale, 
  Users, 
  Home as HomeIcon, 
  Shield, 
  Briefcase, 
  Globe, 
  FileText,
  ArrowRight,
  Download,
  File,
  BookOpen,
  Clock,
  Award,
  Target,
  ChevronDown
} from 'lucide-react';

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const breadcrumbs = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Services', path: '/services', current: true }
  ];

  const practiceAreas = [
    {
      id: 'business',
      title: "Business Law",
      icon: <Building className="w-12 h-12" />,
      description: "Comprehensive legal solutions for businesses of all sizes, from startups to multinational corporations.",
      detailedDescription: `
        <div class="space-y-4">
          <p class="text-gray-700 leading-relaxed">
            Our Business Law practice provides strategic legal counsel to help your business navigate complex regulatory environments, 
            manage risks, and capitalize on growth opportunities. We understand that every business is unique, and we tailor our 
            approach to meet your specific objectives.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <h4 class="font-semibold text-[#0A1A2F]">Corporate Services</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Business Formation & Incorporation</li>
                <li>Mergers & Acquisitions</li>
                <li>Corporate Governance</li>
                <li>Shareholder Agreements</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-[#0A1A2F]">Commercial Services</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Contract Drafting & Review</li>
                <li>Commercial Transactions</li>
                <li>Regulatory Compliance</li>
                <li>Business Restructuring</li>
              </ul>
            </div>
          </div>

          <div class="bg-[#F4EEDC] rounded-xl p-4 border-l-4 border-[#CBA054]">
            <p class="text-[#0A1A2F] font-semibold text-sm">
              "We've helped over 500 businesses navigate legal challenges and achieve their growth objectives."
            </p>
          </div>
        </div>
      `,
      stats: [
        { value: "500+", label: "Businesses Served" },
        { value: "98%", label: "Success Rate" },
        { value: "15+", label: "Years Experience" }
      ],
      lawyers: ["John Smith", "Emily Davis", "Michael Brown"]
    },
    {
      id: 'personal',
      title: "Personal Law",
      icon: <Users className="w-12 h-12" />,
      description: "Compassionate legal guidance for individuals and families facing personal legal challenges.",
      detailedDescription: `
        <div class="space-y-4">
          <p class="text-gray-700 leading-relaxed">
            Our Personal Law team provides empathetic and expert legal support for matters that affect you and your family. 
            We understand the emotional nature of personal legal issues and provide guidance with sensitivity and professionalism.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <h4 class="font-semibold text-[#0A1A2F]">Family Law</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Divorce & Separation</li>
                <li>Child Custody & Support</li>
                <li>Adoption & Surrogacy</li>
                <li>Prenuptial Agreements</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-[#0A1A2F]">Individual Services</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Estate Planning</li>
                <li>Personal Injury</li>
                <li>Immigration Matters</li>
                <li>Criminal Defense</li>
              </ul>
            </div>
          </div>

          <div class="bg-[#F4EEDC] rounded-xl p-4 border-l-4 border-[#CBA054]">
            <p class="text-[#0A1A2F] font-semibold text-sm">
              "We approach every personal matter with the care and attention it deserves, ensuring your rights are protected."
            </p>
          </div>
        </div>
      `,
      stats: [
        { value: "300+", label: "Families Helped" },
        { value: "95%", label: "Client Satisfaction" },
        { value: "12+", label: "Years Experience" }
      ],
      lawyers: ["Sarah Johnson", "David Wilson", "Lisa Chen"]
    },
    {
      id: 'property',
      title: "Property Law",
      icon: <HomeIcon className="w-12 h-12" />,
      description: "Expert legal services for residential and commercial property transactions and disputes.",
      detailedDescription: `
        <div class="space-y-4">
          <p class="text-gray-700 leading-relaxed">
            Our Property Law specialists handle all aspects of real estate transactions, from residential purchases to complex 
            commercial developments. We ensure your property interests are protected throughout the process.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <h4 class="font-semibold text-[#0A1A2F]">Residential</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Property Purchases & Sales</li>
                <li>Lease Agreements</li>
                <li>Boundary Disputes</li>
                <li>Mortgage Matters</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-[#0A1A2F]">Commercial</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Commercial Leases</li>
                <li>Property Development</li>
                <li>Zoning & Planning</li>
                <li>Construction Law</li>
              </ul>
            </div>
          </div>

          <div class="bg-[#F4EEDC] rounded-xl p-4 border-l-4 border-[#CBA054]">
            <p class="text-[#0A1A2F] font-semibold text-sm">
              "We've successfully handled over £500M in property transactions for our clients."
            </p>
          </div>
        </div>
      `,
      stats: [
        { value: "£500M+", label: "Property Value" },
        { value: "97%", label: "Success Rate" },
        { value: "18+", label: "Years Experience" }
      ],
      lawyers: ["Robert Garcia", "Maria Rodriguez", "James Wilson"]
    },
    {
      id: 'dispute',
      title: "Dispute Resolution",
      icon: <Scale className="w-12 h-12" />,
      description: "Strategic representation in litigation and alternative dispute resolution processes.",
      detailedDescription: `
        <div class="space-y-4">
          <p class="text-gray-700 leading-relaxed">
            Our Dispute Resolution team provides aggressive and strategic representation in courtrooms and negotiation tables. 
            We explore all avenues for resolution while preparing every case as if it will go to trial.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <h4 class="font-semibold text-[#0A1A2F]">Litigation</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Civil Litigation</li>
                <li>Commercial Disputes</li>
                <li>Contract Disputes</li>
                <li>Professional Negligence</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-[#0A1A2F]">ADR</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>Mediation</li>
                <li>Arbitration</li>
                <li>Negotiation</li>
                <li>Settlement Agreements</li>
              </ul>
            </div>
          </div>

          <div class="bg-[#F4EEDC] rounded-xl p-4 border-l-4 border-[#CBA054]">
            <p class="text-[#0A1A2F] font-semibold text-sm">
              "We achieve favorable outcomes for 95% of our clients through strategic dispute resolution."
            </p>
          </div>
        </div>
      `,
      stats: [
        { value: "95%", label: "Favorable Outcomes" },
        { value: "400+", label: "Cases Resolved" },
        { value: "20+", label: "Years Experience" }
      ],
      lawyers: ["Jennifer Martinez", "Thomas Lee", "Patricia Brown"]
    }
  ];

  const legalDocuments = [
    {
      id: 1,
      title: "Business Legal Guide",
      description: "Comprehensive guide to business legal requirements",
      format: "PDF",
      size: "2.4 MB",
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Family Law Handbook",
      description: "Understanding your rights in family matters",
      format: "PDF", 
      size: "1.8 MB",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Property Buying Guide",
      description: "Step-by-step guide to property transactions",
      format: "PDF",
      size: "3.1 MB",
      icon: <HomeIcon className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Dispute Resolution Process",
      description: "Understanding litigation and ADR options",
      format: "PDF",
      size: "2.2 MB",
      icon: <Scale className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Legal Fees Guide",
      description: "Transparent pricing for our legal services",
      format: "PDF",
      size: "1.5 MB",
      icon: <File className="w-6 h-6" />
    }
  ];

  const toggleService = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
                  <Link
                    to={crumb.path}
                    className="hover:text-[#CBA054] transition-colors duration-200 flex items-center"
                  >
                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-4">
            Our Practice Areas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal services across four main practice areas. 
            Click on each area to learn more about how we can help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Practice Areas */}
          <div className="lg:col-span-3 space-y-6">
            {practiceAreas.map((area) => (
              <div 
                key={area.id}
                className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] overflow-hidden transition-all duration-300"
              >
                {/* Practice Area Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleService(area.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center flex-shrink-0">
                        <div className="text-white">
                          {area.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0A1A2F] mb-2">
                          {area.title}
                        </h3>
                        <p className="text-gray-600">
                          {area.description}
                        </p>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 text-[#CBA054] transition-transform duration-300 ${
                        expandedService === area.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedService === area.id && (
                  <div className="border-t border-[#E8EEF4]">
                    <div className="p-6">
                      {/* Detailed Description */}
                      <div 
                        className="mb-6"
                        dangerouslySetInnerHTML={{ __html: area.detailedDescription }}
                      />

                      {/* Stats and Lawyers */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Statistics */}
                        <div>
                          <h4 className="font-semibold text-[#0A1A2F] mb-3">Our Track Record</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {area.stats.map((stat, index) => (
                              <div key={index} className="text-center">
                                <div className="text-2xl font-bold text-[#CBA054]">{stat.value}</div>
                                <div className="text-xs text-gray-600">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Specialist Lawyers */}
                        <div>
                          <h4 className="font-semibold text-[#0A1A2F] mb-3">Specialist Lawyers</h4>
                          <div className="space-y-2">
                            {area.lawyers.map((lawyer, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-[#CBA054] rounded-full"></div>
                                <span className="text-gray-600">{lawyer}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full bg-[#0A1A2F] text-white py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 mt-6 flex items-center justify-center space-x-2">
                        <span>Schedule Consultation</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Legal Documents */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
              <h3 className="text-xl font-bold text-[#0A1A2F] mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#CBA054]" />
                Legal Resources
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Download our free legal guides and resources to help you understand your legal rights and options.
              </p>
              
              <div className="space-y-3">
                {legalDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    className="w-full flex items-center justify-between p-4 bg-[#F4EEDC] rounded-lg hover:bg-[#CBA054] hover:text-white transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-[#0A1A2F] group-hover:text-white">
                        {doc.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm group-hover:text-white">
                          {doc.title}
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-white/80">
                          {doc.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 group-hover:text-white/80">
                        {doc.format} • {doc.size}
                      </span>
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Need Legal Help?</h3>
              <p className="text-white/80 text-sm mb-4">
                Contact us for a free initial consultation to discuss your legal needs.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#CBA054]" />
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#CBA054]" />
                  <span>Free Initial Consultation</span>
                </div>
              </div>
              <button className="w-full bg-[#CBA054] text-white py-3 rounded-lg font-semibold hover:bg-[#DBAE5D] transition-all duration-300 mt-4">
                Call: 0203 488 0953
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
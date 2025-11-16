import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Home, 
  Building, 
  Scale, 
  Users, 
  Home as HomeIcon, 
  Shield, 
  FileText,
  Download,
  File,
  BookOpen,
  Clock,
  Award,
  Phone,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const breadcrumbs = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Services', path: '/services', current: true }
  ];

  const practiceAreas = [
    {
      id: 'business',
      title: "Business Law",
      icon: <Building className="w-8 h-8" />,
      description: "Comprehensive legal solutions for businesses of all sizes, from startups to multinational corporations.",
      features: [
        "Business Formation & Structure",
        "Contract Drafting & Review",
        "Mergers & Acquisitions",
        "Corporate Compliance",
        "Commercial Litigation",
        "Intellectual Property"
      ],
      stats: [
        { value: "500+", label: "Businesses Served" },
        { value: "98%", label: "Success Rate" },
        { value: "15+", label: "Years Experience" }
      ]
    },
    {
      id: 'personal',
      title: "Personal Law",
      icon: <Users className="w-8 h-8" />,
      description: "Compassionate legal guidance for individuals and families facing personal legal challenges.",
      features: [
        "Family Law & Divorce",
        "Immigration Services",
        "Estate Planning",
        "Personal Contracts",
        "Child Custody",
        "Mediation Services"
      ],
      stats: [
        { value: "300+", label: "Families Helped" },
        { value: "95%", label: "Client Satisfaction" },
        { value: "12+", label: "Years Experience" }
      ]
    },
    {
      id: 'property',
      title: "Property Law",
      icon: <HomeIcon className="w-8 h-8" />,
      description: "Expert legal services for residential and commercial property transactions and disputes.",
      features: [
        "Real Estate Transactions",
        "Leasing & Tenancy",
        "Property Development",
        "Zoning Compliance",
        "Property Disputes",
        "Title Verification"
      ],
      stats: [
        { value: "£500M+", label: "Property Value" },
        { value: "97%", label: "Success Rate" },
        { value: "18+", label: "Years Experience" }
      ]
    },
    {
      id: 'dispute',
      title: "Dispute Resolution",
      icon: <Scale className="w-8 h-8" />,
      description: "Strategic representation in litigation and alternative dispute resolution processes.",
      features: [
        "Civil Litigation",
        "Commercial Disputes",
        "Mediation Services",
        "Arbitration",
        "Settlement Negotiations",
        "Appellate Practice"
      ],
      stats: [
        { value: "95%", label: "Favorable Outcomes" },
        { value: "400+", label: "Cases Resolved" },
        { value: "20+", label: "Years Experience" }
      ]
    },
    {
      id: 'defense',
      title: "Criminal Defense",
      icon: <Shield className="w-8 h-8" />,
      description: "Aggressive defense representation for criminal charges at all levels.",
      features: [
        "Felony Defense",
        "Misdemeanor Cases",
        "Federal Crimes",
        "Appeals Process",
        "Record Expungement",
        "Bail Hearings"
      ],
      stats: [
        { value: "1000+", label: "Cases Handled" },
        { value: "90%", label: "Success Rate" },
        { value: "25+", label: "Years Experience" }
      ]
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
         

          <h1 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight">
            Our Practice Areas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal services across multiple practice areas. 
            Our experienced attorneys provide expert counsel and representation tailored to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Practice Areas Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceAreas.map((area) => (
                <div 
                  key={area.id}
                  className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 group flex flex-col h-full"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-[#0A1A2F] to-[#1E354F] p-6 text-center flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {area.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {area.title}
                    </h3>
                    <p className="text-[#E8EEF4] text-sm leading-relaxed min-h-[60px] flex items-center justify-center">
                      {area.description}
                    </p>
                  </div>

                  {/* Card Features */}
                  <div className="p-6 flex-grow flex flex-col">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {area.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#CBA054] rounded-full flex-shrink-0"></div>
                          <span className="text-[#0A1A2F] text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                  

                    {/* Learn More Button */}
                    <Link
                      to={`/services/${area.id}`}
                      className="w-full bg-gradient-to-r from-[#CBA054] to-[#DBAE5D] text-white py-3 rounded-lg font-semibold hover:bg-[#0A1A2F] hover:from-[#0A1A2F] hover:to-[#0A1A2F] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group/btn mt-auto"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Legal Documents */}
          <div className="space-y-6">
            {/* Legal Resources Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0A1A2F]">Legal Resources</h3>
                  <p className="text-gray-600 text-sm">Free guides and documents</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {legalDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#F4EEDC] to-[#E8EEF4] rounded-xl hover:from-[#CBA054] hover:to-[#DBAE5D] hover:text-white transition-all duration-300 group transform hover:scale-105 border border-[#E8EEF4]"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-[#0A1A2F] group-hover:text-white">
                        {doc.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm group-hover:text-white text-left">
                          {doc.title}
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-white/80 text-left">
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

            {/* Quick Contact Card */}
            <div className="bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Need Legal Help?</h3>
                  <p className="text-white/80 text-sm">Free initial consultation</p>
                </div>
              </div>
              
              <p className="text-white/80 text-sm mb-4">
                Contact us for a free initial consultation to discuss your legal needs.
              </p>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#CBA054]" />
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#CBA054]" />
                  <span>Free Initial Consultation</span>
                </div>
              </div>
              <button className="w-full bg-[#CBA054] text-white py-3 rounded-lg font-semibold hover:bg-[#DBAE5D] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Call: 0203 488 0953</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
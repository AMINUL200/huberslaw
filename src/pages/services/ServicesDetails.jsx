import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  Home, 
  FileText, 
  Download, 
  Clock, 
  Award, 
  Users,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

const ServicesDetails = () => {
  const { serviceSlug } = useParams();
  
  // Dummy data for service details
  const serviceDetails = {
    'corporate-law': {
      title: 'Corporate Law',
      description: `
        <div class="space-y-6">
          <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-6">
            Corporate Legal Services
          </h2>

          <p class="text-lg text-gray-700 leading-relaxed">
            At <strong class="text-[#0A1A2F]">Hubers Law</strong>, we provide comprehensive corporate legal services 
            designed to help businesses of all sizes navigate complex legal landscapes. Our experienced corporate 
            lawyers combine legal expertise with business acumen to deliver practical solutions.
          </p>

          <div class="bg-[#F4EEDC] rounded-xl p-6 border-l-4 border-[#CBA054]">
            <h3 class="text-xl font-bold text-[#0A1A2F] mb-3">Our Approach</h3>
            <p class="text-gray-700 italic">
              "We don't just provide legal advice; we become strategic partners in your business growth, 
              helping you anticipate challenges and capitalize on opportunities."
            </p>
          </div>

          <h3 class="text-2xl font-bold text-[#0A1A2F] mt-8 mb-4">Core Services</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h4 class="font-semibold text-[#0A1A2F]">Business Formation</h4>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Company incorporation and registration</li>
                <li>Partnership agreements</li>
                <li>LLC formation and structuring</li>
                <li>Shareholder agreements</li>
              </ul>
            </div>
            <div class="space-y-3">
              <h4 class="font-semibold text-[#0A1A2F]">Mergers & Acquisitions</h4>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Due diligence investigations</li>
                <li>Transaction structuring</li>
                <li>Negotiation and documentation</li>
                <li>Post-merger integration</li>
              </ul>
            </div>
            <div class="space-y-3">
              <h4 class="font-semibold text-[#0A1A2F]">Corporate Governance</h4>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Board advisory services</li>
                <li>Compliance programs</li>
                <li>Director responsibilities</li>
                <li>Annual compliance</li>
              </ul>
            </div>
            <div class="space-y-3">
              <h4 class="font-semibold text-[#0A1A2F]">Commercial Contracts</h4>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Supplier and vendor agreements</li>
                <li>Service level agreements</li>
                <li>Distribution agreements</li>
                <li>Joint venture agreements</li>
              </ul>
            </div>
          </div>

         

         
        </div>
      `,
      documents: [
        {
          id: 1,
          title: 'Corporate Legal Requirements Guide',
          description: 'Comprehensive guide to corporate legal obligations',
          format: 'PDF',
          size: '2.8 MB',
          icon: <FileText className="w-6 h-6" />
        },
        {
          id: 2,
          title: 'Business Formation Checklist',
          description: 'Step-by-step business setup guide',
          format: 'PDF',
          size: '1.5 MB',
          icon: <FileText className="w-6 h-6" />
        },
        {
          id: 3,
          title: 'M&A Due Diligence Template',
          description: 'Comprehensive due diligence checklist',
          format: 'DOCX',
          size: '2.1 MB',
          icon: <FileText className="w-6 h-6" />
        },
        {
          id: 4,
          title: 'Corporate Governance Framework',
          description: 'Best practices for corporate governance',
          format: 'PDF',
          size: '3.2 MB',
          icon: <FileText className="w-6 h-6" />
        }
      ],
      contactInfo: {
        specialist: 'John Smith',
        email: 'corporate@huberslaw.co.uk',
        phone: '0203 488 0951',
        consultation: 'Free 30-minute consultation'
      }
    },
    'family-law': {
      title: 'Family Law',
      description: `
        <div class="space-y-6">
          <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-6">
            Family Law Services
          </h2>

          <p class="text-lg text-gray-700 leading-relaxed">
            Our <strong class="text-[#0A1A2F]">Family Law</strong> team provides compassionate and expert legal 
            guidance during some of life's most challenging moments. We approach each case with sensitivity 
            while vigorously protecting your rights and interests.
          </p>

          <div class="bg-[#F4EEDC] rounded-xl p-6 border-l-4 border-[#CBA054]">
            <h3 class="text-xl font-bold text-[#0A1A2F] mb-3">Our Philosophy</h3>
            <p class="text-gray-700 italic">
              "We believe in resolving family disputes with dignity and respect, focusing on solutions 
              that protect your family's future while minimizing conflict."
            </p>
          </div>

          <h3 class="text-2xl font-bold text-[#0A1A2F] mt-8 mb-4">Our Family Law Services</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h4 class="font-semibold text-[#0A1A2F]">Divorce & Separation</h4>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Uncontested and contested divorce</li>
                <li>Legal separation agreements</li>
                <li>Asset division and valuation</li>
                <li>Spousal support matters</li>
              </ul>
            </div>
            <div class="space-y-3">
              <h4 class="font-semibold text-[#0A1A2F]">Child-Related Matters</h4>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Child custody and access</li>
                <li>Child support calculations</li>
                <li>Parenting plans and agreements</li>
                <li>Relocation disputes</li>
              </ul>
            </div>
            <div class="space-y-3">
              <h4 class="font-semibold text-[#0A1A2F]">Family Agreements</h4>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Prenuptial agreements</li>
                <li>Cohabitation agreements</li>
                <li>Separation agreements</li>
                <li>Mediation services</li>
              </ul>
            </div>
            <div class="space-y-3">
              <h4 class="font-semibold text-[#0A1A2F]">Other Services</h4>
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Adoption proceedings</li>
                <li>Surrogacy arrangements</li>
                <li>Domestic violence protection</li>
                <li>Grandparents' rights</li>
              </ul>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-[#0A1A2F] mt-8 mb-4">Our Approach to Family Law</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center p-4">
              <Users className="w-8 h-8 text-[#CBA054] mx-auto mb-2" />
              <div class="font-semibold text-[#0A1A2F]">Client-Focused</div>
              <div class="text-gray-600 text-sm mt-1">Your needs and goals come first</div>
            </div>
            <div class="text-center p-4">
              <Award className="w-8 h-8 text-[#CBA054] mx-auto mb-2" />
              <div class="font-semibold text-[#0A1A2F]">Expert Guidance</div>
              <div class="text-gray-600 text-sm mt-1">20+ years combined experience</div>
            </div>
            <div class="text-center p-4">
              <Clock className="w-8 h-8 text-[#CBA054] mx-auto mb-2" />
              <div class="font-semibold text-[#0A1A2F]">Timely Resolution</div>
              <div class="text-gray-600 text-sm mt-1">Efficient case management</div>
            </div>
          </div>
        </div>
      `,
      documents: [
        {
          id: 1,
          title: 'Divorce Process Guide',
          description: 'Understanding the divorce process step-by-step',
          format: 'PDF',
          size: '2.1 MB',
          icon: <FileText className="w-6 h-6" />
        },
        {
          id: 2,
          title: 'Child Support Calculator',
          description: 'Worksheet for estimating child support',
          format: 'XLSX',
          size: '1.2 MB',
          icon: <FileText className="w-6 h-6" />
        },
        {
          id: 3,
          title: 'Parenting Plan Template',
          description: 'Customizable parenting agreement template',
          format: 'DOCX',
          size: '1.8 MB',
          icon: <FileText className="w-6 h-6" />
        },
        {
          id: 4,
          title: 'Family Law Rights Guide',
          description: 'Understanding your legal rights in family matters',
          format: 'PDF',
          size: '2.5 MB',
          icon: <FileText className="w-6 h-6" />
        }
      ],
      contactInfo: {
        specialist: 'Sarah Johnson',
        email: 'family@huberslaw.co.uk',
        phone: '0203 488 0952',
        consultation: 'Complimentary initial meeting'
      }
    }
  };

  // Get current service data or default to corporate law
  const service = serviceDetails[serviceSlug] || serviceDetails['corporate-law'];
  
  const breadcrumbs = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Services', path: '/services' },
    { name: service.title, path: '#', current: true }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Side - Service Description */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          </div>

          {/* Right Side - Documents & Contact */}
          <div className="space-y-6">
            {/* Documents Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] p-6">
              <h3 className="text-xl font-bold text-[#0A1A2F] mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#CBA054]" />
                Legal Resources
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Download our free guides and resources related to {service.title}.
              </p>
              
              <div className="space-y-3">
                {service.documents.map((doc) => (
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

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetails;
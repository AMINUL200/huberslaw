import React, { useState } from 'react';
import { Scale, Building, Users, Home, Shield, Briefcase, Globe, FileText, ChevronRight, Phone, Calendar } from 'lucide-react';

const OurPracticeAreas = () => {
  const [activeCategory, setActiveCategory] = useState('business');

  const practiceAreas = {
    business: {
      title: "Business Law",
      icon: <Building className="w-12 h-12" />,
      description: "Have a Business solicitor who you can genuinely trust for the types of business law issues that may emerge when you are trading, helps you to concentrate on other business matters and gives you more time and resources to run your business.",
      content: [
        {
          title: "Expert Legal Support for Your Business",
          text: "Different business owners get in touch with Hubers Law because the huge expertise they can get from the leading network of law firms may make a great and positive changing on their way of doing business."
        },
        {
          title: "Get the Legal Advice You Need",
          text: "Are you willing to have business legal advice now? Have you been thinking about taking some legal advice in business matters? Are you researching business law? Do you own a business, or have you been thinking about owning a business?"
        },
        {
          title: "Business Leases and Licences",
          text: "Deciding on whether to use or agree to a lease or a licence is an important step. There are main differences which Hubers Law can advice you on. Should you choose a licence or a lease? The answer is not straight, it depends Characteristics to be clear about include the presence of regular periodic payments and a specific end-date to the agreement."
        },
        {
          title: "Protect Your Business Rights",
          text: "By signing to a wrong agreement, you might not have your rights protected which can hugely affect your business. Hubers Law provides business advices on how to set up the right agreement, on drafting of a lease or a license, clarifying their terms, obligations and liabilities without resource to legal jargon."
        },
        {
          title: "Expert Guidance Every Step of the Way",
          text: "Our expert advisors' team work closely with you, deal with any issue and make sure the costs, timescales and that most probable outcome are clear for you. If your licence or lease needs to be amended, or it is time for renewal, we can also provide you help on this matter."
        }
      ],
      cta: {
        title: "Making the Right Legal Decisions for Your Business",
        description: "As you are a business owner and an expert in your sector, if you are concerned about any legal obligation affecting your business, we guarantee you that we can work jointly with you in order to guide you along the way. Undoubtedly, while running your business, you will want expert legal help you can rely on, so get in touch with Hubers Law and then continue to trade safely in the knowledge that you are in good hands.",
        phone: "0203 488 0953"
      }
    },
    personal: {
      title: "Personal Law",
      icon: <Users className="w-12 h-12" />,
      description: "Comprehensive personal legal services including family law, immigration, and other personal legal matters. We provide compassionate and expert guidance for your personal legal needs.",
      content: [
        {
          title: "Family Law Services",
          text: "We handle divorce, child custody, adoption, and family mediation with compassion and expertise. Our family law attorneys understand the emotional challenges you face and provide supportive legal guidance."
        },
        {
          title: "Immigration Law Support",
          text: "Our immigration lawyers assist with visa applications, citizenship, deportation defense, and business immigration services. We help navigate complex immigration processes with care and precision."
        },
        {
          title: "Personal Legal Protection",
          text: "From estate planning to personal contracts, we ensure your personal legal matters are handled with the utmost care and attention to detail."
        },
        {
          title: "Client-Centered Approach",
          text: "We understand that personal legal matters can be stressful. Our team provides clear communication and compassionate support throughout your legal journey."
        }
      ],
      cta: {
        title: "Protecting Your Personal Rights",
        description: "Your personal life deserves expert legal protection. Whether you're dealing with family matters, immigration issues, or other personal legal concerns, our team is here to provide the guidance and support you need.",
        phone: "0203 488 0953"
      }
    },
    property: {
      title: "Property Law",
      icon: <Home className="w-12 h-12" />,
      description: "Expert legal services for all property matters including transactions, leasing, zoning, and real estate development. Protect your property investments with our experienced team.",
      content: [
        {
          title: "Real Estate Transactions",
          text: "We handle residential and commercial property transactions, ensuring smooth and legally sound transfers of ownership for buyers and sellers."
        },
        {
          title: "Leasing and Tenancy",
          text: "Our property lawyers draft and review leases, handle tenant disputes, and ensure your property rights are protected in all leasing arrangements."
        },
        {
          title: "Zoning and Development",
          text: "Navigate complex zoning regulations and development requirements with our expert guidance for your property development projects."
        },
        {
          title: "Property Disputes",
          text: "Resolve property boundary disputes, easement issues, and other property-related conflicts with our experienced litigation team."
        }
      ],
      cta: {
        title: "Secure Your Property Investments",
        description: "Property is often your most valuable asset. Our property law experts ensure your investments are protected and your transactions are handled with precision and care.",
        phone: "0203 488 0953"
      }
    },
    dispute: {
      title: "Dispute Resolution",
      icon: <Scale className="w-12 h-12" />,
      description: "Expert litigation and dispute resolution services for civil matters, commercial disputes, and courtroom representation. We fight for your rights with strategic legal advocacy.",
      content: [
        {
          title: "Civil Litigation",
          text: "Comprehensive civil litigation services for individuals and businesses, including contract disputes, personal injury claims, and commercial litigation."
        },
        {
          title: "Alternative Dispute Resolution",
          text: "We offer mediation and arbitration services as cost-effective alternatives to courtroom litigation when appropriate for your situation."
        },
        {
          title: "Appellate Practice",
          text: "Our experienced appellate lawyers handle appeals at both state and federal levels, providing strong representation for challenging legal decisions."
        },
        {
          title: "Settlement Negotiations",
          text: "Strategic settlement negotiations to resolve disputes efficiently while protecting your interests and achieving favorable outcomes."
        }
      ],
      cta: {
        title: "Resolve Your Legal Disputes Effectively",
        description: "Whether through negotiation, mediation, or courtroom litigation, our dispute resolution team provides aggressive representation and strategic guidance to protect your rights and interests.",
        phone: "0203 488 0953"
      }
    },
    defense: {
      title: "Criminal Defense",
      icon: <Shield className="w-12 h-12" />,
      description: "Aggressive defense representation for criminal charges at both state and federal levels. Protect your rights and freedom with our experienced criminal defense team.",
      content: [
        {
          title: "Felony and Misdemeanor Defense",
          text: "Comprehensive defense services for all criminal charges, from minor misdemeanors to serious felony cases."
        },
        {
          title: "Federal Criminal Defense",
          text: "Expert representation in federal court for complex criminal matters including white-collar crimes and federal offenses."
        },
        {
          title: "Appeals and Post-Conviction",
          text: "We handle criminal appeals and post-conviction relief to challenge unjust convictions and sentences."
        },
        {
          title: "Record Expungement",
          text: "Help clear your criminal record through expungement and sealing processes to move forward with your life."
        }
      ],
      cta: {
        title: "Protect Your Rights and Freedom",
        description: "Facing criminal charges can be overwhelming. Our criminal defense team provides aggressive representation and strategic defense to protect your rights, freedom, and future.",
        phone: "0203 488 0953"
      }
    }
  };

  const categories = [
    { id: 'business', label: 'Business Law' },
    { id: 'personal', label: 'Personal Law' },
    { id: 'property', label: 'Property Law' },
    { id: 'dispute', label: 'Dispute Resolution' },
    { id: 'defense', label: 'Criminal Defense' }
  ];

  const currentArea = practiceAreas[activeCategory];

  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
         

          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight">
            Our Practice Areas
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive legal services across multiple practice areas. Our experienced attorneys 
            provide expert counsel and representation tailored to your specific needs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-[#0A1A2F] text-white shadow-lg'
                  : 'bg-[#F4EEDC] text-[#0A1A2F] hover:bg-[#CBA054] hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-[#E8EEF4]">
          
          {/* Practice Area Header */}
          <div className="flex items-start space-x-6 mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center flex-shrink-0">
              <div className="text-white">
                {currentArea.icon}
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#0A1A2F] mb-4">
                {currentArea.title}
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                {currentArea.description}
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {currentArea.content.map((section, index) => (
              <div key={index} className="bg-[#F4EEDC] rounded-2xl p-6 border-l-4 border-[#CBA054]">
                <h4 className="text-xl font-semibold text-[#0A1A2F] mb-4">
                  {section.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
        

          {/* Additional Note for Business Law */}
          {activeCategory === 'business' && (
            <div className="mt-8 bg-[#F4EEDC] rounded-2xl p-6 border border-[#CBA054]/20">
              <p className="text-gray-600 text-center italic">
                We know that when you are running a business you would rather not assign precious time dealing with legal issues by yourself. Most business owners have so many other pressing things to do on their daily basis; this is the reason why you can feel good when you can confidently allocate your legal problem to an expert business advisor you can trust.
              </p>
              <p className="text-gray-600 text-center mt-4 font-semibold">
                At Hubers Law we make every effort to provide all our clients with valuable professional assistance; leaving them to get on with looking after their business while we focus on providing them with practical legal help and advice that can help boost or protect their business.
              </p>
            </div>
          )}
        </div>

     
      </div>
    </section>
  );
};

export default OurPracticeAreas;
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from 'lucide-react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: 'ℹ️',
      questions: [
        {
          question: "What areas of law does Hubers Law specialize in?",
          answer: "We specialize in multiple practice areas including Corporate Law, Litigation, Family Law, Real Estate, Criminal Defense, Employment Law, Immigration, and Intellectual Property. Our experienced attorneys provide comprehensive legal services tailored to your specific needs."
        },
        {
          question: "How do I schedule a consultation with Hubers Law?",
          answer: "You can schedule a consultation by calling our office at 0203 488 0953, using our online booking form, or requesting a callback through our website. We offer initial consultations to discuss your legal matters and how we can assist you."
        },
        {
          question: "What are your office hours?",
          answer: "Our standard office hours are Monday through Friday, 9:00 AM to 6:00 PM. However, we understand that legal issues don't always occur during business hours, so we offer flexible appointment times including evenings and weekends by prior arrangement."
        }
      ]
    },
    {
      id: 'business',
      title: 'Business Law',
      icon: '💼',
      questions: [
        {
          question: "What business legal services do you offer?",
          answer: "We provide comprehensive business legal services including business formation, mergers and acquisitions, contract drafting and review, corporate governance, compliance matters, commercial transactions, and business dispute resolution for companies of all sizes."
        },
        {
          question: "How can you help with business contracts?",
          answer: "Our business law team reviews, drafts, and negotiates various contracts including partnership agreements, employment contracts, vendor agreements, service contracts, and licensing agreements. We ensure your contracts protect your interests and comply with relevant laws."
        },
        {
          question: "What should I consider when starting a business?",
          answer: "When starting a business, consider the legal structure (LLC, corporation, partnership), regulatory requirements, intellectual property protection, employment laws, tax obligations, and contractual relationships. We guide you through each step to ensure proper legal foundation."
        }
      ]
    },
    {
      id: 'personal',
      title: 'Personal Law',
      icon: '👨‍👩‍👧‍👦',
      questions: [
        {
          question: "How do you handle family law cases?",
          answer: "We handle family law matters with compassion and expertise, including divorce, child custody, adoption, and mediation. Our approach focuses on achieving the best possible outcome while minimizing emotional stress for all parties involved."
        },
        {
          question: "What immigration services do you provide?",
          answer: "Our immigration services include visa applications, citizenship processes, deportation defense, asylum cases, family-based immigration, and business immigration. We stay updated on immigration law changes to provide current and effective representation."
        },
        {
          question: "Can you help with estate planning?",
          answer: "Yes, we assist with comprehensive estate planning including wills, trusts, power of attorney, healthcare directives, and probate matters. We help ensure your assets are protected and distributed according to your wishes."
        }
      ]
    },
    {
      id: 'fees',
      title: 'Fees & Process',
      icon: '💰',
      questions: [
        {
          question: "What are your fee structures?",
          answer: "We offer various fee structures including hourly rates, flat fees for specific services, and contingency fees where appropriate. During our initial consultation, we'll discuss the best fee arrangement for your particular case and provide transparent cost estimates."
        },
        {
          question: "Do you offer free initial consultations?",
          answer: "Yes, we offer complimentary initial consultations to discuss your legal matter, assess your situation, and explain how we can help. This allows you to understand your options and make an informed decision about moving forward."
        },
        {
          question: "How long does a typical case take?",
          answer: "Case duration varies significantly depending on complexity, court schedules, and specific circumstances. Simple matters may resolve in weeks, while complex litigation can take months or years. We provide realistic timelines during our initial assessment."
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.title }))
  );

  const filteredQuestions = searchTerm 
    ? allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allQuestions;

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-10 lg:py-16 bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4]">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          

          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Find answers to common questions about our legal services, processes, and how we can help you with your specific legal needs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#E8EEF4] bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CBA054]/20 focus:border-[#CBA054] transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {searchTerm ? (
            // Search Results
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#0A1A2F] mb-6">
                Search Results ({filteredQuestions.length})
              </h3>
              {filteredQuestions.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xs font-semibold text-[#CBA054] bg-[#F4EEDC] px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#0A1A2F] pr-8">
                        {item.question}
                      </h3>
                    </div>
                    {activeIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-[#CBA054] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 pb-5">
                      <div className="w-12 h-1 bg-linear-to-r from-[#CBA054] to-[#DBAE5D] rounded-full mb-4"></div>
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Categorized FAQ
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={category.id} className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-linear-to-r from-[#0A1A2F] to-[#1E354F] px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-xl font-bold text-white">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="divide-y divide-[#E8EEF4]">
                    {category.questions.map((item, questionIndex) => {
                      const globalIndex = categoryIndex * category.questions.length + questionIndex;
                      return (
                        <div key={questionIndex} className="group">
                          <button
                            onClick={() => toggleQuestion(globalIndex)}
                            className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[#F4EEDC] transition-all duration-200 group-hover:border-l-4 group-hover:border-[#CBA054]"
                          >
                            <h3 className="text-lg font-semibold text-[#0A1A2F] pr-8 flex-1">
                              {item.question}
                            </h3>
                            {activeIndex === globalIndex ? (
                              <ChevronUp className="w-5 h-5 text-[#CBA054] flex-shrink-0 transform group-hover:scale-110 transition-transform" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 transform group-hover:scale-110 transition-transform" />
                            )}
                          </button>
                          {activeIndex === globalIndex && (
                            <div className="px-6 pb-5 bg-[#F4EEDC]/30">
                              <div className="w-12 h-1 bg-linear-to-r from-[#CBA054] to-[#DBAE5D] rounded-full mb-4"></div>
                              <p className="text-gray-600 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

       
      </div>
    </section>
  );
};

export default FAQSection;
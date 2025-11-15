import React from 'react';
import { HelpCircle, Users, Layers, Target } from 'lucide-react';

const WhyHireSolicitorTalent = () => {
  const features = [
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: "Helpful",
      description: "Our solicitors provide comprehensive support and guidance throughout your legal journey, ensuring you understand every step of the process.",
      color: "from-[#CBA054] to-[#DBAE5D]"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Experienced",
      description: "With decades of combined experience, our legal team brings deep expertise and proven strategies to handle even the most complex cases.",
      color: "from-[#0A1A2F] to-[#1E354F]"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Solid Foundation",
      description: "Built on strong legal principles and ethical standards, we provide reliable counsel that stands the test of time and legal scrutiny.",
      color: "from-[#CBA054] to-[#DBAE5D]"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Different Approach",
      description: "We believe in innovative legal solutions tailored to your unique situation, offering fresh perspectives and creative problem-solving.",
      color: "from-[#0A1A2F] to-[#1E354F]"
    }
  ];

  return (
    <section className="py-4 lg:py-8 bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4]">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Section Label */}
          {/* <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
            <span className="text-sm font-semibold text-[#CBA054] uppercase tracking-wide">
              Why Choose Us
            </span>
          </div> */}

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight">
            Why Hire Solicitor Talent?
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover the unique advantages of working with our dedicated legal team. 
            We combine expertise with innovation to deliver exceptional results for our clients.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-[#F4EEDC] to-transparent rounded-tr-2xl rounded-bl-2xl opacity-50"></div>
              
              {/* Icon Container */}
              <div className={`relative z-10 w-20 h-20 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
                
                {/* Icon Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <div className="w-2 h-2 rounded-full bg-[#CBA054]"></div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-2xl font-bold text-[#0A1A2F] mb-4 group-hover:text-[#CBA054] transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Read More Link */}
                <div className="flex items-center space-x-2 text-[#0A1A2F] group-hover:text-[#CBA054] transition-colors duration-300">
                  <span className="font-semibold text-sm">Learn more</span>
                  <div className="w-4 h-4 bg-[#CBA054] rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#CBA054] transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyHireSolicitorTalent;
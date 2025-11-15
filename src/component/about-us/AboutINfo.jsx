import {
  Award,
  HelpCircle,
  Users,
  Layers,
  Target,
  ArrowRight,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AboutINfo = ({ values = [], teamMembers = [] }) => {
  const navigate = useNavigate();
  // Icon cards data
  const iconCards = [
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: "Helpful",
      description:
        "Our solicitors provide comprehensive support and guidance throughout your legal journey, ensuring you understand every step of the process.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Experienced",
      description:
        "With decades of combined experience, our legal team brings deep expertise and proven strategies to handle even the most complex cases.",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Solid Foundation",
      description:
        "Built on strong legal principles and ethical standards, we provide reliable counsel that stands the test of time and legal scrutiny.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Different Approach",
      description:
        "We believe in innovative legal solutions tailored to your unique situation, offering fresh perspectives and creative problem-solving.",
    },
  ];

  // Sample HTML content from admin text editor
  const adminDescription = `
    <div class="space-y-4">
      <p class="text-lg text-gray-600 leading-relaxed">
        At <strong class="text-[#0A1A2F]">Hubers Law</strong>, we have been providing exceptional legal services since 2003. Our commitment to excellence and client satisfaction has made us one of the most trusted law firms in the United Kingdom.
      </p>
      
      <p class="text-lg text-gray-600 leading-relaxed">
        Our team of <span class="text-[#CBA054] font-semibold">highly qualified solicitors</span> specializes in various practice areas, ensuring that we can handle any legal challenge you may face. We pride ourselves on our personalized approach and attention to detail.
      </p>

      <div class="bg-[#F4EEDC] rounded-xl p-6 border-l-4 border-[#CBA054] my-6">
        <h3 class="text-xl font-bold text-[#0A1A2F] mb-3">Why Choose Hubers Law?</h3>
        <ul class="list-disc list-inside space-y-2 text-gray-600">
          <li>Over 20 years of combined legal experience</li>
          <li>Personalized approach to every case</li>
          <li>Transparent pricing and communication</li>
          <li>Proven track record of success</li>
        </ul>
      </div>

      <p class="text-lg text-gray-600 leading-relaxed">
        We believe in building <em>long-lasting relationships</em> with our clients based on trust, respect, and outstanding results. Your legal matters are our priority, and we are committed to achieving the best possible outcomes for you.
      </p>
    </div>
  `;

  return (
    <div className="space-y-16">
      {/* Section 1: Icon Cards */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-4">
            Why Choose Hubers Law?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what sets us apart and makes us the right choice for your
            legal needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {iconCards.map((card, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#E8EEF4] text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">{card.icon}</div>
              </div>

              <h3 className="text-xl font-bold text-[#0A1A2F] mb-3 group-hover:text-[#CBA054] transition-colors duration-300">
                {card.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Admin Description with HTML */}
      <section className="bg-gradient-to-r from-[#F4EEDC] to-[#E8EEF4] rounded-2xl p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-8 text-center">
            Our Story & Mission
          </h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: adminDescription }}
          />
        </div>
      </section>

      {/* Section 3: Meet Our Team */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1A2F] mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get to know the experienced legal professionals who will be handling
            your case.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.slice(0, 4).map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E8EEF4] hover:shadow-2xl transition-all duration-300"
            >
              <div
                className="h-48 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${member.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-[#CBA054] font-semibold">{member.role}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Specialty</span>
                    <span className="text-sm font-semibold text-[#0A1A2F]">
                      {member.specialty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Experience</span>
                    <span className="text-sm font-semibold text-[#CBA054]">
                      {member.experience}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Education</span>
                    <span className="text-sm font-semibold text-[#0A1A2F]">
                      LLB, LLM
                    </span>
                  </div>
                </div>

                <Link
                  to={`/team/${member?.slug ? member.slug : member.name}`}
                  className="w-full bg-[#F4EEDC] text-[#0A1A2F] py-2 rounded-lg font-semibold hover:bg-[#CBA054] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Team Button */}
        <div className="text-center mt-12">
          <button  
          onClick={()=> navigate('/about-us?tab=people')}
          className="bg-[#0A1A2F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto group">
            <span>View All Team Members</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutINfo;

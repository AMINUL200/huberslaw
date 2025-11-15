import { Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Vacancies = ({ vacancies = [] }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {vacancies.map((vacancy) => (
          <div
            key={vacancy.id}
            className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#0A1A2F] mb-2">
                  {vacancy.title}
                </h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-[#CBA054]" />
                    <span>{vacancy.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Briefcase className="w-4 h-4 text-[#CBA054]" />
                    <span>{vacancy.type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-[#CBA054]" />
                    <span>{vacancy.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4 text-[#CBA054]" />
                    <span>{vacancy.experience}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{vacancy.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-[#0A1A2F] mb-2">
                    Requirements:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {vacancy.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm text-gray-500">
                  Posted: {vacancy.posted}
                </div>
              </div>
              <Link
                to="/contact-us"
                className="bg-[#0A1A2F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#CBA054] transition-all duration-300 whitespace-nowrap"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vacancies;

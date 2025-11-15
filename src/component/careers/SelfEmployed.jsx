import React from "react";
import { Link } from "react-router-dom";

const SelfEmployed = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] p-6">
          <h3 className="text-2xl font-bold text-[#0A1A2F] mb-4">
            Locum Solicitors
          </h3>
          <p className="text-gray-600 mb-4">
            Temporary positions for qualified solicitors to cover maternity
            leave, sabbaticals, or peak workload periods.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-[#CBA054] rounded-full mt-2 flex-shrink-0"></div>
              <span>Flexible duration assignments</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-[#CBA054] rounded-full mt-2 flex-shrink-0"></div>
              <span>Competitive daily rates</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-[#CBA054] rounded-full mt-2 flex-shrink-0"></div>
              <span>Various practice areas available</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] p-6">
          <h3 className="text-2xl font-bold text-[#0A1A2F] mb-4">
            Consultant Lawyers
          </h3>
          <p className="text-gray-600 mb-4">
            For experienced lawyers who want to maintain their own practice
            while benefiting from our infrastructure.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-[#CBA054] rounded-full mt-2 flex-shrink-0"></div>
              <span>Keep majority of your fees</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-[#CBA054] rounded-full mt-2 flex-shrink-0"></div>
              <span>Full administrative support</span>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-[#CBA054] rounded-full mt-2 flex-shrink-0"></div>
              <span>Access to firm's client base</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#0A1A2F] to-[#1E354F] rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">
          Interested in Flexible Work?
        </h3>
        <p className="text-white/80 mb-6">
          Contact our recruitment team to discuss self-employed or locum
          opportunities.
        </p>
        <Link 
        to="/contact-us"
        className="bg-[#CBA054] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#DBAE5D] transition-all duration-300">
          Get in Touch
        </Link>
      </div>
    </div>
  );
};

export default SelfEmployed;

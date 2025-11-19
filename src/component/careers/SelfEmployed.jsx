import React from "react";
import { Link } from "react-router-dom";

const SelfEmployed = ({ selfEmployedData = [] }) => {
  console.log("SelfEmployed Component Data:", selfEmployedData);

  // If no data is provided, show a loading state or empty message
  if (!selfEmployedData || selfEmployedData.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No self-employed opportunities available at the moment.
          </p>
          <p className="text-gray-400 mt-2">
            Please check back later or contact us for more information.
          </p>
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
            className="bg-[#CBA054] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#DBAE5D] transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Self-Employed Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {selfEmployedData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg border border-[#E8EEF4] p-6 hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-[#0A1A2F] mb-4">
              {item.title}
            </h3>

            {/* Render the description HTML safely */}
            <div
              className="self-employed-content prose "
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default SelfEmployed;

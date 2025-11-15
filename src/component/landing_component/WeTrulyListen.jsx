import React from 'react';

const WeTrulyListen = () => {
  return (
    <section className="relative py-10 lg:py-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-[#0A1A2F]/80"></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          
         

          {/* Big Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            We Truly Listen
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Your story matters. At Hubers Law, we begin every case by listening intently to your concerns, 
            understanding your unique situation, and building a legal strategy that reflects your goals and values. 
            Because when we truly listen, we can truly help.
          </p>

          {/* Single CTA Button */}
          {/* <button className="bg-[#CBA054] text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-[#DBAE5D] transition-all duration-300 transform hover:scale-105 shadow-xl">
            Share Your Story With Us
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default WeTrulyListen;
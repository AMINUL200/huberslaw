import React from "react";

const WeTrulyListen = ({ trulyListenData = {} }) => {

  const storageUrl = import.meta.env.VITE_APP_BASE_URL;

  // Build final background image URL
  const bgImage = trulyListenData?.image
    ? `${storageUrl}${trulyListenData.image}`
    : "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=2070&q=80";

  return (
    <section className="relative py-10 lg:py-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-[#0A1A2F]/80"></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Big Title */}
          <h1
            className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight"
            aria-label={trulyListenData?.title_meta || trulyListenData?.title}
          >
            {trulyListenData?.title || "We Truly Listen"}
          </h1>

          {/* Description */}
          <p
            className="text-xl text-white/90 mb-12 leading-relaxed"
            aria-label={
              trulyListenData?.description_meta || trulyListenData?.description
            }
          >
            {trulyListenData?.description ||
              "At Hubers Law, we believe that every client has a unique story. We take the time to listen, understand, and provide personalized legal solutions that truly address your needs."}
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

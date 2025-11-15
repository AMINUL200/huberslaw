import React from "react";

const AboutClientCare = () => {
  // Dummy object with HTML description
  const clientCareData = {
    description: `
      <div class="space-y-6">
        <p class="text-lg text-gray-700 leading-relaxed">
          At <strong class="text-[#0A1A2F]">Hubers Law</strong>, we believe that exceptional client care is the foundation of successful legal representation. Our commitment to you extends beyond just legal expertise to encompass every aspect of your experience with our firm.
        </p>

        <p class="text-lg text-gray-700 leading-relaxed">
          We understand that legal matters can be <span class="text-[#CBA054] font-semibold">stressful and complex</span>. That's why we've built our client care philosophy around <strong>transparency, communication, and personalized attention</strong>. From your initial consultation to the resolution of your case, you can expect the highest level of service.
        </p>

        <div class="bg-[#F4EEDC] rounded-xl p-6 border-l-4 border-[#CBA054]">
          <p class="text-[#0A1A2F] font-semibold text-lg italic">
            "Your satisfaction is our success. We measure our achievements by your satisfaction and the positive outcomes we deliver for our clients."
          </p>
        </div>

        <p class="text-lg text-gray-700 leading-relaxed">
          Our dedicated client care team ensures that your journey with us is smooth, informed, and supported at every step. We maintain <strong>open lines of communication</strong> and provide regular updates on your case progress.
        </p>

        <ul class="list-disc list-inside space-y-3 text-gray-700 ml-4">
          <li>Clear and transparent communication throughout your case</li>
          <li>Regular updates on case progress and developments</li>
          <li>Honest assessment of legal options and potential outcomes</li>
          <li>Respect for your time with prompt responses to inquiries</li>
          <li>Personalized legal strategies tailored to your specific needs</li>
        </ul>

        <p class="text-lg text-gray-700 leading-relaxed">
          We are proud of our <span class="text-[#CBA054] font-semibold">99% client satisfaction rate</span> and our commitment to continuous improvement based on client feedback. Your trust is our most valued asset, and we work tirelessly to maintain it.
        </p>
      </div>
    `
  };

  return (
    <div className="w-full mx-auto">
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: clientCareData.description }}
      />
    </div>
  );
};

export default AboutClientCare;
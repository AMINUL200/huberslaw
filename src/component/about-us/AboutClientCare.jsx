import React from "react";

const AboutClientCare = ({ clientCareInfo = {} }) => {
  

  return (
    <div className="w-full mx-auto">
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: clientCareInfo.client_desc }}
      />
    </div>
  );
};

export default AboutClientCare;

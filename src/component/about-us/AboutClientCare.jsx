import { Facebook, Linkedin, Mail, Twitter } from "lucide-react";
import React from "react";

const AboutClientCare = ({ clientCareInfo = {} }) => {
  return (
    <div className="w-full mx-auto">
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: clientCareInfo.client_desc }}
      />

      {/* Global Share Section */}
      <div className="mt-10 text-center">
        <h3 className="text-[#0A1A2F] font-semibold text-lg mb-4">SHARE :</h3>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
            title="Share on Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>

          {/* X / Twitter */}
          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )}&text=Meet our team members:`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
            title="Share on X / Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=Meet our legal team&body=${encodeURIComponent(
              window.location.href
            )}`}
            className="p-3 rounded-full bg-[#CBA054] text-white hover:bg-[#a68143] transition"
            title="Share via Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutClientCare;

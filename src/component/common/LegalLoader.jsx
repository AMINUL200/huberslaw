import React from 'react';

const LegalLoader = () => {
  return (
    <div className="fixed inset-0 bg-linear-to-br from-[#F4EEDC] to-[#E8EEF4] flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        
        {/* Main Loader Container */}
        <div className="relative">
          {/* Scales of Justice - More Realistic */}
          <div className="relative w-48 h-48 mx-auto">
            {/* Base Stand */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-linear-to-b from-[#0A1A2F] to-[#1E354F] rounded-t-lg"></div>
            
            {/* Center Column */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-3 h-32 bg-[#0A1A2F] rounded-t-lg"></div>
            
            {/* Crossbeam */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-[#0A1A2F] rounded-full">
              
              {/* Left Scale Chain & Pan */}
              <div className="absolute -left-4 top-0">
                <div className="w-1 h-16 bg-linear-to-b from-[#CBA054] to-[#DBAE5D] mx-auto animate-swing-left origin-top"></div>
                <div className="w-12 h-12 border-2 border-[#CBA054] rounded-full mt-1 flex items-center justify-center bg-white/80 shadow-lg animate-tilt-left">
                  <div className="w-8 h-8 bg-linear-to-br from-[#CBA054] to-[#DBAE5D] rounded-full animate-pulse-gold"></div>
                </div>
              </div>
              
              {/* Right Scale Chain & Pan */}
              <div className="absolute -right-4 top-0">
                <div className="w-1 h-16 bg-linear-to-b from-[#CBA054] to-[#DBAE5D] mx-auto animate-swing-right origin-top"></div>
                <div className="w-12 h-12 border-2 border-[#CBA054] rounded-full mt-1 flex items-center justify-center bg-white/80 shadow-lg animate-tilt-right">
                  <div className="w-8 h-8 bg-linear-to-br from-[#CBA054] to-[#DBAE5D] rounded-full animate-pulse-gold"></div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Animated Gavel */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-gavel-swing origin-top">
            <div className="flex flex-col items-center">
              {/* Handle */}
              <div className="w-3 h-16 bg-linear-to-b from-[#0A1A2F] to-[#1E354F] rounded-t-lg"></div>
              {/* Head */}
              <div className="w-8 h-6 bg-linear-to-r from-[#CBA054] to-[#DBAE5D] rounded-lg -mt-1 shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Document Stack Animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="relative w-12 h-16 bg-white border border-[#CBA054] rounded shadow-lg animate-document-stack"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Document Lines */}
              <div className="absolute top-3 left-2 right-2 space-y-1">
                <div className="h-1 bg-[#E8EEF4] rounded animate-pulse-line"></div>
                <div className="h-1 bg-[#E8EEF4] rounded w-3/4 animate-pulse-line" style={{ animationDelay: '0.1s' }}></div>
                <div className="h-1 bg-[#E8EEF4] rounded w-1/2 animate-pulse-line" style={{ animationDelay: '0.2s' }}></div>
              </div>
              {/* Stamp */}
              <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-[#CBA054] rounded-full animate-pulse-stamp"></div>
            </div>
          ))}
        </div>

        {/* Brand & Loading Text */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-linear-to-br from-[#CBA054] to-[#DBAE5D] rounded-lg flex items-center justify-center animate-glow">
              <svg
                width="20"
                height="20"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" />
                <path d="M16 24L24 14L32 24L24 34L16 24Z" fill="white" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#0A1A2F] animate-text-glow">
              Hubers Law
            </h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-[#1E354F] font-medium animate-typing">
              Securing Your Legal Foundation
            </p>
            <div className="flex items-center justify-center space-x-1">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className="w-2 h-2 bg-[#CBA054] rounded-full animate-bounce-dot"
                  style={{ animationDelay: `${dot * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-64 mx-auto">
          <div className="flex justify-between text-xs text-[#1E354F] mb-2">
            <span>Loading</span>
            <span className="animate-counting">0%</span>
          </div>
          <div className="w-full h-2 bg-[#E8EEF4] rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-[#CBA054] to-[#DBAE5D] rounded-full animate-progress-fill"></div>
          </div>
        </div>

        {/* Background Legal Elements */}
        
      </div>

      <style jsx>{`
        @keyframes swing-left {
          0%, 100% { 
            transform: rotate(-5deg);
          }
          50% { 
            transform: rotate(5deg);
          }
        }

        @keyframes swing-right {
          0%, 100% { 
            transform: rotate(5deg);
          }
          50% { 
            transform: rotate(-5deg);
          }
        }

        @keyframes tilt-left {
          0%, 100% { 
            transform: rotate(-2deg);
          }
          50% { 
            transform: rotate(2deg);
          }
        }

        @keyframes tilt-right {
          0%, 100% { 
            transform: rotate(2deg);
          }
          50% { 
            transform: rotate(-2deg);
          }
        }

        @keyframes pulse-gold {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(0.95);
          }
        }

        @keyframes gavel-swing {
          0% { 
            transform: translateX(-50%) rotate(-15deg);
          }
          50% { 
            transform: translateX(-50%) rotate(15deg);
          }
          100% { 
            transform: translateX(-50%) rotate(-15deg);
          }
        }

        @keyframes document-stack {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          25% { 
            transform: translateY(-5px) rotate(-1deg);
          }
          75% { 
            transform: translateY(-2px) rotate(1deg);
          }
        }

        @keyframes pulse-line {
          0%, 100% { 
            opacity: 0.6;
          }
          50% { 
            opacity: 1;
          }
        }

        @keyframes pulse-stamp {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(203, 160, 84, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(203, 160, 84, 0.6);
          }
        }

        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(10, 26, 47, 0.3);
          }
          50% { 
            text-shadow: 0 0 15px rgba(10, 26, 47, 0.6);
          }
        }

        @keyframes typing {
          0% { 
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            opacity: 0;
          }
        }

        @keyframes bounce-dot {
          0%, 100% { 
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-5px);
            opacity: 1;
          }
        }

        @keyframes progress-fill {
          0% { 
            width: 0%;
          }
          50% { 
            width: 70%;
          }
          100% { 
            width: 100%;
          }
        }

        @keyframes counting {
          0% { 
            content: "0%";
          }
          25% { 
            content: "25%";
          }
          50% { 
            content: "50%";
          }
          75% { 
            content: "75%";
          }
          100% { 
            content: "100%";
          }
        }

        @keyframes float-term {
          0% { 
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% { 
            opacity: 0.1;
          }
          90% { 
            opacity: 0.1;
          }
          100% { 
            transform: translateY(-100px) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes grid-move {
          0% { 
            transform: translateX(-100%);
          }
          100% { 
            transform: translateX(100%);
          }
        }

        .animate-swing-left {
          animation: swing-left 3s ease-in-out infinite;
        }

        .animate-swing-right {
          animation: swing-right 3s ease-in-out infinite;
        }

        .animate-tilt-left {
          animation: tilt-left 2s ease-in-out infinite;
        }

        .animate-tilt-right {
          animation: tilt-right 2s ease-in-out infinite;
        }

        .animate-pulse-gold {
          animation: pulse-gold 1.5s ease-in-out infinite;
        }

        .animate-gavel-swing {
          animation: gavel-swing 4s ease-in-out infinite;
        }

        .animate-document-stack {
          animation: document-stack 2s ease-in-out infinite;
        }

        .animate-pulse-line {
          animation: pulse-line 2s ease-in-out infinite;
        }

        .animate-pulse-stamp {
          animation: pulse-stamp 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }

        .animate-typing {
          animation: typing 3s ease-in-out infinite;
        }

        .animate-bounce-dot {
          animation: bounce-dot 1.5s ease-in-out infinite;
        }

        .animate-progress-fill {
          animation: progress-fill 3s ease-in-out infinite;
        }

        .animate-counting::after {
          content: "0%";
          animation: counting 3s steps(1) infinite;
        }

        .animate-float-term {
          animation: float-term linear infinite;
        }

        .animate-grid-move {
          animation: grid-move 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LegalLoader;
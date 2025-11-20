import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  User2, 
  Mail, 
  Users, 
  Package, 
  FileText, 
  Briefcase, 
  Settings,
  ArrowRight,
  MessageSquare,
  Home,
  Target,
  Heart,
  Building,
  Calendar
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const dashboardCards = [
   
    {
      id: "contact-us-messages",
      title: "Contact Messages",
      description: "View and manage incoming contact form messages",
      icon: <Mail className="w-8 h-8" />,
      path: "/admin/contact-us-messages",
      count: "45",
      metric: "New Messages",
      color: "from-[#0A1A2F] to-[#1E354F]",
      bgColor: "bg-[#F4EEDC]",
      textColor: "text-[#0A1A2F]",
      borderColor: "border-[#CBA054]"
    },
    {
      id: "homepage",
      title: "Homepage Management",
      description: "Manage banners, solicitor talent, and truly listen sections",
      icon: <Home className="w-8 h-8" />,
      path: "/admin/homepage/banners",
      count: "3",
      metric: "Sections",
      color: "from-[#0A1A2F] to-[#1E354F]",
      bgColor: "bg-[#F4EEDC]",
      textColor: "text-[#0A1A2F]",
      borderColor: "border-[#CBA054]"
    },
    {
      id: "services",
      title: "Services Management",
      description: "Handle all service offerings and descriptions",
      icon: <Package className="w-8 h-8" />,
      path: "/admin/handle-services",
      count: "12",
      metric: "Services",
      color: "from-[#0A1A2F] to-[#1E354F]",
      bgColor: "bg-[#F4EEDC]",
      textColor: "text-[#0A1A2F]",
      borderColor: "border-[#CBA054]"
    },
    {
      id: "team",
      title: "Team Management",
      description: "Manage team members and their profiles",
      icon: <Users className="w-8 h-8" />,
      path: "/admin/handle-team",
      count: "8",
      metric: "Team Members",
      color: "from-[#0A1A2F] to-[#1E354F]",
      bgColor: "bg-[#F4EEDC]",
      textColor: "text-[#0A1A2F]",
      borderColor: "border-[#CBA054]"
    },
    {
      id: "about",
      title: "About Us & Terms",
      description: "Manage about info and terms & conditions",
      icon: <FileText className="w-8 h-8" />,
      path: "/admin/handle-about",
      count: "2",
      metric: "Sections",
      color: "from-[#0A1A2F] to-[#1E354F]",
      bgColor: "bg-[#F4EEDC]",
      textColor: "text-[#0A1A2F]",
      borderColor: "border-[#CBA054]"
    },
    {
      id: "careers",
      title: "Careers Management",
      description: "Handle job vacancies, applications, and career content",
      icon: <Briefcase className="w-8 h-8" />,
      path: "/admin/handle-vacancies",
      count: "15",
      metric: "Open Jobs",
      color: "from-[#0A1A2F] to-[#1E354F]",
      bgColor: "bg-[#F4EEDC]",
      textColor: "text-[#0A1A2F]",
      borderColor: "border-[#CBA054]"
    },
    {
      id: "settings",
      title: "Site Settings",
      description: "Configure site-wide settings and preferences",
      icon: <Settings className="w-8 h-8" />,
      path: "/admin/site-settings",
      count: "1",
      metric: "Configuration",
      color: "from-[#0A1A2F] to-[#1E354F]",
      bgColor: "bg-[#F4EEDC]",
      textColor: "text-[#0A1A2F]",
      borderColor: "border-[#CBA054]"
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A1A2F] mb-2">Admin Dashboard</h1>
        <p className="text-[#1E354F]">Welcome back! Manage your website content and settings.</p>
      </div>

      
      {/* Quick Access Cards */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#0A1A2F] mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.path)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#E8EEF4] overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:border-[#CBA054]">
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${card.color} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#CBA054]/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#CBA054]/10 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="text-white">
                      {/* <p className="text-2xl font-bold">{card.count}</p> */}
                      <p className="text-white/80 text-sm mt-1">{card.metric}</p>
                    </div>
                    <div className="text-[#CBA054]">
                      {card.icon}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-[#0A1A2F] text-lg mb-2 group-hover:text-[#CBA054] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#1E354F] text-sm mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${card.bgColor} ${card.textColor} border border-[#CBA054]`}>
                      Manage
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#1E354F] group-hover:text-[#CBA054] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="bg-gradient-to-r from-[#CBA054] to-[#DBAE5D] h-1 w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#CBA054]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0A1A2F]/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Home,
  Home as HomeIcon,
  FileText,
  ArrowRight,
  Users as UserGroup,
  Eye as EyeIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../utils/app";
import LegalLoader from "../../component/common/LegalLoader";
import { getServiceIcon } from "../../utils/getServiceIcon";

const Services = () => {
  const [servicesData, setServicesData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pageInfo, setPageInfo] = React.useState({});

  // DEFAULT ICON
  const DEFAULT_ICON = <FileText className="w-8 h-8" />;

  const fetchServicesData = async () => {
    try {
      const response = await api.get("/service");

      if (response.data.status) {
        setServicesData(response.data.data);
        setPageInfo({
          title: response.data.data[0]?.page_heading || "Our Practice Areas",
          title_meta:
            response.data.data[0]?.page_heading_meta ||
            "Professional Legal Services",
          description:
            response.data.data[0]?.page_description ||
            "Comprehensive legal services across multiple practice areas. Our experienced attorneys provide expert counsel and representation tailored to your specific needs.",
          description_meta:
            response.data.data[0]?.page_desc_meta ||
            "Comprehensive legal services across multiple practice areas. Our experienced attorneys provide expert counsel and representation tailored to your specific needs.",
        });
      } else {
        toast.error("Failed to load services data.");
      }
    } catch (error) {
      console.error("Error fetching services data:", error);
      toast.error("Failed to load services data.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchServicesData();
  }, []);

  const breadcrumbs = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Services", path: "/services", current: true },
  ];

  if (loading) {
    return <LegalLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4EEDC] to-[#E8EEF4] pt-20 pb-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs with structured data */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol
            className="flex items-center space-x-2 text-sm text-gray-600"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbs.map((crumb, index) => (
              <li
                key={crumb.name}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                {crumb.current ? (
                  <span
                    className="text-[#0A1A2F] font-semibold flex items-center"
                    itemProp="name"
                    aria-current="page"
                  >
                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="hover:text-[#CBA054] transition-colors duration-200 flex items-center"
                    itemProp="item"
                  >
                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                    <span itemProp="name">{crumb.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            ))}
          </ol>
        </nav>

        {/* Page Header */}
        <header className="text-center mb-12">
          <h1
            className="text-4xl lg:text-5xl font-bold text-[#0A1A2F] mb-6 leading-tight"
            itemProp="headline"
          >
            {pageInfo.title}
          </h1>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            itemProp="description"
          >
            {pageInfo.description}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              itemScope
              itemType="https://schema.org/Service"
            >
              {servicesData.map((service, index) => (
                <article
                  key={service.id}
                  className="bg-white rounded-2xl shadow-xl border border-[#E8EEF4] overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-105 group flex flex-col h-full"
                  itemScope
                  itemType="https://schema.org/LegalService"
                >
                  {/* Header */}
                  <div className="bg-linear-to-br from-[#0A1A2F] to-[#1E354F] p-6 text-center flex-shrink-0">
                    <div className="w-16 h-16 bg-linear-to-br from-[#CBA054] to-[#DBAE5D] rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {getServiceIcon(service.service_name)}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {service.service_name}
                    </h2>
                    <p className="text-[#E8EEF4] text-sm leading-relaxed min-h-[60px]">
                      {service.service_description}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-grow flex flex-col">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {service.feature &&
                        service.feature
                          .slice(0, 4)
                          .map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-2 h-2 bg-[#CBA054] rounded-full"></div>
                              <span className="text-[#0A1A2F] text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                    </ul>

                    <Link
                      to={`/services/${service.slug}`}
                      className="w-full bg-gradient-to-r from-[#CBA054] to-[#DBAE5D] text-white py-3 rounded-lg font-semibold hover:from-[#0A1A2F] hover:to-[#0A1A2F] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mt-auto"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

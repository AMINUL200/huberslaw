// src/utils/getServiceIcon.jsx
import {
  Users,
  Heart,
  Building,
  FileText,
  Home,
  Scale,
  Gavel,
  Shield,
  Landmark,
  GitMerge,
  Briefcase,
} from "lucide-react";

// ⬇️ MASTER ICON MAP (you can put all common icons here)
const ICON_MAP = {
  // Personal / Family
  personal: Users,
  family: Heart,
  divorce: Heart,
  marriage: Heart,
  child: Users,
  custody: Users,

  // Business / Corporate
  business: Building,
  corporate: Briefcase,
  commercial: Building,
  contract: FileText,

  // Property / Real Estate
  property: Home,
  real: Home,
  estate: Home,
  housing: Home,
  land: Home,

  // Dispute / Litigation
  dispute: Scale,
  litigation: Gavel,
  resolution: Scale,
  mediation: Scale,
  arbitration: Scale,

  // Criminal
  criminal: Shield,
  defense: Shield,
  crime: Shield,

  // Government
  government: Landmark,
  administrative: Landmark,
  regulatory: Landmark,

  // Mergers
  mergers: GitMerge,
  acquisitions: GitMerge,

  // Immigration
  immigration: Users,
  visa: Users,
  citizenship: Users,

  // Employment
  employment: Briefcase,
  labor: Briefcase,
  workplace: Briefcase,

  // Intellectual property
  intellectual: FileText,
  patent: FileText,
  trademark: FileText,
  copyright: FileText,

  // Tax
  tax: Landmark,
  taxation: Landmark,

  // Bankruptcy
  bankruptcy: FileText,
  insolvency: FileText,

  // Environmental
  environmental: Landmark,
  environment: Landmark,
};

// Default fallback icon
const DEFAULT_ICON = Scale; 

// ⬇️ REUSABLE FUNCTION
export const getServiceIcon = (serviceName = "") => {
  if (!serviceName) return <DEFAULT_ICON className="w-8 h-8" />;

  const lower = serviceName.toLowerCase();

  // Exact match first
  if (ICON_MAP[lower]) {
    const Icon = ICON_MAP[lower];
    return <Icon className="w-8 h-8" />;
  }

  // Partial keyword match
  for (const key in ICON_MAP) {
    if (lower.includes(key)) {
      const Icon = ICON_MAP[key];
      return <Icon className="w-8 h-8" />;
    }
  }

  return <DEFAULT_ICON className="w-8 h-8" />;
};

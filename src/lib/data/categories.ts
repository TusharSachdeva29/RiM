import { 
  ToggleRight, 
  Power, 
  Grid3X3, 
  Cpu, 
  Shield, 
  Box, 
  Zap, 
  Plug, 
  Component, 
  Home, 
  Wrench 
} from "lucide-react";
import { getProductsByCategory, getAllProducts } from "./products";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  subcategories?: {
    id: string;
    name: string;
    slug: string;
  }[];
}

// Helper to get dynamic product count
export const getProductCount = (categorySlug: string): number => {
  return getProductsByCategory(categorySlug).length;
};

export const categories: Category[] = [
  {
    id: "change-over-switches",
    name: "Change Over Switches",
    slug: "change-over-switches",
    description: "High-quality change over switches for reliable power switching solutions",
    icon: ToggleRight,
    image: "/images/categories/change-over.jpg",
    subcategories: [
      { id: "u-type", name: "U Type Change Over", slug: "u-type" },
      { id: "knife-type", name: "Knife Type Change Over", slug: "knife-type" },
      { id: "automatic", name: "Automatic Change Over", slug: "automatic" },
    ],
  },
  {
    id: "main-switches",
    name: "Main Switches",
    slug: "main-switches",
    description: "Durable main switches for industrial and residential applications",
    icon: Power,
    image: "/images/categories/main-switch.jpg",
    subcategories: [
      { id: "rewireable", name: "Rewireable Type", slug: "rewireable" },
      { id: "hrc-type", name: "HRC Type", slug: "hrc-type" },
    ],
  },
  {
    id: "bus-bar-chambers",
    name: "Bus Bar Chambers",
    slug: "bus-bar-chambers",
    description: "Professional-grade bus bar chambers for power distribution",
    icon: Grid3X3,
    image: "/images/categories/bus-bar.jpg",
  },
  {
    id: "control-panels",
    name: "Control Panels",
    slug: "control-panels",
    description: "Advanced control panels and automation solutions",
    icon: Cpu,
    image: "/images/categories/control-panels.jpg",
    subcategories: [
      { id: "reverse-forward", name: "Reverse/Forward & LT Control", slug: "reverse-forward" },
      { id: "submersible", name: "Submersible Control Panels", slug: "submersible" },
      { id: "auto-switch", name: "Auto Switch for Submersible", slug: "auto-switch" },
      { id: "phase-changer", name: "Automatic Phase Changer", slug: "phase-changer" },
    ],
  },
  {
    id: "circuit-breakers",
    name: "Circuit Breakers",
    slug: "circuit-breakers",
    description: "Comprehensive range of MCB and MCCB for circuit protection",
    icon: Shield,
    image: "/images/categories/circuit-breakers.jpg",
    subcategories: [
      { id: "mcb", name: "Miniature Circuit Breaker (MCB)", slug: "mcb" },
      { id: "mccb", name: "Moulded Case Circuit Breaker (MCCB)", slug: "mccb" },
    ],
  },
  {
    id: "distribution-boxes",
    name: "Distribution Boxes",
    slug: "distribution-boxes",
    description: "MCB and MCCB boxes for safe electrical distribution",
    icon: Box,
    image: "/images/categories/distribution-boxes.jpg",
    subcategories: [
      { id: "single-door", name: "Single Door MCB Box", slug: "single-door" },
      { id: "double-door-fabricated", name: "Double Door Fabricated", slug: "double-door-fabricated" },
      { id: "double-door-draw", name: "Double Door Draw", slug: "double-door-draw" },
      { id: "mccb-box", name: "MCCB Box Universal", slug: "mccb-box" },
    ],
  },
  {
    id: "kit-kat-fuses",
    name: "Kit Kat Fuses",
    slug: "kit-kat-fuses",
    description: "Premium quality fuses in copper, brass, and T-type variants",
    icon: Zap,
    image: "/images/categories/kit-kat.jpg",
    subcategories: [
      { id: "copper-series", name: "Copper Series", slug: "copper-series" },
      { id: "brass-series", name: "Brass Series", slug: "brass-series" },
      { id: "t-type", name: "T Type", slug: "t-type" },
    ],
  },
  {
    id: "accessories",
    name: "Electrical Accessories",
    slug: "accessories",
    description: "Wide range of multiplugs, switches, and power accessories",
    icon: Plug,
    image: "/images/categories/accessories.jpg",
    subcategories: [
      { id: "multiplugs", name: "Multiplugs", slug: "multiplugs" },
      { id: "combined-switches", name: "Combined Switches with Box", slug: "combined-switches" },
      { id: "plugs", name: "Plugs & Power Strips", slug: "plugs" },
      { id: "holders", name: "Holders", slug: "holders" },
    ],
  },
  {
    id: "components",
    name: "Electrical Components",
    slug: "components",
    description: "Essential electrical components including capacitors and thimbles",
    icon: Component,
    image: "/images/categories/components.jpg",
    subcategories: [
      { id: "capacitors", name: "Capacitors", slug: "capacitors" },
      { id: "thimbles", name: "Thimbles", slug: "thimbles" },
      { id: "connectors", name: "DMC Terminal Connectors", slug: "connectors" },
    ],
  },
  {
    id: "appliances",
    name: "Electrical Appliances",
    slug: "appliances",
    description: "Practical electrical appliances for home and industrial use",
    icon: Home,
    image: "/images/categories/appliances.jpg",
  },
  {
    id: "spare-parts",
    name: "Spare Parts",
    slug: "spare-parts",
    description: "Comprehensive range of spare parts and accessories",
    icon: Wrench,
    image: "/images/categories/spare-parts.jpg",
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

export const getTotalProductCount = (): number => {
  return getAllProducts().length;
};

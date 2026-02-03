export interface Product {
  code: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  specifications: {
    amperage?: string;
    voltage?: string;
    pole?: string;
    type?: string;
    packaging?: string;
    size?: string;
    material?: string;
    horsepower?: string;
    protection?: string;
    [key: string]: string | undefined;
  };
  features?: string[];
  applications?: string[];
  images: {
    primary: string;
    gallery?: string[];
    technical?: string;
  };
  relatedProducts?: string[];
}

// Image folder mapping based on category/subcategory
const imageFolderMap: Record<string, string> = {
  "change-over-switches/u-type": "Change Over U-Type",
  "change-over-switches/knife-type": "Change Over Knife Type",
  "change-over-switches/automatic": "Automatic Change Over",
  "main-switches/rewireable": "Main Switch Rewireable",
  "main-switches/hrc-type": "Main Switch HRC",
  "bus-bar-chambers": "Bus Bar Chamber",
  "control-panels/submersible": "Submersible Panel",
  "control-panels/reverse-forward": "R_F & LT CONTROL",
  "control-panels/phase-changer": "Auto Phase Changer",
  "circuit-breakers/mcb": "MCB",
  "circuit-breakers/mccb": "MCCB",
  "distribution-boxes/single-door": "MCB DB SD",
  "distribution-boxes/double-door-draw": "MCB DB DD Draw",
  "junction-boxes": "Junction Box",
  "home-safes": "Home Safe",
  "louvers": "Louver",
  "ac-boxes": "AC Box",
  "spare-parts": "Spare Parts",
  "accessories": "Accessories Pic",
};

// Helper function to get the image path for a product
export const getProductImagePath = (product: Product): string => {
  const categoryKey = product.subcategory 
    ? `${product.category}/${product.subcategory}`
    : product.category;
  
  const folder = imageFolderMap[categoryKey] || imageFolderMap[product.category];
  
  if (folder) {
    // Try common image extensions
    return `/Images/${folder}/${product.code}.jpg`;
  }
  
  return product.images.primary || "/placeholder.svg";
};

// Sample products - will be expanded with catalog data
export const products: Record<string, Product> = {
  // Change Over Switches - U Type
  "601": {
    code: "601",
    name: "Change Over 16 Amp 240V",
    category: "change-over-switches",
    subcategory: "u-type",
    description: "Reliable 2-pole change over switch for residential and light commercial applications",
    specifications: {
      amperage: "16 Amp",
      voltage: "240V",
      pole: "2 POLE",
      type: "U Type",
    },
    features: [
      "Durable construction",
      "Smooth switching operation",
      "Fire-retardant housing",
      "Easy installation",
    ],
    applications: [
      "Residential power switching",
      "Small commercial setups",
      "Backup power management",
    ],
    images: {
      primary: "/Images/Change Over U-Type/602B.jpg",
    },
    relatedProducts: ["602", "603", "607"],
  },
  "602": {
    code: "602",
    name: "Change Over 32 Amp 240V",
    category: "change-over-switches",
    subcategory: "u-type",
    description: "Heavy-duty 2-pole change over switch for medium-load applications",
    specifications: {
      amperage: "32 Amp",
      voltage: "240V",
      pole: "2 POLE",
      type: "U Type",
    },
    features: [
      "High current capacity",
      "Robust design",
      "Long operational life",
      "Safe operation",
    ],
    applications: [
      "Commercial installations",
      "Industrial light loads",
      "Generator switching",
    ],
    images: {
      primary: "/Images/Change Over U-Type/602B.jpg",
      gallery: [
        "/Images/Change Over U-Type/602B (2).jpg",
        "/Images/Change Over U-Type/602B (3).jpg",
      ],
    },
    relatedProducts: ["601", "603", "608"],
  },
  // MCB Products
  "MCB1": {
    code: "MCB1",
    name: "MCB 10 AMP Single Pole",
    category: "circuit-breakers",
    subcategory: "mcb",
    description: "Single pole miniature circuit breaker for circuit protection",
    specifications: {
      amperage: "10 AMP",
      pole: "Single Pole (SP)",
      packaging: "12 pieces",
    },
    features: [
      "Trip-free mechanism",
      "Thermal and magnetic protection",
      "Compact design",
      "High breaking capacity",
    ],
    applications: [
      "Residential circuit protection",
      "Lighting circuits",
      "Small appliance circuits",
    ],
    images: {
      primary: "/Images/MCB/MCB2P_1.png",
      gallery: ["/Images/MCB/MCB2P_2.png"],
    },
    relatedProducts: ["MCB2", "MCB3", "MCB4"],
  },
  "MCB2": {
    code: "MCB2",
    name: "MCB 16 AMP Single Pole",
    category: "circuit-breakers",
    subcategory: "mcb",
    description: "16 Amp single pole MCB for standard residential circuits",
    specifications: {
      amperage: "16 AMP",
      pole: "Single Pole (SP)",
      packaging: "12 pieces",
    },
    features: [
      "Trip-free mechanism",
      "Thermal and magnetic protection",
      "Compact design",
      "High breaking capacity",
    ],
    applications: [
      "Power outlets",
      "Kitchen appliances",
      "General purpose circuits",
    ],
    images: {
      primary: "/Images/MCB/MCB32DP1.png",
      gallery: ["/Images/MCB/MCB32DP2.png"],
    },
    relatedProducts: ["MCB1", "MCB3", "MCB5"],
  },
  "MCB3": {
    code: "MCB3",
    name: "MCB 32 AMP Double Pole",
    category: "circuit-breakers",
    subcategory: "mcb",
    description: "32 Amp double pole MCB for heavy duty circuits",
    specifications: {
      amperage: "32 AMP",
      pole: "Double Pole (DP)",
      packaging: "6 pieces",
    },
    features: [
      "Trip-free mechanism",
      "Thermal and magnetic protection",
      "Double pole protection",
      "High breaking capacity",
    ],
    applications: [
      "Air conditioner circuits",
      "Heavy appliances",
      "Industrial circuits",
    ],
    images: {
      primary: "/Images/MCB/MCB4P_1.png",
      gallery: ["/Images/MCB/MCB4P_2.png"],
    },
    relatedProducts: ["MCB1", "MCB2", "MCB4"],
  },
  // Kit Kat Fuses - Copper Series
  "201": {
    code: "201",
    name: "32 AMP MINI SUPER PLAIN",
    category: "kit-kat-fuses",
    subcategory: "copper-series",
    description: "High-quality copper kit kat fuse for reliable circuit protection",
    specifications: {
      amperage: "32 AMP",
      type: "MINI SUPER PLAIN",
      material: "Copper",
      packaging: "100 PCS",
    },
    features: [
      "Pure copper construction",
      "High conductivity",
      "Reliable breaking capacity",
      "Corrosion resistant",
    ],
    applications: [
      "Industrial installations",
      "Commercial distribution",
      "Power distribution panels",
    ],
    images: {
      primary: "/Images/Main Switch HRC/511.jpg",
    },
    relatedProducts: ["202", "203", "101"],
  },
  // Main Switch HRC
  "511": {
    code: "511",
    name: "Main Switch HRC 32 AMP",
    category: "main-switches",
    subcategory: "hrc-type",
    description: "Heavy duty HRC type main switch for industrial applications",
    specifications: {
      amperage: "32 AMP",
      type: "HRC",
      voltage: "415V",
    },
    features: [
      "HRC fuse protection",
      "Heavy duty construction",
      "High breaking capacity",
      "Industrial grade",
    ],
    applications: [
      "Industrial installations",
      "Factory power distribution",
      "Heavy machinery circuits",
    ],
    images: {
      primary: "/Images/Main Switch HRC/511.jpg",
      gallery: [
        "/Images/Main Switch HRC/511 (2).jpg",
        "/Images/Main Switch HRC/511 (3).jpg",
      ],
    },
    relatedProducts: ["512", "513"],
  },
  // Control Panels
  "SP1": {
    code: "SP1",
    name: "Submersible Control Panel 1 H.P. MINI",
    category: "control-panels",
    subcategory: "submersible",
    description: "Compact control panel for 1 HP submersible pumps with overload protection",
    specifications: {
      horsepower: "1 H.P.",
      type: "MINI",
      voltage: "Single Phase",
      protection: "Overload, Dry Run",
    },
    features: [
      "Compact design",
      "Overload protection",
      "Dry run protection",
      "Voltage fluctuation protection",
      "LED indicators",
      "Easy installation",
    ],
    applications: [
      "Agricultural pumping",
      "Domestic water supply",
      "Borewell applications",
    ],
    images: {
      primary: "/Images/Submersible Panel/SUBMINI_1.png",
      gallery: [
        "/Images/Submersible Panel/SUBMINI_2.png",
        "/Images/Submersible Panel/SUBMINI_3.png",
      ],
    },
    relatedProducts: ["SP2", "SP3", "AS1"],
  },
  "SP2": {
    code: "SP2",
    name: "Submersible Digital Control Panel",
    category: "control-panels",
    subcategory: "submersible",
    description: "Digital control panel for submersible pumps with advanced protection",
    specifications: {
      horsepower: "1-3 H.P.",
      type: "Digital",
      voltage: "Single Phase",
      protection: "Overload, Dry Run, Over Voltage",
    },
    features: [
      "Digital display",
      "Multiple protection features",
      "Voltage monitoring",
      "LED indicators",
      "Easy programming",
    ],
    applications: [
      "Agricultural pumping",
      "Commercial water supply",
      "Industrial applications",
    ],
    images: {
      primary: "/Images/Submersible Panel/SUBDIZI_1.png",
      gallery: [
        "/Images/Submersible Panel/SUBDIZI_2.png",
        "/Images/Submersible Panel/SUBDIZI_3.png",
      ],
    },
    relatedProducts: ["SP1", "SP3"],
  },
  "WLC1": {
    code: "WLC1",
    name: "Water Level Controller",
    category: "control-panels",
    subcategory: "submersible",
    description: "Automatic water level controller for overhead tanks",
    specifications: {
      type: "Water Level Controller",
      voltage: "Single Phase",
      protection: "Auto On/Off",
    },
    features: [
      "Automatic operation",
      "LED indicators",
      "Easy installation",
      "Low maintenance",
    ],
    applications: [
      "Overhead tanks",
      "Underground tanks",
      "Residential water systems",
    ],
    images: {
      primary: "/Images/Submersible Panel/WLC_1.png",
      gallery: [
        "/Images/Submersible Panel/WLC.JPG",
        "/Images/Submersible Panel/WLC (2).JPG",
      ],
    },
    relatedProducts: ["SP1", "SP2"],
  },
  // AC Box
  "ACB1": {
    code: "ACB1",
    name: "AC Box",
    category: "ac-boxes",
    description: "Air conditioner connection box for safe AC installation",
    specifications: {
      type: "AC Connection Box",
      voltage: "240V",
    },
    features: [
      "Safe connection",
      "Weather resistant",
      "Easy installation",
      "Durable construction",
    ],
    applications: [
      "Air conditioner installation",
      "Split AC connection",
      "Window AC connection",
    ],
    images: {
      primary: "/Images/AC Box/AC Box (1).jpg",
      gallery: ["/Images/AC Box/AC Box (2).jpg"],
    },
    relatedProducts: [],
  },
};

// Get all products as array
export const getAllProducts = (): Product[] => Object.values(products);

// Get products by category
export const getProductsByCategory = (categorySlug: string): Product[] => {
  return Object.values(products).filter((p) => p.category === categorySlug);
};

// Get products by subcategory
export const getProductsBySubcategory = (
  categorySlug: string,
  subcategorySlug: string
): Product[] => {
  return Object.values(products).filter(
    (p) => p.category === categorySlug && p.subcategory === subcategorySlug
  );
};

// Get product by code
export const getProductByCode = (code: string): Product | undefined => {
  return products[code];
};

// Get related products
export const getRelatedProducts = (product: Product): Product[] => {
  if (!product.relatedProducts) return [];
  return product.relatedProducts
    .map((code) => products[code])
    .filter(Boolean) as Product[];
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(products).filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.code.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      Object.values(p.specifications).some((spec) =>
        spec?.toLowerCase().includes(lowerQuery)
      )
  );
};

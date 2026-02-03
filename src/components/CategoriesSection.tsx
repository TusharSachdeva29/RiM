import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, getTotalProductCount, getProductCount } from "@/lib/data/categories";

// Featured categories that get larger cards
const featuredSlugs = ["change-over-switches", "main-switches", "circuit-breakers"];

// Marquee items for the scrolling strip
const marqueeItems = [
  "Trusted Industrial Solutions",
  "Changeover Switches",
  "Bus Bar Chambers",
  "Control Panels",
  "Circuit Breakers",
  "Distribution Boxes",
  "Main Switches",
  "Electrical Accessories",
  "Premium Quality",
  "ISO Certified",
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function CategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 categories-circuit-pattern opacity-[0.03]" />
      
      {/* Dotted Grid */}
      <div className="absolute inset-0 categories-dotted-grid opacity-[0.05]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Product Portfolio
          </motion.span>
          
          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-4">
            Explore{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                RiM Categories
              </span>
              {/* Animated Underline */}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 origin-left rounded-full"
              />
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
            Engineered electrical protection solutions across industries.{" "}
            <span className="text-slate-900 font-medium">{getTotalProductCount()}+ products</span> across{" "}
            <span className="text-slate-900 font-medium">{categories.length} categories</span>.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
        >
          {categories.map((category, index) => {
            const isFeatured = featuredSlugs.includes(category.slug);
            const productCount = getProductCount(category.slug);
            
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className={`${isFeatured ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""}`}
              >
                <Link
                  to={`/products/${category.slug}`}
                  className={`category-card group relative flex flex-col h-full p-6 lg:p-7 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 ${
                    isFeatured ? "min-h-[220px]" : "min-h-[200px]"
                  }`}
                >
                  {/* Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-orange-50/0 to-orange-100/0 group-hover:from-orange-50/50 group-hover:via-orange-50/30 group-hover:to-orange-100/20 transition-all duration-500" />
                  
                  {/* Orange Accent Line */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Top Row: Icon + Count */}
                    <div className="flex items-start justify-between mb-4">
                      {/* Icon Badge */}
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="relative"
                      >
                        <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/50 group-hover:from-orange-50 group-hover:to-orange-100 group-hover:border-orange-200/50 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:shadow-orange-500/10">
                          <category.icon className="h-6 w-6 text-slate-600 group-hover:text-orange-600 transition-colors duration-300" />
                        </div>
                        {/* Pulse Effect */}
                        <div className="absolute inset-0 rounded-xl bg-orange-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                      </motion.div>
                      
                      {/* Product Count Badge */}
                      {productCount > 0 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors duration-300">
                          {productCount} products
                        </span>
                      )}
                    </div>
                    
                    {/* Category Name */}
                    <h3 className={`font-heading font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 ${
                      isFeatured ? "text-xl lg:text-2xl" : "text-lg"
                    }`}>
                      {category.name}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-slate-500 line-clamp-2 mb-auto ${
                      isFeatured ? "text-sm lg:text-base" : "text-sm"
                    }`}>
                      {category.description}
                    </p>
                    
                    {/* CTA Link */}
                    <div className="mt-5 pb-3 flex items-center">
                      <span className="text-sm font-semibold text-orange-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Explore Category
                      </span>
                      <ChevronRight className="h-4 w-4 text-orange-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300 delay-75" />
                    </div>
                    
                    {/* Bottom Accent Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14 lg:mt-16"
        >
          <Button
            asChild
            size="lg"
            className="category-cta-btn group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-10 h-14 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
          >
            <Link to="/products">
              <span className="relative z-10 flex items-center">
                Browse Full Product Catalogue
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Marquee Strip */}
      <div className="relative mt-20 lg:mt-28 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10" />
        
        {/* Scrolling Content */}
        <div className="marquee-container flex">
          <div className="marquee-track flex items-center gap-8 animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 whitespace-nowrap">
                <span className="text-white/80 font-medium text-sm tracking-wide uppercase">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              </div>
            ))}
          </div>
          <div className="marquee-track flex items-center gap-8 animate-marquee" aria-hidden="true">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-8 whitespace-nowrap">
                <span className="text-white/80 font-medium text-sm tracking-wide uppercase">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

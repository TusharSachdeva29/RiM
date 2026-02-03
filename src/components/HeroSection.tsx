import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Featured products for the carousel
const featuredProducts = [
  {
    id: 1,
    name: "Changeover Switch (U-Type)",
    image: "/Images/Change Over U-Type/602B.jpg",
    highlights: [
      "16A–100A Range",
      "Smooth and safe switching",
      "Industrial-grade durability",
    ],
    link: "/products/change-over-u-type",
  },
  {
    id: 2,
    name: "Knife Type Changeover Switch",
    image: "/Images/Change Over Knife Type/KT610_4-removebg-preview.png",
    highlights: [
      "Up to 1000A capacity",
      "Reliable power transfer",
      "Heavy duty copper contacts",
    ],
    link: "/products/change-over-knife-type",
  },
  {
    id: 3,
    name: "Bus Bar Chamber",
    image: "/Images/Bus Bar Chamber/BB705_1.png",
    highlights: [
      "Compact distribution protection",
      "Rated up to 1000A",
      "Perfect for panel installations",
    ],
    link: "/products/bus-bar-chamber",
  },
  {
    id: 4,
    name: "Main Switch with HRC Fuse",
    image: "/Images/Main Switch HRC/511.jpg",
    highlights: [
      "High fault protection",
      "Long-lasting build quality",
      "Trusted nationwide",
    ],
    link: "/products/main-switch-hrc",
  },
];

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

export function HeroSection() {
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((newDirection: number) => {
    setCurrentSlide(([current]) => {
      const nextSlide = (current + newDirection + featuredProducts.length) % featuredProducts.length;
      return [nextSlide, newDirection];
    });
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      paginate(1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]);

  const currentProduct = featuredProducts[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Premium CSS Background */}
      <div className="absolute inset-0 hero-premium-bg" />
      
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 hero-circuit-pattern opacity-[0.03]" />
      
      {/* Dotted Grid Overlay */}
      <div className="absolute inset-0 hero-dotted-grid opacity-[0.08]" />
      
      {/* Orange Glow Effect - Right Side */}
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/3">
        <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-orange-600/10 to-transparent blur-3xl" />
      </div>
      
      {/* Secondary Glow - Top Right */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] -translate-y-1/2">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-2xl" />
      </div>

      {/* Brand Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-heading font-bold text-white/[0.03] whitespace-nowrap tracking-tight">
          RiM Electricals
        </span>
      </div>

      {/* Main Content Container */}
      <div className="section-container relative z-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* LEFT SIDE - Brand + Main Message */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Trust Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-orange-400 text-sm font-semibold mb-8">
                <Zap className="h-4 w-4" />
                Trusted Since 1989
              </span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.1] mb-6"
            >
              THE HOME OF{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                  QUALITY
                </span>
                {/* Underline glow */}
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 blur-sm" />
              </span>
            </motion.h1>
            
            {/* Supporting Text */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300/90 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Premium electrical switchgear and protection devices trusted across industries across India. 
              Experience unmatched reliability, safety, and innovation.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="hero-btn-primary group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 h-14 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
              >
                <Link to="/products">
                  <span className="relative z-10 flex items-center">
                    Explore Products
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="hero-btn-secondary group border-2 border-white/30 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 text-lg px-8 h-14 rounded-xl transition-all duration-300"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-white font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span>35+ Years</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Pan India</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Product Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Carousel Container */}
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Glassmorphism Card */}
              <div className="relative h-[480px] sm:h-[520px] rounded-3xl overflow-hidden">
                {/* Card Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-500/10 blur-2xl" />
                
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    className="absolute inset-0"
                  >
                    <div className="hero-product-card relative h-full rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl overflow-hidden">
                      {/* Inner Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                      
                      {/* Product Image */}
                      <div className="relative h-[55%] flex items-center justify-center p-6 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                        <motion.img
                          src={currentProduct.image}
                          alt={currentProduct.name}
                          className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          whileHover={{ scale: 1.08 }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="relative p-6 h-[45%] flex flex-col">
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-xl sm:text-2xl font-heading font-bold text-white mb-4"
                        >
                          {currentProduct.name}
                        </motion.h3>
                        
                        {/* Highlights */}
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="space-y-2 mb-6 flex-1"
                        >
                          {currentProduct.highlights.map((highlight, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                              className="flex items-center text-gray-300 text-sm"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-3 flex-shrink-0" />
                              {highlight}
                            </motion.li>
                          ))}
                        </motion.ul>

                        {/* View Details Link */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Link
                            to={currentProduct.link}
                            className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold text-sm group transition-colors"
                          >
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                {/* Previous Button */}
                <button
                  onClick={() => paginate(-1)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Pagination Dots */}
                <div className="flex gap-2">
                  {featuredProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide([idx, idx > currentSlide ? 1 : -1])}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? "w-8 bg-orange-500"
                          : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => paginate(1)}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Floating Elements - Decorative */}
            <div className="absolute -top-8 -right-8 w-24 h-24 border border-orange-500/20 rounded-2xl rotate-12 hidden lg:block" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-white/10 rounded-xl -rotate-12 hidden lg:block" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

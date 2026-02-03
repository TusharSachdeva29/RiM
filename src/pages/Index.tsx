import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Award, Users, ChevronRight, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/HeroSection";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AboutSection } from "@/components/AboutSection";
import { CategoriesSection } from "@/components/CategoriesSection";

const stats = [
  { label: "Years of Excellence", value: "35+", icon: Award },
  { label: "Product Range", value: "200+", icon: Zap },
  { label: "Happy Customers", value: "10K+", icon: Users },
  { label: "Quality Certified", value: "ISO", icon: Shield },
];

const features = [
  {
    title: "Premium Quality",
    description: "Every product undergoes rigorous quality testing to ensure reliability and safety.",
    icon: Shield,
  },
  {
    title: "Wide Product Range",
    description: "From switches to control panels, we offer comprehensive electrical solutions.",
    icon: Zap,
  },
  {
    title: "Industry Expertise",
    description: "35+ years of manufacturing excellence and technical innovation.",
    icon: Award,
  },
  {
    title: "Customer Support",
    description: "Dedicated support team to assist with product selection and technical queries.",
    icon: Users,
  },
];

export default function Index() {
  return (
    <div className="overflow-hidden">
      {/* Premium Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-12 bg-background border-b">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-heading font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <AboutSection />

      {/* Premium Categories Section */}
      <CategoriesSection />

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium mb-2 block">Why Choose RiM</span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 mb-4">
              Built on Trust & Quality
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              For over three decades, we've been committed to delivering excellence in every product.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="shrink-0 p-3 h-fit rounded-xl bg-rim-gradient shadow-lg shadow-orange-500/20">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Dealer Partnership */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Premium Dark Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        {/* Subtle Orange Glow - Edges Only */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/3">
          <div className="absolute inset-0 bg-gradient-radial from-orange-500/15 via-orange-600/5 to-transparent blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] translate-y-1/2 -translate-x-1/3">
          <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent blur-3xl" />
        </div>
        
        {/* Circuit Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cpath d='M30 10v20h40V10' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cpath d='M30 90V70h40v20' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cpath d='M10 30h20v40H10' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cpath d='M90 30H70v40h20' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%23ffffff'/%3E%3Ccircle cx='70' cy='30' r='3' fill='%23ffffff'/%3E%3Ccircle cx='30' cy='70' r='3' fill='%23ffffff'/%3E%3Ccircle cx='70' cy='70' r='3' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='50' r='5' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />

        {/* Floating Glow Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-500/40 rounded-full blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-orange-400/30 rounded-full blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-orange-500/50 rounded-full blur-sm"
          />
        </div>

        <div className="section-container relative z-10">
          {/* Glassmorphism Container Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20 rounded-3xl blur-xl opacity-50" />
            
            {/* Main Card */}
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
              
              <div className="relative px-8 py-14 lg:px-16 lg:py-20">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center mb-8"
                >
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold">
                    <Sparkles className="h-4 w-4" />
                    Dealership Opportunity
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white text-center mb-6"
                >
                  Become a{" "}
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                      RiM Dealer Partner
                    </span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 origin-left"
                    />
                  </span>
                </motion.h2>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-lg md:text-xl text-center max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                  Join our trusted distribution network across India with premium switchgear solutions.
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-2xl mx-auto mb-12"
                >
                  {[
                    { value: "500+", label: "Active Dealers" },
                    { value: "28", label: "States Covered" },
                    { value: "35+", label: "Years of Trust" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ y: -4, borderColor: "rgba(249, 115, 22, 0.4)" }}
                      transition={{ duration: 0.3 }}
                      className="relative group p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      {/* Orange accent on hover */}
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      asChild 
                      size="lg" 
                      className="dealer-cta-primary group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-10 h-14 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
                    >
                      <Link to="/dealership">
                        <span className="relative z-10 flex items-center">
                          Become a Dealer
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Shimmer */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                      </Link>
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      asChild 
                      size="lg" 
                      className="dealer-cta-secondary group bg-transparent text-gray-300 border border-white/20 hover:border-orange-500/50 hover:text-white hover:bg-white/5 text-lg px-10 h-14 rounded-xl transition-all duration-300"
                    >
                      <a href="tel:+911234567890">
                        <Phone className="mr-2 h-5 w-5 group-hover:text-orange-400 transition-colors" />
                        Call Us Now
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

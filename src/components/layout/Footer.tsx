import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowRight,
  Zap,
  Shield,
  Award,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data/categories";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Dealership", href: "/dealership" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Warranty Policy", href: "#" },
  { label: "Shipping Info", href: "#" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const trustBadges = [
  { icon: Shield, label: "ISO 9001:2015", desc: "Quality Management" },
  { icon: Award, label: "ISI Certified", desc: "Indian Standards" },
  { icon: Zap, label: "BIS Compliant", desc: "Bureau of Standards" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <footer ref={footerRef} className="relative text-white overflow-hidden">
      {/* Industrial Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-rim-charcoal" />
      
      {/* Circuit Pattern Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Blurred Electrical Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-600/8 rounded-full blur-[120px] translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] -translate-x-1/2" />
      </div>

      {/* Soft Divider */}
      <div className="relative pt-16">
        <div className="section-container">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      {/* Main Footer Content */}
      <motion.div 
        className="section-container py-20 relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column - Spans 4 columns */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            <Link to="/" className="flex items-center gap-4 mb-8 group">
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-rim-gradient flex items-center justify-center shadow-xl shadow-orange-500/30"
                whileHover={{ scale: 1.05, rotate: 3 }}
              >
                <span className="text-white font-heading font-bold text-4xl">R</span>
              </motion.div>
              <div>
                <h2 className="font-heading font-bold text-3xl tracking-tight text-white">RiM</h2>
                <p className="text-sm text-primary font-semibold tracking-wide">THE HOME OF QUALITY</p>
              </div>
            </Link>
            <p className="text-gray-300 mb-8 leading-relaxed">
              India's premier manufacturer of electrical switchgear and components since 1989. 
              Engineering excellence, unwavering quality, and nationwide trust define our legacy.
            </p>
            
            {/* Trust Badges - Glassmorphism Cards */}
            <div className="space-y-3 mb-8">
              {trustBadges.map((badge, index) => (
                <motion.div 
                  key={badge.label} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/10 hover:border-primary/30 hover:bg-white/[0.08] transition-all duration-300 group cursor-default"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <badge.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{badge.label}</p>
                    <p className="text-gray-400 text-xs">{badge.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-gray-300 hover:bg-primary hover:border-primary hover:text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h3 className="font-heading font-bold text-lg mb-8 flex items-center gap-3 text-white">
              <span className="w-10 h-1 bg-gradient-to-r from-primary to-orange-400 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="!text-white hover:!text-white hover:pl-2 transition-all duration-300 inline-flex items-center gap-3 group drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300" />
                    <span className="text-white group-hover:text-primary transition-colors">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Product Categories - Glassmorphism Card */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            <h3 className="font-heading font-bold text-lg mb-8 flex items-center gap-3 text-white">
              <span className="w-10 h-1 bg-gradient-to-r from-primary to-orange-400 rounded-full" />
              Product Lines
            </h3>
            <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/10">
              <ul className="space-y-3">
                {categories.slice(0, 6).map((category, index) => (
                  <motion.li 
                    key={category.id}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Link
                      to={`/products/${category.slug}`}
                      className="!text-white hover:!text-white transition-all duration-300 inline-flex items-center gap-3 group w-full py-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all" />
                      <span className="text-white group-hover:text-primary transition-colors flex-1 truncate">{category.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link 
                to="/products" 
                className="mt-4 pt-4 border-t border-white/15 flex items-center gap-2 !text-primary hover:!text-orange-400 transition-colors font-medium text-sm"
              >
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Contact Info - Glassmorphism Card */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            <h3 className="font-heading font-bold text-lg mb-8 flex items-center gap-3 text-white">
              <span className="w-10 h-1 bg-gradient-to-r from-primary to-orange-400 rounded-full" />
              Contact Us
            </h3>
            <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/10 space-y-5">
              <a
                href="tel:+911234567890"
                className="flex items-center gap-4 !text-white hover:!text-white transition-all duration-300 group p-3 rounded-xl hover:bg-white/[0.05] drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
              >
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-200 uppercase tracking-wider mb-0.5">Phone</p>
                  <span className="font-semibold text-white">+91 123 456 7890</span>
                </div>
              </a>
              
              <a
                href="mailto:rimswitchgear@gmail.com"
                className="flex items-center gap-4 !text-white hover:!text-white transition-all duration-300 group p-3 rounded-xl hover:bg-white/[0.05] drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
              >
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-200 uppercase tracking-wider mb-0.5">Email</p>
                  <span className="font-semibold text-white text-sm">rimswitchgear@gmail.com</span>
                </div>
              </a>
              
              <div className="flex items-start gap-4 text-white p-3 rounded-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                <div className="p-3 rounded-xl bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-200 uppercase tracking-wider mb-0.5">Location</p>
                  <span className="font-semibold text-white text-sm leading-relaxed">
                    Royal Industries,<br />
                    Mansa-151505, Punjab, India
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white p-3 rounded-xl border-t border-white/10 pt-5 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-200 uppercase tracking-wider mb-0.5">Business Hours</p>
                  <span className="font-semibold text-white text-sm">Mon - Sat: 9AM - 6PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Refined Bottom Strip */}
      <div className="relative">
        {/* Top divider line */}
        <div className="section-container">
          <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
        
        <div className="section-container py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div 
              className="flex items-center gap-3 text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="w-8 h-8 rounded-lg bg-rim-gradient flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">R</span>
              </div>
              <p className="text-gray-400 text-sm">
                © {currentYear} <span className="text-white font-semibold">RiM - Royal Industries</span>. All rights reserved.
              </p>
            </motion.div>

            {/* Legal Links */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              {legalLinks.map((link, index) => (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-sm text-gray-400 hover:text-primary transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </motion.div>

            {/* Made with love badge */}
            <motion.div 
              className="text-gray-400 text-xs flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <span>Engineered with</span>
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>in India</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

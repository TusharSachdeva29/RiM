import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail, Search, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, getProductCount } from "@/lib/data/categories";
import { searchProducts, Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Dealership", href: "/dealership" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = searchProducts(searchQuery).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search on route change
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 20;
    setIsScrolled(scrolled);
    
    // Hide navbar on scroll down, show on scroll up
    if (latest > lastScrollY.current && latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100/50"
            : "bg-white"
        )}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-rim-gradient flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white font-heading font-bold text-xl lg:text-2xl">R</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-xl lg:text-2xl text-slate-900">RiM</h1>
                <p className="text-xs text-slate-500 -mt-1">The Home of Quality</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setIsProductsOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsProductsOpen(false)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "relative flex items-center gap-1 font-medium py-2 text-slate-900 hover:text-primary transition-colors",
                    )}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <motion.div
                        animate={{ rotate: isProductsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    )}
                    {/* Active indicator */}
                    {(location.pathname === item.href ||
                      (item.href !== "/" && location.pathname.startsWith(item.href))) && (
                      <motion.span
                        layoutId="activeLink"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Products Mega Menu */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ 
                            duration: 0.25, 
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[950px]"
                        >
                          <div className="bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden">
                            <div className="flex">
                              {/* Left Side - Product Category Grid (70%) */}
                              <div className="flex-[7] p-6">
                                <div className="grid grid-cols-3 gap-3">
                                  {categories.slice(0, 9).map((category, idx) => (
                                    <motion.div
                                      key={category.id}
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ 
                                        delay: idx * 0.04,
                                        duration: 0.3,
                                        ease: "easeOut"
                                      }}
                                    >
                                      <Link
                                        to={`/products/${category.slug}`}
                                        className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-transparent hover:border-gray-100"
                                      >
                                        <div className="w-11 h-11 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-100 group-hover:scale-105 transition-all duration-200 shadow-sm">
                                          <category.icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-sm text-slate-900 truncate">
                                              {category.name}
                                            </h3>
                                            <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                                          </div>
                                          <p className="text-xs text-gray-500 mt-1">
                                            {getProductCount(category.slug)} products
                                          </p>
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                                
                                {/* Footer - View All Categories Button */}
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.35 }}
                                  className="mt-5 pt-4 border-t border-gray-100"
                                >
                                  <Link
                                    to="/products"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium text-sm rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
                                  >
                                    View All Categories
                                    <ChevronDown className="h-4 w-4 -rotate-90" />
                                  </Link>
                                </motion.div>
                              </div>

                              {/* Right Side - Spotlight Panel (30%) */}
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                                className="flex-[3] bg-gradient-to-br from-gray-50 to-gray-100/80 p-6 border-l border-gray-100"
                              >
                                <div className="h-full flex flex-col">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-1 rounded-full w-fit mb-3">
                                    Featured
                                  </span>
                                  <h4 className="font-heading font-bold text-lg text-slate-900 mb-2">
                                    New Control Panels Available
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    Discover our latest range of advanced control panels with smart automation features.
                                  </p>
                                  
                                  {/* Placeholder Image */}
                                  <div className="relative flex-1 min-h-[120px] rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 overflow-hidden mb-4 border border-orange-200/50">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="text-center">
                                        <div className="w-16 h-16 mx-auto rounded-full bg-white/80 flex items-center justify-center shadow-lg mb-2">
                                          <Cpu className="h-8 w-8 text-orange-500" />
                                        </div>
                                        <p className="text-xs text-orange-700 font-medium">Control Panels</p>
                                      </div>
                                    </div>
                                    {/* Decorative elements */}
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-orange-200/40" />
                                    <div className="absolute -left-2 -top-2 w-12 h-12 rounded-full bg-orange-200/30" />
                                  </div>
                                  
                                  <Link
                                    to="/products/control-panels"
                                    className="group inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                                  >
                                    View Catalog
                                    <ChevronDown className="h-4 w-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Search & CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-slate-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Search products"
                >
                  <Search className="h-5 w-5" />
                </motion.button>

                {/* Search Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && searchQuery.trim()) {
                                navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
                                setIsSearchOpen(false);
                              }
                              if (e.key === "Escape") {
                                setIsSearchOpen(false);
                              }
                            }}
                            className="pl-10 border-gray-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      {searchResults.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto">
                          {searchResults.map((product) => (
                            <Link
                              key={product.code}
                              to={`/products/${product.category}/${product.code}`}
                              onClick={() => setIsSearchOpen(false)}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                <img
                                  src={product.images.primary}
                                  alt={product.name}
                                  className="w-full h-full object-contain p-1"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-slate-900 truncate">{product.name}</p>
                                <p className="text-xs text-slate-500">{product.code}</p>
                              </div>
                            </Link>
                          ))}
                          <Link
                            to={`/products?search=${encodeURIComponent(searchQuery)}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="block p-3 text-center text-primary font-medium text-sm border-t border-gray-100 hover:bg-gray-50"
                          >
                            View all results →
                          </Link>
                        </div>
                      ) : searchQuery.trim().length > 1 ? (
                        <div className="p-6 text-center text-slate-500 text-sm">
                          No products found for "{searchQuery}"
                        </div>
                      ) : (
                        <div className="p-6 text-center text-slate-400 text-sm">
                          Start typing to search products...
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild className="bg-rim-gradient hover:opacity-90 text-white shadow-lg shadow-orange-500/25 transition-all">
                  <Link to="/contact">Get Quote</Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t overflow-hidden"
            >
              <div className="section-container py-4 space-y-2">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "block py-3 px-4 rounded-lg font-medium transition-colors text-slate-900",
                        location.pathname === item.href
                          ? "bg-accent text-primary"
                          : "hover:bg-accent"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 border-t">
                  <Button asChild className="w-full bg-rim-gradient text-white shadow-lg">
                    <Link to="/contact">Get Quote</Link>
                  </Button>
                </div>
                <div className="pt-4 space-y-2 text-sm text-slate-600">
                  <a href="mailto:rimswitchgear@gmail.com" className="flex items-center gap-2 hover:text-primary">
                    <Mail className="h-4 w-4" />
                    rimswitchgear@gmail.com
                  </a>
                  <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="h-4 w-4" />
                    +91 123 456 7890
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

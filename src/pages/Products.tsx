import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Eye, 
  ChevronRight, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Phone,
  ChevronDown,
  Grid3X3,
  LayoutGrid
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, getProductCount } from "@/lib/data/categories";
import { getAllProducts, Product } from "@/lib/data/products";

// Extract unique amperage and pole values from products
const getFilterOptions = (products: Product[]) => {
  const amperages = new Set<string>();
  const poles = new Set<string>();
  
  products.forEach(product => {
    if (product.specifications.amperage) amperages.add(product.specifications.amperage);
    if (product.specifications.pole) poles.add(product.specifications.pole);
  });
  
  return {
    amperages: Array.from(amperages).sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);
      return numA - numB;
    }),
    poles: Array.from(poles).sort()
  };
};

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAmperage, setSelectedAmperage] = useState<string | null>(null);
  const [selectedPole, setSelectedPole] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [gridView, setGridView] = useState<"grid" | "compact">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const allProducts = getAllProducts();
  const filterOptions = useMemo(() => getFilterOptions(allProducts), [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesAmperage = !selectedAmperage || product.specifications.amperage === selectedAmperage;
      const matchesPole = !selectedPole || product.specifications.pole === selectedPole;

      return matchesSearch && matchesCategory && matchesAmperage && matchesPole;
    });
  }, [allProducts, searchQuery, selectedCategory, selectedAmperage, selectedPole]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedAmperage(null);
    setSelectedPole(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedAmperage || selectedPole;

  // Featured products (first 4 from each category that has products)
  const featuredProducts = useMemo(() => {
    const featured: Product[] = [];
    const seenCategories = new Set<string>();
    
    for (const product of allProducts) {
      if (!seenCategories.has(product.category) && featured.length < 6) {
        featured.push(product);
        seenCategories.add(product.category);
      }
    }
    return featured;
  }, [allProducts]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/product-page-background.webp" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-rim-charcoal/90" />
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="section-container relative py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-white/90 text-sm font-medium">ISO 9001:2015 Certified Products</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              RiM Product{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Portfolio
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Engineered electrical protection devices trusted across industries.
              Explore our comprehensive range of premium switchgear solutions.
            </p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search by product name, code, or specification..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-6 py-7 text-lg bg-white border-0 rounded-2xl shadow-2xl shadow-black/20 focus:ring-2 focus:ring-primary/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-4 w-4 text-slate-400" />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 mt-10"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{allProducts.length}+</div>
                <div className="text-sm text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{categories.length}</div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">35+</div>
                <div className="text-sm text-gray-400">Years Trust</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories & Filters */}
            <aside className="lg:w-72 shrink-0">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="w-full lg:hidden mb-4 justify-between"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters & Categories
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isMobileFiltersOpen ? "rotate-180" : ""}`} />
              </Button>

              <div className={`space-y-6 ${isMobileFiltersOpen ? "block" : "hidden lg:block"} lg:sticky lg:top-24`}>
                {/* Categories Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800">
                    <h3 className="font-heading font-semibold text-white flex items-center gap-2">
                      <Grid3X3 className="h-4 w-4 text-primary" />
                      Product Categories
                    </h3>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        selectedCategory === null 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "hover:bg-gray-50 text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${selectedCategory === null ? "bg-primary" : "bg-gray-300"}`} />
                        All Products
                      </span>
                      <Badge variant="secondary" className="bg-gray-100">{allProducts.length}</Badge>
                    </button>
                    
                    {categories.map((category) => {
                      const count = getProductCount(category.slug);
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.slug)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                            selectedCategory === category.slug 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "hover:bg-gray-50 text-slate-700"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${selectedCategory === category.slug ? "bg-primary" : "bg-gray-300"}`} />
                            <span className="text-left text-sm">{category.name}</span>
                          </span>
                          <Badge variant="secondary" className="bg-gray-100 text-xs">{count}</Badge>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Technical Filters Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800">
                    <h3 className="font-heading font-semibold text-white flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-primary" />
                      Technical Filters
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Amperage Filter */}
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Amp Rating</label>
                      <Select 
                        value={selectedAmperage || "all"} 
                        onValueChange={(val) => setSelectedAmperage(val === "all" ? null : val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All Ratings" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Ratings</SelectItem>
                          {filterOptions.amperages.map((amp) => (
                            <SelectItem key={amp} value={amp}>{amp}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pole Filter */}
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Poles</label>
                      <Select 
                        value={selectedPole || "all"} 
                        onValueChange={(val) => setSelectedPole(val === "all" ? null : val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All Poles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Poles</SelectItem>
                          {filterOptions.poles.map((pole) => (
                            <SelectItem key={pole} value={pole}>{pole}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {hasActiveFilters && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearFilters}
                        className="w-full mt-2"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </motion.div>

              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-heading font-semibold text-lg text-slate-900">
                    {selectedCategory 
                      ? categories.find(c => c.slug === selectedCategory)?.name 
                      : "All Products"
                    }
                  </h2>
                  <p className="text-sm text-slate-500">
                    Showing {filteredProducts.length} of {allProducts.length} products
                    {hasActiveFilters && " (filtered)"}
                  </p>
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={gridView === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGridView("grid")}
                    className="px-3"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridView === "compact" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGridView("compact")}
                    className="px-3"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Active Filters Pills */}
              {hasActiveFilters && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap items-center gap-2 mb-6"
                >
                  {selectedCategory && (
                    <Badge variant="secondary" className="pl-3 pr-1 py-1.5 gap-2">
                      {categories.find(c => c.slug === selectedCategory)?.name}
                      <button 
                        onClick={() => setSelectedCategory(null)}
                        className="p-0.5 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedAmperage && (
                    <Badge variant="secondary" className="pl-3 pr-1 py-1.5 gap-2">
                      {selectedAmperage}
                      <button 
                        onClick={() => setSelectedAmperage(null)}
                        className="p-0.5 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedPole && (
                    <Badge variant="secondary" className="pl-3 pr-1 py-1.5 gap-2">
                      {selectedPole}
                      <button 
                        onClick={() => setSelectedPole(null)}
                        className="p-0.5 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </motion.div>
              )}

              {/* Products Grid */}
              <AnimatePresence mode="wait">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    key={`${selectedCategory}-${selectedAmperage}-${selectedPole}-${gridView}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`grid gap-4 ${
                      gridView === "grid" 
                        ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                        : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
                    }`}
                  >
                    {filteredProducts.map((product, index) => (
                      <ProductGridCard 
                        key={product.code} 
                        product={product} 
                        index={index} 
                        compact={gridView === "compact"}
                        onQuickView={() => setQuickViewProduct(product)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white rounded-2xl border border-gray-200"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <Search className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-slate-900 mb-2">No products found</h3>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto">
                      Try adjusting your search or filter criteria to find what you're looking for
                    </p>
                    <Button onClick={clearFilters} className="bg-primary text-white hover:bg-primary/90">
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Slider */}
      {featuredProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-white border-t border-gray-200">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-primary font-medium mb-2 block">Explore More</span>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-slate-900">
                Featured Products
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/products/${product.category}/${product.code}`}
                    className="group block p-4 rounded-xl border border-gray-200 bg-white hover:border-primary hover:shadow-lg transition-all text-center"
                  >
                    <div className="aspect-square mb-3 rounded-lg bg-gray-50 overflow-hidden">
                      <img
                        src={product.images.primary}
                        alt={product.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <Badge className="mb-2 text-xs bg-rim-charcoal">{product.code}</Badge>
                    <h3 className="text-sm font-medium text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-12 bg-slate-900">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-2">
                Need Help Choosing the Right Product?
              </h3>
              <p className="text-gray-400">
                Our technical team is here to assist with product selection and specifications.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="bg-rim-gradient hover:opacity-90 text-white">
                <Link to="/contact">
                  Request Dealer Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                <a href="tel:+911234567890">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <Dialog open={!!quickViewProduct} onOpenChange={() => setQuickViewProduct(null)}>
        <DialogContent className="max-w-3xl">
          {quickViewProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">{quickViewProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
                  <img
                    src={quickViewProduct.images.primary}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Badge className="bg-rim-charcoal mb-2">{quickViewProduct.code}</Badge>
                    <p className="text-slate-600">{quickViewProduct.description}</p>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 mb-2">Specifications</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(quickViewProduct.specifications)
                        .filter(([_, value]) => value)
                        .map(([key, value]) => (
                          <div key={key} className="bg-gray-50 rounded-lg p-2">
                            <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                            <div className="text-sm font-medium text-slate-900">{value}</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  {/* Features */}
                  {quickViewProduct.features && quickViewProduct.features.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {quickViewProduct.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button asChild className="flex-1 bg-rim-gradient hover:opacity-90">
                      <Link to={`/products/${quickViewProduct.category}/${quickViewProduct.code}`}>
                        View Full Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link to="/contact">Request Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Product Grid Card Component
function ProductGridCard({ 
  product, 
  index, 
  compact,
  onQuickView 
}: { 
  product: Product; 
  index: number; 
  compact: boolean;
  onQuickView: () => void;
}) {
  const category = categories.find((c) => c.slug === product.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group"
    >
      <div className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className={`relative bg-gradient-to-br from-gray-50 to-white overflow-hidden ${compact ? "aspect-square" : "aspect-[4/3]"}`}>
          <img
            src={product.images.primary}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <motion.button
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView();
                }}
                className="p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-colors"
              >
                <Eye className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Product Code Badge */}
          <Badge className="absolute top-3 left-3 bg-rim-charcoal text-white shadow-lg">
            {product.code}
          </Badge>
        </div>

        {/* Content */}
        <Link to={`/products/${product.category}/${product.code}`} className="block p-4">
          {!compact && category && (
            <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-md inline-block mb-2">
              {category.name}
            </span>
          )}
          
          <h3 className={`font-heading font-semibold text-slate-900 group-hover:text-primary transition-colors ${compact ? "text-sm line-clamp-1" : "line-clamp-2"}`}>
            {product.name}
          </h3>
          
          {!compact && (
            <>
              <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                {product.description}
              </p>

              {/* Specs */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {product.specifications.amperage && (
                  <Badge variant="outline" className="text-xs border-gray-200">
                    {product.specifications.amperage}
                  </Badge>
                )}
                {product.specifications.pole && (
                  <Badge variant="outline" className="text-xs border-gray-200">
                    {product.specifications.pole}
                  </Badge>
                )}
                {product.specifications.voltage && (
                  <Badge variant="outline" className="text-xs border-gray-200">
                    {product.specifications.voltage}
                  </Badge>
                )}
              </div>
            </>
          )}
        </Link>
      </div>
    </motion.div>
  );
}

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, Eye, Shield, Phone, CheckCircle, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCategoryBySlug, categories, getProductCount } from "@/lib/data/categories";
import { getProductsByCategory, Product } from "@/lib/data/products";

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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function ProductCategory() {
  const { category: categorySlug } = useParams<{ category: string }>();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const products = categorySlug ? getProductsByCategory(categorySlug) : [];
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/product-page-background.webp')" }}
        />
        
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
        
        {/* Subtle Orange Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/4">
          <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-orange-600/5 to-transparent blur-3xl" />
        </div>
        
        {/* Circuit Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Cpath d='M30 10v20h40V10' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%23ffffff'/%3E%3Ccircle cx='70' cy='30' r='3' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
        
        <div className="section-container relative py-16 lg:py-24">
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-10"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white font-medium">{category.name}</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row items-start gap-10">
            {/* Icon Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl shadow-orange-500/30">
                <Icon className="h-14 w-14 text-white" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-orange-500/30 rounded-2xl blur-xl -z-10" />
            </motion.div>
            
            <div className="flex-1">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-heading font-bold text-white mb-5"
              >
                {category.name}
              </motion.h1>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-lg lg:text-xl max-w-2xl mb-8 leading-relaxed"
              >
                {category.description}
              </motion.p>
              
              {/* Premium Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                {/* Product Count Badge */}
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                  <Shield className="h-4 w-4 text-orange-400" />
                  {products.length} Products Available
                </span>
                
                {/* ISO Badge */}
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/15 backdrop-blur-md border border-orange-500/30 text-orange-400 text-sm font-semibold">
                  <Award className="h-4 w-4" />
                  ISO Certified
                </span>
              </motion.div>
            </div>
          </div>

          {/* Subcategories - Glassmorphism Cards */}
          {category.subcategories && category.subcategories.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-14"
            >
              <h3 className="text-sm font-semibold !text-white uppercase tracking-wider mb-5">
                Browse by Type
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.subcategories.map((sub, idx) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.08 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group"
                  >
                    <button
                      className="relative px-6 py-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:bg-white/20 hover:border-orange-400/60 hover:shadow-xl hover:shadow-orange-500/15 overflow-hidden"
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10 flex items-center gap-2 text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                        {sub.name}
                        <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-400" />
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-14 lg:py-20">
        <div className="section-container">
          <div className="flex items-center justify-between mb-10">
            <Button asChild variant="ghost" className="gap-2 text-slate-600 hover:text-orange-600">
              <Link to="/products">
                <ArrowLeft className="h-4 w-4" />
                Back to All Products
              </Link>
            </Button>
            <p className="text-slate-500">
              Showing <span className="font-semibold text-slate-900">{products.length}</span> products
            </p>
          </div>

          {products.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product, index) => (
                <CategoryProductCard 
                  key={product.code} 
                  product={product} 
                  index={index} 
                  categorySlug={categorySlug!}
                  onQuickView={() => setQuickViewProduct(product)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm"
            >
              <Icon className="h-16 w-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-heading font-semibold text-slate-900 mb-2">Products Coming Soon</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                We're adding more products to this category. Check back soon or contact us for specific requirements!
              </p>
              <div className="flex justify-center gap-3">
                <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  <Link to="/products">Browse Other Categories</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-12 lg:py-16">
        <div className="section-container">
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter((c) => c.id !== category.id)
              .slice(0, 4)
              .map((relatedCat, idx) => (
                <motion.div
                  key={relatedCat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    to={`/products/${relatedCat.slug}`}
                    className="group flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-200 hover:border-primary hover:shadow-lg transition-all"
                  >
                    <div className="p-3 rounded-xl bg-gray-100 group-hover:bg-primary transition-colors">
                      <relatedCat.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{relatedCat.name}</h3>
                      <p className="text-sm text-slate-500">{getProductCount(relatedCat.slug)} products</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
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

function CategoryProductCard({ 
  product, 
  index, 
  categorySlug,
  onQuickView 
}: { 
  product: Product; 
  index: number; 
  categorySlug: string;
  onQuickView: () => void;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="category-product-card relative rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-white overflow-hidden">
          <motion.img
            src={product.images.primary}
            alt={product.name}
            className="w-full h-full object-contain p-6"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.preventDefault();
                onQuickView();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 text-slate-900 font-medium text-sm shadow-lg hover:bg-white transition-colors"
            >
              <Eye className="h-4 w-4" />
              Quick View
            </motion.button>
          </div>

          {/* Product Code Badge */}
          <Badge className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-semibold shadow-lg">
            {product.code}
          </Badge>
        </div>

        {/* Content */}
        <Link to={`/products/${categorySlug}/${product.code}`} className="block p-5">
          <h3 className="font-heading font-semibold text-slate-900 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 mb-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-slate-500 line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Specs */}
          <div className="flex flex-wrap gap-2">
            {product.specifications.amperage && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                {product.specifications.amperage}
              </span>
            )}
            {product.specifications.pole && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                {product.specifications.pole}
              </span>
            )}
          </div>

          {/* View Details Link */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-orange-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              View Details
            </span>
            <ChevronRight className="h-4 w-4 text-orange-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

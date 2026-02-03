import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, ArrowLeft, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getProductByCode, getRelatedProducts, Product } from "@/lib/data/products";

export default function ProductDetail() {
  const { category: categorySlug, productCode } = useParams<{
    category: string;
    productCode: string;
  }>();
  
  const product = productCode ? getProductByCode(productCode) : undefined;
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const relatedProducts = product ? getRelatedProducts(product) : [];
  
  // Image gallery state - combine primary + gallery images
  const allImages = useMemo(() => {
    if (!product) return [];
    const images = [product.images.primary];
    if (product.images.gallery) {
      images.push(...product.images.gallery);
    }
    return images;
  }, [product]);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };
  
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  if (!product || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const specifications = Object.entries(product.specifications).filter(
    ([_, value]) => value !== undefined
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="section-container py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/products/${categorySlug}`} className="hover:text-primary transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900">{product.code}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8 lg:py-12">
        <div className="section-container">
          <Button asChild variant="ghost" className="mb-6 gap-2 text-slate-700 hover:text-primary">
            <Link to={`/products/${categorySlug}`}>
              <ArrowLeft className="h-4 w-4" />
              Back to {category.name}
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image with Navigation Arrows */}
              <div className="relative aspect-square rounded-2xl bg-white overflow-hidden border border-gray-200 shadow-sm group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={allImages[currentImageIndex]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-contain p-8"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </AnimatePresence>
                
                {/* Navigation Arrows - Show only when there are multiple images */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={goToPreviousImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5 text-slate-700" />
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5 text-slate-700" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`aspect-square rounded-lg bg-white overflow-hidden border-2 transition-all ${
                        currentImageIndex === i 
                          ? "border-primary ring-2 ring-primary/20" 
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - Image ${i + 1}`} 
                        className="w-full h-full object-contain p-2" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-rim-charcoal text-white">{product.code}</Badge>
                  <Badge variant="outline" className="text-slate-700 border-gray-300">{category.name}</Badge>
                </div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-slate-900 mb-3">
                  {product.name}
                </h1>
                <p className="text-slate-600">{product.description}</p>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="font-heading font-semibold text-lg text-slate-900 mb-3">Specifications</h2>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <Table>
                    <TableBody>
                      {specifications.map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium capitalize bg-gray-50 w-1/3 text-slate-700">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </TableCell>
                          <TableCell className="text-slate-900">{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h2 className="font-heading font-semibold text-lg text-slate-900 mb-3">Features</h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {product.applications && product.applications.length > 0 && (
                <div>
                  <h2 className="font-heading font-semibold text-lg text-slate-900 mb-3">Applications</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, i) => (
                      <Badge key={i} variant="secondary" className="bg-gray-100 text-slate-700">{app}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <h3 className="font-semibold text-slate-900">Interested in this product?</h3>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-rim-gradient hover:opacity-90 text-white shadow-lg shadow-orange-500/25">
                    <Link to="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Inquiry
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-gray-300 text-slate-700 hover:text-primary hover:border-primary">
                    <a href="tel:+911234567890">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="section-container">
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.code}
                  to={`/products/${related.category}/${related.code}`}
                  className="group block rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-white">
                    <img
                      src={related.images.primary}
                      alt={related.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <Badge className="mb-2 text-xs bg-rim-charcoal text-white">{related.code}</Badge>
                    <h3 className="font-medium text-sm text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                      {related.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

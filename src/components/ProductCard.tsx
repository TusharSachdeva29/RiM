import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

interface ProductCardProps {
  product: Product;
  index: number;
  categorySlug?: string;
  variant?: "grid" | "carousel";
}

export function ProductCard({ product, index, categorySlug, variant = "grid" }: ProductCardProps) {
  const category = categories.find((c) => c.slug === product.category);
  const categoryPath = categorySlug || product.category;
  
  // Use the product's primary image directly
  const imageUrl = product.images.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/products/${categoryPath}/${product.code}`}
        className="group block rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300"
      >
        {/* Image Container */}
        <div className="aspect-square bg-white relative overflow-hidden border-b border-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 bg-white"
            onError={(e) => {
              // Fallback to placeholder if image doesn't exist
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <Badge className="absolute top-3 left-3 bg-rim-charcoal text-white shadow-md">
            {product.code}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {category && (
              <span className="text-xs text-primary font-medium bg-accent px-2 py-1 rounded-md">
                {category.name}
              </span>
            )}
          </div>
          
          <h3 className="font-heading font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 text-sm">
            {product.name}
          </h3>
          
          <p className="text-xs text-slate-600 mt-2 line-clamp-2">
            {product.description}
          </p>

          {/* Specs Preview */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.specifications.amperage && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-slate-800">
                {product.specifications.amperage}
              </Badge>
            )}
            {product.specifications.pole && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-slate-800">
                {product.specifications.pole}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

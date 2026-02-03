import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllProducts } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

const SCROLL_SPEED = 1; // pixels per frame

export function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const featuredProducts = getAllProducts().slice(0, 12);
  const doubledProducts = [...featuredProducts, ...featuredProducts]; // Create loop effect

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const maxScroll = (featuredProducts.length * 320) - 50; // Approximate card width with gap
        const newPos = (prev + SCROLL_SPEED) % maxScroll;
        return newPos;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered, featuredProducts.length]);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-background to-muted/30 py-12">
      <div className="section-container mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground">
            Discover our top-rated electrical switchgear solutions
          </p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 z-20 w-20 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />

        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 z-20 w-20 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />

        {/* Scrolling Track */}
        <motion.div
          className="flex gap-6 px-8"
          style={{ x: -scrollPosition }}
          transition={isHovered ? { type: "spring", stiffness: 300, damping: 30 } : undefined}
        >
          {doubledProducts.map((product, idx) => {
            const category = categories.find((c) => c.slug === product.category);
            const imageUrl = product.images.primary;

            return (
              <motion.div
                key={`${product.code}-${idx}`}
                className="flex-shrink-0 w-80"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/products/${product.category}/${product.code}`}
                  className="group/card block rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-square bg-white relative overflow-hidden border-b border-gray-100">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 group-hover/card:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    {category && (
                      <Badge className="absolute top-3 right-3 bg-primary text-white">
                        {category.name}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <Badge className="bg-rim-charcoal text-white mb-2">
                      {product.code}
                    </Badge>
                    <h3 className="font-heading font-semibold text-slate-900 group-hover/card:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {product.specifications.amperage && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-slate-800">
                          {product.specifications.amperage}
                        </Badge>
                      )}
                      {product.specifications.voltage && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-slate-800">
                          {product.specifications.voltage}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="section-container mt-10">
        <div className="text-center">
          <Button asChild className="bg-rim-gradient hover:opacity-90 text-white px-8 py-6 text-lg">
            <Link to="/products">
              Explore All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';
import { useUiStore } from '../../store/uiStore';
import { staggerContainer } from '../../utils/animations';

const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

const ProductGrid = ({ products, loading = false }) => {
  const viewMode = useUiStore((s) => s.viewMode);

  if (loading) {
    return <ProductGridSkeleton />;
  }

  // Defensive: treat null/undefined/non-array as empty
  const safeProducts = Array.isArray(products) ? products.filter((p) => p && p.id) : [];

  if (safeProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🪑</div>
        <h3 className="font-serif text-2xl text-brown mb-2">
          No Products Found
        </h3>
        <p className="text-brown-light">
          Try adjusting your filters or browse all categories.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {safeProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="list" />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {safeProducts.map((product) => (
        <ProductCard key={product.id} product={product} viewMode="grid" />
      ))}
    </motion.div>
  );
};

export default ProductGrid;

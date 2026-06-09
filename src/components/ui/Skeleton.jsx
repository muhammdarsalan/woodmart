export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-lg overflow-hidden border border-beige-dark">
      <div className="aspect-[4/3] bg-beige-dark" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-beige-dark rounded w-3/4" />
        <div className="h-3 bg-beige-dark rounded w-1/2" />
        <div className="h-3 bg-beige-dark rounded w-1/3" />
        <div className="h-6 bg-beige-dark rounded w-1/2 mt-4" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-8 p-4 md:p-8">
      <div className="h-12 bg-beige-dark rounded w-1/3 mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default ProductCardSkeleton;

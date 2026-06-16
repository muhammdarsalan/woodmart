import StarRating from '../ui/StarRating';

export default function ReviewSection({ product }) {
  return (
    <section className="section-space bg-white">
      <div className="container-page">
        <h2 className="mb-6 text-2xl font-semibold text-primary">Customer Reviews</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {product.reviews.map(review => (
            <article key={review.id} className="border border-border-light p-5">
              <StarRating rating={review.rating} />
              <p className="mt-4 text-sm leading-6 text-secondary">{review.comment}</p>
              <p className="mt-4 text-sm font-medium text-primary">{review.name}</p>
              <p className="text-xs text-secondary">{review.city}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

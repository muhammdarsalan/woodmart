import { useState } from 'react';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import AddReviewForm from './AddReviewForm';

export default function ReviewSection({ product }) {
  const [showForm, setShowForm] = useState(false);

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = product.reviews.filter((r) => Math.round(r.rating) === star).length;
    const percent = product.reviews.length ? Math.round((count / product.reviews.length) * 100) : 0;
    return { star, percent, count };
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="text-center md:text-left">
          <p className="font-serif text-5xl text-darktext">{product.rating}</p>
          <StarRating rating={product.rating} size="lg" className="justify-center md:justify-start mt-2" />
          <p className="text-brown-light text-sm mt-1">{product.reviewCount} reviews</p>
        </div>
        <div className="md:col-span-2 space-y-2">
          {breakdown.map(({ star, percent }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm text-brown-light w-8">{star}★</span>
              <div className="flex-1 h-2 bg-beige-dark rounded overflow-hidden">
                <div className="h-full bg-gold rounded" style={{ width: `${percent}%` }} />
              </div>
              <span className="text-sm text-beige-muted w-10">{percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={() => setShowForm(true)} className="mb-8">
        Write a Review
      </Button>

      <div className="space-y-6">
        {product.reviews.map((review) => (
          <div key={review.id} className="border-b border-beige-dark pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center font-serif text-brown">
                {review.name[0]}
              </div>
              <div>
                <p className="font-medium text-darktext text-sm">{review.name}</p>
                <p className="text-beige-muted text-xs">{review.city} · {review.date}</p>
              </div>
            </div>
            <StarRating rating={review.rating} size="sm" className="mb-2" />
            <p className="text-brown-light text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Write a Review">
        <AddReviewForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}

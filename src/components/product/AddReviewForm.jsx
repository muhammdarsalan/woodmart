import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  city: z.string().min(2, 'City is required'),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
});

export default function AddReviewForm({ onClose }) {
  const [rating, setRating] = useState(5);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    toast.success('Thank you! Your review has been submitted for approval.');
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium text-brown-light mb-2">Your Rating</label>
        <StarRating rating={rating} interactive onChange={setRating} size="lg" />
      </div>
      <div>
        <label className="block text-sm font-medium text-brown-light mb-1">Name *</label>
        <input {...register('name')} className="input-field" />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-brown-light mb-1">City *</label>
        <input {...register('city')} className="input-field" />
        {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-brown-light mb-1">Review *</label>
        <textarea {...register('comment')} rows={4} className="input-field resize-none" />
        {errors.comment && <p className="text-red-600 text-xs mt-1">{errors.comment.message}</p>}
      </div>
      <div className="flex gap-3">
        <Button type="submit">Submit Review</Button>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
}

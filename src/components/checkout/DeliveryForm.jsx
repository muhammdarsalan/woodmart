import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../ui/Button';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(/^03\d{2}-?\d{7}$/, 'Enter valid Pakistani phone (03XX-XXXXXXX)'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address1: z.string().min(5, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(2, 'Area/Sector is required'),
  notes: z.string().optional(),
});

const cities = ['Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Peshawar', 'Others'];

export default function DeliveryForm({ onSubmit, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="font-serif text-lg text-darktext mb-4">Delivery Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brown-light mb-1">Full Name *</label>
          <input {...register('fullName')} className="input-field" />
          {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-brown-light mb-1">Phone *</label>
          <input {...register('phone')} placeholder="03XX-XXXXXXX" className="input-field" />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-brown-light mb-1">Email</label>
        <input {...register('email')} type="email" className="input-field" />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-brown-light mb-1">Address Line 1 *</label>
        <input {...register('address1')} placeholder="House/Flat No, Street" className="input-field" />
        {errors.address1 && <p className="text-red-600 text-xs mt-1">{errors.address1.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-brown-light mb-1">Address Line 2</label>
        <input {...register('address2')} className="input-field" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brown-light mb-1">City *</label>
          <select {...register('city')} className="input-field">
            <option value="">Select city</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-brown-light mb-1">Area/Sector *</label>
          <input {...register('area')} placeholder="e.g. F-7, Blue Area" className="input-field" />
          {errors.area && <p className="text-red-600 text-xs mt-1">{errors.area.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-brown-light mb-1">Delivery Notes</label>
        <textarea {...register('notes')} rows={3} className="input-field resize-none" placeholder="Gate code, landmarks, preferred time..." />
      </div>
      <Button type="submit" size="lg" className="w-full md:w-auto">Continue to Payment</Button>
    </form>
  );
}

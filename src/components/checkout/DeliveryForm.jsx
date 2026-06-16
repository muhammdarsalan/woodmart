import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(/^03[0-9]{2}-?[0-9]{7}$/, 'Use 03XX-XXXXXXX format'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(2, 'Area or sector is required'),
  notes: z.string().optional()
});

export default function DeliveryForm({ defaultValues, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema), defaultValues });
  const cities = ['Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Peshawar', 'Others'];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full Name*" error={errors.fullName?.message}><input className="input-field" {...register('fullName')} /></Field>
        <Field label="Phone*" error={errors.phone?.message}><input className="input-field" placeholder="03XX-XXXXXXX" {...register('phone')} /></Field>
      </div>
      <Field label="Email" error={errors.email?.message}><input className="input-field" type="email" {...register('email')} /></Field>
      <Field label="Address*" error={errors.address?.message}><input className="input-field" {...register('address')} /></Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="City*" error={errors.city?.message}>
          <select className="input-field" {...register('city')}>
            <option value="">Select city</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </Field>
        <Field label="Area/Sector*" error={errors.area?.message}><input className="input-field" {...register('area')} /></Field>
      </div>
      <Field label="Notes"><textarea rows="4" className="input-field" {...register('notes')} /></Field>
      <Button type="submit" className="justify-self-start">Continue to Payment</Button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-primary">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-accent-red">{error}</span>}
    </label>
  );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Phone is required'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  category: z.string().min(1, 'Choose a category'),
  subject: z.string().optional(),
  message: z.string().min(5, 'Message is required')
});

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const submit = async (data) => {
    try {
      const { error } = await supabase.from('messages').insert([{
        id: Date.now(),
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        category: data.category,
        subject: data.subject || null,
        message: data.message,
        is_read: false
      }]);
      if (error) throw error;
      toast.success('Message sent');
      reset();
    } catch (err) {
      console.error('Contact error:', err);
      toast.error('Failed to send message');
    }
  };

  return (
    <main className="container-page py-10">
      <h1 className="text-3xl font-semibold text-primary">Contact Wood Mart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="border border-border-light p-6">
          <h2 className="text-xl font-semibold text-primary">Wood Mart Showroom</h2>
          <div className="mt-5 space-y-3 text-sm leading-6 text-secondary">
            <p>Main G.T. Rd, opposite Science School Rd, T Chowk, Islamabad, 44000</p>
            <p>0345-9229581 / 0316-5344694</p>
            <p>szahid701@gmail.com</p>
            <p>Mon-Thu &amp; Sat-Sun: 10:30AM-9:30PM</p>
            <p className="font-medium text-primary">Friday: Closed</p>
          </div>
          <iframe
            title="Wood Mart T Chowk Islamabad"
            src="https://maps.google.com/maps?q=Main%20GT%20Road%20T%20Chowk%20Islamabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="mt-6 h-72 w-full border-0"
            loading="lazy"
          />
        </section>
        <form onSubmit={handleSubmit(submit)} className="grid gap-4 border border-border-light p-6">
          <Field label="Name*" error={errors.name?.message}><input className="input-field" {...register('name')} /></Field>
          <Field label="Phone*" error={errors.phone?.message}><input className="input-field" {...register('phone')} /></Field>
          <Field label="Email" error={errors.email?.message}><input className="input-field" type="email" {...register('email')} /></Field>
          <Field label="Category*" error={errors.category?.message}>
            <select className="input-field" {...register('category')}>
              <option value="">Select category</option>
              {['Beds & Dressing', 'Sofas', 'Dining', 'Coffee Chair', 'Console', 'LED Rack', 'Wardrobe'].map(item => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label="Subject"><input className="input-field" {...register('subject')} /></Field>
          <Field label="Message*" error={errors.message?.message}><textarea rows="5" className="input-field" {...register('message')} /></Field>
          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </main>
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

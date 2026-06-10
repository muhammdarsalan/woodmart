import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import { fadeInUp } from '../utils/animations';
import { categories } from '../data/categories';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^03\d{2}-?\d{7}$/, 'Enter valid phone (03XX-XXXXXXX)'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  category: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const showrooms = [
  {
    name: 'Main G.T. Rd Showroom',
    address: 'Main G.T. Rd, opposite Science School Rd, T Chowk, Islamabad, 44000',
    hours: 'Mon-Thu & Sat-Sun: 10:30 AM – 9:30 PM · Friday: Closed',
    phone: '0345-9229581',
    map: 'https://maps.google.com/maps?q=T+Chowk+GT+Road+Islamabad&output=embed',
  },
];

const faqs = [
  { q: 'What are your delivery charges?', a: 'Free delivery in Islamabad on orders above PKR 50,000. Standard fee of PKR 1,500 for smaller orders. Other cities: PKR 2,500.' },
  { q: 'What warranty do you offer?', a: '15-year structural warranty on all solid wood furniture. Upholstery and hardware covered for 2 years.' },
  { q: 'Do you accept custom orders?', a: 'Yes! Visit our showroom or contact us via WhatsApp 0345-9229581 for custom dimensions, finishes, and designs. Lead time: 3-4 weeks.' },
  { q: 'Do you offer installment plans?', a: 'We accept COD, bank transfer, Easypaisa, and JazzCash. Installment plans available through selected bank partners — contact us for details.' },
  { q: 'How long does delivery take?', a: 'Islamabad: 3-5 working days. Other cities: 5-7 working days. Custom orders: 3-4 weeks.' },
  { q: 'Can I return furniture?', a: 'Returns accepted within 7 days for unused items in original packaging. Custom-made pieces are non-returnable.' },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-beige-dark">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full py-4 text-left font-medium transition-colors ${open ? 'text-gold' : 'text-darktext'}`}
      >
        {question}
        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="pb-4 text-brown-light text-sm leading-relaxed">{answer}</p>}
    </div>
  );
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const msgs = JSON.parse(localStorage.getItem('woodmart-messages') || '[]');
    localStorage.setItem('woodmart-messages', JSON.stringify([{
      id: Date.now(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      category: data.category,
      subject: data.subject,
      message: data.message,
      date: new Date().toISOString(),
      isRead: false,
    }, ...(Array.isArray(msgs) ? msgs : [])]));
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    reset();
  };

  return (
    <div className="pt-24 bg-cream min-h-screen">
      <section className="section-dark bg-brown py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="font-serif text-4xl text-white">
            Get in Touch
          </motion.h1>
          <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-beige-muted mt-2">
            We&apos;d love to hear from you
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showrooms.map((s) => (
            <div key={s.name} className="bg-white border border-beige-dark rounded-lg p-6">
              <h3 className="font-serif text-lg text-darktext mb-4">{s.name}</h3>
              <p className="flex items-start gap-2 text-sm text-darktext mb-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {s.address}
              </p>
              <p className="flex items-center gap-2 text-sm text-brown-light mb-2">
                <Clock className="w-4 h-4 text-gold shrink-0" /> {s.hours}
              </p>
              <p className="flex items-center gap-2 text-sm text-gold mb-4">
                <Phone className="w-4 h-4 shrink-0" /> {s.phone}
              </p>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="w-full">Get Directions</Button>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-2xl text-darktext mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brown-light mb-1">Name *</label>
                  <input {...register('name')} className="input-field" />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-light mb-1">Phone *</label>
                  <input {...register('phone')} className="input-field" />
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-light mb-1">Email</label>
                <input {...register('email')} type="email" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-light mb-1">Category</label>
                <select {...register('category')} className="input-field">
                  <option value="">Select category</option>
                  {[...categories.map((c) => c.name), 'Custom Order', 'Other'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-light mb-1">Subject</label>
                <input {...register('subject')} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-light mb-1">Message *</label>
                <textarea {...register('message')} rows={5} className="input-field resize-none" />
                {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" size="lg">Send Message</Button>
            </form>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-6">Find Us</h2>
            <div className="aspect-video rounded-lg overflow-hidden mb-6">
              <iframe
                src="https://maps.google.com/maps?q=T+Chowk+GT+Road+Islamabad&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Wood Mart Main Showroom Location"
              />
            </div>
            <div className="space-y-3 text-sm text-brown-light">
              <p><strong className="text-darktext">Email:</strong> szahid701@gmail.com</p>
              <p><strong className="text-darktext">Phone:</strong> 0345-9229581 or 0316-5344694</p>
              <p><strong className="text-darktext">WhatsApp:</strong> 0345-9229581</p>
              <a href="https://wa.me/923459229581" className="inline-block text-gold hover:underline">Chat on WhatsApp →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="font-serif text-2xl text-darktext text-center mb-8">Frequently Asked Questions</h2>
        <div className="bg-white border border-beige-dark rounded-lg p-6">
        {faqs.map((faq) => (
          <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
        ))}
        </div>
      </section>
    </div>
  );
}

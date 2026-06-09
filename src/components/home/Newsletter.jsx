import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-16 section-gold bg-gold">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-2xl md:text-3xl text-darktext mb-3">
            Get Exclusive Offers & Design Inspiration
          </h2>
          <p className="text-darktext/70 mb-8">
            Join 5,000+ subscribers for weekly design tips, new arrivals, and members-only discounts.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-darktext/10 rounded-lg p-6"
            >
              <p className="text-darktext font-medium text-lg">You&apos;re subscribed!</p>
              <p className="text-darktext/70 text-sm mt-1">Check your inbox for a welcome offer.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-sm text-darktext bg-white border-0 focus:outline-none focus:ring-2 focus:ring-darktext"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-darktext text-lighttext font-medium rounded-sm hover:bg-brown-mid transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
          {error && <p className="text-red-900 text-sm mt-2">{error}</p>}
        </motion.div>
      </div>
    </section>
  );
}

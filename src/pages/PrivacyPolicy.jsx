import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 bg-cream min-h-screen">
      <section className="section-dark bg-brown py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="font-serif text-4xl text-white">
            Privacy Policy
          </motion.h1>
          <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-beige-muted mt-2">
            How we protect your information
          </motion.p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 mb-16">
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">What Information We Collect</h2>
            <p className="text-brown-light mb-4">We collect the following personal information when you place an order or contact us:</p>
            <ul className="list-disc list-inside space-y-2 text-brown-light">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Delivery address</li>
              <li>Payment information (processed securely)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">How We Use Your Information</h2>
            <p className="text-brown-light mb-4">Your information is used solely for:</p>
            <ul className="list-disc list-inside space-y-2 text-brown-light">
              <li>Processing and fulfilling your furniture orders</li>
              <li>Arranging delivery and installation services</li>
              <li>Sending order updates and delivery notifications via WhatsApp or SMS</li>
              <li>Responding to customer inquiries and support requests</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Data Protection & Security</h2>
            <p className="text-brown-light">
              We take data security seriously. Your personal and payment information is encrypted and stored securely.
              We never sell, share, or distribute your data to third parties without your explicit consent. Your information
              remains confidential and is used only for the purposes stated above.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Cookies</h2>
            <p className="text-brown-light">
              Our website uses basic cookies for functionality only (such as shopping cart management and user preferences).
              These cookies help us provide you with a better browsing experience. We do not use tracking cookies or analytics
              that compromise your privacy.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Contact Us</h2>
            <p className="text-brown-light mb-2">
              If you have any questions about our privacy practices or how we handle your information, please contact us:
            </p>
            <p className="text-brown-light font-medium">Email: szahid701@gmail.com</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Governing Law</h2>
            <p className="text-brown-light">
              This Privacy Policy is governed by the laws of Pakistan and is subject to Pakistani data protection regulations.
            </p>
          </div>

          <div className="pt-6 border-t border-beige-dark">
            <p className="text-sm text-brown-light">Last updated: 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}

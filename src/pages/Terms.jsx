import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

export default function Terms() {
  return (
    <div className="pt-24 bg-cream min-h-screen">
      <section className="section-dark bg-brown py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="font-serif text-4xl text-white">
            Terms & Conditions
          </motion.h1>
          <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-beige-muted mt-2">
            Please read these terms carefully before ordering
          </motion.p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 mb-16">
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Order & Availability</h2>
            <p className="text-brown-light">
              All orders are subject to availability and confirmation. Wood Mart reserves the right to accept or reject
              any order. Stock availability is confirmed via WhatsApp or phone within 24 hours of order placement. Prices
              are subject to change without notice.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Pricing & Currency</h2>
            <p className="text-brown-light mb-2">
              All prices are displayed in Pakistani Rupees (PKR) and include applicable taxes.
            </p>
            <p className="text-brown-light">
              Prices are subject to change at any time. We will confirm the final price when your order is confirmed.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Delivery Terms</h2>
            <ul className="space-y-2 text-brown-light">
              <li><strong>Standard Delivery:</strong> 3-5 working days in Islamabad and Rawalpindi</li>
              <li><strong>Regional Delivery:</strong> 5-7 working days for Lahore, Karachi, and other major cities</li>
              <li><strong>Custom Orders:</strong> 3-4 weeks from order confirmation</li>
              <li><strong>Free Delivery:</strong> Orders above PKR 50,000 in Islamabad</li>
              <li><strong>Delivery Fee:</strong> PKR 1,500 for orders below PKR 50,000 in Islamabad</li>
              <li><strong>Other Cities:</strong> PKR 2,500 standard delivery fee</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Warranty</h2>
            <ul className="space-y-2 text-brown-light">
              <li><strong>Solid Wood Furniture:</strong> 15-year structural warranty on all solid wood products</li>
              <li><strong>Upholstery & Hardware:</strong> 2-year warranty on fabric, foam, and hardware components</li>
              <li>Warranty covers manufacturing defects and structural issues</li>
              <li>Normal wear and tear, misuse, or lack of maintenance are not covered</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Returns & Refunds</h2>
            <ul className="space-y-2 text-brown-light">
              <li><strong>Return Period:</strong> 7 days from delivery date</li>
              <li><strong>Condition:</strong> Item must be unused and in original packaging</li>
              <li><strong>Refund Processing:</strong> 5-7 working days after inspection and approval</li>
              <li><strong>Custom Orders:</strong> Non-refundable once production has started</li>
              <li><strong>Return Shipping:</strong> Customer bears return shipping costs</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Payment Methods</h2>
            <p className="text-brown-light mb-2">We accept the following payment methods:</p>
            <ul className="list-disc list-inside space-y-2 text-brown-light">
              <li>Cash on Delivery (COD)</li>
              <li>Bank Transfer</li>
              <li>Online Payment (JazzCash, Easypaisa)</li>
              <li>Installment plans available through selected bank partners</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Custom Orders</h2>
            <p className="text-brown-light mb-2">
              We offer custom furniture orders with personalized dimensions, finishes, and designs.
            </p>
            <ul className="list-disc list-inside space-y-2 text-brown-light">
              <li>Contact any showroom or WhatsApp for custom order inquiries</li>
              <li>Production lead time: 3-4 weeks</li>
              <li>Custom orders require 50% advance payment</li>
              <li>Custom-made pieces are non-refundable</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Dispute Resolution</h2>
            <p className="text-brown-light mb-2">
              These Terms & Conditions are governed by the laws of Pakistan. All disputes shall be resolved according
              to Pakistani law and subject to the exclusive jurisdiction of courts in Islamabad.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-darktext mb-4">Contact Information</h2>
            <p className="text-brown-light mb-2">
              For any inquiries regarding these terms or our policies:
            </p>
            <ul className="space-y-1 text-brown-light">
              <li><strong>Email:</strong> szahid701@gmail.com</li>
              <li><strong>Phone:</strong> 0345-9229581, 0316-5344694</li>
              <li><strong>WhatsApp:</strong> 0345-9229581</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-beige-dark">
            <p className="text-sm text-brown-light">Last updated: 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}

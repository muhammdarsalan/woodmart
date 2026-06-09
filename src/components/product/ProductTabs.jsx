import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import ReviewSection from './ReviewSection';

export default function ProductTabs({ product, reviewsRef }) {
  const tabs = ['Description', 'Specifications', 'Reviews', 'Shipping & Returns'];

  return (
    <div ref={reviewsRef}>
      <TabGroup>
        <TabList className="flex border-b border-beige-dark overflow-x-auto">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className="px-6 py-3 text-sm font-medium text-brown-light border-b-2 border-transparent ui-selected:text-darktext ui-selected:border-gold hover:text-darktext transition-colors whitespace-nowrap focus:outline-none"
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="py-8">
          <TabPanel>
            <div
              className="text-brown-light leading-relaxed max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </TabPanel>
          <TabPanel>
            <table className="w-full text-sm border border-beige-dark rounded-lg overflow-hidden">
              <tbody>
                {[
                  ['Material', product.material],
                  ['Dimensions', `${product.dimensions.width}" W × ${product.dimensions.height}" H × ${product.dimensions.depth}" D`],
                  ['Weight', product.weight],
                  ['Finish', 'Hand-rubbed natural oil'],
                  ['Assembly', 'Professional assembly included'],
                  ['Warranty', '15-year structural warranty'],
                  ['SKU', product.sku],
                ].map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 0 ? 'bg-beige' : 'bg-white'}>
                    <td className="py-3 px-4 font-medium text-darktext w-1/3 border-b border-beige-dark">{label}</td>
                    <td className="py-3 px-4 text-brown-light border-b border-beige-dark">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <ReviewSection product={product} />
          </TabPanel>
          <TabPanel>
            <div className="space-y-6 text-brown-light text-sm leading-relaxed">
              <div>
                <h3 className="font-serif text-lg text-darktext mb-2">Delivery</h3>
                <p>Free delivery in Islamabad and Rawalpindi on orders above PKR 50,000. Standard delivery fee of PKR 1,500 applies to smaller orders. Delivery to other cities: PKR 2,500.</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Islamabad/Rawalpindi: 3-5 working days</li>
                  <li>Lahore, Karachi, Peshawar: 5-7 working days</li>
                  <li>Other cities: 7-10 working days</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg text-darktext mb-2">Returns</h3>
                <p>We accept returns within 7 days of delivery for unused items in original packaging. Custom-made furniture is non-returnable. Contact us via WhatsApp to initiate a return.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-darktext mb-2">Warranty</h3>
                <p>All solid wood furniture comes with a 15-year structural warranty covering frame integrity and joinery. Upholstery and hardware are covered for 2 years.</p>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}

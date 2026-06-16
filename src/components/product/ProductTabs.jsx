import { useState } from 'react';

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState('description');
  const tabs = [
    ['description', 'Description'],
    ['details', 'Details'],
    ['delivery', 'Delivery']
  ];
  return (
    <section className="section-space border-t border-border-light bg-white">
      <div className="container-page">
        <div className="mb-6 flex gap-6 border-b border-border-light">
          {tabs.map(([id, label]) => (
            <button key={id} type="button" onClick={() => setTab(id)} className={'pb-3 text-sm font-medium ' + (tab === id ? 'border-b-2 border-primary text-primary' : 'text-secondary')}>
              {label}
            </button>
          ))}
        </div>
        {tab === 'description' && <div className="prose-woodmart max-w-3xl text-sm" dangerouslySetInnerHTML={{ __html: product.description }} />}
        {tab === 'details' && (
          <div className="grid max-w-3xl gap-3 text-sm text-secondary md:grid-cols-2">
            <p>Material: {product.material}</p>
            <p>SKU: {product.sku}</p>
            <p>Category: {product.category}</p>
            <p>Subcategory: {product.subcategory}</p>
          </div>
        )}
        {tab === 'delivery' && <p className="max-w-3xl text-sm leading-7 text-secondary">Delivery takes 3-5 days in Islamabad and Rawalpindi, and 5-7 days for other cities. Delivery is free above PKR 50,000.</p>}
      </div>
    </section>
  );
}

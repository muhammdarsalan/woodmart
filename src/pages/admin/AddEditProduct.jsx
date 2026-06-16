import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';
import { handleImageError } from '../../utils/images';
import { readStorage, writeStorage } from '../../utils/storage';

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(1),
  subcategory: z.string().min(1),
  shortDesc: z.string().min(5),
  description: z.string().min(10),
  originalPrice: z.coerce.number().min(1),
  price: z.coerce.number().min(1),
  material: z.string().min(1),
  sku: z.string().min(2),
  weight: z.string().min(1),
  width: z.coerce.number().min(1),
  height: z.coerce.number().min(1),
  depth: z.coerce.number().min(1),
  stockCount: z.coerce.number().min(0),
  badge: z.string().optional(),
  inStock: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
  tags: z.string().optional()
});

function slugify(value) {
  return String(value).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function AddEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useProducts();
  const editing = Boolean(id);
  const existing = products.find(product => String(product.id) === String(id));
  const [images, setImages] = useState(existing?.images || []);
  const [colors, setColors] = useState(existing?.colors || [{ name: 'Walnut', hex: '#6B4423' }]);
  const defaultValues = useMemo(() => ({
    name: existing?.name || '',
    slug: existing?.slug || '',
    category: existing?.category || 'Sofas',
    subcategory: existing?.subcategory || '',
    shortDesc: existing?.shortDesc || '',
    description: existing?.description || '<p>Premium Wood Mart furniture piece.</p>',
    originalPrice: existing?.originalPrice || 100000,
    price: existing?.price || 90000,
    material: existing?.material || 'Sheesham',
    sku: existing?.sku || 'WM-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
    weight: existing?.weight || '45 kg',
    width: existing?.dimensions?.width || 40,
    height: existing?.dimensions?.height || 40,
    depth: existing?.dimensions?.depth || 40,
    stockCount: existing?.stockCount || 5,
    badge: existing?.badge || '',
    inStock: existing?.inStock ?? true,
    isFeatured: existing?.isFeatured || false,
    isNew: existing?.isNew || false,
    isOnSale: existing?.isOnSale || false,
    tags: existing?.tags?.join(', ') || ''
  }), [existing]);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ resolver: zodResolver(schema), defaultValues });
  const watchedName = watch('name');

  useEffect(() => {
    if (!editing && watchedName) setValue('slug', slugify(watchedName));
  }, [watchedName, editing, setValue]);

  const onDrop = acceptedFiles => {
    acceptedFiles.slice(0, 8 - images.length).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => setImages(previous => [...previous, reader.result].slice(0, 8));
      reader.readAsDataURL(file);
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 8,
    maxSize: 5 * 1024 * 1024
  });

  const save = data => {
    const productId = existing?.id || uuidv4();
    const originalPrice = Number(data.originalPrice);
    const price = Number(data.price);
    const product = {
      id: productId,
      slug: data.slug,
      name: data.name,
      category: data.category,
      subcategory: data.subcategory,
      shortDesc: data.shortDesc,
      description: data.description,
      price,
      originalPrice,
      discount: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
      currency: 'PKR',
      material: data.material,
      colors,
      dimensions: { width: Number(data.width), height: Number(data.height), depth: Number(data.depth), unit: 'inches' },
      weight: data.weight,
      rating: existing?.rating || 4.8,
      reviewCount: existing?.reviewCount || 0,
      badge: data.badge || null,
      images: images.length ? images : [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&fit=crop',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&fit=crop',
        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&q=80&fit=crop',
        'https://images.unsplash.com/photo-1519961655809-34fa156820ff?w=900&q=80&fit=crop'
      ],
      inStock: Boolean(data.inStock),
      stockCount: Number(data.stockCount),
      isNew: Boolean(data.isNew),
      isFeatured: Boolean(data.isFeatured),
      isOnSale: Boolean(data.isOnSale) || originalPrice > price,
      tags: String(data.tags || '').split(',').map(tag => tag.trim()).filter(Boolean),
      sku: data.sku,
      reviews: existing?.reviews || []
    };
    const saved = readStorage('woodmart-products', []).filter(item => String(item.id) !== String(productId));
    writeStorage('woodmart-products', [product, ...saved]);
    if (String(productId).startsWith('wm-')) {
      const deleted = readStorage('woodmart-deleted-products', []).map(String);
      if (!deleted.includes(String(productId))) writeStorage('woodmart-deleted-products', [...deleted, String(productId)]);
    }
    toast.success(editing ? 'Product updated' : 'Product added');
    navigate('/admin/products');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary">{editing ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit(save)} className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="grid gap-4 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" error={errors.name?.message}><input className="admin-input" {...register('name')} /></Field>
            <Field label="Slug" error={errors.slug?.message}><input className="admin-input" {...register('slug')} /></Field>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Category" error={errors.category?.message}>
              <select className="admin-input" {...register('category')}>
                {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
              </select>
            </Field>
            <Field label="Subcategory" error={errors.subcategory?.message}><input className="admin-input" {...register('subcategory')} /></Field>
          </div>
          <Field label="Short Description" error={errors.shortDesc?.message}><input className="admin-input" {...register('shortDesc')} /></Field>
          <Field label="Full Description" error={errors.description?.message}><textarea rows="5" className="admin-input" {...register('description')} /></Field>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Original Price" error={errors.originalPrice?.message}><input className="admin-input" type="number" {...register('originalPrice')} /></Field>
            <Field label="Sale Price" error={errors.price?.message}><input className="admin-input" type="number" {...register('price')} /></Field>
            <Field label="Material" error={errors.material?.message}><input className="admin-input" {...register('material')} /></Field>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="SKU" error={errors.sku?.message}><input className="admin-input" {...register('sku')} /></Field>
            <Field label="Weight" error={errors.weight?.message}><input className="admin-input" {...register('weight')} /></Field>
            <Field label="Stock Count" error={errors.stockCount?.message}><input className="admin-input" type="number" {...register('stockCount')} /></Field>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Width" error={errors.width?.message}><input className="admin-input" type="number" {...register('width')} /></Field>
            <Field label="Height" error={errors.height?.message}><input className="admin-input" type="number" {...register('height')} /></Field>
            <Field label="Depth" error={errors.depth?.message}><input className="admin-input" type="number" {...register('depth')} /></Field>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Badge"><select className="admin-input" {...register('badge')}><option value="">None</option><option>New</option><option>Sale</option><option>Bestseller</option><option>Top Rated</option></select></Field>
            <Field label="Tags"><input className="admin-input" placeholder="wood, sofa, featured" {...register('tags')} /></Field>
          </div>
          <div className="flex flex-wrap gap-5 text-sm">
            <label><input type="checkbox" className="mr-2 accent-primary" {...register('inStock')} />In Stock</label>
            <label><input type="checkbox" className="mr-2 accent-primary" {...register('isFeatured')} />Featured</label>
            <label><input type="checkbox" className="mr-2 accent-primary" {...register('isNew')} />New Arrival</label>
            <label><input type="checkbox" className="mr-2 accent-primary" {...register('isOnSale')} />On Sale</label>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium">Colors</p>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button key={color.name} type="button" onClick={() => setColors(colors.filter(item => item.name !== color.name))} className="flex items-center gap-2 border border-border-light px-3 py-2 text-sm">
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: color.hex }} /> {color.name}
                </button>
              ))}
              <Button type="button" size="sm" variant="outline" onClick={() => setColors([...colors, { name: 'Custom', hex: '#999999' }])}>Add Color</Button>
            </div>
          </div>
          <Button type="submit" className="justify-self-start">Save Product</Button>
        </section>
        <aside className="bg-white p-5">
          <h2 className="text-base font-semibold">Images</h2>
          <div {...getRootProps()} className={'mt-4 cursor-pointer border border-dashed p-6 text-center text-sm ' + (isDragActive ? 'border-primary bg-bg-light' : 'border-border-light')}>
            <input {...getInputProps()} />
            Drop images here or click to upload. JPG, PNG, WEBP. Max 8 files, 5MB each.
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {images.map((image, index) => (
              <div key={image + index} className="relative border border-border-light p-1">
                {index === 0 && <span className="absolute left-2 top-2 bg-primary px-2 py-1 text-[10px] uppercase text-white">Main</span>}
                <img src={image} alt="Product upload" loading="lazy" decoding="async" onError={handleImageError} className="aspect-square w-full object-cover" />
                <button type="button" onClick={() => setImages(images.filter((_, imageIndex) => imageIndex !== index))} className="mt-2 w-full border border-border-light py-1 text-xs">Remove</button>
              </div>
            ))}
          </div>
        </aside>
      </form>
    </div>
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

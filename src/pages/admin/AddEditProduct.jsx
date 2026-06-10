import { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { ArrowDown, ArrowUp, ImagePlus, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  shortDesc: z.string().max(150).optional(),
  description: z.string().max(1000).optional(),
  originalPrice: z.coerce.number().positive('Original price is required'),
  price: z.coerce.number().optional(),
  material: z.string().min(1),
  sku: z.string().min(1),
  weight: z.string().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  depth: z.coerce.number().optional(),
  inStock: z.boolean(),
  stockCount: z.coerce.number().min(0),
  badge: z.string().optional(),
  isFeatured: z.boolean(),
  isNew: z.boolean(),
  isOnSale: z.boolean(),
});

const materials = ['Sheesham', 'Teak', 'MDF', 'Walnut', 'Oak', 'Pine'];
const badges = ['', 'New', 'Sale', 'Bestseller', 'Top Rated'];

const slugify = (value) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function readSavedProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem('woodmart-products') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function AddEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const allProducts = useProducts();
  const editing = allProducts.find((p) => String(p.id) === String(id));
  const [images, setImages] = useState(editing?.images || []);
  const [colors, setColors] = useState(editing?.colors || []);
  const [tags, setTags] = useState(editing?.tags || []);
  const [colorName, setColorName] = useState('');
  const [colorHex, setColorHex] = useState('#C49A2A');
  const [tagInput, setTagInput] = useState('');
  const [slugTouched, setSlugTouched] = useState(Boolean(editing));

  const defaults = useMemo(() => ({
    name: editing?.name || '',
    slug: editing?.slug || '',
    category: editing?.category || '',
    subcategory: editing?.subcategory || '',
    shortDesc: editing?.shortDesc || '',
    description: editing?.description?.replace(/<\/?p>/g, '') || '',
    originalPrice: editing?.originalPrice || '',
    price: editing?.price || '',
    material: editing?.material || 'Sheesham',
    sku: editing?.sku || `WM-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    weight: editing?.weight || '',
    width: editing?.dimensions?.width || '',
    height: editing?.dimensions?.height || '',
    depth: editing?.dimensions?.depth || '',
    inStock: editing?.inStock ?? true,
    stockCount: editing?.stockCount ?? 0,
    badge: editing?.badge || '',
    isFeatured: editing?.isFeatured || false,
    isNew: editing?.isNew || false,
    isOnSale: editing?.isOnSale || false,
  }), [editing]);

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  const watchedName = watch('name');
  const watchedPrice = watch('price');
  const watchedOriginal = watch('originalPrice');
  const discount = watchedOriginal && watchedPrice && watchedOriginal > watchedPrice
    ? Math.round(((watchedOriginal - watchedPrice) / watchedOriginal) * 100)
    : 0;

  useEffect(() => {
    if (!slugTouched && watchedName) setValue('slug', slugify(watchedName));
  }, [watchedName, slugTouched, setValue]);

  const onDrop = async (accepted) => {
    const slots = Math.max(0, 8 - images.length);
    const valid = accepted.slice(0, slots).filter((file) => file.size <= 5 * 1024 * 1024);
    const converted = await Promise.all(valid.map(fileToBase64));
    setImages((current) => [...current, ...converted].slice(0, 8));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 8,
    maxSize: 5 * 1024 * 1024,
  });

  const moveImage = (index, direction) => {
    setImages((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const addColor = () => {
    if (!colorName.trim()) return;
    setColors((current) => [...current, { name: colorName.trim(), hex: colorHex }]);
    setColorName('');
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setTags((current) => [...new Set([...current, tagInput.trim()])]);
    setTagInput('');
  };

  const saveProduct = (data, status = 'published') => {
    const product = {
      id: editing?.id || uuidv4(),
      slug: data.slug,
      name: data.name,
      category: data.category,
      subcategory: data.subcategory,
      shortDesc: data.shortDesc,
      description: `<p>${data.description || data.shortDesc || ''}</p>`,
      price: Number(data.price || data.originalPrice),
      originalPrice: Number(data.originalPrice),
      material: data.material,
      colors,
      dimensions: { width: Number(data.width || 0), height: Number(data.height || 0), depth: Number(data.depth || 0), unit: 'inches' },
      weight: data.weight,
      rating: editing?.rating || 0,
      reviewCount: editing?.reviewCount || 0,
      badge: data.badge || null,
      inStock: data.inStock,
      stockCount: Number(data.stockCount || 0),
      isNew: data.isNew,
      isFeatured: data.isFeatured,
      isOnSale: data.isOnSale || discount > 0,
      tags,
      sku: data.sku,
      currency: 'PKR',
      discount,
      images: images.length ? images : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop'],
      reviews: editing?.reviews || [],
      status,
    };

    const saved = readSavedProducts();
    const next = [product, ...saved.filter((p) => String(p.id) !== String(product.id))];
    localStorage.setItem('woodmart-products', JSON.stringify(next));
    toast.success(status === 'draft' ? 'Draft saved' : 'Product published');
    navigate('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit((data) => saveProduct(data))} className="pb-24">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name *</label>
              <input {...register('name')} className="input-field" />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input {...register('slug')} onChange={(e) => { setSlugTouched(true); setValue('slug', slugify(e.target.value)); }} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select {...register('category')} className="input-field">
                <option value="">Select category</option>
                {categories.map((cat) => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subcategory</label>
              <input {...register('subcategory')} className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short Description</label>
            <input {...register('shortDesc')} maxLength={150} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Description</label>
            <textarea {...register('description')} rows={5} maxLength={1000} className="input-field resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Original Price PKR *</label>
              <input type="number" {...register('originalPrice')} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sale Price PKR</label>
              <input type="number" {...register('price')} className="input-field" />
            </div>
            <div className="flex items-end text-sm text-brown-light">Discount: {discount}%</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Material</label>
              <select {...register('material')} className="input-field">{materials.map((m) => <option key={m}>{m}</option>)}</select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SKU</label>
              <input {...register('sku')} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Weight</label>
              <input {...register('weight')} className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="number" placeholder="W inches" {...register('width')} className="input-field" />
            <input type="number" placeholder="H inches" {...register('height')} className="input-field" />
            <input type="number" placeholder="D inches" {...register('depth')} className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Colors</label>
            <div className="flex gap-2 mb-2">
              <input type="color" value={colorHex} onChange={(e) => setColorHex(e.target.value)} className="h-11 w-14 border rounded" />
              <input value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder="Color name" className="input-field" />
              <button type="button" onClick={addColor} className="px-4 py-2 bg-brown text-white rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((color, index) => (
                <button key={`${color.name}-${index}`} type="button" onClick={() => setColors((c) => c.filter((_, i) => i !== index))} className="px-3 py-1 rounded-full border text-sm flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: color.hex }} /> {color.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} className="input-field" />
              <button type="button" onClick={addTag} className="px-4 py-2 bg-brown text-white rounded">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button key={tag} type="button" onClick={() => setTags((t) => t.filter((item) => item !== tag))} className="px-3 py-1 rounded-full bg-gray-100 text-sm">{tag}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2"><Controller name="inStock" control={control} render={({ field }) => <input type="checkbox" checked={field.value} onChange={field.onChange} />} /> In Stock</label>
            <div><label className="block text-sm mb-1">Stock Count</label><input type="number" {...register('stockCount')} className="input-field" /></div>
            <div><label className="block text-sm mb-1">Badge</label><select {...register('badge')} className="input-field">{badges.map((b) => <option key={b} value={b}>{b || 'None'}</option>)}</select></div>
          </div>

          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2"><Controller name="isFeatured" control={control} render={({ field }) => <input type="checkbox" checked={field.value} onChange={field.onChange} />} /> Featured</label>
            <label className="flex items-center gap-2"><Controller name="isNew" control={control} render={({ field }) => <input type="checkbox" checked={field.value} onChange={field.onChange} />} /> New Arrival</label>
            <label className="flex items-center gap-2"><Controller name="isOnSale" control={control} render={({ field }) => <input type="checkbox" checked={field.value} onChange={field.onChange} />} /> On Sale</label>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 h-fit">
          <h2 className="font-serif text-xl text-darktext mb-4">Product Images</h2>
          <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragActive ? 'border-gold bg-gold/10' : 'border-gray-300'}`}>
            <input {...getInputProps()} />
            <ImagePlus className="w-10 h-10 mx-auto text-gold mb-3" />
            <p className="font-medium">Drag images here or click to upload</p>
            <p className="text-sm text-brown-light mt-1">JPG, PNG, WEBP. Max 8 images, 5MB each.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {images.map((image, index) => (
              <div key={`${image}-${index}`} className="relative border rounded overflow-hidden">
                {index === 0 && <span className="absolute left-2 top-2 z-10 bg-gold text-darktext text-xs font-bold px-2 py-1 rounded">Main</span>}
                <img src={image} alt={`Product ${index + 1}`} className="w-full aspect-square object-cover" />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <button type="button" onClick={() => moveImage(index, -1)} className="bg-white p-1 rounded shadow"><ArrowUp className="w-4 h-4" /></button>
                  <button type="button" onClick={() => moveImage(index, 1)} className="bg-white p-1 rounded shadow"><ArrowDown className="w-4 h-4" /></button>
                  <button type="button" onClick={() => setImages((current) => current.filter((_, i) => i !== index))} className="bg-white p-1 rounded shadow text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] bg-white border-t border-gray-200 p-4 flex justify-end gap-3 z-20">
        <button type="button" onClick={() => navigate('/admin/products')} className="px-5 py-3 border rounded">Cancel</button>
        <button type="button" onClick={handleSubmit((data) => saveProduct(data, 'draft'))} className="px-5 py-3 border border-brown text-brown rounded font-semibold">Save Draft</button>
        <button type="submit" className="px-5 py-3 bg-gold text-darktext rounded font-semibold hover:bg-gold-light">Publish Product</button>
      </div>
    </form>
  );
}

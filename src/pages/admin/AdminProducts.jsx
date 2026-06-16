import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import formatPrice from '../../utils/formatPrice';
import { handleImageError } from '../../utils/images';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';
import { readStorage, writeStorage } from '../../utils/storage';

export default function AdminProducts() {
  const allProducts = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [hidden, setHidden] = useState([]);
  const products = useMemo(() => {
    const lower = query.toLowerCase();
    return allProducts
      .filter(product => !hidden.includes(String(product.id)))
      .filter(product => !category || product.category === category)
      .filter(product => !query || product.name.toLowerCase().includes(lower));
  }, [allProducts, category, query, hidden]);
  const totalPages = Math.max(1, Math.ceil(products.length / 10));
  const current = products.slice((page - 1) * 10, page * 10);

  const remove = product => {
    if (!window.confirm('Delete ' + product.name + '?')) return;
    const saved = readStorage('woodmart-products', []).filter(item => String(item.id) !== String(product.id));
    const deleted = readStorage('woodmart-deleted-products', []).map(String);
    writeStorage('woodmart-products', saved);
    if (!deleted.includes(String(product.id))) writeStorage('woodmart-deleted-products', [...deleted, String(product.id)]);
    toast.success('Product deleted');
    setHidden([...hidden, String(product.id)]);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-primary">Products</h1>
        <Button as={Link} to="/admin/products/add"><Plus size={16} /> Add Product</Button>
      </div>
      <div className="mt-6 grid gap-3 bg-white p-4 md:grid-cols-[1fr_220px]">
        <input value={query} onChange={event => setQuery(event.target.value)} className="admin-input" placeholder="Search products" />
        <select value={category} onChange={event => setCategory(event.target.value)} className="admin-input">
          <option value="">All categories</option>
          {categories.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
        </select>
      </div>
      <div className="mt-4 overflow-x-auto border border-border-light bg-white">
        <table className="w-full min-w-[940px] text-left text-sm">
          <thead className="bg-bg-light text-xs uppercase text-secondary">
            <tr><th className="p-3">Thumbnail</th><th className="p-3">Name</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Badge</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {current.map(product => (
              <tr key={product.id} className="border-t border-border-light">
                <td className="p-3"><img src={product.images?.[0]} alt={product.name} loading="lazy" decoding="async" onError={handleImageError} className="h-14 w-14 object-cover" /></td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{formatPrice(product.price)}</td>
                <td className="p-3">{product.stockCount}</td>
                <td className="p-3">{product.badge ? <Badge>{product.badge}</Badge> : 'None'}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Button as={Link} to={'/admin/products/edit/' + product.id} size="sm" variant="outline"><Edit size={14} /> Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => remove(product)}><Trash2 size={14} /> Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index + 1} type="button" size="sm" variant={page === index + 1 ? 'primary' : 'outline'} onClick={() => setPage(index + 1)}>{index + 1}</Button>
        ))}
      </div>
    </div>
  );
}

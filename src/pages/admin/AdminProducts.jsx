import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';

const PER_PAGE = 10;

function saveDeletedProduct(id) {
  const deleted = JSON.parse(localStorage.getItem('woodmart-deleted-products') || '[]');
  localStorage.setItem('woodmart-deleted-products', JSON.stringify([...new Set([...deleted, String(id)])]));
}

export default function AdminProducts() {
  const initialProducts = useProducts();
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const result = products
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .filter((p) => !category || p.category === category);

    return [...result].sort((a, b) => {
      if (sortBy === 'price') return Number(a.price || 0) - Number(b.price || 0);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });
  }, [products, query, category, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = (product) => {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    const saved = JSON.parse(localStorage.getItem('woodmart-products') || '[]');
    const nextSaved = Array.isArray(saved) ? saved.filter((p) => String(p.id) !== String(product.id)) : [];
    localStorage.setItem('woodmart-products', JSON.stringify(nextSaved));
    saveDeletedProduct(product.id);
    setProducts((current) => current.filter((p) => String(p.id) !== String(product.id)));
    toast.success('Product deleted');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search products"
              className="input-field pl-10 min-w-[240px]"
            />
          </div>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="input-field"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field">
            <option value="name">Sort by name</option>
            <option value="price">Sort by price</option>
            <option value="category">Sort by category</option>
          </select>
        </div>
        <Link to="/admin/products/add" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold text-darktext font-semibold rounded hover:bg-gold-light">
          <Plus className="w-4 h-4" />
          Add New Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-brown-light">
            <tr>
              <th className="px-4 py-3">Thumbnail</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Badge</th>
              <th className="px-4 py-3">Edit</th>
              <th className="px-4 py-3">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visible.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <img src={product.images?.[0]} alt={product.name} className="w-14 h-14 rounded object-cover bg-gray-100" />
                </td>
                <td className="px-4 py-3 font-medium text-darktext">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">PKR {Number(product.price || 0).toLocaleString()}</td>
                <td className="px-4 py-3">{product.inStock ? product.stockCount ?? 0 : 'Out'}</td>
                <td className="px-4 py-3">{product.badge || '-'}</td>
                <td className="px-4 py-3">
                  <Link to={`/admin/products/edit/${product.id}`} className="inline-flex text-gold hover:text-gold-light">
                    <Edit className="w-4 h-4" />
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(product)} className="text-red-600 hover:text-red-700" aria-label={`Delete ${product.name}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-brown-light">Page {page} of {totalPages}</p>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-2 border rounded disabled:opacity-40">Previous</button>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-2 border rounded disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  );
}

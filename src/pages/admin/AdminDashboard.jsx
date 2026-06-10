import { Link } from 'react-router-dom';
import { Boxes, FolderTree, MessageCircle, ShoppingCart } from 'lucide-react';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';

function readArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export default function AdminDashboard() {
  const products = useProducts();
  const orders = readArray('woodmart-orders');
  const messages = readArray('woodmart-messages');
  const recent = products.slice(0, 5);

  const stats = [
    { label: 'Total Products', value: products.length, icon: Boxes },
    { label: 'Categories', value: categories.length, icon: FolderTree },
    { label: 'Orders', value: orders.length, icon: ShoppingCart },
    { label: 'Messages', value: messages.length, icon: MessageCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-brown-light">{stat.label}</p>
                  <p className="text-3xl font-semibold text-darktext mt-1">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded bg-gold/15 text-gold flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h2 className="font-serif text-xl text-darktext mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/products/add" className="px-5 py-3 bg-gold text-darktext font-semibold rounded hover:bg-gold-light">
            Add New Product
          </Link>
          <Link to="/admin/products" className="px-5 py-3 border border-brown text-brown font-semibold rounded hover:bg-brown hover:text-white">
            View All Products
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="font-serif text-xl text-darktext">Recent Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-brown-light">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recent.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.images?.[0]} alt={product.name} className="w-12 h-12 rounded object-cover bg-gray-100" />
                      <span className="font-medium text-darktext">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">PKR {Number(product.price || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">{product.stockCount ?? 0}</td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/products/edit/${product.id}`} className="text-gold font-medium hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

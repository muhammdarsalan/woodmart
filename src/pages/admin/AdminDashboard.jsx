import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import formatPrice from '../../utils/formatPrice';
import useProducts from '../../hooks/useProducts';
import { categories } from '../../data/categories';
import { readStorage } from '../../utils/storage';

export default function AdminDashboard() {
  const products = useProducts();
  const orders = readStorage('woodmart-orders', []);
  const messages = readStorage('woodmart-messages', []);
  const stats = [
    ['Products', products.length],
    ['Categories', categories.length],
    ['Orders', orders.length],
    ['Messages', messages.length]
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="border border-border-light bg-white p-5">
            <p className="text-sm text-secondary">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-primary">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button as={Link} to="/admin/products/add">Add Product</Button>
        <Button as={Link} to="/admin/products" variant="outline">View Products</Button>
      </div>
      <section className="mt-8 border border-border-light bg-white">
        <div className="border-b border-border-light p-5">
          <h2 className="text-base font-semibold">Recent Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-bg-light text-xs uppercase text-secondary">
              <tr><th className="p-3">Name</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Badge</th></tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map(product => (
                <tr key={product.id} className="border-t border-border-light">
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{formatPrice(product.price)}</td>
                  <td className="p-3">{product.badge ? <Badge>{product.badge}</Badge> : 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

import { Fragment, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const statuses = ['Pending', 'Confirmed', 'Processing', 'Delivered', 'Cancelled'];
const statusClass = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Processing: 'bg-orange-100 text-orange-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

function readOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem('woodmart-orders') || '[]');
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

function normalizePhone(phone = '') {
  const digits = String(phone).replace(/\D/g, '');
  if (digits.startsWith('92')) return digits;
  if (digits.startsWith('0')) return `92${digits.slice(1)}`;
  return digits;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState(readOrders);
  const [expanded, setExpanded] = useState(null);

  const updateStatus = (id, status) => {
    const next = orders.map((order) => (order.id === id ? { ...order, status } : order));
    setOrders(next);
    localStorage.setItem('woodmart-orders', JSON.stringify(next));
    toast.success('Order status updated');
  };

  const exportCsv = () => {
    const header = ['Order#', 'Date', 'Customer', 'Phone', 'City', 'Total', 'Payment', 'Status'];
    const rows = orders.map((o) => [
      o.id,
      o.date,
      o.customer?.name || '',
      o.customer?.phone || '',
      o.customer?.city || '',
      o.total,
      o.paymentMethod || o.payment || '',
      o.status,
    ]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'woodmart-orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-serif text-xl text-darktext">Orders</h2>
        <button onClick={exportCsv} className="px-4 py-2 bg-gold text-darktext font-semibold rounded hover:bg-gold-light">Export CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-brown-light">
            <tr>
              <th className="px-4 py-3">Order#</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">WhatsApp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const customer = order.customer || {};
              const wa = `https://wa.me/${normalizePhone(customer.phone)}?text=${encodeURIComponent(`Assalam o Alaikum ${customer.name || ''}! Your Wood Mart order #${order.id} is ${order.status}.`)}`;
              return (
                <Fragment key={order.id}>
                  <tr key={order.id} onClick={() => setExpanded(expanded === order.id ? null : order.id)} className="cursor-pointer hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-darktext">{order.id}</td>
                    <td className="px-4 py-3">{order.date ? new Date(order.date).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-3">{customer.name || '-'}</td>
                    <td className="px-4 py-3">{customer.phone || '-'}</td>
                    <td className="px-4 py-3">{customer.city || '-'}</td>
                    <td className="px-4 py-3">PKR {Number(order.total || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">{order.paymentMethod || order.payment || '-'}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <select value={order.status || 'Pending'} onChange={(e) => updateStatus(order.id, e.target.value)} className={`rounded px-2 py-1 ${statusClass[order.status || 'Pending']}`}>
                        {statuses.map((status) => <option key={status}>{status}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="text-green-600"><MessageCircle className="w-5 h-5" /></a>
                    </td>
                  </tr>
                  {expanded === order.id && (
                    <tr>
                      <td colSpan={9} className="px-4 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold mb-2">Customer Details</h3>
                            <p>{customer.address || ''}</p>
                            <p>{customer.city || ''}</p>
                            <p>{customer.email || ''}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Items</h3>
                            <div className="space-y-2">
                              {(order.items || []).map((item) => (
                                <div key={item.id || item.slug} className="flex items-center gap-3 bg-white p-2 rounded border">
                                  <img src={item.image || item.images?.[0]} alt={item.name} className="w-12 h-12 object-cover rounded bg-gray-100" />
                                  <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-brown-light">Qty: {item.quantity || 1}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {!orders.length && <p className="p-8 text-center text-brown-light">No orders yet.</p>}
    </div>
  );
}

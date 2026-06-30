import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import formatPrice from '../../utils/formatPrice';
import { supabase } from '../../lib/supabase';

const statuses = ['Pending', 'Confirmed', 'Processing', 'Delivered', 'Cancelled'];
const tones = { Pending: 'yellow', Confirmed: 'blue', Processing: 'yellow', Delivered: 'green', Cancelled: 'red' };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Fetch orders error:', err);
      setOrders([]);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      fetchOrders();
    } catch (err) {
      console.error('Update status error:', err);
      toast.error('Failed to update status');
    }
  };

  const exportCsv = () => {
    const rows = [['Order#', 'Date', 'Customer', 'Phone', 'City', 'Total', 'Payment', 'Status'], ...orders.map(order => [order.id, order.date || order.created_at, order.customer?.fullName, order.customer?.phone, order.customer?.city, order.total, order.payment_method || order.paymentMethod, order.status])];
    const csv = rows.map(row => row.map(value => '"' + String(value || '').replace(/"/g, '""') + '"').join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'woodmart-orders.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const whatsapp = order => {
    const raw = String(order.customer?.phone || '').replace(/\D/g, '');
    const phone = raw.startsWith('0') ? '92' + raw.slice(1) : raw;
    const text = 'Assalam o Alaikum ' + order.customer?.fullName + '! Your Wood Mart order #' + order.id + ' is ' + order.status + '.';
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-primary">Orders</h1>
        <Button type="button" variant="outline" onClick={exportCsv}>Export CSV</Button>
      </div>
      <div className="mt-6 overflow-x-auto border border-border-light bg-white">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-bg-light text-xs uppercase text-secondary">
            <tr><th className="p-3">Order#</th><th className="p-3">Date</th><th className="p-3">Customer</th><th className="p-3">Phone</th><th className="p-3">City</th><th className="p-3">Total</th><th className="p-3">Payment</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <Fragment key={order.id}>
                <tr key={order.id} className="border-t border-border-light">
                  <td className="p-3 font-medium">{order.id}</td>
                  <td className="p-3">{new Date(order.date || order.created_at).toLocaleDateString()}</td>
                  <td className="p-3">{order.customer?.fullName}</td>
                  <td className="p-3">{order.customer?.phone}</td>
                  <td className="p-3">{order.customer?.city}</td>
                  <td className="p-3">{formatPrice(order.total)}</td>
                  <td className="p-3">{order.payment_method || order.paymentMethod}</td>
                  <td className="p-3"><Badge tone={tones[order.status] || 'light'}>{order.status}</Badge></td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => setExpanded(expanded === order.id ? '' : order.id)}>Details</Button>
                      <a className="border border-primary px-3 py-2 text-xs font-medium" href={whatsapp(order)} target="_blank" rel="noreferrer">WhatsApp</a>
                    </div>
                  </td>
                </tr>
                {expanded === order.id && (
                  <tr className="bg-bg-light">
                    <td colSpan="9" className="p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="font-semibold">Items</p>
                          {order.items?.map(item => <p key={item.cartId} className="mt-1 text-sm text-secondary">{item.name} x {item.qty}</p>)}
                        </div>
                        <div>
                          <p className="font-semibold">Update Status</p>
                          <select value={order.status} onChange={event => updateStatus(order.id, event.target.value)} className="admin-input mt-2 max-w-xs">
                            {statuses.map(status => <option key={status}>{status}</option>)}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-6 text-sm text-secondary">No orders yet.</p>}
      </div>
    </div>
  );
}

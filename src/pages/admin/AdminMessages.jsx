import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function readMessages() {
  try {
    const messages = JSON.parse(localStorage.getItem('woodmart-messages') || '[]');
    return Array.isArray(messages) ? messages : [];
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

export default function AdminMessages() {
  const [messages, setMessages] = useState(readMessages);
  const [selected, setSelected] = useState(null);

  const updateRead = (id, isRead) => {
    const next = messages.map((msg) => (msg.id === id ? { ...msg, isRead } : msg));
    setMessages(next);
    localStorage.setItem('woodmart-messages', JSON.stringify(next));
    toast.success(isRead ? 'Marked as read' : 'Marked as unread');
  };

  const openMessage = (message) => {
    setSelected(message);
    if (!message.isRead) updateRead(message.id, true);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="font-serif text-xl text-darktext">Messages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-brown-light">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Reply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map((message) => {
                const wa = `https://wa.me/${normalizePhone(message.phone)}?text=${encodeURIComponent(`Assalam o Alaikum ${message.name || ''}! Thank you for contacting Wood Mart.`)}`;
                return (
                  <tr key={message.id} onClick={() => openMessage(message)} className={`cursor-pointer hover:bg-gray-50 ${!message.isRead ? 'font-bold' : ''}`}>
                    <td className="px-4 py-3">{message.name}</td>
                    <td className="px-4 py-3">{message.phone}</td>
                    <td className="px-4 py-3">{message.email || '-'}</td>
                    <td className="px-4 py-3">{message.date ? new Date(message.date).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-3 max-w-sm truncate">{message.message}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="text-green-600"><MessageCircle className="w-5 h-5" /></a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!messages.length && <p className="p-8 text-center text-brown-light">No messages yet.</p>}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6">
            <h2 className="font-serif text-2xl text-darktext mb-2">{selected.subject || 'Customer Message'}</h2>
            <p className="text-sm text-brown-light mb-4">{selected.name} | {selected.phone} | {selected.email || 'No email'}</p>
            <p className="whitespace-pre-wrap text-darktext mb-5">{selected.message}</p>
            <label className="flex items-center gap-2 mb-5">
              <input
                type="checkbox"
                checked={Boolean(messages.find((m) => m.id === selected.id)?.isRead)}
                onChange={(e) => updateRead(selected.id, e.target.checked)}
              />
              Mark as read
            </label>
            <div className="flex justify-end gap-3">
              <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

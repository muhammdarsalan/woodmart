import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { supabase } from '../../lib/supabase';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Fetch messages error:', err);
      setMessages([]);
    }
  };

  const markRead = async (message) => {
    try {
      const newReadState = !message.is_read;
      const { error } = await supabase
        .from('messages')
        .update({ is_read: newReadState })
        .eq('id', message.id);
      if (error) throw error;
      const updated = messages.map(item => item.id === message.id ? { ...item, is_read: newReadState } : item);
      setMessages(updated);
      setActive(updated.find(item => item.id === message.id));
    } catch (err) {
      console.error('Mark read error:', err);
      toast.error('Failed to update message');
    }
  };

  const replyLink = message => {
    const raw = String(message.phone || '').replace(/\D/g, '');
    const phone = raw.startsWith('0') ? '92' + raw.slice(1) : raw;
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent('Assalam o Alaikum ' + message.name + ', thank you for contacting Wood Mart.');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary">Messages</h1>
      <div className="mt-6 overflow-x-auto border border-border-light bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-bg-light text-xs uppercase text-secondary">
            <tr><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Email</th><th className="p-3">Date</th><th className="p-3">Message</th><th className="p-3">Reply</th></tr>
          </thead>
          <tbody>
            {messages.map(message => (
              <tr key={message.id} className={'cursor-pointer border-t border-border-light ' + (!message.is_read ? 'font-semibold' : '')} onClick={() => setActive(message)}>
                <td className="p-3">{message.name}</td>
                <td className="p-3">{message.phone}</td>
                <td className="p-3">{message.email || '-'}</td>
                <td className="p-3">{new Date(message.date || message.created_at).toLocaleDateString()}</td>
                <td className="p-3">{message.message?.slice(0, 70)}</td>
                <td className="p-3"><a href={replyLink(message)} onClick={event => event.stopPropagation()} target="_blank" rel="noreferrer" className="text-sm font-medium underline">WhatsApp</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        {messages.length === 0 && <p className="p-6 text-sm text-secondary">No messages yet.</p>}
      </div>
      <Modal open={Boolean(active)} onClose={() => setActive(null)} title="Message">
        {active && (
          <div>
            <p className="text-sm font-semibold">{active.name}</p>
            <p className="mt-1 text-sm text-secondary">{active.phone} | {active.email || 'No email'}</p>
            <p className="mt-4 text-sm leading-7 text-secondary">{active.message}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={() => markRead(active)}>{active.is_read ? 'Mark Unread' : 'Mark Read'}</Button>
              <Button as="a" href={replyLink(active)} target="_blank" rel="noreferrer">WhatsApp Reply</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

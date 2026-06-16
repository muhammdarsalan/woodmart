import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { categories as defaultCategories } from '../../data/categories';
import { handleImageError } from '../../utils/images';
import { readStorage, writeStorage } from '../../utils/storage';

export default function AdminCategories() {
  const [categories, setCategories] = useState(readStorage('woodmart-categories', defaultCategories));
  const [editing, setEditing] = useState(null);
  const save = () => {
    const next = categories.map(item => item.id === editing.id ? editing : item);
    setCategories(next);
    writeStorage('woodmart-categories', next);
    setEditing(null);
    toast.success('Category updated');
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary">Categories</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map(category => (
          <article key={category.id} className="border border-border-light bg-white p-4">
            <img src={category.image} alt={category.name} loading="lazy" decoding="async" onError={handleImageError} className="aspect-video w-full object-cover" />
            <h2 className="mt-4 text-base font-semibold">{category.name}</h2>
            <p className="mt-2 text-sm leading-6 text-secondary">{category.description}</p>
            <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => setEditing(category)}>Edit</Button>
          </article>
        ))}
      </div>
      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title="Edit Category">
        {editing && (
          <div className="grid gap-4">
            <label className="block"><span className="mb-2 block text-sm font-medium">Name</span><input className="admin-input" value={editing.name} onChange={event => setEditing({ ...editing, name: event.target.value })} /></label>
            <label className="block"><span className="mb-2 block text-sm font-medium">Description</span><textarea rows="4" className="admin-input" value={editing.description} onChange={event => setEditing({ ...editing, description: event.target.value })} /></label>
            <label className="block"><span className="mb-2 block text-sm font-medium">Image URL</span><input className="admin-input" value={editing.image} onChange={event => setEditing({ ...editing, image: event.target.value })} /></label>
            <Button type="button" onClick={save}>Save Category</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

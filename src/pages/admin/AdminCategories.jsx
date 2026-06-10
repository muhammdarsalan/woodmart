import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { categories } from '../../data/categories';
import useProducts from '../../hooks/useProducts';

function readEdits() {
  try {
    return JSON.parse(localStorage.getItem('woodmart-admin-categories') || '{}');
  } catch {
    return {};
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminCategories() {
  const products = useProducts();
  const [edits, setEdits] = useState(readEdits);
  const [editing, setEditing] = useState(null);
  const merged = useMemo(() => categories.map((cat) => ({ ...cat, ...(edits[cat.id] || {}) })), [edits]);

  const saveCategory = () => {
    const next = { ...edits, [editing.id]: editing };
    setEdits(next);
    localStorage.setItem('woodmart-admin-categories', JSON.stringify(next));
    setEditing(null);
    toast.success('Category updated');
  };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const image = await fileToBase64(file);
    setEditing((current) => ({ ...current, image }));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {merged.map((cat) => {
          const count = products.filter((p) => p.category === cat.name).length;
          return (
            <div key={cat.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <img src={cat.image} alt={cat.name} className="w-full h-44 object-cover" />
              <div className="p-5">
                <h2 className="font-serif text-xl text-darktext">{cat.name}</h2>
                <p className="text-sm text-brown-light mt-1 min-h-10">{cat.description}</p>
                <p className="text-sm font-medium text-gold mt-3">{count} products</p>
                <button onClick={() => setEditing(cat)} className="mt-4 px-4 py-2 bg-gold text-darktext font-semibold rounded hover:bg-gold-light">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6">
            <h2 className="font-serif text-2xl text-darktext mb-4">Edit Category</h2>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="input-field mb-4" />
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="input-field resize-none mb-4" rows={3} />
            <label className="block text-sm font-medium mb-1">Image</label>
            <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleImage} className="mb-4" />
            <img src={editing.image} alt={editing.name} className="w-full h-40 object-cover rounded mb-5" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={saveCategory} className="px-4 py-2 bg-gold text-darktext font-semibold rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

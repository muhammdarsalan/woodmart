import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import formatPrice from '../../utils/formatPrice';
import { handleImageError } from '../../utils/images';
import { useCartStore } from '../../store/cartStore';
import { useUiStore } from '../../store/uiStore';

export default function QuickViewModal() {
  const product = useUiStore(state => state.quickViewProduct);
  const clearQuickViewProduct = useUiStore(state => state.clearQuickViewProduct);
  const addItem = useCartStore(state => state.addItem);

  if (!product) return null;
  return (
    <Modal open={Boolean(product)} onClose={clearQuickViewProduct} title="Quick View">
      <div className="grid gap-6 md:grid-cols-2">
        <img src={product.images?.[0]} alt={product.name} loading="lazy" decoding="async" onError={handleImageError} className="aspect-square w-full object-cover" />
        <div>
          <p className="text-xs uppercase tracking-wide text-secondary">{product.category}</p>
          <h3 className="mt-2 text-xl font-semibold text-primary">{product.name}</h3>
          <p className="mt-3 text-lg font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-3 text-sm leading-6 text-secondary">{product.shortDesc}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => { addItem(product); toast.success('Added to cart'); }}>Add to Cart</Button>
            <Button as={Link} to={'/shop/' + product.slug} onClick={clearQuickViewProduct} variant="outline">View Details</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

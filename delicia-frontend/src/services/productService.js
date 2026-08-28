import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addItem } from '../services/cartService';

export default function ProductCard({ product }) {
    const { name, price, category, flavour, imageUrl, available, id } = product;
    const { isLoggedIn, email } = useAuth();
    const [status, setStatus] = useState('idle');

    async function handleAdd() {
        if (!isLoggedIn) {
            window.location.href = '/login';
            return;
        }
        try {
            setStatus('adding');
            await addItem(email, id, 1);
            setStatus('added');
            setTimeout(() => setStatus('idle'), 1500);
        } catch {
            setStatus('idle');
        }
    }

    return (
        <article className={`product-card ${!available ? 'product-card-sold-out' : ''}`}>
            <div className="product-card-image">
                {imageUrl ? (
                    <img src={imageUrl} alt={name} />
                ) : (
                    <div className="product-card-placeholder">🍰</div>
                )}
                {!available && <span className="sold-out-badge">Sold out today</span>}
            </div>

            <div className="product-card-body">
                <span className="product-card-category">{category}</span>
                <h3>{name}</h3>
                {flavour && <p className="product-card-flavour">{flavour}</p>}

                <div className="product-card-footer">
          <span className="product-card-price">
            {price != null ? `₹${price}` : '—'}
          </span>
                    <button
                        className="btn btn-small"
                        disabled={!available || status === 'adding'}
                        onClick={handleAdd}
                    >
                        {status === 'added' ? 'Added ✓' : status === 'adding' ? 'Adding…' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </article>
    );
}
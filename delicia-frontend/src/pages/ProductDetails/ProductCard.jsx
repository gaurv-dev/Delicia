import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addItem } from '../services/cartService';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop';

export default function ProductCard({ product }) {
    const { name, price, category, flavour, imageUrl, available, id } = product;
    const { isLoggedIn, email } = useAuth();
    const navigate = useNavigate();
    const [status, setStatus] = useState('idle');
    const [imgSrc, setImgSrc] = useState(imageUrl || FALLBACK_IMG);

    async function handleAdd(e) {
        e.stopPropagation();
        if (!isLoggedIn) {
            navigate('/login');
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
        <article
            className={`product-card ${!available ? 'product-card-sold-out' : ''}`}
            onClick={() => navigate(`/products/${id}`)}
            style={{ cursor: 'pointer' }}
        >
            <div className="product-card-image">
                <img src={imgSrc} alt={name} onError={() => setImgSrc(FALLBACK_IMG)} />
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
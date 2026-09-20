import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { addItem } from '../../services/cartService';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import './ProductDetails.css';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, email } = useAuth();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');
    const [status, setStatus] = useState('idle');
    const [imgSrc, setImgSrc] = useState(FALLBACK_IMG);

    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then((data) => {
                setProduct(data);
                setImgSrc(data.imageUrl || FALLBACK_IMG);
            })
            .catch(() => setError('Could not find this cake.'))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleAdd() {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        try {
            setStatus('adding');
            await addItem(email, id, quantity, note);
            setStatus('added');
            setTimeout(() => setStatus('idle'), 1500);
        } catch {
            setStatus('idle');
        }
    }

    if (loading) {
        return (
            <div className="pd-page">
                <Navbar />
                <p className="pd-state">Loading…</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="pd-page">
                <Navbar />
                <div className="pd-state">
                    <p>{error || 'Cake not found.'}</p>
                    <a className="btn btn-primary" href="/">Back to the counter</a>
                </div>
            </div>
        );
    }

    const { name, price, category, flavour, weight, store, eggless, available } = product;

    return (
        <div className="pd-page">
            <Navbar />
            <div className="pd-wrap">
                <div className="pd-image">
                    <img src={imgSrc} alt={name} onError={() => setImgSrc(FALLBACK_IMG)} />
                    {!available && <span className="pd-sold-out">Sold out today</span>}
                </div>

                <div className="pd-info">
                    <span className="pd-category">{category}</span>
                    <h1>{name}</h1>

                    <div className="pd-tags">
                        {flavour && <span className="pd-tag">{flavour}</span>}
                        {weight && <span className="pd-tag">{weight}</span>}
                        {eggless && <span className="pd-tag pd-tag-eggless">Eggless</span>}
                    </div>

                    <p className="pd-price">₹{price}</p>

                    {store && <p className="pd-store">Baked fresh at {store}</p>}

                    <div className="pd-field">
                        <label>Add a note for the baker (optional)</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Write 'Happy Birthday Riya' on top…"
                            rows={3}
                        />
                    </div>

                    <div className="pd-actions">
                        <div className="pd-qty">
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                        </div>
                        <button
                            className="btn btn-primary pd-add"
                            disabled={!available || status === 'adding'}
                            onClick={handleAdd}
                        >
                            {status === 'added' ? 'Added to cart ✓' : status === 'adding' ? 'Adding…' : 'Add to cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
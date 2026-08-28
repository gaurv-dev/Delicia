import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCart, updateItemQty, removeItem } from '../services/cartService';
import Navbar from '../components/Navbar';
import './Cart.css';

export default function Cart() {
    const { email, isLoggedIn } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = email; // using email as userId key, matches JWT subject

    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }
        fetchCart();
    }, [isLoggedIn]);

    async function fetchCart() {
        try {
            setLoading(true);
            const data = await getCart(userId);
            setCart(data);
            setError(null);
        } catch {
            setError('Could not load your cart.');
        } finally {
            setLoading(false);
        }
    }

    async function handleQtyChange(productId, quantity) {
        if (quantity < 1) return;
        const updated = await updateItemQty(userId, productId, quantity);
        setCart(updated);
    }

    async function handleRemove(productId) {
        const updated = await removeItem(userId, productId);
        setCart(updated);
    }

    const items = cart?.items || [];
    const total = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);

    return (
        <div className="cart-page">
            <Navbar />
            <div className="cart-wrap">
                <h1>Your cart</h1>

                {!isLoggedIn && (
                    <div className="cart-empty">
                        <p>Sign in to see what's waiting in your cart.</p>
                        <a className="btn btn-primary" href="/login">Log in</a>
                    </div>
                )}

                {isLoggedIn && loading && <p className="cart-state">Loading your cart…</p>}
                {isLoggedIn && error && <p className="cart-state cart-state-error">{error}</p>}

                {isLoggedIn && !loading && !error && items.length === 0 && (
                    <div className="cart-empty">
                        <p>Your cart's empty — go pick something sweet.</p>
                        <a className="btn btn-primary" href="/">Browse the counter</a>
                    </div>
                )}

                {isLoggedIn && !loading && items.length > 0 && (
                    <>
                        <div className="cart-items">
                            {items.map((item) => (
                                <div className="cart-item" key={item.productId}>
                                    <div className="cart-item-info">
                                        <h3>{item.productName}</h3>
                                        {item.customizationNote && (
                                            <p className="cart-item-note">"{item.customizationNote}"</p>
                                        )}
                                        <span className="cart-item-price">₹{item.price}</span>
                                    </div>

                                    <div className="cart-item-qty">
                                        <button onClick={() => handleQtyChange(item.productId, item.quantity - 1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQtyChange(item.productId, item.quantity + 1)}>+</button>
                                    </div>

                                    <button className="cart-item-remove" onClick={() => handleRemove(item.productId)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <span>Total</span>
                            <strong>₹{total.toFixed(2)}</strong>
                        </div>
                        <a href="/checkout" className="btn btn-primary cart-checkout">Checkout</a>
                    </>
                )}
            </div>
        </div>
    );
}
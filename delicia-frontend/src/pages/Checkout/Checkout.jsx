import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCart } from '../../services/cartService';
import { placeOrder } from '../../services/orderService';
import './Checkout.css';

export default function Checkout() {
    const { email, isLoggedIn } = useAuth();
    const userId = email;

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [placing, setPlacing] = useState(false);
    const [error, setError] = useState(null);
    const [placed, setPlaced] = useState(null);

    const [address, setAddress] = useState({
        street: '', city: '', state: '', pincode: '',
    });
    const [deliveryDate, setDeliveryDate] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (!isLoggedIn) { setLoading(false); return; }
        getCart(userId).then(setCart).finally(() => setLoading(false));
    }, [isLoggedIn]);

    const items = cart?.items || [];
    const total = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);

    async function handlePlaceOrder(e) {
        e.preventDefault();
        setPlacing(true);
        setError(null);
        try {
            const orderRequest = {
                cart,
                deliveryAddress: address,
                deliveryDate: deliveryDate ? new Date(deliveryDate).toISOString() : null,
                specialInstructions: notes,
            };
            const order = await placeOrder(userId, orderRequest);
            setPlaced(order);
        } catch (err) {
            setError(err?.response?.data?.message || 'Could not place your order. Try again.');
        } finally {
            setPlacing(false);
        }
    }

    if (!isLoggedIn) {
        return (
            <div className="checkout-page">
                <div className="checkout-empty">
                    <p>Sign in to check out.</p>
                    <a className="btn btn-primary" href="/login">Log in</a>
                </div>
            </div>
        );
    }

    if (placed) {
        return (
            <div className="checkout-page">
                <div className="checkout-success">
                    <div className="checkout-success-icon">🎂</div>
                    <h1>Order placed!</h1>
                    <p>Your order is confirmed and heading to the kitchen.</p>
                    <p className="checkout-success-id">Order ID: {placed.id}</p>
                    <a className="btn btn-primary" href="/orders">View my orders</a>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-wrap">
                <h1>Checkout</h1>

                {loading && <p className="checkout-state">Loading your cart…</p>}

                {!loading && items.length === 0 && (
                    <div className="checkout-empty">
                        <p>Your cart is empty — nothing to check out yet.</p>
                        <a className="btn btn-primary" href="/">Browse the counter</a>
                    </div>
                )}

                {!loading && items.length > 0 && (
                    <div className="checkout-grid">
                        <form className="checkout-form" onSubmit={handlePlaceOrder}>
                            <h2>Delivery details</h2>

                            {error && <div className="checkout-error">{error}</div>}

                            <div className="checkout-field">
                                <label>Street address</label>
                                <input
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="checkout-field-row">
                                <div className="checkout-field">
                                    <label>City</label>
                                    <input
                                        value={address.city}
                                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="checkout-field">
                                    <label>State</label>
                                    <input
                                        value={address.state}
                                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="checkout-field">
                                    <label>Pincode</label>
                                    <input
                                        value={address.pincode}
                                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="checkout-field">
                                <label>Delivery date & time</label>
                                <input
                                    type="datetime-local"
                                    value={deliveryDate}
                                    onChange={(e) => setDeliveryDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="checkout-field">
                                <label>Special instructions (optional)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Write 'Happy Birthday Neha' on top, please pack extra candles…"
                                    rows={3}
                                />
                            </div>

                            <button className="btn btn-primary checkout-submit" type="submit" disabled={placing}>
                                {placing ? 'Placing order…' : `Place order — ₹${total.toFixed(2)}`}
                            </button>
                        </form>

                        <aside className="checkout-summary">
                            <h2>Order summary</h2>
                            {items.map((item) => (
                                <div className="checkout-summary-item" key={item.productId}>
                                    <span>{item.productName} × {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="checkout-summary-total">
                                <span>Total</span>
                                <strong>₹{total.toFixed(2)}</strong>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyOrders } from '../../services/orderService';
import Navbar from '../../components/Navbar/Navbar';
import './Orders.css';

const STATUS_LABELS = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    BAKING: 'Baking',
    OUT_FOR_DELIVERY: 'Out for delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
};

function formatDate(value, withTime = false) {
    if (!value) return '';
    const opts = { day: 'numeric', month: 'short', year: 'numeric' };
    if (withTime) { opts.hour = 'numeric'; opts.minute = '2-digit'; }
    return new Date(value).toLocaleString('en-IN', opts);
}

export default function Orders() {
    const { email, isLoggedIn } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) { setLoading(false); return; }
        getMyOrders(email)
            .then((data) =>
                setOrders([...data].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)))
            )
            .catch(() => setError('Could not load your orders.'))
            .finally(() => setLoading(false));
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return (
            <div className="orders-page">
                <Navbar />
                <div className="orders-wrap">
                    <div className="orders-empty">
                        <div className="orders-empty-icon">🎂</div>
                        <p>Sign in to see your order history.</p>
                        <a className="orders-btn" href="/login">Log in</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <Navbar />
            <div className="orders-wrap">
                <span className="orders-tag">Order history</span>
                <h1>Your orders</h1>

                {loading && <p className="orders-state">Loading…</p>}
                {error && <p className="orders-state orders-state-error">{error}</p>}

                {!loading && !error && orders.length === 0 && (
                    <div className="orders-empty">
                        <div className="orders-empty-icon">🧁</div>
                        <p>No orders yet — your first cake is one click away.</p>
                        <a className="orders-btn" href="/">Browse the counter</a>
                    </div>
                )}

                {!loading && orders.length > 0 && (
                    <div className="orders-list">
                        {orders.map((order) => {
                            const total =
                                order.items?.reduce((s, i) => s + (i.price || 0) * i.quantity, 0) ??
                                order.totalAmount;
                            const addr = order.deliveryAddress;
                            const status = (order.status || '').toLowerCase();

                            return (
                                <div className="order-card" key={order.id}>
                                    <div className="order-card-header">
                                        <div>
                                            <span className="order-card-id">Order #{order.id?.slice(-6)}</span>
                                            <span className="order-card-date">Placed {formatDate(order.orderDate)}</span>
                                        </div>
                                        <span className={`order-status order-status-${status}`}>
                                            {STATUS_LABELS[order.status] || order.status}
                                        </span>
                                    </div>

                                    <div className="order-card-items">
                                        {order.items?.map((item, idx) => (
                                            <div className="order-item" key={idx}>
                                                <div className="order-item-row">
                                                    <span>{item.productName} × {item.quantity}</span>
                                                    <span>₹{((item.price || 0) * item.quantity).toFixed(2)}</span>
                                                </div>
                                                {item.customizationNote && (
                                                    <p className="order-item-note">"{item.customizationNote}"</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {(addr || order.deliveryDate || order.specialInstructions) && (
                                        <div className="order-delivery">
                                            {order.deliveryDate && (
                                                <div>
                                                    <span className="order-delivery-label">Delivery</span>
                                                    <span>{formatDate(order.deliveryDate, true)}</span>
                                                </div>
                                            )}
                                            {addr && (
                                                <div>
                                                    <span className="order-delivery-label">Address</span>
                                                    <span>
                                                        {[addr.street, addr.city, addr.state, addr.pincode]
                                                            .filter(Boolean)
                                                            .join(', ')}
                                                    </span>
                                                </div>
                                            )}
                                            {order.specialInstructions && (
                                                <div>
                                                    <span className="order-delivery-label">Notes</span>
                                                    <span>{order.specialInstructions}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="order-card-footer">
                                        <span>Total</span>
                                        <strong>₹{Number(total).toFixed(2)}</strong>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
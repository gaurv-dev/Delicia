import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyOrders } from '../../services/orderService';
import './Orders.css';

const STATUS_LABELS = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    BAKING: 'Baking',
    OUT_FOR_DELIVERY: 'Out for delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
};

export default function Orders() {
    const { email, isLoggedIn } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) { setLoading(false); return; }
        getMyOrders(email)
            .then((data) => setOrders(data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))))
            .catch(() => setError('Could not load your orders.'))
            .finally(() => setLoading(false));
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return (
            <div className="orders-page">
                <div className="orders-empty">
                    <p>Sign in to see your order history.</p>
                    <a className="btn btn-primary" href="/login">Log in</a>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="orders-wrap">
                <h1>Your orders</h1>

                {loading && <p className="orders-state">Loading…</p>}
                {error && <p className="orders-state orders-state-error">{error}</p>}

                {!loading && !error && orders.length === 0 && (
                    <div className="orders-empty">
                        <p>No orders yet — your first cake is one click away.</p>
                        <a className="btn btn-primary" href="/">Browse the counter</a>
                    </div>
                )}

                {!loading && orders.length > 0 && (
                    <div className="orders-list">
                        {orders.map((order) => {
                            const total = order.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? order.totalAmount;
                            return (
                                <div className="order-card" key={order.id}>
                                    <div className="order-card-header">
                                        <div>
                                            <span className="order-card-id">Order #{order.id?.slice(-6)}</span>
                                            <span className="order-card-date">
                        {order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                      </span>
                                        </div>
                                        <span className={`order-status order-status-${(order.status || '').toLowerCase()}`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                                    </div>

                                    <div className="order-card-items">
                                        {order.items?.map((item, idx) => (
                                            <div className="order-item-row" key={idx}>
                                                <span>{item.productName} × {item.quantity}</span>
                                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

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
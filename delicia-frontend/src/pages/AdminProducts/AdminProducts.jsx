import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllProducts()
            .then(setProducts)
            .catch(() => setError('Failed to load products'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading products…</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="admin-products">
            <h2>Manage Products</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p) => (
                    <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>₹{p.price}</td>
                        <td>{p.available ? 'Yes' : 'No'}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
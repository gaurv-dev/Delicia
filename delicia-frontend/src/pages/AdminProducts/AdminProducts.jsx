import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../../services/productService';
import './AdminProducts.css';

const EMPTY_FORM = {
    name: '', category: '', flavour: '', price: '',
    weight: '', eggless: false, imageUrl: '', store: '',
    rating: '', featured: false, available: true,
};

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState('');

    function loadProducts() {
        setLoading(true);
        getAllProducts()
            .then(setProducts)
            .catch(() => setError('Failed to load products'))
            .finally(() => setLoading(false));
    }

    useEffect(loadProducts, []);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }

    function startEdit(p) {
        setEditingId(p.id);
        setForm({
            name: p.name || '', category: p.category || '', flavour: p.flavour || '',
            price: p.price ?? '', weight: p.weight || '', eggless: !!p.eggless,
            imageUrl: p.imageUrl || '', store: p.store || '', rating: p.rating ?? '',
            featured: !!p.featured, available: p.available ?? true,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function cancelEdit() {
        setEditingId(null);
        setForm(EMPTY_FORM);
        setFormError('');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.category || !form.price) {
            setFormError('Name, category and price are required.');
            return;
        }
        const payload = {
            ...form,
            price: Number(form.price),
            rating: form.rating === '' ? 0 : Number(form.rating),
        };
        try {
            setSaving(true);
            setFormError('');
            if (editingId) {
                await updateProduct(editingId, payload);
            } else {
                await createProduct(payload);
            }
            cancelEdit();
            loadProducts();
        } catch {
            setFormError('Save failed. Check you are logged in as admin.');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Delete this product?')) return;
        try {
            await deleteProduct(id);
            loadProducts();
        } catch {
            alert('Delete failed.');
        }
    }

    return (
        <>
            <Navbar />
            <div className="admin-page">
                <h1>Manage Products</h1>

                <form className="admin-form" onSubmit={handleSubmit}>
                    <h2>{editingId ? 'Edit product' : 'Add new product'}</h2>
                    {formError && <p className="admin-form-error">{formError}</p>}

                    <div className="admin-form-grid">
                        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                        <input name="category" placeholder="Category (Birthday, Wedding...)" value={form.category} onChange={handleChange} />
                        <input name="flavour" placeholder="Flavour" value={form.flavour} onChange={handleChange} />
                        <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} />
                        <input name="weight" placeholder="Weight (1kg, 0.5kg...)" value={form.weight} onChange={handleChange} />
                        <input name="store" placeholder="Store" value={form.store} onChange={handleChange} />
                        <input name="rating" type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)" value={form.rating} onChange={handleChange} />
                        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="admin-form-wide" />
                    </div>

                    <div className="admin-form-checks">
                        <label><input type="checkbox" name="eggless" checked={form.eggless} onChange={handleChange} /> Eggless</label>
                        <label><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured</label>
                        <label><input type="checkbox" name="available" checked={form.available} onChange={handleChange} /> Available</label>
                    </div>

                    <div className="admin-form-actions">
                        <button type="submit" className="btn" disabled={saving}>
                            {saving ? 'Saving…' : editingId ? 'Update product' : 'Add product'}
                        </button>
                        {editingId && (
                            <button type="button" className="btn btn-outline" onClick={cancelEdit}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {loading && <p>Loading products…</p>}
                {error && <p className="admin-form-error">{error}</p>}

                {!loading && !error && (
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>Name</th><th>Category</th><th>Price</th><th>Available</th><th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.category}</td>
                                <td>₹{p.price}</td>
                                <td>{p.available ? 'Yes' : 'No'}</td>
                                <td className="admin-table-actions">
                                    <button className="btn btn-small" onClick={() => startEdit(p)}>Edit</button>
                                    <button className="btn btn-small btn-outline" onClick={() => handleDelete(p.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
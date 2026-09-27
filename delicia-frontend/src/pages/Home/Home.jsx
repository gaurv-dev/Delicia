import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getAllProducts } from '../../services/productService';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    useEffect(() => {
        getAllProducts()
            .then(setProducts)
            .catch(() => setError('Failed to load products'))
            .finally(() => setLoading(false));
    }, []);

    const categories = ['all', ...new Set(products.map((p) => p.category).filter(Boolean))];

    const filtered = products.filter((p) => {
        const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'all' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Navbar />
            <div className="home-page">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="category-pills">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={category === cat ? 'active' : ''}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading && <p>Loading products…</p>}
                {error && <p>{error}</p>}

                <div className="product-grid">
                    {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getAllProducts } from '../../services/productService';
import './Home.css';

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

            <section className="hero">
                <div className="hero-text">
                    <span className="hero-tag">Baked fresh every morning</span>
                    <h1>Cakes made <em>exactly</em> the way you pictured them.</h1>
                    <p>Order a signature cake from our counter, or design your own for the day that matters.</p>
                    <div className="hero-actions">
                        <a href="#menu" className="btn">Browse cakes</a>
                        <Link to="/build" className="btn btn-outline">Build a cake</Link>
                    </div>
                </div>
                <div className="hero-emoji" aria-hidden="true">🎂</div>
            </section>

            <div className="home-page" id="menu">
                <div className="home-toolbar">
                    <div className="search-box">
                        <span>🔍</span>
                        <input
                            type="text"
                            placeholder="Search cakes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

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
                </div>

                {loading && <p className="home-message">Loading cakes…</p>}
                {error && <p className="home-message home-error">{error}</p>}
                {!loading && !error && filtered.length === 0 && (
                    <p className="home-message">No cakes found. Try another search.</p>
                )}

                <div className="product-grid">
                    {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
}
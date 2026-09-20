import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, email, logout } = useAuth();

    function handleLogout() {
        logout();
        window.location.href = '/';
    }

    return (
        <header className="navbar">
            <a href="/" className="navbar-logo">
                Delicia
            </a>
            <nav className="navbar-links">
                <a href="/">Counter</a>
                <a href="/admin/products">Build a cake</a>
                {isLoggedIn && <a href="/orders">My orders</a>}
            </nav>
            <div className="navbar-actions">
                <a href="/cart" className="navbar-cart" aria-label="Cart">
                    🛍️
                </a>
                {isLoggedIn ? (
                    <div className="navbar-user">
                        <span className="navbar-email">{email}</span>
                        <button className="btn btn-small btn-outline" onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                ) : (
                    <a href="/login" className="btn btn-small btn-outline">Log in</a>
                )}
            </div>
        </header>
    );
}
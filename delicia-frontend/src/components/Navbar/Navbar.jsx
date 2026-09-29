import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { isLoggedIn, email, logout } = useAuth();

    function handleLogout() {
        logout();
        window.location.href = '/';
    }

    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">Delicia</Link>

            <nav className="navbar-links">
                <NavLink to="/" end>Counter</NavLink>
                <NavLink to="/build">Build a cake</NavLink>
                {isLoggedIn && <NavLink to="/orders">My orders</NavLink>}
            </nav>

            <div className="navbar-actions">
                <Link to="/cart" className="navbar-cart" aria-label="Cart">🛍️</Link>
                {isLoggedIn ? (
                    <div className="navbar-user">
                        <span className="navbar-email">{email}</span>
                        <button className="btn btn-small btn-outline" onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-small btn-primary">Log in</Link>
                )}
            </div>
        </header>
    );
}
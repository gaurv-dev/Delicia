import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css';

export default function Profile() {
    const { email, role, isLoggedIn, logout } = useAuth();

    function handleLogout() {
        if (typeof logout === 'function') {
            logout();
        }
        window.location.href = '/';
    }

    if (!isLoggedIn) {
        return (
            <div className="profile-page">
                <Navbar />
                <div className="profile-wrap">
                    <div className="profile-empty">
                        <div className="profile-empty-icon">🎂</div>
                        <p>Sign in to see your profile.</p>
                        <a className="profile-btn" href="/login">Log in</a>
                    </div>
                </div>
            </div>
        );
    }

    const isAdmin = role === 'ADMIN';
    const name = email?.split('@')[0] || 'there';

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-wrap">
                <span className="profile-tag">My account</span>
                <h1>Hello, {name}</h1>

                <div className="profile-card">
                    <div className="profile-avatar">{email?.[0]?.toUpperCase() || '?'}</div>
                    <div className="profile-details">
                        <div className="profile-row">
                            <span>Email</span>
                            <strong>{email}</strong>
                        </div>
                        <div className="profile-row">
                            <span>Role</span>
                            <strong className={`profile-role ${isAdmin ? 'profile-role-admin' : ''}`}>
                                {isAdmin ? 'Administrator' : 'Customer'}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="profile-links">
                    <a href="/orders" className="profile-link">
                        <span>View order history</span>
                        <span className="profile-link-arrow">→</span>
                    </a>
                    <a href="/cart" className="profile-link">
                        <span>Go to my cart</span>
                        <span className="profile-link-arrow">→</span>
                    </a>
                    {isAdmin && (
                        <a href="/admin/products" className="profile-link">
                            <span>Manage products</span>
                            <span className="profile-link-arrow">→</span>
                        </a>
                    )}
                </div>

                <button className="profile-logout" onClick={handleLogout}>Log out</button>
            </div>
        </div>
    );
}
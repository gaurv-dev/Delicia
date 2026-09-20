import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css';

export default function Profile() {
    const { email, role, isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return (
            <div className="profile-page">
                <Navbar />
                <div className="profile-empty">
                    <p>Sign in to see your profile.</p>
                    <a className="btn btn-primary" href="/login">Log in</a>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-wrap">
                <h1>Your account</h1>

                <div className="profile-card">
                    <div className="profile-avatar">{email?.[0]?.toUpperCase() || '?'}</div>
                    <div className="profile-details">
                        <div className="profile-row">
                            <span>Email</span>
                            <strong>{email}</strong>
                        </div>
                        <div className="profile-row">
                            <span>Role</span>
                            <strong>{role === 'ADMIN' ? 'Administrator' : 'Customer'}</strong>
                        </div>
                    </div>
                </div>

                <div className="profile-links">
                    <a href="/orders">View order history →</a>
                    {role === 'ADMIN' && <a href="/admin/products">Manage products →</a>}
                </div>
            </div>
        </div>
    );
}
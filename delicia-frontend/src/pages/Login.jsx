import { useState } from 'react';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { token } = await loginUser({ email, password });
            login(token);
            window.location.href = '/';
        } catch (err) {
            setError('Email or password is wrong. Give it another try.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <aside className="auth-side">
                <a href="/" className="auth-side-logo">Delicia</a>
                <p className="auth-side-quote">
                    "The best cake is the one made exactly the way you pictured it."
                </p>
                <p className="auth-side-sub">
                    Sign in to pick up where you left off — saved designs, past orders,
                    and your usual order all in one place.
                </p>
            </aside>

            <div className="auth-form-wrap">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <p className="auth-form-sub">
                        New here? <a href="/register">Create an account</a>
                    </p>

                    {error && <div className="auth-error">{error}</div>}

                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button className="auth-submit" type="submit" disabled={loading}>
                        {loading ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
}
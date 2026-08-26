import { useState } from 'react';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
    const { login } = useAuth();
    const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { token } = await registerUser(form);
            login(token);
            window.location.href = '/';
        } catch (err) {
            const message = err?.response?.data?.message;
            setError(message || 'Could not create your account. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <aside className="auth-side">
                <a href="/" className="auth-side-logo">Delicia</a>
                <p className="auth-side-quote">
                    "Build a cake from scratch — your flavor, your design, your way."
                </p>
                <p className="auth-side-sub">
                    Create an account to save your custom cake designs and track
                    every order from oven to doorstep.
                </p>
            </aside>

            <div className="auth-form-wrap">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1>Create your account</h1>
                    <p className="auth-form-sub">
                        Already have one? <a href="/src/pages/Login">Sign in</a>
                    </p>

                    {error && <div className="auth-error">{error}</div>}

                    <div className="auth-field">
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange('name')}
                            placeholder="Jane Baker"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange('email')}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange('phone')}
                            placeholder="98765 43210"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange('password')}
                            placeholder="At least 8 characters"
                            required
                            minLength={8}
                        />
                    </div>

                    <button className="auth-submit" type="submit" disabled={loading}>
                        {loading ? 'Creating account…' : 'Create account'}
                    </button>
                </form>
            </div>
        </div>
    );
}
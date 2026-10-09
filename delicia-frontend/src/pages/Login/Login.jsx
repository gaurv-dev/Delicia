import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/authService';
import './Login.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PERKS = [
    { icon: '🧁', text: 'Fresh-baked every morning' },
    { icon: '🎨', text: 'Design your own custom cake' },
    { icon: '🚚', text: 'Track every order to your door' },
];

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!EMAIL_REGEX.test(email)) {
            setError('Please enter a valid email address (e.g. name@example.com).');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }

        try {
            setBusy(true);
            const res = await loginUser(email, password);
            login(res.token);
            navigate('/');
        } catch (err) {
            if (err?.response?.status === 404 || err?.response?.status === 401) {
                setError('Invalid email or password.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-hero">
                <span className="login-orb login-orb-1" />
                <span className="login-orb login-orb-2" />
                <span className="login-orb login-orb-3" />

                <Link to="/" className="login-logo">Delicia</Link>

                <div className="login-hero-middle">
                    <h2>Baked with love,<br />delivered with care.</h2>
                    <ul className="login-perks">
                        {PERKS.map((p) => (
                            <li key={p.text}>
                                <span className="login-perk-icon">{p.icon}</span>
                                {p.text}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="login-hero-bottom">
                    <blockquote>
                        “The best cake is the one made exactly the way you pictured it.”
                    </blockquote>
                    <p>Sign in to pick up where you left off — saved designs, past orders, and your usual order all in one place.</p>
                </div>
            </div>

            <div className="login-form-side">
                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <div className="login-emoji">🎂</div>
                    <h1>Welcome back</h1>
                    <p className="login-subtext">
                        New here? <Link to="/register">Create an account</Link>
                    </p>

                    {error && <p className="login-error" role="alert">{error}</p>}

                    <label htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="login-password">Password</label>
                    <div className="login-password-wrap">
                        <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="login-toggle"
                            onClick={() => setShowPassword((s) => !s)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <button className="login-submit" type="submit" disabled={busy}>
                        {busy ? 'Signing in…' : 'Sign in'}
                    </button>

                    <p className="login-foot">
                        <Link to="/">← Back to the counter</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
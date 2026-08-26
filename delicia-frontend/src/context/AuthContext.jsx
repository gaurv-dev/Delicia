import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

function decodeEmailFromToken(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub || null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('delicia_token'));
    const [email, setEmail] = useState(() => {
        const existing = localStorage.getItem('delicia_token');
        return existing ? decodeEmailFromToken(existing) : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('delicia_token', token);
            setEmail(decodeEmailFromToken(token));
        } else {
            localStorage.removeItem('delicia_token');
            setEmail(null);
        }
    }, [token]);

    const login = (newToken) => setToken(newToken);
    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value={{ token, email, isLoggedIn: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
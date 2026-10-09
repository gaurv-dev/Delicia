import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/AuthContext';
import { addItem } from '../../services/cartService';
import { createCustomCake } from '../../services/customCakeService';
import './BuildCake.css';

const SIZES = { '0.5kg': 400, '1kg': 700, '2kg': 1300 };
const FLAVOURS = { Chocolate: 0, Vanilla: 0, Butterscotch: 50, 'Black Forest': 80, 'Red Velvet': 100 };
const SHAPES = { Round: 0, Square: 50, Heart: 100 };
const TIERS = { 1: 0, 2: 400, 3: 900 };

function OptionGroup({ title, options, value, onChange, format }) {
    return (
        <div className="bc-group">
            <h3>{title}</h3>
            <div className="bc-options">
                {Object.entries(options).map(([key, extra]) => (
                    <button
                        type="button"
                        key={key}
                        className={`bc-chip ${String(value) === String(key) ? 'active' : ''}`}
                        onClick={() => onChange(isNaN(key) ? key : Number(key))}
                    >
                        {format ? format(key) : key}
                        {extra > 0 && <small>+₹{extra}</small>}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function BuildCake() {
    const { email } = useAuth();
    const navigate = useNavigate();
    const [size, setSize] = useState('1kg');
    const [flavour, setFlavour] = useState('Chocolate');
    const [shape, setShape] = useState('Round');
    const [tiers, setTiers] = useState(1);
    const [message, setMessage] = useState('');
    const [referenceUrl, setReferenceUrl] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    const price = SIZES[size] + FLAVOURS[flavour] + SHAPES[shape] + TIERS[tiers];

    async function handleAdd() {
        try {
            setBusy(true);
            setError('');
            const cake = await createCustomCake({ size, flavour, shape, tiers, message, referenceUrl });
            await addItem(email, cake.id, 1);
            navigate('/cart');
        } catch {
            setError('Something went wrong. Please try again.');
            setBusy(false);
        }
    }

    return (
        <>
            <Navbar />
            <main className="bc-page">
                <div className="bc-form">
                    <span className="bc-tag">Made just for you</span>
                    <h1>Build your cake</h1>

                    <OptionGroup title="Size" options={SIZES} value={size} onChange={setSize} />
                    <OptionGroup title="Flavour" options={FLAVOURS} value={flavour} onChange={setFlavour} />
                    <OptionGroup title="Shape" options={SHAPES} value={shape} onChange={setShape} />
                    <OptionGroup
                        title="Tiers"
                        options={TIERS}
                        value={tiers}
                        onChange={setTiers}
                        format={(k) => `${k} ${k === '1' ? 'tier' : 'tiers'}`}
                    />

                    <div className="bc-group">
                        <h3>Message on the cake <span>(optional)</span></h3>
                        <input
                            className="bc-input"
                            maxLength={40}
                            placeholder="Happy Birthday Riya!"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div className="bc-group">
                        <h3>Reference image link <span>(optional)</span></h3>
                        <input
                            className="bc-input"
                            placeholder="https://..."
                            value={referenceUrl}
                            onChange={(e) => setReferenceUrl(e.target.value)}
                        />
                    </div>
                </div>

                <aside className="bc-summary">
                    <h2>Your cake</h2>
                    <div className="bc-preview">🎂</div>
                    <ul>
                        <li><span>Size</span><b>{size}</b></li>
                        <li><span>Flavour</span><b>{flavour}</b></li>
                        <li><span>Shape</span><b>{shape}</b></li>
                        <li><span>Tiers</span><b>{tiers}</b></li>
                        {message && <li><span>Message</span><b>“{message}”</b></li>}
                    </ul>
                    <div className="bc-total">
                        <span>Total</span>
                        <strong>₹{price}</strong>
                    </div>
                    {error && <p className="bc-error">{error}</p>}
                    <button className="btn bc-add" onClick={handleAdd} disabled={busy}>
                        {busy ? 'Adding…' : 'Add to cart'}
                    </button>
                </aside>
            </main>
        </>
    );
}
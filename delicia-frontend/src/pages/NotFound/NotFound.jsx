export default function NotFound() {
    return (
        <div className="notfound-page">
            <div className="notfound-content">
                <span className="notfound-emoji">🎂</span>
                <h1>This slice doesn't exist</h1>
                <p>The page you're looking for got eaten, or never existed.</p>
                <a href="/" className="btn btn-primary">Back to the counter</a>
            </div>
        </div>
    );
}
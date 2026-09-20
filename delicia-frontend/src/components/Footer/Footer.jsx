export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <span className="footer-logo">Delicia</span>
                    <p>Cake, built the way you imagine it.</p>
                </div>
                <div className="footer-links">
                    <a href="/">Counter</a>
                    <a href="/orders">My orders</a>
                    <a href="/cart">Cart</a>
                </div>
                <p className="footer-copy">&copy; {new Date().getFullYear()} Delicia. All rights reserved.</p>
            </div>
        </footer>
    );
}
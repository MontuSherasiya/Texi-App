export default function Header () {
    return(
        <header className="site-header">
            <div className="wrap-nav">
                <div className="logo">
                    <span className="dot"></span>
                    Saurashtra&nbsp;Cabs
                </div>
                <nav className="nav-links">
                    <a href="#fleet">Fleet</a>
                    <a href="#destinations">Destinations</a>
                    <a href="#reviews">Reviews</a>
                    <span className="call-chip">📞 99999 99999</span>
                    <a href="#book" className="btn">Book a Ride</a>
                </nav>
            </div>
        </header>
    );
}
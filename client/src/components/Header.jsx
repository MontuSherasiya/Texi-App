import { useState } from "react";

export default function Header () {

    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu(){
        setMenuOpen(false);
    }

    return(
        <header className="site-header">
            <div className="wrap-nav">
                <div className="logo">
                    <span className="dot"></span>
                    Saurashtra&nbsp;Cabs
                </div>

                <button
                    className={`nav-toggle ${menuOpen ? "open" : ""}`}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <span></span><span></span><span></span>
                </button>

                <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <a href="#fleet" onClick={closeMenu}>Fleet</a>
                    <a href="#destinations" onClick={closeMenu}>Destinations</a>
                    <a href="#reviews" onClick={closeMenu}>Reviews</a>
                    <span className="call-chip">📞 99999 99999</span>
                    <a href="#book" className="btn" onClick={closeMenu}>Book a Ride</a>
                </nav>
            </div>
        </header>
    );
}
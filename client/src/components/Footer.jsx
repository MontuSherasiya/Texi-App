export default function Footer(){
    return(
        <footer>
            <div className="wrap">
                <div className="foot-grid">
                    <div>
                        <div className="logo"><span className="dot"></span>Saurashtra Cabs</div>
                        <p>
                            Outstation taxi service based in Manali, Ladakh, Varanasi, Goa and Kerala - and every stop in between.
                        </p>
                    </div>

                    <div>
                        <h4>Explore</h4>
                        <ul>
                            <li><a href="#fleet">Our Fleet</a></li>
                            <li><a href="#destinations">Destinations</a></li>
                            <li><a href="#reviews">Reviews</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Contact</h4>
                        <ul>
                            <li><a href="tel:+919999900000">99999 00000</a></li>
                            <li><a href="https://wa.me/9999900000">WhatsApp</a></li>
                            <li>150 feet Rd, Raiya Chock, Rajkot</li>
                        </ul>
                    </div>
                </div>

                <div className="foot-bottom">
                    <span>© 2026 Saurashtra Cabs</span>
                    <span>Made for travellers on India's sacred coast</span>
                </div>
            </div>
        </footer>
    );
}
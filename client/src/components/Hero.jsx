import BookinForm from "./BookingForm.jsx";

const stops = ["Rajkot", "Somnath", "Diu", "Gir", "Dwarka", "Ahmedabad"];

export default function Hero(){
    return(
        <section className="hero">
            <div className="wrap hero-grid">
                <div>
                    <div className="eyebrow">Based in Rajkot · Serving All India</div>
                    <h1>Every road here <br />leads to <em>somewhere sacred.</em></h1>
                    <p className="lead">
                        Outstation cabs for Rajkot, Ahmedabad, Surat and Mumbai - driven by locals who know every shortcut, every viewpoint, and every good tea stall along the way.
                    </p>
                    <div className="hero-ctas">
                        <a href="#book" className="btn">Plan Your Trip</a>
                        <a href="tel:+919999900000" className="btn btn-ghost hero-ghost">Call 99999 00000</a>
                    </div>
                </div>

                <BookinForm/>
            </div>

            <div className="route-trip">
                <div className="wrap">
                    <div className="route-track">
                        {stops.map((stop, i) => (
                            <span key={stop} style={{display: "flex", alignItems: "center"}}>
                                <span className={`route-stop ${i===0 ? "origin": ""}`}>
                                    <span className="pin"></span>
                                    {stop}
                                </span>
                                {i < stops.length -1 && <span className="route-dash"></span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
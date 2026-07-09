const reviews = [
    {
        quote: "Three-day trip covering Somnath, Gir and Dwarka - around 700 km in total. The car was clean and the driver never once seemed tired or rushed.",
        who: "Sundaresh S., Chennai"
    },
    {
        quote: "Our driver knew exactly where to stop for the best tea and the best photo spots - that local knowledge made the whole trip.",
        who: "Ravi N., Bhopal"
    },
];

export default function Tesimonials(){
    return(
        <section id="reviews">
            <div className="wrap">
                <div className="section-head">
                    <div className="eyebrow">From the back seat</div>
                    <h2>What riders tall us after.</h2>
                </div>
                
                <div className="testi-grid">
                    {reviews.map((r) => (
                        <div className="testi-card" key={r.who}>
                            <div className="stars">★★★★★</div>
                            <p className="quote">{r.quote}</p>
                            <div className="who">{r.who}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
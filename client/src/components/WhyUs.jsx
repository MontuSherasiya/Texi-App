const items = [
    {
        idx: "01",
        title: "Local drivers",
        body: "Every driver is from the region - they know the temple timigs, the tide charts at Diu, and where to stop for pure food."
    },
    {
        idx: "02",
        title: "Fixed, upfront fares",
        body: "Your per-km rate is agreed before you leave. Toll, parking and driver allowance are the only extras, and we tell you that upfront too."
    },
    {
        idx: "03",
        title: "On-time, always",
        body: "Early darshan at somnath or a sunset at beach - we build in buffer time so you're never rushing to catch a moment."
    },
    {
        idx: "04",
        title: "Sanitised, serviced cars",
        body: "Every vehicle is inspected before a long trip - brakes, AC, and tyres checked, not jus wiped down and sent out."
    },
];

export default function WhyUs(){
    return(
        <section>
            <div className="wrap">
                <div className="section-head">
                    <div className="eyebrow">Why ride with us</div>
                    <h2>Built for long coastal drives.</h2>
                    <p>
                        Pilgrimage routes here run through temple towns, forest reserves, and quiet fishing villages - our service is built around that, not a generic city cab model.
                    </p>
                </div>

                <div className="why-grid">
                    {items.map((item) => (
                        <div className="why-card" key={item.idx}>
                            <div className="idx">{item.idx}</div>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
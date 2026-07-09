const destinations = [
    {
        stopNo: "Stop 01",
        name: "Somnath",
        desc: "The coastal temple town where the Arabian Sea meets centuries of pilgrimage.",
        spots: "Triveni Sangam · Surya Temple · Bhalka Tirth · Ban Ganga"
    },
    {
        stopNo: "Stop 02",
        name: "Dwarka",
        desc: "A revered pilgrim city on the western tip, known for its ancient shore temples.",
        spots: "Dwarkadhish Temple · Nageshwar · Bet Dwarka · Rukmini Temple"
    },
    {
        stopNo: "Stop 03",
        name: "Gir",
        desc: "Home to Asia's last wild lions, across dry deciduous forest and scrub.",
        spots: "Lion Safari Zones · Devalia Park · Gir Interpretation Zone"
    },
    {
        stopNo: "Stop 04",
        name: "Diu",
        desc: "A quiet island with Portuguese-era forts and some of Gujarat's best beaches.",
        spots: "Diu Fort · Nagoa Beach · INS Khukri Memorial · St. Paul's Church"
    },
];

export default function Destinations(){
    return(
        <section className="journey" id="destinations">
            <div className="wrap">
                <div className="section-head">
                    <div className="eyebrow">Where we take you</div>
                    <h2>Four stops worth the drive.</h2>
                    <p>
                        The most-requested routes from our regulars - each one bookable as a single day trip or strung together into a longer circuit.
                    </p>
                </div>

                <div className="dest-grid">
                    {destinations.map((d) => (
                        <div className="dest-card" key={d.name}>
                            <div className="stop-no">{d.stopNo}</div>
                            <h3>{d.name}</h3>
                            <p>{d.desc}</p>
                            <div className="spots">{d.spots}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
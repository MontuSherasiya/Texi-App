import { useEffect, useState } from "react";
import api from "../api/axios.js";

const gradients = [
    "linear-gradient(135deg,#dfd4b0,#c9b98a)",
    "linear-gradient(135deg,#cfd9c9,#9fb497)",
    "linear-gradient(135deg,#d9c9b8,#b89a7c)",
    "linear-gradient(135deg,#c9d3d9,#8fa3ac)",
    "linear-gradient(135deg,#e0c9b3,#c49a6c)",
    "linear-gradient(135deg,#d3cbe0,#a596bf)",
];

export default function Fleet(){
    const [vehicles, setVehicles] = useState([]);
    const [loadState, setLoadState] = useState("loading") //loading | ready | error
    
    useEffect(() => {
        api
            .get("/vehicle")
            .then((res) => {
                setVehicles(res.data);
                setLoadState("ready");
            })
            .catch(() => setLoadState("error"));
    }, []);

    return(
        <section id="fleet" className="fleet-section">
            <div className="wrap">
                <div className="section-head">
                    <div className="eyebrow">The fleet</div>
                    <h2>Pick a ride that fits your group.</h2>
                    <p>
                        Rates shown are per kilometer, on a 300 km/day running basis. Toll, parking and driver allowance are billed separately.
                    </p>
                </div>

                {loadState === "loading" && <p>Loading vehicles...</p>}
                {loadState === "error" && (
                    <p>Couldn't load the fleet right now - please refresh, or call us directly.</p>
                )}

                {loadState === "ready" && (
                    <div className="fleet-grid">
                        {vehicles.map((v,i) => (
                            <div className="meter-card" key={v._id}>
                                <div 
                                className="meter-photo" 
                                style={{background: gradients[i % gradients.length]}}>
                                    <div className="meter-fare">₹{v.ratePerKm}/km</div>
                                </div>
                                <div className="meter-body">
                                    <h3>{v.name}</h3>
                                    <div className="meter-spaces">
                                        <span><b>{v.seats}</b>seats</span>
                                        <span>{v.fuelType}</span>
                                        <span>{v.dailyKmLimit} km/day</span>
                                    </div>
                                    <a href="#book" className="btn btn-ghost">Book This Car</a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
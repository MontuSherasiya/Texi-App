import { useState } from "react";
import api from "../api/axios.js";

const initialState = {
    name: "",
    phone: "",
    pickUpDate: "",
    from: "",
    to: "",
    vehicle: "Swift Dzire (4 Seater)",
};

export default function BookingForm() {
    const [form, setForm] = useState(initialState);
    const [status, setStatus] = useState({state: "idle", message: ""});

    function handleChange(e){
        const {id, value} = e.target;
        setForm((prev) => ({...prev, [id]: value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus({ state: "loading", message: ""});

        try{
            const res = await api.post("/bookings", form);
            setStatus({state: "success", message: res.data.message});
            setForm(initialState);
        } catch(err){
            const message = 
                err.response?.data?.message || "Something went wrong. Please try again.";
            setStatus({state: "error", message});
        }
    }

    return(
        <div className="book-card" id="book">
            <h3>Get a Fare Estimate</h3>
            <div className="sub">No hidden charges. Reply within minutes.</div>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="name">Your Name</label>
                    <input id="name" type="text" placeholder="Mayur Patel" value={form.name} onChange={handleChange} required/>
                </div>

                <div className="field-row">
                    <div className="field">
                        <label htmlFor="phone">Mobile Number</label>
                        <input id="phone" type="text" placeholder="99999 99999" value={form.phone} onChange={handleChange} required/>
                    </div>

                    <div className="field">
                        <label htmlFor="pickupDate">Pickup Date</label>
                        <input id="pickupDate" type="date" value={form.pickUpDate} onChange={handleChange} required/>
                    </div>
                </div>

                <div className="field-row">
                    <div className="field">
                        <label htmlFor="from">Pick-up</label>
                        <input type="text" id="from" placeholder="Rajkot" value={form.from} onChange={handleChange} required/>
                    </div>

                    <div className="field">
                        <label htmlFor="to">Drop-off</label>
                        <input type="text" id="to" placeholder="Goa" value={form.to} onChange={handleChange} required/>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="vehicle">Vehicle</label>
                    <select id="vehicle" value={form.vehicle} onChange={handleChange}>
                        <option>Swift Dzire (4 seater)</option>
                        <option>Ertiga (6 seater)</option>
                        <option>Innova Crysta (7 seater)</option>
                        <option>Tempo Taveller (12-17 seater)</option>
                    </select>
                </div>

                <button type="submit" className="btn" disabled={status.state === "loading"}>
                    {status.state === "loading" ? "Sending..." : "Get Fare Estimate"}
                </button>

                {status.state === "success" && <p className="form-not success">{status.message}</p>}
                {status.state === "error" && <p className="form-not error">{status.message}</p>}
            </form>
        </div>
    );
}
import { useEffect, useState } from "react";
import adminApi from "../api/adminApi.js";

const emptyForm = {
    name: "",
    seats: "",
    fuelType: "",
    ratePerKm: "",
    dailyKmLimit: 300,
    photoUrl: "",
    active: true,
};

export default function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState("");

    async function loadVehicles() {
        setLoading(true);
        try {
            const res = await adminApi.get("/vehicles/all");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadVehicles();
    }, []);

    function openAddForm() {
        setForm(emptyForm);
        setEditingId(null);
        setError("");
        setShowForm(true);
    }

    function openEditForm(v) {
        setForm({
            name: v.name,
            seats: v.seats,
            fuelType: v.fuelType,
            ratePerKm: v.ratePerKm,
            dailyKmLimit: v.dailyKmLimit,
            photoUrl: v.photoUrl || "",
            active: v.active
        });
        setEditingId(v._id);
        setError("");
        setShowForm(true);
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const payload = {
            ...form,
            seats: Number(form.seats),
            ratePerKm: Number(form.ratePerKm),
            dailyKmLimit: Number(form.dailyKmLimit) || 300
        };

        try {
            if (editingId) {
                await adminApi.put(`/vehicles/${editingId}`, payload);
            } else {
                await adminApi.post("/vehicles", payload);
            }
            setShowForm(false);
            loadVehicles();
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        }
    }

    async function handleDelete(id) {
        if (!confirm("Delete this Vehicle? This cannot be undone.")) return;
        try {
            await adminApi.delete(`/vehicles/${id}`);
            loadVehicles();
        } catch (error) {
            alert(err.response?.data?.message || "Delete failed.");
        }
    }

    async function toggleActive(v) {
        try {
            await adminApi.put(`/vehicles/${v._id}`, { active: !v.active });
            loadVehicles();
        } catch (error) {
            alert("Could not update status.")
        }
    }

    return (
        <div>
            <div className="admin-page-head">
                <div>
                    <h1 className="admin-page-title">Vehicles</h1>
                    <p className="admin-page-sub">Manage your fleet — visible vehicles show on the public site.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openAddForm}>+ Add Vehicle</button>
            </div>

            {loading ? (
                <p>Loading…</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th><th>Seats</th><th>Fuel</th><th>Rate/km</th><th>Status</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((v) => (
                            <tr key={v._id}>
                                <td>{v.name}</td>
                                <td>{v.seats}</td>
                                <td>{v.fuelType}</td>
                                <td>₹{v.ratePerKm}</td>
                                <td>
                                    <button
                                        className={`admin-badge ${v.active ? "on" : "off"}`}
                                        onClick={() => toggleActive(v)}
                                        title="Click to toggle"
                                    >
                                        {v.active ? "Active" : "Hidden"}
                                    </button>
                                </td>
                                <td className="admin-table-actions">
                                    <button className="admin-btn-link" onClick={() => openEditForm(v)}>Edit</button>
                                    <button className="admin-btn-link danger" onClick={() => handleDelete(v._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {vehicles.length === 0 && (
                            <tr><td colSpan="6" className="admin-empty">No vehicles yet — add your first one.</td></tr>
                        )}
                    </tbody>
                </table>
            )}

            {showForm && (
                <div className="admin-modal-backdrop" onClick={() => setShowForm(false)}>
                    <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                        <h2>{editingId ? "Edit Vehicle" : "Add Vehicle"}</h2>

                        <div className="admin-field">
                            <label>Name</label>
                            <input name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="admin-field-row">
                            <div className="admin-field">
                                <label>Seats</label>
                                <input name="seats" type="number" value={form.seats} onChange={handleChange} required />
                            </div>
                            <div className="admin-field">
                                <label>Fuel type</label>
                                <input name="fuelType" value={form.fuelType} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="admin-field-row">
                            <div className="admin-field">
                                <label>Rate per km (₹)</label>
                                <input name="ratePerKm" type="number" value={form.ratePerKm} onChange={handleChange} required />
                            </div>
                            <div className="admin-field">
                                <label>Daily km limit</label>
                                <input name="dailyKmLimit" type="number" value={form.dailyKmLimit} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="admin-field">
                            <label>Photo URL (e.g. /images/vehicles/dzire.jpg)</label>
                            <input name="photoUrl" value={form.photoUrl} onChange={handleChange} />
                        </div>
                        <label className="admin-checkbox">
                            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
                            Visible on public site
                        </label>

                        {error && <p className="admin-error">{error}</p>}

                        <div className="admin-modal-actions">
                            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="admin-btn admin-btn-primary">{editingId ? "Save Changes" : "Add Vehicle"}</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
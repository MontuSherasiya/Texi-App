import { useEffect, useState } from "react";
import adminApi from "../api/adminApi.js";

const STATUSES = ["new", "contacted", "confirmed", "completed", "cancelled"];

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadBookings() {
        setLoading(true);
        try {
            const res = await adminApi.get("/bookings");
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBookings();
    }, []);

    async function handleStatusChange(id, status) {
        try {
            await adminApi.patch(`/bookings/${id}/status`, { status });
            setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
        } catch (err) {
            alert("Could not update status.");
        }
    }

    async function handleDelete(id) {
        if (!confirm("Delete this booking?")) return;
        try {
            await adminApi.delete(`bookings/${id}`);
            setBookings((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            alert("Delete Failed..")
        }
    }

    return (
        <div>
            <h1 className="admin-page-title">Bookings</h1>
            <p className="admin-page-sub">All fare-estimate requests submitted from the site.</p>

            {loading ? (
                <p>Loading…</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th><th>Phone</th><th>Route</th><th>Pickup</th><th>Vehicle</th><th>Status</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b._id}>
                                <td>{b.name}</td>
                                <td>{b.phone}</td>
                                <td>{b.from} → {b.to}</td>
                                <td>{new Date(b.pickupDate).toLocaleDateString()}</td>
                                <td>{b.vehicle}</td>
                                <td>
                                    <select
                                        className={`admin-status-select status-${b.status}`}
                                        value={b.status}
                                        onChange={(e) => handleStatusChange(b._id, e.target.value)}
                                    >
                                        {STATUSES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="admin-table-actions">
                                    <button className="admin-btn-link danger" onClick={() => handleDelete(b._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr><td colSpan="7" className="admin-empty">No bookings yet.</td></tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}
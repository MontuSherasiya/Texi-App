import { useEffect, useState } from "react";
import adminApi from "../api/adminApi.js";

export default function Dashboard() {
    const [stats, setStats] = useState({ vehicles: 0, bookings: 0, newBookings: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [vehiclesRes, setVehiclesRes] = await Promise.all([
                    adminApi.get("/vehicles/all"),
                    adminApi.get("/bookings"),
                ]);
                const bookings = bookingsRes.data;
                setStats({
                    vehicles: vehiclesRes.data.length,
                    bookings: bookings.length,
                    newBookings: bookings.filter((b) => b.status === "new").length,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <div>
            <h1 className="admin-page-title">Dashboard</h1>
            <p className="admin-page-sub">Quick overview of your fleet and bookings.</p>

            {loading ? (
                <p>Loading…</p>
            ) : (
                <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <div className="admin-stat-num">{stats.vehicles}</div>
                        <div className="admin-stat-label">Vehicles in fleet</div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-num">{stats.bookings}</div>
                        <div className="admin-stat-label">Total bookings</div>
                    </div>
                    <div className="admin-stat-card highlight">
                        <div className="admin-stat-num">{stats.newBookings}</div>
                        <div className="admin-stat-label">New / unhandled bookings</div>
                    </div>
                </div>
            )}
        </div>
    );
}
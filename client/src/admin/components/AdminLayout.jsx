import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
    const Navigate = useNavigate();
    const username = localStorage.getItem("admin_username") || "Admin";

    function handleLogout() {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_username");
        navigate("/admin/login");
    }

    return (
        <div className="admin-shell">
            <aside className="admin-sidebar">
                <div className="admin-logo">Saurashtra&nbsp;Cabs<span>Admin</span></div>
                <nav className="admin-nav">
                    <NavLink to="/admin" end>Dashboard</NavLink>
                    <NavLink to="/admin/vehicles">Vehicles</NavLink>
                    <NavLink to="/admin/bookings">Bookings</NavLink>
                </nav>
                <div className="admin-sidebar-footer">
                    <div className="admin-user">{username}</div>
                    <button className="admin-btn admin-btn-ghost" onClick={handleLogout}>Log out</button>
                </div>
            </aside>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    )
}
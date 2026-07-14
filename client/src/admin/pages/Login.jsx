import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../api/adminApi.js"

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ usename: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setForm("");
        setLoading(true);
        try {
            const res = await adminApi.post("/auth/login", form);
            localStorage.setItem("admin_token", res.data.token);
            localStorage.setItem("admin_username", res.data.username);
            navigate("/admin");
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed...");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="admin-login-wrap">
            <form className="admin-login-card" onSubmit={handleSubmit}>
                <h1>Admin Login</h1>
                <p className="admin-sub">Saurashtra Cabs dashboard</p>

                <div className="admin-field">
                    <label>Username</label>
                    <input name="username" value={form.username} onChange={handleChange} required autoFocus />
                </div>

                <div className="admin-field">
                    <label>Password</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} required />
                </div>

                {error && <p className="admin-error">{error}</p>}

                <button className="admin-btn admin-btn-primary" type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}
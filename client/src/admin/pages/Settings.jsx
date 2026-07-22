import { useState, useEffect } from "react";
import adminApi from "../api/adminApi.js";

const defaultForm = {
    eyebrow: "",
    headline: "",
    headlineEmphasis: "",
    lead: "",
    phone: "",
    whatsapp: "",
    address: ""
};

export default function Settings() {
    const [form, setForm] = useState(defaultForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        adminApi
            .get("/settings")
            .then((res) => setForm(res.data))
            .catch(() => setError("Could not load settings."))
            .finally(() => setLoading(false));
    }, []);

    function handleChange(e) {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const res = await adminApi.put("/settings", form);
            setForm(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Could not save setting.")
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <h1 className="admin-page-title">Site Settings</h1>
            <p className="admin-page-sub">Controls the hero text and contact details shown across the site.</p>

            <form className="admin-settings-form" onSubmit={handleSubmit}>
                <div className="admin-field">
                    <label>Eyebrow text (small label above the headline)</label>
                    <input name="eyebrow" value={form.eyebrow} onChange={handleChange} required />
                </div>

                <div className="admin-field">
                    <label>Headline</label>
                    <input name="headline" value={form.headline} onChange={handleChange} required />
                </div>

                <div className="admin-field">
                    <label>Part of the headline to highlight in gold/italic</label>
                    <input name="headlineEmphasis" value={form.headlineEmphasis} onChange={handleChange} />
                </div>

                <div className="admin-field">
                    <label>Lead paragraph</label>
                    <textarea name="lead" rows={3} value={form.lead} onChange={handleChange} required />
                </div>

                <div className="admin-field-row">
                    <div className="admin-field">
                        <label>Phone (displayed, e.g. 97263 48890)</label>
                        <input name="phone" value={form.phone} onChange={handleChange} required />
                    </div>
                    <div className="admin-field">
                        <label>WhatsApp number (digits only, with country code)</label>
                        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} required />
                    </div>
                </div>

                <div className="admin-field">
                    <label>Address</label>
                    <input name="address" value={form.address} onChange={handleChange} required />
                </div>

                {error && <p className="admin-error">{error}</p>}
                {saved && <p className="admin-saved">Saved ✓</p>}

                <button className="admin-btn admin-btn-primary" type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Settings"}
                </button>
            </form>
        </div>
    );
}
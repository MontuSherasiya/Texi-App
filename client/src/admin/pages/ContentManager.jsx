import { useEffect, useState } from "react";
import adminApi from '../api/adminApi.js';

/* 
    * Generic admin CRUD screen for simple content collections
    * (Destination, Stat, Testimonial, Why-Us cards).
    * 
    * config = {
    *   title, subtitle, endpoint,      //e.g. "/destinations"
    *   columns :[{key, label}],        // table colums to preview
    *   fields: [{key, label, type}],   //form fields (type:"text" | "textarea" | "number")
    *   emptyItem: {...defaults}
    * }
*/

export default function ContentManager({ config }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(config.emptyItem);
    const [error, setError] = useState("");

    async function loadItems() {
        setLoading(true);
        try {
            const res = await adminApi.get(`${config.endpoint}/all`);
            setItems(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadItems();
    }, [config.endpoint]);

    function openAddForm() {
        setForm(config.emptyItem);
        setEditingId(null);
        setError("");
        setShowForm(true);
    }

    function openEditForm(item) {
        const next = {};
        config.fields.forEach((f) => { next[f.key] = item[f.key] ?? ""; });
        next.order = item.order ?? 0;
        next.active = item.active ?? true;
        setForm(next);
        setEditingId(item._id);
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

        try {
            if (editingId) {
                await adminApi.put(`${config.endpoint}/${editingId}`, form);
            } else {
                await adminApi.post(config.endpoint, form);
            }
            setShowForm(false);
            loadItems();
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        }
    }

    async function handleDelete(id) {
        if (!confirm("Delete this item?")) return;

        try {
            await adminApi.delete(`${config.endpoint}/${id}`);
            loadItems();
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed.")
        }
    }

    async function toggleActive(item) {
        try {
            await adminApi.put(`${config.endpoint}/${id}`, { active: !item.active });
            loadItems();
        } catch (err) {
            alert("Could not update status.")
        }
    }

    return (
        <div>
            <div className="admin-page-head">
                <div>
                    <h1 className="admin-page-title">{config.title}</h1>
                    <p className="admin-page-sub">{config.subtitle}</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openAddForm}>+ Add</button>
            </div>

            {loading ? (
                <p>Loading…</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            {config.columns.map((c) => <th key={c.key}>{c.label}</th>)}
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id}>
                                {config.columns.map((c) => (
                                    <td key={c.key}>
                                        {String(item[c.key] ?? "").slice(0, 60)}
                                        {String(item[c.key] ?? "").length > 60 ? "…" : ""}
                                    </td>
                                ))}
                                <td>
                                    <button
                                        className={`admin-badge ${item.active ? "on" : "off"}`}
                                        onClick={() => toggleActive(item)}
                                    >
                                        {item.active ? "Active" : "Hidden"}
                                    </button>
                                </td>
                                <td className="admin-table-actions">
                                    <button className="admin-btn-link" onClick={() => openEditForm(item)}>Edit</button>
                                    <button className="admin-btn-link danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr><td colSpan={config.columns.length + 2} className="admin-empty">Nothing here yet — add your first one.</td></tr>
                        )}
                    </tbody>
                </table>
            )}

            {showForm && (
                <div className="admin-modal-backdrop" onClick={() => setShowForm(false)}>
                    <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                        <h2>{editingId ? `Edit ${config.title.slice(0, -1)}` : `Add ${config.title.slice(0, -1)}`}</h2>

                        {config.fields.map((f) => (
                            <div className="admin-field" key={f.key}>
                                <label>{f.label}</label>
                                {f.type === "textarea" ? (
                                    <textarea
                                        name={f.key}
                                        rows={4}
                                        value={form[f.key] ?? ""}
                                        onChange={handleChange}
                                        required={f.required !== false}
                                    />
                                ) : (
                                    <input
                                        name={f.key}
                                        type={f.type || "text"}
                                        value={form[f.key] ?? ""}
                                        onChange={handleChange}
                                        required={f.required !== false}
                                    />
                                )}
                            </div>
                        ))}

                        <div className="admin-field">
                            <label>Display order (lower shows first)</label>
                            <input name="order" type="number" value={form.order ?? 0} onChange={handleChange} />
                        </div>

                        <label className="admin-checkbox">
                            <input type="checkbox" name="active" checked={form.active ?? true} onChange={handleChange} />
                            Visible on public site
                        </label>

                        {error && <p className="admin-error">{error}</p>}

                        <div className="admin-modal-actions">
                            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="admin-btn admin-btn-primary">{editingId ? "Save Changes" : "Add"}</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
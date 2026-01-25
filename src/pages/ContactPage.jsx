import React, { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/xqabdyln";

function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState({ sending: false, success: false, error: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ sending: true, success: false, error: null });

        try {
            const res = await fetch(FORMSPREE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || data?.message || "Failed to send message");
            }

            setStatus({ sending: false, success: true, error: null });
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            setStatus({ sending: false, success: false, error: err.message || "Request failed" });
        }
    };

    return (
        <div className="form-page">
            <div className="form-card">
                <h1>Contact Us</h1>

                <form className="form-grid" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="form-field">
                        <label htmlFor="subject">Subject</label>
                        <input id="subject" name="subject" value={form.subject} onChange={handleChange} />
                    </div>

                    <div className="form-field">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="6" value={form.message} onChange={handleChange} required />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="primary-btn" disabled={status.sending}>
                            {status.sending ? "Sending..." : "Send Message"}
                        </button>
                        {status.success && <span style={{ color: "green" }}>Message sent. Thank you!</span>}
                        {status.error && <span style={{ color: "#b00020" }}>Error: {status.error}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;

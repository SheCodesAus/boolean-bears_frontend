export default async function getRating(courseId, token) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}/ratings/`, {
        method: "GET",
        headers: {
            ...(token ? { Authorization: `Token ${token}` } : {}),
        },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.detail || `Get rating failed (${res.status})`;
        throw new Error(msg);
    }
    return res.json(); // may return list of ratings or user's rating depending on backend
}

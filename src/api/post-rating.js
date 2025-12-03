export default async function postRating(courseId, score, token) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}/ratings/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Token ${token}` } : {}),
        },
        body: JSON.stringify({ score }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.detail || err?.score?.[0] || `Rating failed (${res.status})`;
        throw new Error(msg);
    }
    return res.json(); // expect Rating object { id, course, user, score, created_at, updated_at }
}

export default async function postLike(courseId, token) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}/likes/`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}), // or Bearer
    },
    body: JSON.stringify({ course: courseId }), // REQUIRED by your API
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.course?.[0] || err?.detail || `Like failed (${res.status})`;
        throw new Error(msg);
    }
    return res.json(); // expect { likes: number }
}

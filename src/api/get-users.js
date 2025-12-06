export default async function getUsers(token) {
const res = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Token ${token}` } : {}),
    },
});
if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err?.detail || `Get users failed (${res.status})`;
    throw new Error(msg);
}
return res.json();
}

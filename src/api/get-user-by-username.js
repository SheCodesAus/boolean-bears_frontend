async function getUserByUsername(username) {
    const base = import.meta.env.VITE_API_URL;
    // Prefer exact-match filter to avoid partials
    const url = `${base}/users/?username__exact=${encodeURIComponent(username)}`;

    const response = await fetch(url);

    if (!response.ok) {
        const fallbackError = `Error fetching user with username ${username}`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail || fallbackError;
        throw new Error(errorMessage);
    }

    const data = await response.json();
    // Expecting array or paginated result; select exact username match if possible
    const pickExact = (arr) => {
        const target = String(username).trim().toLowerCase();
        const exact = arr.find((u) => String(u?.username || "").trim().toLowerCase() === target);
        return exact || arr[0] || null;
    };

    if (Array.isArray(data)) {
        return pickExact(data);
    }
    if (data && Array.isArray(data.results)) {
        return pickExact(data.results);
    }
    // If backend returns object directly
    return data || null;
}

export default getUserByUsername;

async function postCreateImageURL(payload, token) {
    const url = `${import.meta.env.VITE_API_URL}/courses/image-url/`;
    
    const headers = {
        "Content-Type": "application/json",
    };
    
    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }
    
    const response = await fetch(url, {
        method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers,
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const status = response.status;
        let body;
        try {
            body = await response.json();
        } catch (e) {
            body = await response.text().catch(() => null);
        }
        const detail = (body && (body.detail || body)) ?? `HTTP ${status}`;
        throw new Error(`Create image URL failed (${status}): ${typeof detail === "string" ? detail : JSON.stringify(detail)}`);
    }

    return await response.json();
}

export default postCreateImageURL;
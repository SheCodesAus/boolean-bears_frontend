async function postCreateCourse(payload, token) {
    const url = `${import.meta.env.VITE_API_URL}/courses/`;
    const isForm = typeof FormData !== 'undefined' && payload instanceof FormData;

    const headers = {};
    if (token) headers["Authorization"] = `Token ${token}`;

    // Important: do NOT set Content-Type for FormData; the browser will set the correct boundary
    if (!isForm) headers["Content-Type"] = "application/json";

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: isForm ? payload : JSON.stringify(payload),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create course`;

        const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    return await response.json();
}

export default postCreateCourse;
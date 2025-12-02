async function getComments(courseId) {
    // 1. Build the URL - where to fetch form
    const url = `${import.meta.env.VITE_API_URL}/courses/${courseId}/comments/`;
    // 2. Make the request - ask the server for data
    const response = await fetch(url, {
        method: "GET",
    });

    // 3. Check if request succeeded
    if (!response.ok) {
        // Handle errors gracefully
        const fallbackError = `Error fetching comments for course ${courseId}`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    // 4. Return the data as JSON
    return await response.json();
}

export default getComments;
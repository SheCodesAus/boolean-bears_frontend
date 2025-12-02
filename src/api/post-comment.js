async function postComment(courseId, commentData, token) {
    // 1. Build URL 
    const url = `${import.meta.env.VITE_API_URL}/courses/${courseId}/comments/`;

    // 2. Prepare headers - tell server what we're sending and who we are 
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
    };

    // 3. Make POST request with data in body
    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(commentData),
    });

    // 4. Error handling
    if (!response.ok) {
        const fallbackError = `Error posting comment`;
        const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    // 5. Return the newly created comment
    return await response.json();
}

export default postComment;
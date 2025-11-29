async function putCourse(courseId, courseData, token) {
    const url = `${import.meta.env.VITE_API_URL}/courses/${courseId}/`;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
    };

    const payload = {
        title: courseData.title,
        brief_description: courseData.brief_description,
        course_content: courseData.course_content,
        category: courseData.category,
        max_students: courseData.max_students,
        is_open: courseData.is_open
    };

    const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to update course`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default putCourse;
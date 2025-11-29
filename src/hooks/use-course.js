import { useState, useEffect } from "react";

import getCourse from "../api/get-course";

export default function useCourse(courseId) {
    const [course, setCourse] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
    // Here we pass the courseId to the getCourse function.
    getCourse(courseId)
        .then((course) => {
            setCourse(course);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });

    // This time we pass the courseId to the dependency array so that the hook will re-run if the courseId changes.
    }, [courseId]);

    return { course, isLoading, error };
}
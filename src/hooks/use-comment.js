import { useState, useEffect } from "react";
import getComments from "../api/get-comments";

// 1. Define state setup
export default function useComments(courseId) {
    // 1. State for comments array
    const [comments, setComments] = useState([]);
    // 2. State for loading status
    const [isLoading, setIsLoading] = useState(true);
    // 3. State for errors
    const [error, setError] = useState(null);

    // Fetch comments when component mounts or courseId changes
    useEffect(() => {
        getComments(courseId)
            .then((data) => {
                setComments(data); // Store comments
                setIsLoading(false); // Done loading
            })
            .catch((err) => {
                setError(err); // Store error
                setIsLoading(false); // Done loading
            });           
    }, [courseId]); // re-run if courseId changes. Dependency array[courseId], Switching from course 1 to course 2 needs new comments

    // 5. Helper function to add a comment without re-fetching
    const addComment = (newComment) => {
        setComments(prev => [...prev, newComment]);
    };

    // 6. Return everythin the component needs
    return { comments, isLoading, error, addComment };
}

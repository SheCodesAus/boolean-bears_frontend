import { useState, useEffect } from "react";

export default function useFeaturedCourses() {
    const [featured, setFeatured] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/courses/featured`; 
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to load featured (status ${res.status})`);
                return res.json();
            })
            .then((data) => {
                setFeatured(data || []);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    return { featured, isLoading, error };
}
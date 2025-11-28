import useCourses from "../hooks/use-courses";
import CourseCard from "../components/CourseCard";
import useFeaturedCourses from "../hooks/use-featured-courses";
import { useState, useMemo } from "react";
import "./HomePage.css";

function HomePage() {
    const { courses, isLoading, error } = useCourses();
    const { featured, isLoading: featuredLoading } = useFeaturedCourses(); //Custom hook fetches featured fundraisers from the API. Returns featured array and loading state
    const [query, setQuery] = useState("");

    // Helper function to get course ID
    const getId = (item) => {
        if (!item) return null;
        if (item.id != null) return String(item.id);
        if (item.pk != null) return String(item.pk);
        if (item._id != null) return String(item._id);
        return null;
    };

    // Filter out featured courses from main list
    const filteredCourses = useMemo(() => {
    const featuredIds = new Set(
        (featured || []).map(getId).filter(Boolean)
    );
    
    return (courses || []).filter((c) => {
            const cid = getId(c);
            if (cid && featuredIds.has(cid)) return false; // Hide featured from main list
            
            // Optional: Add search filtering
            if (!query.trim()) return true; // Show all if no search query
            const q = query.toLowerCase();
            return (
                (c.title && c.title.toLowerCase().includes(q)) ||
                (c.description && c.description.toLowerCase().includes(q))
            );
        });
    }, [courses, query, featured]);

        if (isLoading) {
            return (<p>loading...</p>)
        }
    
        if (error) {
            return (<p>{error.message}</p>)
        }
    
    return (
        <div className="home-container">
            {/* Featured Section */}
            {featured && featured.length > 0 && (
                <section id="featured-courses" className="featured-section">
                    <h2>Featured Courses</h2>
                    <div className="featured-list">
                        {featured.map((course) => (
                            <CourseCard key={course.id} courseData={course} />
                        ))}
                    </div>
                </section>
            )}

            {/* All Courses Section */}
            <section className="all-courses-section">
                <h2>All Courses</h2>
                <div id="course-list">
                    {filteredCourses.map((courseData, key) => {
                        return <CourseCard key={key} courseData={courseData} />;
                    })}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
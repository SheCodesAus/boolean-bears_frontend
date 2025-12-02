import useCourses from "../hooks/use-courses";
import CourseCard from "../components/CourseCard";
import useFeaturedCourses from "../hooks/use-featured-courses";
import { useState, useMemo, useRef } from "react";
import "./HomePage.css";

function HomePage() {
    const { courses, isLoading, error } = useCourses();
    const { featured, isLoading: featuredLoading } = useFeaturedCourses(); //Custom hook fetches featured fundraisers from the API. Returns featured array and loading state
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("relevance");
    const featuredTrackRef = useRef(null);

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
                (c.description && c.description.toLowerCase().includes(q)) ||
                (c.category && String(c.category).toLowerCase().includes(q)) ||
                (c.owner && String(c.owner).toLowerCase().includes(q))
            );
        });
    }, [courses, query, featured]);

    // Sort the filtered courses based on selected sort option
    const sortedCourses = useMemo(() => {
        const list = [...(filteredCourses || [])];
        const collator = new Intl.Collator(undefined, { sensitivity: "base" });

        const likesOf = (x) => (x?.likes_count ?? x?.likes ?? 0);
        const timeOf = (x) => {
            const raw = x?.created_at ?? x?.createdAt ?? x?.date ?? null;
            const parsed = raw ? Date.parse(raw) : NaN;
            if (!Number.isNaN(parsed)) return parsed;
            // Fallback: use numeric ID as a proxy for recency if available
            const idNum = Number(getId(x) ?? 0);
            return idNum;
        };

        switch (sortBy) {
            case "title":
                list.sort((a, b) => collator.compare(a?.title ?? "", b?.title ?? ""));
                break;
            case "likes":
                list.sort((a, b) => likesOf(b) - likesOf(a));
                break;
            case "newest":
                list.sort((a, b) => timeOf(b) - timeOf(a));
                break;
            case "relevance":
            default:
                // Keep API/default order
                break;
        }

        return list;
    }, [filteredCourses, sortBy]);

    const scrollFeatured = (dir) => {
        const el = featuredTrackRef.current;
        if (!el) return;
        const amount = Math.max(240, Math.floor(el.clientWidth * 0.9));
        el.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

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
                    <div className="carousel">
                        <button
                            className="carousel-btn prev"
                            aria-label="Previous featured"
                            onClick={() => scrollFeatured(-1)}
                        >
                            ‹
                        </button>
                        <div className="featured-list carousel-track" ref={featuredTrackRef}>
                            {featured.map((course) => (
                                <CourseCard key={course.id} courseData={course} />
                            ))}
                        </div>
                        <button
                            className="carousel-btn next"
                            aria-label="Next featured"
                            onClick={() => scrollFeatured(1)}
                        >
                            ›
                        </button>
                    </div>
                </section>
            )}

            {/* All Courses Section */}
            <section className="all-courses-section">
                <h2>All Courses</h2>
                <div className="search-row">
                    <input
                        type="text"
                        className="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search title, category, owner…"
                        aria-label="Search courses"
                    />
                    {query && (
                        <button
                            type="button"
                            className="primary-btn"
                            onClick={() => setQuery("")}
                            aria-label="Clear search"
                        >
                            Clear
                        </button>
                    )}
                    <label htmlFor="sort" className="visually-hidden">Sort by</label>
                    <select
                        id="sort"
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        aria-label="Sort courses"
                    >
                        <option value="relevance">Sort: Relevance</option>
                        <option value="title">Sort: Title (A–Z)</option>
                        <option value="likes">Sort: Likes (High→Low)</option>
                        <option value="newest">Sort: Newest</option>
                    </select>
                </div>
                <div id="course-list">
                    {sortedCourses.map((courseData, key) => {
                        return <CourseCard key={key} courseData={courseData} />;
                    })}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
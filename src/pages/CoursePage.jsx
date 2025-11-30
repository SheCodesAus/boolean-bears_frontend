import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useCourse from "../hooks/use-course";
import postLike from "../api/post-likecourse";
import categoryImages from "../utils/category-images";
import { useAuth } from "../hooks/use-auth";
import deleteCourse from "../api/delete-course";
import { ThumbsUp } from "lucide-react";

function CoursePage() {
    const navigate = useNavigate();
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useCourse hook.
    const { id } = useParams();
    const [likes, setLikes] = useState(0); // Stores the number of likes for the course
    const [hasLiked, setHasLiked] = useState(false);
    const [liking, setLiking] = useState(false);
    const { auth } = useAuth();

    // useCourse returns three pieces of info, so we need to grab them all here
    const { course, isLoading, error } = useCourse(id);
    
    /////// Likes /////////
    useEffect(() => {
    // Always sync likes from server - use same fallback as CourseCard
    const serverLikes = course?.likes_count ?? course?.likes ?? 0;
    if (typeof serverLikes === "number") {
        setLikes(serverLikes);
    }
    // Initialize hasLiked from server flag if available, else from localStorage
    if (course?.user_has_liked === true) {
        setHasLiked(true);
    } else {
        // Include username in the key so each user has their own like state
        const key = `liked_course_${id}_${auth?.username || 'anonymous'}`;
        setHasLiked(localStorage.getItem(key) === "1");
    }
}, [course, id, auth?.username]); // added auth?.username to dependencies

    const incrementLikes = async () => {
        if (hasLiked || liking) return; // block repeat
        setLiking(true);

        setLikes(l => l + 1);
        try {
            const res = await postLike(id, auth?.token);
            // Use same fallback for response
            const newLikes = res?.likes_count ?? res?.likes;
            if (typeof newLikes === "number") setLikes(newLikes);
            setHasLiked(true);
            // Store with username-specific key
            const key = `liked_course_${id}_${auth?.username || 'anonymous'}`;
            localStorage.setItem(key, "1");
        } catch (e) {
            setLikes(l => Math.max(0, l - 1));
            alert(e.message || "Could not register like. Please try again.");
        } finally {
            setLiking(false);
        }
        };
//     // likes ended///////
    
    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    if (!course) {
        return (<p>Course not found</p>)
    }

    // Check if logged-in user is the owner
    const isOwner = auth?.username === course.owner;


    const formatDate = (iso) => {
        if (!iso) return "";
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return "";
        return d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }); // en-GB gives DD/MM/YYYY
    };

    // Handler for update button
    const handleUpdateClick = () => {
        navigate(`/course/update/${id}`)
    };

    // Handler for delete button
    const handleDeleteClick = async () => {
        if (!window.confirm("Are you sure you want to delete this course?")) {
            return;
        }

        try {
            await deleteCourse(id, auth.token);
            alert("Course deleted successfully!");
            navigate("/")
        } catch (err) {
            console.error("Delete failed:", err);
            alert(`Failed to delete course: ${err.message}`);
        }
    };

    return (
    <div className="course-page">
        {/* 1. Course Image */}
        <div className="course-header">
            <img 
                src={categoryImages[course.category] || categoryImages["other"]} 
                className="course-detail-image"
                alt={course.title}
            />
        </div> 
        <div className="image-likes">
            <button
                className="like-button"
                onClick={incrementLikes}
                aria-label="Like this course"
                disabled={hasLiked || liking}
                title={hasLiked ? "You already liked this course" : "Like this course"}
            >
                <ThumbsUp />
            </button>
            <span className="likes-count">{likes} Likes</span>
        </div>
            <div className="course-content">
                {/* 2. Course Title */}
                <h1 className="course-title">{course.title}</h1>
                
                {/* 3. Category */}
                <h3><strong>Category:</strong> {course.category}</h3>
                
                {/* 4. By Owner */}
                <h3><strong>By:</strong> {course.owner}</h3>
                
                {/* 5. Maximum Students */}
                <h3><strong>Maximum Students:</strong> {course.max_students}</h3>

                {/* 6. Brief Description */}
                <h3><strong>Brief Description</strong></h3>
                <p>{course.brief_description}</p>

                {/* 7. Course Content */}
                <div>
                    <h3><strong>Course Content</strong> </h3> 
                    <div
                    dangerouslySetInnerHTML={{ __html: course.course_content}}
                    />
                </div>

                {isOwner && (
                    <div className="course-actions">
                        <button 
                            className="btn-update"
                            onClick={handleUpdateClick}
                        >
                            Update Course
                        </button>
                        <button
                            className="btn-delete"
                            onClick={handleDeleteClick}
                        >
                            Delete Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoursePage;
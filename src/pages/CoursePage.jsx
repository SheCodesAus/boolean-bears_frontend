import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { ThumbsUp } from "lucide-react";
import { Clock, Calendar, Users, CheckCircle, Star} from "lucide-react";
import { categoryDisplay } from "../utils/category-display";

// API Imports
import postLike from "../api/post-likecourse";
import deleteCourse from "../api/delete-course";

// Hook Imports
import useCourse from "../hooks/use-course";
import useComments from "../hooks/use-comment";

// Components Imports
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import categoryImages from "../utils/category-images";
import { handleFileUpload } from "../api/post-uploadandregister";
import postRating from "../api/post-rating";
import getRating from "../api/get-rating";
import { isEnrolled as isEnrolledUtil } from "../utils/enrollment";
import { enroll as enrollUtil, isFull as isFullUtil, getCount as getCountUtil } from "../utils/enrollment";

// Css Imports
import "./CoursePage.css"

function CoursePage() {
    const navigate = useNavigate();
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useCourse hook.
    const { id } = useParams();
    const [likes, setLikes] = useState(0); // Stores the number of likes for the course
    const [hasLiked, setHasLiked] = useState(false);
    const [liking, setLiking] = useState(false);
    const { auth } = useAuth();

    // Fetch Course Data
    const { course, isLoading, error } = useCourse(id);

    // Fetch comments data
    const {
        comments,
        isLoading: commentsLoading,
        error: commentsError,
        addComment
    } = useComments(id);
    
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
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                await handleFileUpload(file, id, auth.token);
                window.location.reload(); // Refresh course data
            } catch (error) {
                alert(error.message);
            }
        }
    };
    // Check if logged-in user is the owner (guard course)
    const isOwner = !!course && auth?.username === (course?.owner ?? "");


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

    // Handler for when a new comment is added
    const handleCommentAdded = (newComment) => {
        addComment(newComment);
    };

    // Enrollment check (frontend-only): use shared utils/enrollment to ensure consistency
    const isEnrolled = isEnrolledUtil(id, auth?.username);
    const maxStudents = Number(course?.max_students ?? course?.capacity ?? 0) || null;
    const enrolledCount = getCountUtil(id);
    const courseIsFull = isFullUtil(id, maxStudents);
    const enrollEndISO = course?.enrollment_end ?? course?.enrollmentEnd ?? null;
    const enrollEndDate = enrollEndISO ? new Date(enrollEndISO) : null;
    const enrollClosed = enrollEndDate && !Number.isNaN(enrollEndDate.getTime())
        ? (Date.now() > enrollEndDate.getTime())
        : false;

    // User rating state - initialize from backend if available
    const [userRating, setUserRating] = useState(0);
    useEffect(() => {
        const fetchUserRating = async () => {
            try {
                const data = await getRating(id, auth?.token);
                // If backend returns the user's rating object directly
                if (data && typeof data === 'object' && !Array.isArray(data) && typeof data.score === 'number') {
                    setUserRating(data.score);
                    return;
                }
                // If backend returns a list of ratings, try to find current user's
                if (Array.isArray(data)) {
                    const mine = data.find((r) => String(r?.user) === String(auth?.username));
                    if (mine && typeof mine.score === 'number') {
                        setUserRating(mine.score);
                        return;
                    }
                }
                // Fallback to localStorage if not available
                const key = `rating_course_${id}_${auth?.username || 'anonymous'}`;
                const v = localStorage.getItem(key);
                if (v) setUserRating(Number(v));
            } catch {
                // fallback only
                const key = `rating_course_${id}_${auth?.username || 'anonymous'}`;
                const v = localStorage.getItem(key);
                if (v) setUserRating(Number(v));
            }
        };
        if (id) fetchUserRating();
    }, [id, auth?.token, auth?.username]);

    const saveUserRating = async (r) => {
        setUserRating(r);
        try {
            const res = await postRating(id, r, auth?.token);
            // Persist locally as a fallback
            const key = `rating_course_${id}_${auth?.username || 'anonymous'}`;
            localStorage.setItem(key, String(r));
        } catch (e) {
            alert(e.message || "Could not submit rating.");
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileTypeIcon = (type) => {
        if (!type || typeof type !== 'string') return '📁'; 
        if (type.startsWith('image/')) return '🖼️';
        if (type.startsWith('video/')) return '🎥';
        if (type === 'application/pdf') return '📄';
        return '📁';
    };

    // Optional: decode if your API returns &lt;...&gt; entities
        const decodeHTML = (html) => {
        const el = document.createElement('textarea');
        el.innerHTML = html ?? '';
        return el.value;
        };

    

    const averageRating = (() => {
        const v = course?.average_rating ?? course?.rating;
        return typeof v === 'number' ? v : null;
    })();
    const commentsCount = Array.isArray(comments) ? comments.length : (course?.comments_count ?? null);

    // Early returns must come after all hooks
    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    if (!course) {
        return (<p>Course not found</p>)
    }

    return (
        <div className="course-page">
            {/* 1. Header Image (Cinematic Banner) */}
            <div className="course-header">
                <img 
                    src={categoryImages[course.category] || categoryImages["other"]} 
                    className="course-detail-image"
                    alt={course.title}
                />
            </div> 

            <div className="course-content">               
                {/* === CARD 1: OVERVIEW & ACTIONS === */}
                {/* This white card sits on top of the banner */}
                <div className="course-intro-section">
                    
                    {/* A. Like Button (Top Right of Card)
                    <div className="image-likes">
                        <button
                            className="like-button"
                            onClick={incrementLikes}
                            aria-label="Like this course"
                            disabled={hasLiked || liking}
                            title={hasLiked ? "You already liked this course" : "Like this course"}
                        >
                            <ThumbsUp /
                        </button>
                        <span className="likes-count">{likes} Likes</span>
                    </div> */}

                    {/* B. Title & Owner */}
                    <h1 className="course-title">{course.title}</h1>
                    
                    <div className="course-header-meta">
                        <h3>{categoryDisplay[course.category] || course.category}</h3>
                        <h3>by <Link to={`/users/${course.owner_id}`}>{course.owner}</Link></h3>
                    </div>

                    {/* C. Stats Row (Duration, Dates, Seats, and Rating) */}
                    <div className="meta-row">
                        {/* Duration */}
                        {(() => {
                            const dur = Number(course?.duration_in_hours ?? course?.duration);
                            return Number.isFinite(dur) && dur > 0 ? 
                                <span className="meta-item"> 
                                    <Clock className="meta-icon" /> {dur}h
                                </span> : null;
                        })()}
                        {/* Enrol Date */}
                        {(() => {
                            const enrollEndISO = course?.enrollment_end ?? course?.enrollmentEnd ?? null;
                            const dt = enrollEndISO ? new Date(enrollEndISO) : null;
                            const valid = dt && !Number.isNaN(dt.getTime());
                            const text = valid ? dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
                            return text ? 
                                <span className="meta-item">
                                    <Calendar className="meta-icon" /> Enrol by {text}
                                </span> : null;
                        })()}
                        {/* Max Students */}
                        {(() => {
                            const max = Number(course?.max_students ?? course?.capacity);
                            return Number.isFinite(max) && max > 0 ? 
                                <span className="meta-item">
                                    <Users className="meta-icon" /> Max {max}
                                </span> : null;
                        })()}

                        {/* Enrolled Status */}
                        {isEnrolled && (
                            <span className="meta-item enrolled">
                                <CheckCircle className="meta-icon" /> Enrolled
                            </span>)}
    
                        {/* Rating */}
                        {(averageRating != null || typeof commentsCount === 'number') && (
                            <span className="meta-item rating-item">
                                <Star className="meta-icon" fill="currentColor" />
                                {averageRating != null ? Number(averageRating).toFixed(1) : '—'}
                                {typeof commentsCount === 'number' && (
                                    <span className="meta-review-count">({commentsCount} reviews)</span>
                                )}
                            </span>
                        )}
                    </div>

                    {/* D. PRIMARY ACTIONS */}
                    <div className="hero-actions">
                        {isOwner ? (
                            <div className="course-actions">
                                <button className="btn-update" onClick={handleUpdateClick}>Update Course</button>
                                <button className="btn-delete" onClick={handleDeleteClick}>Delete Course</button>
                            </div>
                        ) : !isEnrolled && (
                            <div className="course-actions">
                                {enrollClosed ? (
                                    <span className="enroll-closed-msg">Enrollment is closed</span>
                                ) : (
                                    <>
                                        <button
                                            className="btn-enroll"
                                            onClick={() => {
                                                if (!auth || !auth.token) { alert("Please log in to enroll."); navigate("/login"); return; }
                                                if (courseIsFull) { alert("Sorry, this course is full."); return; }
                                                const res = enrollUtil(id, auth?.username, maxStudents);
                                                if (!res.ok) { alert(res.reason === "full" ? "Sorry, this course is full." : "Already enrolled."); return; }
                                                alert("Enrolled successfully!");
                                                navigate(0);
                                            }}
                                        >
                                            Enroll Now
                                        </button>
                                        {Number.isFinite(maxStudents) && maxStudents > 0 && (
                                            <div className="enroll-hint">{Math.max(0, maxStudents - enrolledCount)} spots left</div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* E. Brief Description */}
                    <div className="course-description">
                        <h3>Brief Description</h3>
                        <p>{course.brief_description}</p>
                    </div>
                </div>

                {/* CARD 2: DETAILS BODY (Reading Section) */}
                <div className="course-details-body">
                    
                    {/* Section: Content */}
                    <div className="course-section content-section">
                        <h3>Course Content</h3>
                        <div
                            className="rendered-content"
                            dangerouslySetInnerHTML={{ __html: decodeHTML(course.course_content) }}
                        />
                    </div>

                    {/* Section: Materials (Including Owner Upload) */}
                    <div className="course-section materials-section">
                        <h3>Course Materials</h3>
                        <div className="course-materials">
                            {course.image ? ( 
                                <a href ={course.image} target="_blank" rel="noopener noreferrer" className="material-link">
                                    View Course Material
                                </a>
                            ) : (
                                <p>No files uploaded for this course.</p>
                            )} 
                            {/* To display uploaded files ends */}
                        </div>
                    </div>

                    {/* Section: Community (Ratings & Comments) */}
                    <div className="course-section interaction-section">                       
                        {/* Rating Area */}
                        <div className="rating-area">
                            <h3>Rate this course</h3>
                            {!isEnrolled ? (
                                <p className="text-muted">Enroll to rate this course.</p>
                            ) : (
                                <div className="rate-controls">
                                    {[1,2,3,4,5].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => saveUserRating(n)}
                                            className={n <= userRating ? "active-star" : ""}
                                        >★</button>
                                    ))}
                                    {userRating > 0 && <span>{userRating}.0</span>}
                                </div>
                            )}
                        </div>

                        <hr className="divider"/>

                        {/* Comments Area */}
                        <div className="comments-section">
                                <CommentForm courseId={id} onCommentAdded={handleCommentAdded} />

                                <div className="comment-list-spacer"></div>

                                <CommentList comments={comments} isLoading={commentsLoading} error={commentsError} />
                            </div>                              
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default CoursePage;
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth"
import { enroll, isEnrolled, isFull, getCount } from "../utils/enrollment";
import "./CourseCard.css";
import categoryImages from "../utils/category-images";
import { categoryDisplay } from "../utils/category-display";


function CourseCard(props) {
    const { courseData } = props;

    // Initialize hooks
    const { auth } = useAuth();
    const navigate = useNavigate();
    
    const likesCount = courseData?.likes_count ?? courseData?.likes ?? 0;
    const courseId = courseData?.id;
    const maxStudents = Number(courseData?.max_students ?? courseData?.capacity ?? 0) || null;
    const enrolledCount = getCount(courseId);
    const youAreEnrolled = isEnrolled(courseId, auth?.username);
    const courseIsFull = isFull(courseId, maxStudents);
    // Enrollment end: accept ISO strings or date-like strings
    const enrollEndISO = courseData?.enrollment_end ?? courseData?.enrollmentEnd ?? null;
    const enrollEndDate = enrollEndISO ? new Date(enrollEndISO) : null;
    const enrollClosed = enrollEndDate && !Number.isNaN(enrollEndDate.getTime())
        ? (Date.now() > enrollEndDate.getTime())
        : false;

    // Create the click handler
    const handleCardClick = () => {
        if (!auth || !auth.token) {
            alert("Please log in to view course details.");
            navigate("/login");
            return;
        }

        // If course is full or enrollment period ended and user is not enrolled, block access entirely
        if ((courseIsFull || enrollClosed) && !youAreEnrolled) {
            alert("Sorry, this course is full.");
            return; // Do not navigate to the course page
        }

            const confirmJoin = window.confirm("Do you want to join this course now?");
            if (confirmJoin) {
                const res = enroll(courseId, auth?.username, maxStudents);
                if (!res.ok) {
                    if (res.reason === "full") {
                        alert("Sorry, this course is full.");
                        return;
                    } else if (res.reason === "already") {
                        navigate(`/course/${courseId}`);
                        return;
                    }
                    return;
                }
                navigate(`/course/${courseId}`);
                return;
            } else {
                // User cancelled enrollment: take them back to Home
                navigate("/");
                return;
            }

        navigate(`/course/${courseId}`);
    };

    const slugify = (text) => {
        if (!text) return "";
        return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    };

    const catClass = (cat) => {
        if (!cat) return "cat-default";
        const s = slugify(cat);
        // map some known categories to explicit classes
        if (s.includes("business")) return "cat-business";
        if (s.includes("art") || s.includes("arts")) return "cat-arts";
        if (s.includes("tech") || s.includes("technology") || s.includes("coding")) return "cat-tech";
        if (s.includes("well") || s.includes("health") || s.includes("wellbeing")) return "cat-wellbeing";
        // fallback to default
        return "cat-default";
    };

    // Derived display helpers
    const durationHours = (() => {
        const durRaw = courseData?.duration_in_hours ?? courseData?.duration;
        const dur = Number(durRaw);
        return Number.isFinite(dur) && dur > 0 ? dur : null;
    })();
    const enrolByText = enrollEndDate && !Number.isNaN(enrollEndDate.getTime())
        ? enrollEndDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : null;
    const spotsLeft = (typeof maxStudents === 'number' && maxStudents > 0)
        ? Math.max(0, maxStudents - enrolledCount)
        : null;

    return (
        <div className="course-card">
            {/* TOP ROW — Difficulty + Category */}
            <div className="top-row">
                {courseData?.difficulty_level && (
                    <span className={`chip diff ${courseData.difficulty_level}`}>
                        {courseData.difficulty_level.charAt(0).toUpperCase() + courseData.difficulty_level.slice(1)}
                    </span>
                )}
                <span className={`chip category ${catClass(courseData.category)}`}>
                    {categoryDisplay[courseData.category] || courseData.category}
                </span>
            </div>

            {/* IMAGE */}
            <img
                src={categoryImages[courseData.category]}
                alt={courseData.category}
                className="course-image"
            />

            {/* TITLE + AUTHOR */}
            <h2 className="card-title">{courseData.title}</h2>
            <p className="owner">by {courseData.owner}</p>

            {/* METADATA ROW (duration + enrolment end + max students) */}
            <div className="meta-row">
                {durationHours && (
                    <span className="meta-item" aria-label="Duration">⏱️ {durationHours}h</span>
                )}
                {enrolByText && (
                    <span className="meta-item" aria-label="Enrol by">📅 Enrol by {enrolByText}</span>
                )}
                {typeof maxStudents === 'number' && maxStudents > 0 && (
                    <span className="meta-item" aria-label="Max students">👤 Max {maxStudents}</span>
                )}
            </div>

            {/* BRIEF DESCRIPTION */}
            <p className="brief">{courseData.brief_description ? `${courseData.brief_description.substring(0, 150)}...` : ""}</p>

            {/* SOCIAL PROOF (ratings + likes) */}
            <div className="social-row">
                <span className="rating" aria-label="Rating">
                    {typeof courseData?.average_rating === 'number' ? (
                        <>⭐ {courseData.average_rating.toFixed(1)}</>
                    ) : (
                        <>⭐ —</>
                    )}
                    {typeof courseData?.comments_count === 'number' && (
                        <span>({courseData.comments_count})</span>
                    )}
                </span>
                <span className="likes" aria-label="Likes">❤️ {likesCount}</span>
            </div>

            {/* CTA — Enrol button with optional hint */}
            <div className="cta-row">
                <button
                    className="btn-learn-more"
                    onClick={handleCardClick}
                    disabled={(courseIsFull || enrollClosed) && !youAreEnrolled}
                    title={(courseIsFull || enrollClosed) && !youAreEnrolled ? (enrollClosed ? 'Enrolment closed' : 'Course is full') : 'Enrol now'}
                >
                    Enrol Now
                </button>
                {spotsLeft !== null && spotsLeft > 0 && !enrollClosed && (
                    <div className="cta-hint">{spotsLeft} spots left</div>
                )}
                {enrollClosed && !youAreEnrolled && (
                    <div className="cta-hint">Enrolment closed</div>
                )}
            </div>
        </div>
    );
}

export default CourseCard;
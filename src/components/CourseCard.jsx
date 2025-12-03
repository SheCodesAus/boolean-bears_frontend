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

    // Create the click handler
    const handleCardClick = () => {
        if (!auth || !auth.token) {
            alert("Please log in to view course details.");
            navigate("/login");
            return;
        }

        // If course is full and user is not enrolled, block access entirely
        if (courseIsFull && !youAreEnrolled) {
            alert("Sorry, this course is full.");
            return; // Do not navigate to the course page
        }

        const confirmJoin = window.confirm("Do you want to join this course now?");
        if (confirmJoin) {
            if (youAreEnrolled) {
                alert("You're already enrolled. Taking you to the course page.");
            } else {
                const res = enroll(courseId, auth?.username, maxStudents);
                if (!res.ok) {
                    if (res.reason === "full") alert("Sorry, this course is full.");
                    else if (res.reason === "already") alert("You're already enrolled.");
                } else {
                    alert("Enrollment confirmed! Redirecting to course page.");
                }
            }
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

    return (
        <div className="course-card">
            <img
                src={categoryImages[courseData.category]}
                alt={courseData.category}
                className="course-image"
            />
            <h2 className="card-title">{courseData.title}</h2>
            <div className="status-row">
                {youAreEnrolled && (
                    <span className="status-badge enrolled">Enrolled</span>
                )}
                {courseIsFull && (
                    <span className="status-badge full">Full</span>
                )}
                {maxStudents && (
                    <span className="status-badge capacity">{enrolledCount}/{maxStudents}</span>
                )}
            </div>
            <p className="category-row">
                <span className={`category-badge ${catClass(courseData.category)}`}>
                    {categoryDisplay[courseData.category] || courseData.category}
                </span>
            </p>
            <p className="owner">by {courseData.owner}</p>
            <p className="brief">{courseData.brief_description ? `${courseData.brief_description.substring(0, 150)}...` : ""}</p>

            <div className="card-footer">
                <span className="likes">❤️ {likesCount}</span>
                <button className="btn-learn-more" onClick={handleCardClick}>
                    Learn More
                </button>
            </div>
        </div>
    );
}

export default CourseCard;
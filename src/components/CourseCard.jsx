import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth"
import "./CourseCard.css";
import categoryImages from "../utils/category-images";
import { categoryDisplay } from "../utils/category-display";


function CourseCard(props) {
    const { courseData } = props;

    // Initialize hooks
    const { auth } = useAuth();
    const navigate = useNavigate();
    
    const likesCount = courseData?.likes_count ?? courseData?.likes ?? 0;

    // Create the click handler
    const handleCardClick = () => {
        // Check if token exists in auth object
        if (auth && auth.token) {
            // User is logged in -> go to course page
            navigate(`/course/${courseData.id}`);
        // User is NOT logged in -> Go to Login Page
        } else {
            alert("Please log in to view course details.");
            navigate("/login")
        }
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
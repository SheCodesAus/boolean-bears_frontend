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

    return (
        <div className="course-card">
            <h2>{courseData.title}</h2>
            <p>Category: {categoryDisplay[courseData.category] || courseData.category}</p>
            <p>By: {courseData.owner}</p>
            <p>{courseData.brief_description.substring(0, 150)}...</p>
            <img 
                src={categoryImages[courseData.category]} 
                alt={courseData.category} 
                className="course-image"
                />
            <span className="likes">❤️ {likesCount}</span>

            <button className="btn-learn-more" onClick={handleCardClick}>
                Learn More
            </button>
        </div>
    );
}

export default CourseCard;
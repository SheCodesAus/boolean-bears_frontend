import { Link } from "react-router-dom";
import "./CourseCard.css";
import categoryImages from "../utils/category-images";
import { categoryDisplay } from "../utils/category-display";

function CourseCard(props) {
    const { courseData } = props;
    const courseLink = `course/${courseData.id}`;
    const likesCount = courseData?.likes_count ?? courseData?.likes ?? 0;

    return (
        <div className="course-card">
            <Link to={courseLink}>
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

            <button className="btn-learn-more">
                Learn More
            </button>
            </Link>
        </div>
    );
}

export default CourseCard;
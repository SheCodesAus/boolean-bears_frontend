import { Link } from "react-router-dom";
import "./CourseCard.css";
import categoryImages from "../utils/category-images";

function CourseCard(props) {
    const { courseData } = props;
    const courseLink = `course/${courseData.id}`;

    return (
        <div className="course-card">
            <Link to={courseLink}>
                <h2>{courseData.title}</h2>
                <p>Category: {courseData.category}</p>
                <p>By: {courseData.owner}</p>
                <p>{courseData.course_content.substring(0, 100)}...</p>
                <img 
                    src={categoryImages[courseData.category]} 
                    alt={courseData.category} 
                    className="course-image"
                />

            {/* Add the Button Here */}
            <button className="btn-learn-more">
                Learn More
            </button>
            </Link>
        </div>
    );
}

export default CourseCard;
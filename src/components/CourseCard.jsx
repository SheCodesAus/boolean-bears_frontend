import { Link } from "react-router-dom";
import "./CourseCard.css";

function CourseCard(props) {
    const { courseData } = props;

    return (
        <div className="course-card">
            <Link to={`/course/${courseData.id}`}>
                <h2>{courseData.title}</h2>
                <p>Category: {courseData.category}</p>
                <p>By: {courseData.owner}</p>
                <p>{courseData.course_content.substring(0, 100)}...</p>
            
            {/* Add the Button Here */}
            <button className="btn-learn-more">
                Learn More
            </button>
            </Link>
        </div>
    );
}

export default CourseCard;
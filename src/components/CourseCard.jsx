import { Link } from "react-router-dom";
import "./CourseCard.css";
const categoryImages = {
    "science and technology": "src/assets/arts_crafts.jpeg",
    "arts and crafts": "src//assets/arts_crafts.jpeg",
    "reading and writing": "src/assets/reading_writing.jpeg",
    "music and musical instruments": "src/assets/music.jpeg",
    "language learning": "src/assets/language.jpeg",
    "health and wellness": "src/assets/health.jpeg",
    "business and finance": "src/assets/business.jpeg",
    "personal development": "src/assets/personal_dev.jpeg",
    "other": "src/assets/other.jpeg",
};


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
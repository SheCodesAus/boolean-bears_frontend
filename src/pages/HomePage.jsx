import { allCourses } from "../data";
import CourseCard from "../components/CourseCard";
import "./HomePage.css";

function HomePage() {
    return (
        <div id="course-list">
            {allCourses.map((courseData, key) => {
                return <CourseCard key={key} courseData={courseData} />;
            })}
        </div>
    );
}

export default HomePage;
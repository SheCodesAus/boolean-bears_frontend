import useCourses from "../hooks/use-courses";
import CourseCard from "../components/CourseCard";
import "./HomePage.css";

function HomePage() {
    const { courses, isLoading, error } = useCourses();
        
        if (isLoading) {
            return (<p>loading...</p>)
        }
    
        if (error) {
            return (<p>{error.message}</p>)
        }
    
    return (
        <div id="course-list">
            {courses.map((courseData, key) => {
                return <CourseCard key={key} courseData={courseData} />;
            })}
        </div>
    );
}

export default HomePage;
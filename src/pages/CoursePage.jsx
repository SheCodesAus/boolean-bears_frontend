import { useParams } from "react-router-dom";
import useCourse from "../hooks/use-course";
import categoryImages from "../utils/category-images";

function CoursePage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useCourse hook.
    const { id } = useParams();

    // useCourse returns three pieces of info, so we need to grab them all here
    const { course, isLoading, error } = useCourse(id);
    
    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    const formatDate = (iso) => {
        if (!iso) return "";
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return "";
        return d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }); // en-GB gives DD/MM/YYYY
    };

    return (
        <div className="course-page">
            {/* 1. Course Image */}
            <div className="course-header">
                <img 
                    src={categoryImages[course.category] || categoryImages["other"]} 
                    className="course-detail-image"
                />
            </div> 

            <div className="course-content">
                {/* 2. Course Title */}
                <h1 className="course-title">{course.title}</h1>
                
                {/* 3. Category */}
                <p><strong>Category:</strong> {course.category}</p>
                
                {/* 4. By Owner */}
                <p><strong>By:</strong> {course.owner}</p>
                
                {/* 5. Maximum Students */}
                <p><strong>Maximum Students:</strong> {course.max_students}</p>

                {/* 6. Brief Description */}
                <p><strong>Brief Description</strong></p>
                <textarea>{course.brief_description}</textarea>

                {/* 7. Course Content */}
                <p><strong>Course Content</strong></p>
                <textarea>{course.course_content}</textarea>
            </div>
        </div>
    );
}

export default CoursePage;
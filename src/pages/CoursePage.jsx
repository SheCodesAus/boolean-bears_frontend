import { useNavigate, useParams } from "react-router-dom";
import useCourse from "../hooks/use-course";
import categoryImages from "../utils/category-images";
import { useAuth } from "../hooks/use-auth";
import deleteCourse from "../api/delete-course";

function CoursePage() {
    const navigate = useNavigate();
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useCourse hook.
    const { id } = useParams();
    const { auth } = useAuth();

    // useCourse returns three pieces of info, so we need to grab them all here
    const { course, isLoading, error } = useCourse(id);
    
    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    if (!course) {
        return (<p>Course not found</p>)
    }

    // Check if logged-in user is the owner
    const isOwner = auth?.username === course.owner;

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

    // Handler for update button
    const handleUpdateClick = () => {
        navigate(`/course/update/${id}`)
    };

    // Handler for delete button
    const handleDeleteClick = async () => {
        if (!window.confirm("Are you sure you want to delete this course?")) {
            return;
        }

        try {
            await deleteCourse(id, auth.token);
            alert("Course deleted successfully!");
            navigate("/")
        } catch (err) {
            console.error("Delete failed:", err);
            alert(`Failed to delete course: ${err.message}`);
        }
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
                <h3><strong>Category:</strong> {course.category}</h3>
                
                {/* 4. By Owner */}
                <h3><strong>By:</strong> {course.owner}</h3>
                
                {/* 5. Maximum Students */}
                <h3><strong>Maximum Students:</strong> {course.max_students}</h3>

                {/* 6. Brief Description */}
                <h3><strong>Brief Description</strong></h3>
                <p>{course.brief_description}</p>

                {/* 7. Course Content */}
                <div>
                    <h3><strong>Course Content</strong> </h3> 
                    <div>{course.course_content}</div>
                </div>

                {isOwner && (
                    <div className="course-actions">
                        <button 
                            className="btn-update"
                            onClick={handleUpdateClick}
                        >
                            Update Course
                        </button>
                        <button
                            className="btn-delete"
                            onClick={handleDeleteClick}
                        >
                            Delete Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoursePage;
import { useParams} from "react-router-dom";
import useCourse from "../hooks/use-course";

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
        <div>
            <h1 className="underline">{course.title}</h1>
            <h3 className="text-center">
                Created by: {course.owner} on {formatDate(course.created_at)}
            </h3>
            <h3 className="text-center">{course.course_content}</h3>
            {course.image && (
            <div>
                <img src={course.image} alt={course.title} />
            </div>
            )}
        </div>
    );
}

export default CoursePage;
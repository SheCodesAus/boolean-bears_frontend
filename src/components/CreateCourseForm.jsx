import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postCreateCourse from "../api/post-createcourse.js";
import { useAuth } from "../hooks/use-auth.js";

function CreateCourseForm() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [courseform, setCourseform] = useState({
        title: "",
        brief_description: "",
        course_content: "",
        category: "",
        max_students: "",
    });

    useEffect(() => {
        if (!auth?.token) {
            navigate("/login");
        }
    }, [auth, navigate]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClickChange = (event) => {
        const { id, value } = event.target;
        setCourseform(prev => ({ ...prev, [id]: value }));
    };

    const handleClickSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        // basic validation
        if (!courseform.title || !courseform.brief_description || !courseform.category) {
            setError("Title, description and category are required.");
            return;
        }

        const newcoursepayload = {
            title: courseform.title,
            brief_description: courseform.brief_description,
            course_content: courseform.course_content,
            category: courseform.category,
            max_students: Number(courseform.max_students),
            is_open: true
        };

        setLoading(true);
        try {
            const created = await postCreateCourse(newcoursepayload, auth?.token);
            // navigate to created course page or home
            navigate(`/course/${created.id}`);
        } catch (err) {
            console.error(err);
            setError(err?.message || "Failed to create course");
        } finally {
            setLoading(false);
        }
    };

    return (
    <form>
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        {loading && <p>Creating course...</p>}
        
        <div>
            <label htmlFor="title">Title:</label>
            <input 
                type="text"
                id="title"
                placeholder="Create course title"
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="brief_description">Description of course:</label>
            <input 
                type="text" 
                id="brief_description" 
                placeholder="Enter brief description of course, max 500 char"
                onChange={handleClickChange}
                required
            />
        </div>
        <div>
            <label htmlFor="category">Category:</label>
            <select 
                id="category" 
                onChange={handleClickChange}
                required
            >
                <option value="">--Please choose an option--</option>
                <option value="science and technology">Science and Technology</option>
                <option value="arts and crafts">Arts and Crafts</option>
                <option value="reading and writing">Reading and Writing</option>
                <option value="music and musical instruments">Music and Musical Instruments</option>
                <option value="language learning">Language Learning</option>
                <option value="health and wellness">Health and Wellness</option>
                <option value="business and finance">Business and Finance</option>
                <option value="personal development">Personal Development</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div>
            <label htmlFor="course_content">Course Content:</label>
            <textarea 
                id="course_content" 
                placeholder="Enter detailed course content"
                onChange={handleChange}
                rows="6"
            />
        </div>
        <div>
            <label htmlFor="max_students">Maximum Students:</label>
            <input 
                type="number" 
                id="max_students" 
                placeholder="Enter maximum number of students"
                onChange={handleChange}
                min="1"
                required
            />
        </div>
        <button type="submit" onClick={handleSubmit}>Create a New Course</button>
    </form>
    );
}

export default CreateCourseForm;
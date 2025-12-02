import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postCreateCourse from "../api/post-createcourse.js";
import { useAuth } from "../hooks/use-auth.js";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import "./CreateCourseForm.css";

function CreateCourseForm() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [courseform, setCourseform] = useState({
        title: "",
        brief_description: "",
        course_content: "",
        category: "",
        max_students: "",
        image: null,
    });

    // Initialize Tiptap editor
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Start writing your course content...</p>',
        onUpdate: ({ editor }) => {
            // Update course_content whenever editor changes
            const html = editor.getHTML();
            setCourseform(prev => ({ ...prev, course_content: html }));
        },
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

        const formData = new FormData();
        formData.append("title", courseform.title);
        formData.append("brief_description", courseform.brief_description);
        formData.append("course_content", courseform.course_content);
        formData.append("category", courseform.category);
        formData.append("max_students", courseform.max_students);
        formData.append("is_open", true);
        if (courseform.course_files) {
            formData.append("course_files", courseform.course_files);
        }
        setLoading(true);
        try {
            const created = await postCreateCourse(formData, auth?.token);
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
        <form className="form-grid create-course-form" onSubmit={handleClickSubmit}>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {loading && <p>Creating course...</p>}

            <div className="form-field">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Create course title"
                    onChange={handleClickChange}
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="brief_description">Description of course</label>
                <input
                    type="text"
                    id="brief_description"
                    placeholder="Enter brief description of course, max 500 char"
                    onChange={handleClickChange}
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    onChange={handleClickChange}
                    required
                >
                    <option value="">--Please choose an option--</option>
                    {/* existing options unchanged */}
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

            <div className="form-field">
                <label htmlFor="course_content">Course Content</label>
                <EditorContent editor={editor} className="tiptap" />
            </div>

            <div className="form-field">
                <label htmlFor="max_students">Maximum Students</label>
                <input
                    type="number"
                    id="max_students"
                    placeholder="Enter maximum number of students"
                    onChange={handleClickChange}
                    min="1"
                    required
                />
            </div>

            <div className="form-actions">
                <button type="submit" disabled={loading} className="primary-btn">
                    {loading ? "Creating..." : "Submit New Course"}
                </button>
            </div>

            {error && (
                <div className="error" role="alert">
                    {error}
                </div>
            )}
        </form>
    );
}

export default CreateCourseForm;
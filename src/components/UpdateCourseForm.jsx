import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import putCourse from "../api/put-course";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function UpdateCourseForm({ existingData, setUpdateMessage }) {
    const navigate = useNavigate();
    const { auth } = useAuth();

    // 1. Initialize State 
    const [courseForm, setCourseForm] = useState({
        title: existingData.title || "",
        brief_description: existingData.brief_description || "",
        course_content: existingData.course_content || "",
        category: existingData.category || "",
        max_students: String(existingData.max_students || ""), // Convert numbers to strings for input fields
    });

    // Initialize Tiptap editor
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Start writing your course content...</p>',
        onUpdate: ({ editor }) => {
            // Update course_content whenever editor changes
            const html = editor.getHTML();
            setCourseForm(prev => ({ ...prev, course_content: html }));
        },
    });

    useEffect(() => {
        if (editor && existingData?.course_content) {
            editor.commands.setContent(existingData.course_content);
        }
    }, [editor, existingData]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // 2. Handle Change
    const handleClickChange = (event) => {
        const { id, value } = event.target;
        setCourseForm((prev) => ({ ...prev, [id]: value }));
    };

    // 3. Handle Submit
    const handleClickSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setUpdateMessage(null); // Clear previous success messages
        setLoading(true);

        // Basic Validation
        if (!courseForm.title || !courseForm.brief_description || !courseForm.category) {
            setError("Title, description, and category are required.");
            setLoading(false);
            return;
        }

        try {
            // Prepare payload (Convert string back to number)
            const updatePayload = {
                title: courseForm.title,
                brief_description: courseForm.brief_description,
                course_content: courseForm.course_content,
                category: courseForm.category,
                max_students: Number(courseForm.max_students),
                owner: existingData.owner, // Preserve owner
                is_open: existingData.is_open, // Preserve open status
            };

            const courseId = existingData.id;
            
            // Call API
            const updatedCourse = await putCourse(courseId, updatePayload, auth.token);

            // Success feedback
            setUpdateMessage(`Course "${updatedCourse.title}" updated successfully!`);
            
            // Redirect to the detail page
            navigate(`/course/${updatedCourse.id}`);

        } catch (err) {
            console.error("Update failed", err);
            setError(err.message || "Failed to update course.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleClickSubmit} className="update-course-form">
            {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
            
            <div>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    value={courseForm.title} 
                    onChange={handleClickChange} 
                    required 
                />
            </div>
            
            <div>
                <label htmlFor="brief_description">Brief Description:</label>
                <textarea 
                    id="brief_description" 
                    value={courseForm.brief_description}
                    placeholder="Enter brief description of course, max 500 char" 
                    onChange={handleClickChange} 
                    rows="3"
                    required 
                />
            </div>

            <div>
                <label htmlFor="course_content">Detailed Content:</label>
                <EditorContent editor={editor} />
            </div>
            
            <div>
                <label htmlFor="category">Category:</label>
                <select id="category" value={courseForm.category} onChange={handleClickChange} required>
                    <option value="">--Select Category--</option>
                    <option value="science and technology">Science and Technology</option>
                    <option value="arts and crafts">Arts and Crafts</option>
                    <option value="reading and writing">Reading and Writing</option>
                    <option value="music and musical instruments">Music and Musical Instruments</option>
                    <option value="languages">Languages</option>
                    <option value="health and wellness">Health and Wellness</option>
                    <option value="business and finance">Business and Finance</option>
                    <option value="personal development">Personal Development</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="max_students">Maximum Students:</label>
                <input 
                    type="number" 
                    id="max_students" 
                    value={courseForm.max_students} 
                    onChange={handleClickChange} 
                    min="1"
                    required 
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Updates"}
            </button>
        </form>
    );
}

export default UpdateCourseForm;
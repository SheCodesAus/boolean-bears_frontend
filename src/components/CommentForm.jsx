import { useState } from "react"; 
import { useAuth } from "../hooks/use-auth";
import postComment from "../api/post-comment";


function CommentForm({ courseId, onCommentAdded }) {
    const { auth } = useAuth(); // 1. Get logged-in user

    // 2. Local state for form
    const[comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 3. Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Don't reload page, stops browser default (page reload)
        setError(null);

        // 4. Validation
        if (!comment.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        setLoading(true);
        try {
            // 5. Prepare data
            const commentData = {
                content: comment,
            };

            // 6. Post to API
            const newComment = await postComment(courseId, commentData, auth.token);

            // 7. Clear form
            setComment("");

            // 8. Notify parent component
            if (onCommentAdded) {
                onCommentAdded(newComment);
            }
        } catch (err) {
            console.error("Failed to post comment:", err);
            setError(err.message || "Failed to post comment")
        } finally {
            setLoading(false);
        }
    };

    // 10. Render form
    return (
        <form onSubmit={handleSubmit} className="comment-form"> 
            <h3>Comment</h3>
            {error && <p>{error}</p>}

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="leave a comment..."
                rows="4"
                required
                disabled={loading}
            />

            <button type="submit" disabled={loading || !comment.trim()}>
                {loading ? "Posting...": "Post Comment"}
            </button>
        </form>
    );
}

export default CommentForm;
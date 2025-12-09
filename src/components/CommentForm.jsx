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

            // Ensure UI has author and timestamp even if backend omits them
            const hydratedComment = {
                ...newComment,
                author: newComment.author ?? auth.username ?? "You",
                created_at: newComment.created_at ?? new Date().toISOString(),
            };

            // 7. Clear form
            setComment("");

            // 8. Notify parent component
            if (onCommentAdded) {
                onCommentAdded(hydratedComment);
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
        <form onSubmit={handleSubmit} className="comment-form" style={{ width: "100%", maxWidth: "100%" }}> 
            <h3>Leave a Comment</h3>
            {error && <p>{error}</p>}

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="leave a comment..."
                rows="4"
                required
                disabled={loading}
                style={{ width: "100%" }}
            />

            <button type="submit" disabled={loading || !comment.trim()} className="btn-post-comment">
                {loading ? "Posting...": "Post Comment"}
            </button>
        </form>
    );
}

export default CommentForm;
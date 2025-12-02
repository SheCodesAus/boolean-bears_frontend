function CommentList({ comments, isLoading, error }) {
    // 1. Loading state - show spinner
    if (isLoading) {
        return <p>Loading comments...</p>;
    }
    // 2. Error state - show error message
    if (error) {
        return <p>Error loading comments: {error.message}</p>;
    }
    // 3. Empty state - show helpful message
    if (!comments || comments.length === 0) {
        return (
            <div>
                <p>No comments yet. Be the first!</p>
            </div>
        );
    }

    // 4. Helper function for formatting dates
    const formatDate = (iso) => {
        if (!iso) return "";
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return "";
        return d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }); 
    };

    // 5. Main render - map over comments
    return (
        <div className="comment-list">
            <h3>Comments ({comments.length})</h3>
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                        <span className="comment-auth">{comment.author}</span>
                        <span className="comment-date">{formatDate(comment.created_at)}</span>
                    </div>
                    <div className="comment-content">
                        <p>{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommentList;
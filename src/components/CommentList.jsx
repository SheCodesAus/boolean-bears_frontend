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
            {comments.map((comment) => {
                const username = comment.author || comment.username || "Anonymous";
                const rating = comment.rating ?? comment.user_rating; // optional
                const avatarSrc = comment.avatar_url || "/avatar-default.svg";
                return (
                    <div key={comment.id ?? `${username}-${comment.created_at ?? Math.random()}`} className="comment-item" style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "12px", alignItems: "start", padding: "12px 0", borderBottom: "1px solid #eee" }}>
                        <img src={avatarSrc} alt="avatar" width={48} height={48} style={{ borderRadius: "50%", objectFit: "cover" }} />
                        <div>
                            <div className="comment-header" style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                                <span className="comment-auth" style={{ fontWeight: 600 }}>{username}</span>
                                {rating != null && (
                                    <span className="comment-rating" title="User rating" style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#928b3b" }}>
                                        <span style={{ fontSize: "16px" }}>⭐</span>
                                        <span>{Number(rating).toFixed(1)}</span>
                                    </span>
                                )}
                                <span className="comment-date" style={{ color: "#6b7280" }}>{formatDate(comment.created_at)}</span>
                            </div>
                            <div className="comment-content">
                                <p style={{ margin: 0 }}>{comment.content}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CommentList;
import React from 'react';

function CommentList({ comments, isLoading, error }) {
    
    // 1. Loading State
    if (isLoading) {
        return <p className="text-muted">Loading comments...</p>;
    }

    // 2. Error State
    if (error) {
        return <p className="text-muted">Error loading comments.</p>;
    }

    // 3. Empty State (Uses the CSS class .empty-comments)
    if (!comments || comments.length === 0) {
        return (
            <div className="empty-comments">
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
        }); 
    };

    // 5. Main render
    return (
        <ul className="comment-list">
            {comments.map((comment) => (
                <li key={comment.id} className="comment-item">
                    
                    {/* Header: Name & Date */}
                    <div className="comment-header">
                        {/* Checked: using 'commenter' || 'author' to be safe */}
                        <span className="comment-author">
                            {comment.commenter || comment.author || "Anonymous"}
                        </span>
                        
                        <span className="comment-date">
                            {formatDate(comment.date_created || comment.created_at)}
                        </span>
                    </div>

                    {/* Checked: using 'body' || 'content' to be safe */}
                    <p className="comment-text">
                        {comment.body || comment.content}
                    </p>
                </li>
            ))}
        </ul>
    );
}

export default CommentList;
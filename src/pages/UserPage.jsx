import {Link, Outlet, useParams} from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import useUser from "../hooks/use-user";
import CourseCard from "../components/CourseCard";
// import "./UserPage.css"; // UNCOMMENT THIS

function UserPage() {
    const { id } = useParams();
    const { user, isLoading, error } = useUser(id);
    
    if (isLoading) {
        return (<p>Loading user...</p>);
    }

    if (error) {
        return (<p>{error.message}</p>);
    }

    if (!user) {
        return (<p>User not found</p>);
    }

    const joinDate = new Date(user.date_joined).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Badge logic based on courses created
    const coursesCount = user.courses_created?.length || 0;
    
    const getBadge = () => {
        if (coursesCount >= 20) return { icon: "👑", title: "Legend", color: "#FFD700" };
        if (coursesCount >= 10) return { icon: "⭐", title: "Expert", color: "#E74C3C" };
        if (coursesCount >= 5) return { icon: "🎓", title: "Educator", color: "#3498DB" };
        if (coursesCount >= 1) return { icon: "🌱", title: "Creator", color: "#2ECC71" };
        return { icon: "👤", title: "Learner", color: "#95A5A6" };
    };

    const badge = getBadge();

    return (
        <div className="user-page">
            <div className="user-header">
                <h1>{user.username}'s Profile</h1>
                <div className="user-badge" style={{ borderColor: badge.color }}>
                    <span className="badge-icon">{badge.icon}</span>
                    <span className="badge-title" style={{ color: badge.color }}>
                        {badge.title}
                    </span>
                </div>
                <p className="join-date">Member since {joinDate}</p>
            </div>

            <div className="user-stats">
                <div className="stat">
                    <span>Courses Created = </span>
                    <strong>{coursesCount}</strong>
                </div>
                <div className="stat">
                    <span>Courses Liked = </span>
                    <strong>{user.courses_liked?.length || 0}</strong>
                </div>
            </div>

            {/* Achievement Progress */}
            <div className="achievement-progress">
                <h3>Achievement Progress</h3>
                <div className="badges-container">
                    {coursesCount >= 1 && (
                        <div className="badge-item earned">
                            <span className="badge-icon">🌱</span>
                            <span className="badge-name">Your First Course!</span>
                            <span className="badge-requirement"> - Made 1 course</span>
                        </div>
                    )}
                    {coursesCount >= 5 && (
                        <div className="badge-item earned">
                            <span className="badge-icon">🎓</span>
                            <span className="badge-name">Educator</span>
                            <span className="badge-requirement">5+ courses</span>
                        </div>
                    )}
                    {coursesCount >= 10 && (
                        <div className="badge-item earned">
                            <span className="badge-icon">⭐</span>
                            <span className="badge-name">Expert</span>
                            <span className="badge-requirement">10+ courses</span>
                        </div>
                    )}
                    {coursesCount >= 20 && (
                        <div className="badge-item earned">
                            <span className="badge-icon">👑</span>
                            <span className="badge-name">Legend</span>
                            <span className="badge-requirement">20+ courses</span>
                        </div>
                    )}
                </div>
            </div>

            <section className="user-courses-created">
                <h2>Courses Created $a neat little grid of created courses$</h2>
                {user.courses_created && user.courses_created.length > 0 ? (
                    <div className="course-grid">
                        {user.courses_created.map((course) => (
                            <CourseCard key={course.id} courseData={course} />
                        ))}
                    </div>
                ) : (
                    <p>No courses created yet.</p>
                )}
            </section>

            <hr />

            <section className="user-courses-liked">
                <h2>Courses Liked $or maybe something like favourite courses$  </h2>
                {user.courses_liked && user.courses_liked.length > 0 ? (
                    <ul className="liked-courses-list">
                        {user.courses_liked.map((course) => (
                            <li key={course.id}>
                                <Link to={`/course/${course.id}`}>
                                    {course.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No courses liked yet.</p>
                )}
            </section>
        </div>
    );
}

export default UserPage;
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Circle, Users, PenLine, Award, LogIn, UserPlus, PlusCircle } from "lucide-react";
import logoUrl from "../../img/yarningcircles_logo_transparent.png";
import categoryImages from "../utils/category-images";
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    const scrollCarousel = (direction) => {
        const el = carouselRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.9;
        el.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
    };

    return (
        <div className="landing-root">
        {/* Hero */}
        <section className="hero">
            <div className="hero-text">
            <div className="hero-eyebrow">Yarning Circles · Boolean Bears</div>
            <h1>Learn together, in circle.</h1>
            <p>
                A peer-led platform for accessible, written courses where everyone can
                contribute, connect, and grow. Built with community and inclusivity at heart.
            </p>
            <div className="hero-actions">
                <button className="btn primary" onClick={() => navigate("/courses")}>Browse Courses</button>
            </div>
            </div>
            <div className="hero-art" aria-hidden>
            <img src={logoUrl} alt="Yarning Circles" className="hero-logo" />
            </div>
        </section>

        {/* Mission */}
        <section className="mission">
            <h2>Our Mission</h2>
                <p>
                    We aim to create a dynamic and accessible peer-learning platform that empowers
                    people to build knowledge, develop new skills, and learn collaboratively in a supportive,
                    culturally respectful environment. At the heart of Yarning Circles is the belief that learning
                    thrives through conversation, storytelling, and community. By centring written-first content,
                    clear structure, and inclusive language, we make it easier for learners of all abilities to
                    engage—online and at their own pace.
                </p>
                <p>
                    Our vision is a space where anyone can confidently share what they know, explore new topics,
                    and connect with others through shared interests. Users create and participate in courses across
                    predefined categories, helping others discover content that matches their learning preferences.
                    Moderation keeps categories organised, improves discoverability, and ensures that contributions
                    remain welcoming and safe. As the platform grows, optional milestones and badges will celebrate
                    progress without introducing pressure or competition—highlighting personal growth and collective care.
                </p>
        </section>

        {/* Features */}
        <section className="features">
                <div className="feature-card">
            <Users className="icon"/> 
            <h3>Community-led</h3>
                    <p>
                        Learning is richer together. Our circles prioritise respectful dialogue and
                        peer-to-peer support so people can share lived experience, tips, and
                        perspectives. Moderators guide category creation and keep things organised,
                        ensuring discoverability without gatekeeping.
                    </p>
            </div>
                <div className="feature-card">
            <PenLine className="icon"/>
            <h3>Written Content</h3>
                    <p>
                        Content is written-first for clarity and accessibility, supported by images
                        and simple structure. Plain language, headings, and hints help users with
                        different levels of digital literacy read, revisit, and learn at their own pace.
                    </p>
            </div>
                <div className="feature-card">
            <Circle className="icon"/>
            <h3>Yarning Circles</h3>
                    <p>
                        Inspired by Aboriginal yarning practices, circles emphasise listening,
                        connection, and shared responsibility. We reflect these values by making
                        space for diverse voices and building a culture of consent, care, and
                        collaboration across topics and skills.
                    </p>
            </div>
                <div className="feature-card">
            <Award className="icon"/>
            <h3>Progress & Badges</h3>
                    <p>
                        Celebrate learning journeys with optional milestones and badges. Mark
                        completion, gather encouragement, and see your growth over time—without
                        pressure or competition getting in the way of community and inclusion.
                    </p>
            </div>
        </section>

        {/* Categories */}
        <section className="categories">
            <h2>Explore Categories</h2>
            <div className="cat-wrap">
                <button className="cat-arrow prev" aria-label="Previous" onClick={() => scrollCarousel("prev")}>‹</button>
                <div className="cat-carousel" role="region" aria-label="Course categories" ref={carouselRef}>
                {Object.entries(categoryImages).slice(0, 9).map(([key, src]) => (
                    <div key={key} className="cat-item" aria-label={key}>
                    <img src={src} alt={key} />
                    <div className="cat-label">{key}</div>
                    </div>
                ))}
                </div>
                <button className="cat-arrow next" aria-label="Next" onClick={() => scrollCarousel("next")}>›</button>
            </div>
        </section>

        {/* Culture & Accessibility */}
        <section className="culture">
            <h2>Culture & Accessibility</h2>
            <p>
                Our approach is informed by Australian Aboriginal yarning circles—learning through
                story, listening, and respectful exchange. We strive to embody these values across
                the platform experience so people feel welcome to share knowledge and learn together.
            </p>
            <p>
                To reflect this, our design and product choices emphasise four pillars of learning:
                connection, respect, reciprocity, and responsibility. Each pillar guides both how content
                is created and how the community engages with it.
            </p>
            <ul className="pill-list pillars">
                <li className="pillar-connection">Connection</li>
                <li className="pillar-respect">Respect</li>
                <li className="pillar-reciprocity">Reciprocity</li>
                <li className="pillar-responsibility">Responsibility</li>
            </ul>
        </section>

        {/* CTA Banner */}
        <section className="cta">
            <div className="cta-text">
                <div className="cta-eyebrow">Yarning Circles</div>
                <h2>Start a circle today</h2>
                <p>
                    Share what you know, invite others, and grow a community around
                    your topic. Written-first, welcoming, and easy to get started.
                </p>
            </div>
            <div className="cta-actions">
                <button className="cta-primary" onClick={() => navigate("/createcourse")}><PlusCircle size={18}/> Create a Course</button>
            </div>
        </section>
        </div>
    );
}

export default LandingPage;

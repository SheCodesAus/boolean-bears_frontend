import React from "react";
import arsenImg from "../assets/Arsen.jpg";
import emilyImg from "../assets/Emily.jpg";
import jessImg from "../assets/Jessica.jpg";
import qinImg from "../assets/Qin.jpg";
import stephImg from "../assets/Steph.jpg";
import "./AboutPage.css";
import { Github, Linkedin } from "lucide-react";

const teamMembers = [
    {
        name: "Arsen ILHAN",
        role: "Backend Wizard & Adventurous Learner",
        image: arsenImg,
        bio: "Arsen brings backend mastery and a fearless love of learning, eagerly jumping into new challenges and supporting her team at every turn.",
        github: "https://github.com/arsenharris",
        linkedin: "https://www.linkedin.com/in/arsenilhan/",
    },
    {
        name: "Emily Sheridan",
        role: "Full Stack Developer & Customer Experience Specialist",
        image: emilyImg,
        bio: "Emily blends full-stack development with strong customer-focused product thinking, turning user stories and journey maps into intuitive digital solutions.",
        github: "https://github.com/Emily2955",
        linkedin: "https://www.linkedin.com/",
    },
    {
        name: "Jessica Keating",
        role: "Full Stack Developer & Digital Project Manager",
        image: jessImg,
        bio: "Jessica brings together technical development and project management experience to create smooth, user-centred digital experiences.",
        github: "https://github.com/jess-keating",
        linkedin: "https://www.linkedin.com/in/jessica-keating/",
    },
    {
        name: "Qin Shen 申勤",
        role: "Full Stack Developer & User Flow Architect",
        image: qinImg,
        bio: "Qin blends full-stack engineering with user-flow architecture, using her systems mindset and sharp problem-solving skills to turn complex interactions into smooth, intuitive product journeys.",
        github: "https://github.com/qinshen-n",
        linkedin: "https://www.linkedin.com/in/qin-sharon-shen/",
    },
    {   
        name: "Steph Chan",
        role: "Full Stack Developer & Pebble Enthusiast",
        image: stephImg,
        bio: "Steph is a collaborative full-stack developer who builds with care, clarity, and a well-curated rock collection.",
        github: "https://github.com/stephanite9",
        linkedin: "https://www.linkedin.com/in/stephanie-chan-0aa3a1176/",
    }
];

function About() {
    return (
        <>
        <header className="about-hero"> 
            <div className="about-hero-content">
                <h1>About Yarning Circles</h1>
                <p>Sharing, Learning & Respectful Conversations</p>
            </div>
        </header>
            <div className="about-content">
                <section className="about-section">
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

                <section className="about-section">
                    <h2>Our Team</h2>
                    <div className="team-container">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-card">
                                <img src={member.image} alt={member.name} />
                                <h3>{member.name}</h3>
                                <h3>{member.role}</h3>
                                <p>{member.bio}</p>
                                {(member.github || member.linkedin) && (
                                    <div className="social-links">
                                        {member.github && (
                                            <a
                                                className="icon-link github"
                                                href={member.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`View ${member.name}'s GitHub profile`}
                                            >
                                                <Github size={18} />
                                            </a>
                                        )}
                                        {member.linkedin && (
                                            <a
                                                className="icon-link linkedin"
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`View ${member.name}'s LinkedIn profile`}
                                            >
                                                <Linkedin size={18} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="about-section journey">
                    <h2>Our Journey</h2>
                    <div className="timeline-container">
                        <div className="timeline-item">
                            <div className="timeline-circle">1</div>
                            <div className="timeline-content">
                                <h3>Week 1</h3>
                                <p>
                                    MVP development completed —during this time we also worked closely with our client to draft a
                                    prioritized list of additional features and improvements to include
                                    in the next phase. 
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-circle">2</div>
                            <div className="timeline-content">
                                <h3>Week 2</h3>
                                <p>
                                    Wireframes and UI design were finalised — we established a clear
                                    information hierarchy, consistent component patterns, and accessibility
                                    considerations. These designs guided component development and ensured
                                    a cohesive visual language across the app.
                                </p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-circle">3</div>
                            <div className="timeline-content">
                                <h3>Week 3</h3>
                                <p>
                                    Backend development focused on building the API endpoints, data models,
                                    and authentication flows. We prioritised reliability and simple, well-documented
                                    routes so the frontend could iterate quickly and the team could test with
                                    realistic data early.
                                </p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-circle">4</div>
                            <div className="timeline-content">
                                <h3>Week 4</h3>
                                <p>
                                    Frontend development integrated the UI with backend APIs, refined interactions,
                                    and focused on responsiveness. We completed key flows such as course creation,
                                    enrollment, and commenting, and began polishing accessibility and performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-section join-us">
                    <h2>Join Us</h2>
                    <p>
                        Whether you are here to learn, teach, or collaborate, Yarning Circles welcomes you.
                        Join our community to discover thoughtfully curated courses, share your knowledge,
                        and connect with peers who care about respectful, culturally-aware learning.
                        We value contribution, accessibility, and steady progress — there are many ways to
                        get involved, from creating a course to leaving supportive feedback.
                    </p>
                    <div className="join-actions">
                        <a href="/courses" className="primary-btn" role="button">Explore Courses</a>
                        <a href="/create-account" className="primary-btn secondary" role="button">Create an Account</a>
                    </div>
                </section>
            </div>

</>
    );
}

export default About;
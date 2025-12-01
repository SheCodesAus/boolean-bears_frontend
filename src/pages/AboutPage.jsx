import React from "react";
import "./About.css";

const teamMembers = [
    {
        name: "Arsen ILHAN",
        role: "Backend Wizard & Adventurous Learner",
        image: "src/assets/Arsen.jpg",
        bio: "Arsen brings backend mastery and a fearless love of learning, eagerly jumping into new challenges and supporting her team at every turn.",
    },
    {
        name: "Emily Sheridan",
        role: "Full Stack Developer & Customer Experience Specialist",
        image: "src/assets/Emily.jpg",
        bio: "Emily blends full-stack development with strong customer-focused product thinking, turning user stories and journey maps into intuitive digital solutions.",
    },
    {
        name: "Jessica Keating",
        role: "Full Stack Developer & Digital Project Manager",
        image: "src/assets/Jessica.jpg",
        bio: "Jessica brings together technical development and project management experience to create smooth, user-centred digital experiences.",
    },
    {
        name: "Qin Shen",
        role: "Full Stack Developer & User Flow Architect",
        image: "src/assets/Qin.jpg",
        bio: "Qin blends full-stack engineering with user-flow architecture, using her systems mindset and sharp problem-solving skills to turn complex interactions into smooth, intuitive product journeys.",
    },
    {   
        name: "Steph Chan",
        role: "Full Stack Developer & Pebble Enthusiast",
        image: "src/assets/Steph.jpg",
        bio: "Steph is a collaborative full-stack developer who builds with care, clarity, and a well-curated rock collection.",
    }
];

function About() {
    return (
        <>
        <header className="about-hero"> 
            <div className="about-hero-content">
                <h1>About Yarning Circles</h1>
                <p>Connecting learners, sharing knowledge, and growing together.</p>
            </div>
        </header>
            <section className="about-section">
                <h2>Our Mission</h2>
                <p>
                    At Yarning Circles, we believe learning is most effective when it’s collaborative. 
                    Our mission is to provide a platform where learners can explore courses, share insights, 
                    and support each other in a community-focused environment.
                </p>
            </section>

            <section className="about-section">
                <h2>Our Approach</h2>
                <p>
                    Each course is designed to encourage discussion, practical application, and peer feedback. 
                    Learners can participate in group activities, ask questions, and develop skills at their own pace.
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
                            <p>MVP development completed</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-circle">2</div>
                        <div className="timeline-content">
                            <h3>Week 2</h3>
                            <p>Wireframe and UI design finalized</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-circle">3</div>
                        <div className="timeline-content">
                            <h3>Week 3</h3>
                            <p>Backend Development</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-circle">4</div>
                        <div className="timeline-content">
                            <h3>Week 4</h3>
                            <p>Frontend development</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <h2>Join Us</h2>
                <p>
                    Whether you are here to learn, teach, or collaborate, Yarning Circles welcomes you. 
                    Explore our courses and be part of a vibrant learning community.
                </p>
            </section>

</>
    );
}

export default About;
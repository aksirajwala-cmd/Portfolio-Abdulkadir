import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { PROFILE, PROJECTS, SKILLS } from "./config";

const Icon = ({ name, size = 20 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const paths = {
    github: (
      <>
        <path d="M15 22v-4.1c.1-1.2-.3-2-1-2.5 3.2-.4 6.5-1.6 6.5-7A5.5 5.5 0 0 0 19 4.6 5.1 5.1 0 0 0 18.9 1S17.7.6 15 2.5a13.4 13.4 0 0 0-6 0C6.3.6 5.1 1 5.1 1A5.1 5.1 0 0 0 5 4.6a5.5 5.5 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.5 7-.7.5-1.1 1.3-1 2.5V22" />
        <path d="M8 19c-3 .9-3-1.5-4.2-1.8" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    map: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    external: (
      <>
        <path d="M14 5h5v5" />
        <path d="m10 14 9-9" />
        <path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    code: (
      <>
        <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
      </>
    ),
    terminal: (
      <>
        <path d="m5 7 4 5-4 5" />
        <path d="M12 17h7" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z" />
        <path d="M4 5.5v16" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
  };
  return <svg {...common}>{paths[name]}</svg>;
};

function App() {
  const [active, setActive] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [error, setError] = useState("");

  const nav = [
    "about",
    "skills",
    "projects",
    "experience",
    "education",
    "contact",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    nav.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (formState === "loading") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !subject || !message) {
      setError("Please complete all required fields.");
      setFormState("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setFormState("error");
      return;
    }
    setError("");
    setFormState("loading");
    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("email", email);
      payload.append("subject", subject);
      payload.append("message", message);
      payload.append("_subject", `Portfolio message from ${name}: ${subject}`);
      payload.append("_captcha", "false");
      payload.append("_template", "table");
      const res = await fetch(PROFILE.formServiceEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      if (!res.ok) throw new Error("request failed");
      setFormState("success");
      form.reset();
    } catch {
      setError(
        "Something went wrong while sending your message. Please try again or contact me directly by email.",
      );
      setFormState("error");
    }
  };

  return (
    <>
      <header className="topbar">
        <button
          className="brand"
          onClick={() => go("about")}
          aria-label="Go to top"
        >
          <span className="brand-mark">A</span>
          <span>Abdulkadir Mehfuz Sirajwala</span>
        </button>
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        >
          {<Icon name={mobileOpen ? "close" : "menu"} />}
        </button>
        <nav
          className={mobileOpen ? "nav open" : "nav"}
          aria-label="Primary navigation"
        >
          {nav.map((id) => (
            <button
              key={id}
              className={active === id ? "active" : ""}
              onClick={() => go(id)}
            >
              {id[0].toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <main>
        <section id="about" className="section hero-section">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">JAVA BACKEND DEVELOPER</p>
              <h1>
                Abdulkadir
                <br />
                <span>Mehfuz Sirajwala</span>
              </h1>
              <p className="hero-role">
                Software Engineer · MCA Cloud Computing
              </p>
              <p className="hero-copy">
                I build practical backend applications with Java, Spring Boot,
                REST APIs and MySQL, with a focus on clean architecture and
                reliable data-driven workflows.
              </p>
              <div className="actions">
                <button className="btn primary" onClick={() => go("projects")}>
                  View Projects <Icon name="arrow" size={17} />
                </button>
                <a
                  className="btn ghost"
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="github" size={17} /> GitHub
                </a>
                <a
                  className="btn ghost"
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="linkedin" size={17} /> LinkedIn
                </a>
                <a
                className="btn ghost"
               href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </div>
          </div>
          <aside className="hero-card">
              <div className="code-window">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <pre>
                  <span className="syntax-purple">class</span>{" "}
                  <span className="syntax-yellow">Developer</span> {"{"}
                  {`\n  `}
                  <span className="syntax-purple">String</span> role ={" "}
                  <span className="syntax-green">"Backend"</span>;{`\n  `}
                  <span className="syntax-purple">String</span> stack ={" "}
                  <span className="syntax-green">"Java + Spring"</span>;{`\n  `}
                  <span className="syntax-purple">String</span> database ={" "}
                  <span className="syntax-green">"MySQL"</span>;{`\n  `}
                  <span className="syntax-purple">boolean</span> learning ={" "}
                  <span className="syntax-blue">true</span>;{`\n`}
                  {"}"}
                </pre>
              </div>
              <div className="hero-meta">
                <span>
                  <Icon name="map" size={16} /> {PROFILE.location}
                </span>
                <span>
                  <Icon name="code" size={16} /> Open to software roles
                </span>
              </div>
            </aside>
          </div>
          <div className="social-row">
            <span>CONNECT</span>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Icon name="github" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" />
            </a>
            <a
              href={PROFILE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Icon name="instagram" />
            </a>
            <a href={`mailto:${PROFILE.email}`} aria-label="Email">
              <Icon name="mail" />
            </a>
          </div>
        </section>

        <section id="skills" className="section">
          <SectionHeading
            eyebrow="TECHNICAL STACK"
            title="Skills"
            text="A focused stack for building backend applications, working with relational data, and shipping maintainable software."
          />
          <div className="skill-grid">
            {SKILLS.map(([title, items]) => (
              <article className="skill-card" key={title}>
                <div className="skill-icon">
                  <Icon
                    name={
                      title === "Backend"
                        ? "code"
                        : title === "Database"
                          ? "database"
                          : title === "Tools"
                            ? "terminal"
                            : "book"
                    }
                  />
                </div>
                <h3>{title}</h3>
                <div className="chips">
                  {items.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <SectionHeading
            eyebrow="SELECTED WORK"
            title="Projects"
            text="The portfolio is deliberately project-first. Recruiters need evidence of what I can build, not a wall of buzzwords."
          />
          {PROJECTS.map((project) => (
            <article className="featured-project" key={project.title}>
              <div className="project-preview">
                <div className="browser-bar">
                  <span />
                  <span />
                  <span />
                  <small>quiz-app / dashboard</small>
                </div>
                <div className="mock-dashboard">
                  <div className="mock-side">
                    <b>QUIZ</b>
                    <span>Dashboard</span>
                    <span>Quizzes</span>
                    <span>Questions</span>
                    <span>Results</span>
                  </div>
                  <div className="mock-main">
                    <div className="mock-heading">
                      <div>
                        <small>SPRING BOOT APPLICATION</small>
                        <h3>Quiz Dashboard</h3>
                      </div>
                      <div className="mock-status">● Connected</div>
                    </div>
                    <div className="mock-cards">
                      <div>
                        <b>12</b>
                        <small>Quizzes</small>
                      </div>
                      <div>
                        <b>84</b>
                        <small>Questions</small>
                      </div>
                      <div>
                        <b>92%</b>
                        <small>Avg. Score</small>
                      </div>
                    </div>
                    <div className="mock-table">
                      <span>User registration</span>
                      <span>Authentication</span>
                      <span>Quiz workflow</span>
                      <span>Result tracking</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-label">FEATURED PROJECT</div>
                <h3>{project.title}</h3>
                <p className="project-category">{project.category}</p>
                <div className="project-block">
                  <strong>Problem solved</strong>
                  <p>{project.problem}</p>
                </div>
                <div className="project-block">
                  <strong>Key features</strong>
                  <ul>
                    {project.features.map((f) => (
                      <li key={f}>
                        <Icon name="check" size={15} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="chips">
                  {project.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    GitHub <Icon name="external" size={15} />
                  </a>
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      Live demo <Icon name="external" size={15} />
                    </a>
                  ) : (
                    <span className="coming">Live demo: not available yet</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section id="experience" className="section split-section">
          <div>
            <SectionHeading
              eyebrow="REAL EXPERIENCE"
              title="Experience"
              text="Only verified experience belongs here. No invented responsibilities, no inflated titles."
            />
          </div>
          <article className="timeline-card">
            <span className="timeline-dot" />
            <div>
              <p className="timeline-date">2-MONTH INTERNSHIP</p>
              <h3>Enlighten Infosystems</h3>
              <p>
                Worked on an earlier Python/Flask quiz web portal during the
                internship. That project became the foundation for the current
                Spring Boot rebuild.
              </p>
              <div className="chips">
                <span>Python</span>
                <span>Flask</span>
                <span>MySQL</span>
                <span>Web Application</span>
              </div>
            </div>
          </article>
        </section>

        <section id="education" className="section">
          <SectionHeading
            eyebrow="EDUCATION"
            title="Education"
            text="Academic background supporting a software engineering path with a current focus on cloud computing."
          />
          <div className="education-list">
            <article>
              <div className="edu-year">CURRENT</div>
              <div>
                <h3>Master of Computer Applications (MCA)</h3>
                <p>Parul University · Cloud Computing specialization</p>
                <span>1st Semester</span>
              </div>
            </article>
            <article>
              <div className="edu-year">COMPLETED</div>
              <div>
                <h3>Bachelor of Computer Applications (BCA)</h3>
                <p>
                  Shree PM Patel College · affiliated with Sardar Patel
                  University
                </p>
                <span>CGPA: 7.2 / 10</span>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <SectionHeading
            eyebrow="GET IN TOUCH"
            title="Let's Work Together"
            text="For job opportunities, software development, projects or collaboration, send me a message."
          />
          <div className="contact-grid">
            <aside className="contact-info">
              <div className="contact-item">
                <Icon name="mail" />
                <div>
                  <small>EMAIL</small>
                  <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                </div>
              </div>
              <div className="contact-item">
                <Icon name="map" />
                <div>
                  <small>LOCATION</small>
                  <span>{PROFILE.location}</span>
                </div>
              </div>
              <div className="contact-socials">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Icon name="github" />
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Icon name="linkedin" />
                </a>
                <a
                  href={PROFILE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Icon name="instagram" />
                </a>
              </div>
            </aside>
            <form className="contact-form" onSubmit={submit} noValidate>
              <div className="field-row">
                <label>
                  Name
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label>
                Subject
                <input
                  name="subject"
                  required
                  placeholder="Job opportunity / collaboration"
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  required
                  rows="6"
                  placeholder="Tell me a little about what you have in mind..."
                ></textarea>
              </label>
              {formState === "success" && (
                <div className="form-message success">
                  Message sent successfully. I'll get back to you soon.
                </div>
              )}
              {formState === "error" && (
                <div className="form-message error">{error}</div>
              )}
              <button
                className="btn primary submit"
                disabled={formState === "loading"}
              >
                {formState === "loading" ? "Sending…" : "Send Message"}{" "}
                <Icon name="send" size={16} />
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer>
        <span>© {new Date().getFullYear()} Abdulkadir Mehfuz Sirajwala</span>
        <span>Built with React · Java-minded, backend-focused.</span>
      </footer>
    </>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <span className="accent-line" />
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

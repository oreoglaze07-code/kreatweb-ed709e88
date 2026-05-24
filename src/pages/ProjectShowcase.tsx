import { Link } from "react-router-dom";
import "../static-site.css";

export interface ProjectShowcaseProps {
  title: string;
  subtitle: string;
  heroImage: string;
  mockups: string[];
  bullets: { title: string; desc: string }[];
  accentHsl?: string; // optional glow tint
  liveUrl?: string;
}

const ProjectShowcase = ({
  title,
  subtitle,
  heroImage,
  mockups,
  bullets,
  accentHsl = "40,30%,70%",
}: ProjectShowcaseProps) => {
  return (
    <div style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100vh" }}>
      {/* Top bar */}
      <nav className="site-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">KREAT WEB</Link>
          <Link
            to="/"
            className="nav-link"
            style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            BACK TO HOME
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8rem 1.5rem 4rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${heroImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.45,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, hsla(0,0%,5%,.7), hsla(0,0%,5%,.85), var(--bg))",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 700,
            background: `hsla(${accentHsl},.08)`,
            borderRadius: "50%",
            filter: "blur(140px)",
          }}
        />
        <div className="hero-content animate-reveal" style={{ position: "relative", zIndex: 2 }}>
          <p className="hero-subtitle">{subtitle}</p>
          <h1 className="hero-title">
            <span className="text-gradient italic">{title}</span>
          </h1>
        </div>
      </section>

      {/* MOCKUPS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">The Website</p>
            <h2 className="section-title">A look at the <span className="text-gradient italic">final design</span></h2>
          </div>
          <div
            style={{
              display: "grid",
              gap: "2.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {mockups.map((src, i) => (
              <div key={i} className="hover-lift" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* Laptop frame */}
                <div
                  style={{
                    width: "100%",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px 12px 4px 4px",
                    padding: "12px 12px 0",
                    boxShadow: "0 30px 80px -20px hsla(0,0%,0%,.6)",
                  }}
                >
                  <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "hsl(0,0%,25%)" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "hsl(0,0%,25%)" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "hsl(0,0%,25%)" }} />
                  </div>
                  <img
                    src={src}
                    alt={`${title} mockup ${i + 1}`}
                    loading="lazy"
                    style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", borderRadius: "2px" }}
                  />
                </div>
                <div
                  style={{
                    width: "108%",
                    height: 10,
                    background: "linear-gradient(to bottom, var(--muted), var(--secondary))",
                    borderRadius: "0 0 12px 12px",
                    border: "1px solid var(--border)",
                    borderTop: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section className="section bg-secondary-50" style={{ background: "hsl(0,0%,7%)" }}>
        <div className="container max-w-5xl">
          <div className="section-header">
            <p className="section-tag">What We Built</p>
            <h2 className="section-title">Crafted with <span className="text-gradient italic">intention</span></h2>
          </div>
          <div style={{ display: "grid", gap: "1.25rem", maxWidth: 760, margin: "0 auto" }}>
            {bullets.map((b, i) => (
              <div
                key={i}
                className="hover-lift"
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  padding: "1.75rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    color: "var(--accent)",
                    fontStyle: "italic",
                    minWidth: 40,
                  }}
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: ".5rem", color: "var(--fg)" }}>{b.title}</h3>
                  <p style={{ color: "var(--muted-fg)", lineHeight: 1.7, fontWeight: 300 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BACK CTA */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container max-w-3xl">
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".75rem",
              padding: ".9rem 2rem",
              border: "1px solid var(--border)",
              borderRadius: 4,
              color: "var(--fg)",
              fontSize: ".75rem",
              letterSpacing: ".25em",
              textTransform: "uppercase",
              transition: "all .3s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectShowcase;

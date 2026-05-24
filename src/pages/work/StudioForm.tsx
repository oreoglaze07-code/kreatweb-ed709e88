import ProjectShowcase from "../ProjectShowcase";

const StudioForm = () => (
  <ProjectShowcase
    title="Studio Form"
    subtitle="Interior Design Studio"
    liveUrl="https://kreatweb.github.io/designingtrial/"
    heroImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
    mockups={[
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ]}
    bullets={[
      { title: "Cinematic Hero & Portfolio Galleries", desc: "A full-bleed hero paired with editorial-style project galleries that let the spaces speak for themselves." },
      { title: "Bespoke Service & Process Pages", desc: "Custom-designed sections that walk premium clients through the studio's design philosophy and engagement process." },
      { title: "Inquiry Funnel Built to Convert", desc: "A refined consultation form and clear contact flow engineered to capture higher-budget interior projects." },
    ]}
  />
);

export default StudioForm;

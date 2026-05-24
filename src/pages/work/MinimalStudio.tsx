import ProjectShowcase from "../ProjectShowcase";

const MinimalStudio = () => (
  <ProjectShowcase
    title="Minimal Studio"
    subtitle="Modern Brand"
    accentHsl="0,0%,80%"
    heroImage="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1920&q=80"
    mockups={[
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=1200&q=80",
    ]}
    bullets={[
      { title: "Pure Black & White Visual System", desc: "A restrained monochrome palette and confident typography that put the studio's work at the center of attention." },
      { title: "Editorial Case Study Pages", desc: "Long-form, image-driven case studies that walk prospects through each project with intention and rhythm." },
      { title: "Studio Identity & Contact Flow", desc: "A focused about page and frictionless contact module designed to attract serious brand collaborators." },
    ]}
  />
);

export default MinimalStudio;

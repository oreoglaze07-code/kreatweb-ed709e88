import ProjectShowcase from "../ProjectShowcase";

const BrewCo = () => (
  <ProjectShowcase
    title="Brew & Co."
    subtitle="Café & Lifestyle Brand"
    accentHsl="30,70%,55%"
    heroImage="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1920&q=80"
    mockups={[
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1200&q=80",
    ]}
    bullets={[
      { title: "Warm, Story-Led Brand Experience", desc: "An amber-toned visual language and storytelling layout that captures the café's craft and community feel." },
      { title: "Interactive Menu & Locations", desc: "Beautifully presented menu sections and an at-a-glance locations block so guests can plan their visit in seconds." },
      { title: "Mobile-First Performance", desc: "Optimized images and snappy interactions tuned for customers browsing on the go between coffee runs." },
    ]}
  />
);

export default BrewCo;

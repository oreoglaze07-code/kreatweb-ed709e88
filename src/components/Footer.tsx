import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-border/50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-heading text-lg tracking-[0.3em] text-primary mb-2">KREAT WEB</p>
          <p className="text-muted-foreground font-body text-xs tracking-wider">
            Premium websites for modern brands
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="mailto:hello@kreat_web.com"
            className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
          >
            kreat_web
          </a>
          <a
            href="https://instagram.com/kreat_web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-8 border-t border-border/30">
        <p className="text-center text-muted-foreground font-body text-xs tracking-wider">
          © 2026 Kreat Web. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

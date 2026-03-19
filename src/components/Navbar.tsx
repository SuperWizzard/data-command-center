import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#tech", label: "Tech Stack" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        <a href="#" className="font-mono text-sm font-bold tracking-wider gradient-text">
          SM
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a
            href="#case-studies"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 hover:scale-105"
            style={{ background: "var(--gradient-blue)" }}
          >
            See My Work
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border pb-4">
          <div className="section-container flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground py-1" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a
              href="#case-studies"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-primary-foreground w-fit mt-1"
              style={{ background: "var(--gradient-blue)" }}
              onClick={() => setOpen(false)}
            >
              <Rocket className="w-3.5 h-3.5" />
              See My Work
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;

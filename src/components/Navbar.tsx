import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
const links = [
  ["story", "My Story"],
  ["leadership", "Leadership"],
  ["work", "My Work"],
  ["tech", "Capabilities"],
  ["contact", "Contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="story-nav" aria-label="Main navigation">
        <div className="section-container nav-inner">
          <Link className="wordmark" to="/" aria-label="Sobhe Mosaad home">
            sobhe<span>.</span>
            <small>MOSAAD</small>
          </Link>
          <div className="desktop-links">
            {links.map(([id, label]) => (
              <a key={id} href={`/#${id}`}>
                {label}
              </a>
            ))}
            <a className="nav-ai" href="/#explore-ai">
              Ask my AI <ArrowUpRight size={14} />
            </a>
          </div>
          <button
            ref={toggle}
            className="mobile-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div
            id="mobile-navigation"
            className="mobile-links section-container"
          >
            {[...links, ["explore-ai", "Ask my AI"]].map(([id, label]) => (
              <a key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

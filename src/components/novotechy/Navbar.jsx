import { useEffect, useState } from "react";
import { Bot, Menu, X, Command } from "lucide-react";

export default function Navbar({ onOpenCommand }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "AI Solutions", href: "#ai-solutions" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel-strong py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#5d5fef] flex items-center justify-center glow-cyan">
            <Bot className="w-5 h-5 text-[#080809]" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight font-heading">
            Novo<span className="text-gradient-cyan">Techy</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00f0ff] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Quick Nav</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono">⌘K</kbd>
          </button>
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg bg-[#00f0ff] text-[#080809] text-sm font-semibold hover:glow-cyan transition-all"
          >
            Get Started
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-3 mx-4 glass-panel-strong rounded-xl p-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground py-2"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-[#00f0ff] text-[#080809] text-sm font-semibold text-center">
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
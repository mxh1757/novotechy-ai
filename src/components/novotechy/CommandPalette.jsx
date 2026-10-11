import { useEffect, useState } from "react";
import { Search, X, ArrowRight, Bot, Calculator, Compass, Mail, MapPin, Code2 } from "lucide-react";

const commands = [
  { label: "Talk to NovoTechy AI", desc: "Open the live AI consultant", icon: Bot, target: "#ai-solutions", color: "#00f0ff" },
  { label: "Estimate my project", desc: "Get an AI-generated scope & budget", icon: Calculator, target: "#ai-solutions", color: "#ffb800" },
  { label: "Find my recommended service", desc: "Take the AI recommender quiz", icon: Compass, target: "#ai-solutions", color: "#5d5fef" },
  { label: "View our services", desc: "Browse all technology solutions", icon: Code2, target: "#services", color: "#00f0ff" },
  { label: "Contact the team", desc: "Start a conversation", icon: Mail, target: "#contact", color: "#5d5fef" },
  { label: "Visit Tampa HQ", desc: "See our Florida location", icon: MapPin, target: "#contact", color: "#ffb800" },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase())
  );

  const go = (target) => {
    onClose();
    setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl glass-panel-strong rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
          <Search className="w-4 h-4 text-[#00f0ff]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, filtered.length - 1));
              if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
              if (e.key === "Enter" && filtered[active]) go(filtered[active].target);
            }}
            placeholder="Type a command or search... (e.g. 'estimate my project')"
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/50 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-muted-foreground">ESC</kbd>
          <button onClick={onClose}><X className="w-4 h-4 text-muted-foreground" /></button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">No commands found</div>
          ) : (
            filtered.map((c, i) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.label}
                  onClick={() => go(c.target)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    active === i ? "bg-white/5" : ""
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${c.color}10`, border: `1px solid ${c.color}25` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: c.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{c.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{c.desc}</div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-opacity ${active === i ? "opacity-100 text-[#00f0ff]" : "opacity-0"}`} />
                </button>
              );
            })
          )}
        </div>

        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
          <span>↑↓ navigate · ↵ select · esc close</span>
          <span className="text-[#00f0ff]">SEMANTIC NAV</span>
        </div>
      </div>
    </div>
  );
}
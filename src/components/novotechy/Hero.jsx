import { useEffect, useRef, useState } from "react";
import { ArrowRight, Code2, Smartphone, BrainCircuit, ShoppingCart, Sparkles } from "lucide-react";

const cards = [
  { icon: Code2, label: "Enterprise Software", color: "#00f0ff", delay: "0s" },
  { icon: Smartphone, label: "Mobile Apps", color: "#5d5fef", delay: "0.8s" },
  { icon: BrainCircuit, label: "AI Solutions", color: "#ffb800", delay: "1.6s" },
  { icon: ShoppingCart, label: "E-Commerce", color: "#00f0ff", delay: "2.4s" },
];

export default function Hero() {
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setParallax({
        x: (e.clientX / w - 0.5) * 2,
        y: (e.clientY / h - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" ref={heroRef} className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-28 pb-16">
      {/* ambient glows */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#00f0ff]/10 blur-[120px] pointer-events-none"
        style={{ transform: `translate(${parallax.x * 30}px, ${parallax.y * 30}px)` }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-[#5d5fef]/10 blur-[120px] pointer-events-none"
        style={{ transform: `translate(${parallax.x * -30}px, ${parallax.y * -30}px)` }}
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left: copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-[#ffb800]" />
            <span>AI-Powered Engineering, Built for Scale</span>
          </div>

          <h1 className="font-heading font-light leading-[0.95] tracking-tight text-5xl md:text-7xl">
            <span className="block text-muted-foreground text-2xl md:text-3xl font-normal mb-4 tracking-wide">
              Welcome to
            </span>
            <span className="block text-gradient-cyan font-semibold">NovoTechy</span>
            <span className="block text-2xl md:text-4xl mt-4 text-foreground font-light">
              Innovating Tomorrow's Tech Today
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Transforming businesses through cutting-edge software solutions, AI innovation, and digital excellence. Your trusted partner for enterprise-level technology.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group px-7 py-3.5 rounded-xl bg-[#00f0ff] text-[#080809] font-semibold flex items-center gap-2 hover:glow-cyan transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-7 py-3.5 rounded-xl glass-panel text-foreground font-semibold hover:border-[#00f0ff]/40 transition-all"
            >
              Our Services
            </a>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-2xl font-bold text-gradient-amber">120+</div>
              <div className="text-xs text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-2xl font-bold text-gradient-cyan">40+</div>
              <div className="text-xs text-muted-foreground">AI Models Deployed</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground">98%</div>
              <div className="text-xs text-muted-foreground">Client Retention</div>
            </div>
          </div>
        </div>

        {/* Right: floating cards */}
        <div className="relative h-[480px] hidden lg:block">
          {cards.map((c, i) => {
            const positions = [
              { top: "0%", left: "10%" },
              { top: "15%", left: "55%" },
              { top: "50%", left: "0%" },
              { top: "55%", left: "45%" },
            ];
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="absolute w-52 h-44 glass-panel rounded-2xl p-6 flex flex-col items-center justify-center gap-4 animate-float"
                style={{
                  ...positions[i],
                  animationDelay: c.delay,
                  transform: `translate(${parallax.x * (i % 2 ? -20 : 20)}px, ${parallax.y * (i % 2 ? -20 : 20)}px)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}40` }}
                >
                  <Icon className="w-7 h-7" style={{ color: c.color }} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-foreground">{c.label}</span>
              </div>
            );
          })}
          {/* central neural node */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#00f0ff]/20 to-[#5d5fef]/20 border border-[#00f0ff]/30 flex items-center justify-center animate-pulse-glow"
            style={{ transform: `translate(-50%, -50%) translate(${parallax.x * 10}px, ${parallax.y * 10}px)` }}
          >
            <BrainCircuit className="w-10 h-10 text-[#00f0ff]" />
          </div>
        </div>
      </div>
    </section>
  );
}
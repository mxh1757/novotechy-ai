import { Compass, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const phases = [
  { n: "01", icon: Compass, title: "Discover", desc: "We map your goals, constraints, and AI opportunities into a sharp product brief.", color: "#00f0ff" },
  { n: "02", icon: PenTool, title: "Architect", desc: "We design the system — data, models, agents, and clear human-in-the-loop boundaries.", color: "#5d5fef" },
  { n: "03", icon: Code2, title: "Build", desc: "AI-native sprints ship working software with automated quality gates and code review.", color: "#ffb800" },
  { n: "04", icon: Rocket, title: "Launch", desc: "Phased rollout with observability, confidence indicators, and rollback safety.", color: "#00f0ff" },
  { n: "05", icon: TrendingUp, title: "Scale", desc: "We optimize, retrain, and expand agentic workflows as your business grows.", color: "#5d5fef" },
];

export default function Process() {
  return (
    <section id="process" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#5d5fef] font-mono">How We Engage</span>
          <h2 className="font-heading font-light text-4xl md:text-5xl mt-4 leading-tight">
            An AI-native delivery
            <span className="text-gradient-cyan font-semibold"> roadmap</span>
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            A disciplined five-phase process that turns ambiguous goals into shipped, scalable software — with confidence indicators and human-in-the-loop checkpoints throughout.
          </p>
        </Reveal>

        <div className="relative">
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-black/10 dark:bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00f0ff] via-[#5d5fef] to-[#ffb800]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
            {phases.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.n} delay={i * 0.1}>
                  <div className="relative">
                    <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                      <div
                        className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${p.color}15`, border: `1px solid ${p.color}40` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: p.color }} />
                      </div>
                      <div className="lg:mt-5">
                        <div className="text-[10px] font-mono text-muted-foreground mb-1">PHASE {p.n}</div>
                        <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
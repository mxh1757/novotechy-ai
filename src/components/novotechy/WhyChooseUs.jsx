import { Users, Maximize2, HeartHandshake, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";

const reasons = [
  { icon: Users, title: "Expert Team", desc: "Skilled professionals with years of experience in cutting-edge technologies", color: "#00f0ff" },
  { icon: Maximize2, title: "Scalable Solutions", desc: "Future-proof applications that grow with your business needs", color: "#5d5fef" },
  { icon: HeartHandshake, title: "Client-First Approach", desc: "Your success drives everything we do, from planning to delivery", color: "#ffb800" },
  { icon: Clock, title: "Timely Delivery", desc: "Reliable project management ensuring on-time, on-budget completion", color: "#00f0ff" },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00f0ff] font-mono">Why Choose NovoTechy</span>
          <h2 className="font-heading font-light text-4xl md:text-5xl mt-4 leading-tight">
            Your success
            <span className="text-gradient-cyan font-semibold"> is our priority</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="glass-panel rounded-2xl p-7 text-center hover:-translate-y-1 transition-transform group">
                <div
                  className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: `${r.color}10`, border: `1px solid ${r.color}30` }}
                >
                  <Icon className="w-7 h-7" style={{ color: r.color }} />
                </div>
                <h4 className="font-semibold mb-2">{r.title}</h4>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
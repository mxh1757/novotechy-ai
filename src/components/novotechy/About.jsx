import { Target, Eye, Lightbulb, ShieldCheck, Award } from "lucide-react";
import Reveal from "@/components/Reveal";

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "Constantly pushing boundaries with creative solutions", color: "#ffb800" },
  { icon: ShieldCheck, title: "Trust", desc: "Building lasting relationships through reliability", color: "#00f0ff" },
  { icon: Award, title: "Excellence", desc: "Delivering superior quality in every project", color: "#5d5fef" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00f0ff] font-mono">About NovoTechy</span>
          <h2 className="font-heading font-light text-4xl md:text-5xl mt-4 leading-tight">
            Pioneering the future of technology with
            <span className="text-gradient-cyan font-semibold"> innovation and excellence</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Reveal>
            <div className="glass-panel rounded-2xl p-8 h-full hover:border-[#00f0ff]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                We exist to turn ambitious ideas into software that moves the business forward — engineering systems that automate the busywork, sharpen decisions with AI, and scale the moment you do.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-panel rounded-2xl p-8 h-full hover:border-[#5d5fef]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#5d5fef]/10 border border-[#5d5fef]/30 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-[#5d5fef]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every team — from scrappy startup to global enterprise — commands intelligent, adaptive technology as easily as flipping a switch, with NovoTechy as the partner that gets them there first.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="glass-panel rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform h-full">
                  <div
                    className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-5"
                    style={{ background: `${v.color}10`, border: `1px solid ${v.color}30` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: v.color }} />
                  </div>
                  <h4 className="font-semibold mb-2">{v.title}</h4>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
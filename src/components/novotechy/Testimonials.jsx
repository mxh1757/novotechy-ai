import { Star, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";

const testimonials = [
  {
    quote: "NovoTechy transformed our business with their innovative AI solutions. The custom knowledge base they developed has revolutionized our customer service.",
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    color: "#00f0ff",
  },
  {
    quote: "Their enterprise software solution streamlined our operations beyond our expectations. Highly professional team with exceptional technical expertise.",
    name: "Michael Chen",
    role: "CTO, GlobalSoft",
    color: "#5d5fef",
  },
  {
    quote: "The mobile app they developed for us exceeded all expectations. Beautiful design, smooth performance, and excellent user experience.",
    name: "Emily Rodriguez",
    role: "Founder, StartupHub",
    color: "#ffb800",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00f0ff] font-mono">What Our Clients Say</span>
          <h2 className="font-heading font-light text-4xl md:text-5xl mt-4 leading-tight">
            Trusted by
            <span className="text-gradient-cyan font-semibold"> businesses worldwide</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-panel rounded-2xl p-7 flex flex-col gap-5 hover:-translate-y-1 transition-transform">
              <Quote className="w-8 h-8" style={{ color: t.color }} />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#ffb800] text-[#ffb800]" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-black/5 dark:border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
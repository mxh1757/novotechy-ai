import { ArrowUpRight, Layers } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProductMock from "@/components/novotechy/ProductMock";

const products = [
  {
    name: "Integrity Thread",
    category: "Supply-chain compliance intelligence",
    tagline: "The global ledger for textile & apparel certification.",
    description:
      "A multi-certification intelligence platform for sourcing and compliance teams. Search 41,454 certified facilities across 134 countries, verify GOTS, OEKO-TEX®, WRAP and LEED records straight from the registries, and get alerted before a supplier's certificate lapses.",
    url: "https://integritythread.com",
    metrics: [
      { value: "41,454", label: "Certified facilities" },
      { value: "134", label: "Countries covered" },
      { value: "46,358", label: "Certifications tracked" },
      { value: "4", label: "Registries unified" },
    ],
  },
];

export default function Products() {
  return (
    <section id="products" className="relative py-32 px-6">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#5d5fef]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00f0ff] font-mono">Proof, Not Promises</span>
          <h2 className="font-heading font-light text-4xl md:text-5xl mt-4 leading-tight">
            Products we've
            <span className="text-gradient-cyan font-semibold"> built and shipped</span>
          </h2>
          <p className="text-muted-foreground mt-5 leading-relaxed">
            Real software, running in production and trusted by teams worldwide — designed, engineered and scaled by NovoTechy.
          </p>
        </Reveal>

        <div className="space-y-8">
          {products.map((p) => (
            <Reveal key={p.name}>
              <article className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center glass-panel rounded-3xl p-7 md:p-12">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20">
                      <Layers className="w-3 h-3" /> Product
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                    </span>
                  </div>

                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{p.category}</p>
                  <h3 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="text-lg text-gradient-amber font-medium mt-2">{p.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4 max-w-xl">{p.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="glass-panel rounded-xl px-3 py-3">
                        <div className="text-xl font-bold text-gradient-cyan">{m.value}</div>
                        <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00f0ff] text-[#080809] font-semibold hover:glow-cyan transition-all"
                    >
                      Visit {p.name}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Build something like this →
                    </a>
                  </div>
                </div>

                <div className="lg:pl-2">
                  <ProductMock />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
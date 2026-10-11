import { Database, Workflow, TrendingUp } from "lucide-react";
import AIChatAssistant from "./AIChatAssistant";
import AIProjectEstimator from "./AIProjectEstimator";
import AISolutionRecommender from "./AISolutionRecommender";

const aiCapabilities = [
  {
    icon: Database,
    title: "Custom Knowledge Bases",
    desc: "Tailored AI systems that understand your business domain and provide intelligent insights.",
    color: "#00f0ff",
  },
  {
    icon: Workflow,
    title: "Intelligent Automation",
    desc: "Streamline workflows with AI-powered automation that learns and adapts to your processes.",
    color: "#ffb800",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    desc: "Make data-driven decisions with AI models that forecast trends and optimize performance.",
    color: "#5d5fef",
  },
];

export default function AISolutions() {
  return (
    <section id="ai-solutions" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#5d5fef]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#ffb800] font-mono">AI Solutions That Transform</span>
          <h2 className="font-heading font-light text-4xl md:text-5xl mt-4 leading-tight">
            Harness the power of AI with
            <span className="text-gradient-amber font-semibold"> interactive intelligence</span>
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            Don't just read about our AI capabilities — try them live. Chat with our AI consultant, estimate your project, or get a tailored recommendation.
          </p>
        </div>

        {/* capability cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {aiCapabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="glass-panel rounded-2xl p-7 hover:-translate-y-1 transition-transform">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${c.color}10`, border: `1px solid ${c.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: c.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>

        {/* live AI tools */}
        <div className="grid lg:grid-cols-3 gap-6">
          <AIChatAssistant />
          <AIProjectEstimator />
          <AISolutionRecommender />
        </div>
      </div>
    </section>
  );
}
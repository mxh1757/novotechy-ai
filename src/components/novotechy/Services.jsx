import { useState } from "react";
import { Code2, Smartphone, BrainCircuit, ShoppingCart, Layers, HeartHandshake, ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";

const services = [
  {
    icon: Code2,
    title: "Enterprise Software Development",
    desc: "Robust, scalable enterprise solutions designed to streamline operations and boost productivity across your organization.",
    stack: ["React", "Node.js", "PostgreSQL", "Kubernetes", "GraphQL"],
    color: "#00f0ff",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.",
    stack: ["React Native", "Swift", "Kotlin", "Flutter", "Firebase"],
    color: "#5d5fef",
  },
  {
    icon: BrainCircuit,
    title: "AI-Based Products",
    desc: "Intelligent solutions powered by machine learning and custom knowledge bases to automate and optimize your processes.",
    stack: ["PyTorch", "LangChain", "Vector DBs", "OpenAI", "RAG"],
    color: "#ffb800",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Services",
    desc: "Complete e-commerce platforms with advanced features for inventory management, payments, and customer engagement.",
    stack: ["Next.js", "Stripe", "Shopify", "Elasticsearch", "Redis"],
    color: "#00f0ff",
  },
  {
    icon: Layers,
    title: "ERP Solutions",
    desc: "Integrated ERP systems that unify your business processes and provide real-time insights for better decision-making.",
    stack: ["Microservices", "Kafka", "Power BI", "SAP", "Odoo"],
    color: "#5d5fef",
  },
  {
    icon: HeartHandshake,
    title: "Customer Experience (CX)",
    desc: "Revolutionary CX products that enhance customer satisfaction and drive loyalty through superior digital experiences.",
    stack: ["UX Research", "Figma", "Framer", "Analytics", "A/B Testing"],
    color: "#ffb800",
  },
];

export default function Services() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00f0ff] font-mono">Our Services</span>
          <h2 className="font-heading font-light text-4xl md:text-5xl mt-4 leading-tight">
            Comprehensive technology solutions
            <span className="text-gradient-cyan font-semibold"> tailored to your business</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isOpen = expanded === i;
            return (
              <div
                key={s.title}
                onClick={() => setExpanded(isOpen ? -1 : i)}
                className={`glass-panel rounded-2xl p-7 cursor-pointer transition-all duration-300 ${
                  isOpen ? "border-[#00f0ff]/40 -translate-y-1" : "hover:border-black/10 dark:hover:border-white/15"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${s.color}10`, border: `1px solid ${s.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-3 flex items-center justify-between">
                  {s.title}
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-2 pt-2">
                      {s.stack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-mono text-muted-foreground border border-black/5 dark:border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
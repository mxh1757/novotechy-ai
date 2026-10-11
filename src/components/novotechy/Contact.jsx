import { useState } from "react";
import { MapPin, Mail, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { base44 } from "@/api/base44Client";

export default function Contact() {
  const [intent, setIntent] = useState("Develop");
  const [projectType, setProjectType] = useState("a web platform");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      await base44.functions.invoke("sendContactInquiry", {
        name, email, intent, projectType, message, website,
      });
      setSent(true);
    } catch (err) {
      setError("We couldn't send your message right now. Please email us directly at info@novotechy.com.");
    } finally {
      setLoading(false);
    }
  };

  const intentOptions = ["Develop", "Scale", "Innovate", "Automate"];
  const projectOptions = ["a web platform", "a mobile app", "an AI solution", "an e-commerce store", "an ERP system"];

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#00f0ff]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00f0ff] font-mono">Ready to Transform</span>
          <h2 className="font-heading font-light text-4xl md:text-5xl mt-4 leading-tight">
            Let's discuss how NovoTechy can
            <span className="text-gradient-cyan font-semibold"> achieve your goals</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: geospatial node + info */}
          <div className="space-y-6">
            <div className="glass-panel rounded-2xl p-8">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-4">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                FLORIDA HQ · GEOSPATIAL NODE
              </div>
              <h3 className="text-xl font-semibold mb-1">NovoTechy LLC</h3>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-[#00f0ff] flex-shrink-0" />
                <span>10861 Sakonnet River Dr., Apt. 204, Tampa, Florida-33615</span>
              </div>

              {/* wireframe map */}
              <div className="mt-6 relative h-48 rounded-xl overflow-hidden glass-panel grid-bg">
                <svg className="absolute inset-0 w-full h-full text-foreground" viewBox="0 0 400 200">
                  <defs>
                    <linearGradient id="river" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#5d5fef" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path d="M0,60 Q100,40 200,80 T400,70" stroke="url(#river)" strokeWidth="2" fill="none" opacity="0.5" />
                  <path d="M0,120 Q120,140 240,110 T400,130" stroke="#5d5fef" strokeWidth="1.5" fill="none" opacity="0.3" />
                  <path d="M80,0 L120,200" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                  <path d="M200,0 L220,200" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                  <path d="M300,0 L320,200" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                  <circle cx="200" cy="100" r="6" fill="#00f0ff">
                    <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="100" r="3" fill="#00f0ff" />
                  <text x="210" y="96" fill="#00f0ff" fontSize="9" fontFamily="monospace">TAMPA</text>
                </svg>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a href="mailto:info@novotechy.com" className="glass-panel rounded-xl p-5 hover:border-[#00f0ff]/30 transition-colors">
                <Mail className="w-5 h-5 text-[#00f0ff] mb-3" />
                <div className="text-xs text-muted-foreground mb-1">Email Us</div>
                <div className="text-sm font-medium">info@novotechy.com</div>
              </a>
              <a href="tel:+1813XXXXXXX" className="glass-panel rounded-xl p-5 hover:border-[#00f0ff]/30 transition-colors">
                <Phone className="w-5 h-5 text-[#ffb800] mb-3" />
                <div className="text-xs text-muted-foreground mb-1">Call Us</div>
                <div className="text-sm font-medium">Tampa, FL</div>
              </a>
            </div>
          </div>

          {/* Right: natural language form */}
          <div className="glass-panel-strong rounded-2xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <CheckCircle2 className="w-14 h-14 text-[#00f0ff] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Message received!</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Thanks {name || "there"} — our team will reach out within one business day to discuss your project.
                </p>
                <button onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }} className="mt-6 text-sm text-[#00f0ff] hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div>
                  <label className="text-xs text-muted-foreground mb-3 block">Tell us what you need (complete the sentence)</label>
                  <div className="glass-panel rounded-xl p-4 text-sm leading-relaxed">
                    I am looking to{" "}
                    <select value={intent} onChange={(e) => setIntent(e.target.value)} className="bg-[#00f0ff]/10 text-[#00f0ff] rounded px-2 py-0.5 mx-1 focus:outline-none font-medium">
                      {intentOptions.map((o) => <option key={o} value={o} className="bg-card">{o}</option>)}
                    </select>
                    <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="bg-[#5d5fef]/10 text-[#5d5fef] rounded px-2 py-0.5 mx-1 focus:outline-none font-medium">
                      {projectOptions.map((o) => <option key={o} value={o} className="bg-card">{o}</option>)}
                    </select>
                    with NovoTechy.
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Your Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-black/5 dark:bg-white/5 rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="jane@company.com"
                      className="w-full bg-black/5 dark:bg-white/5 rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Project Details</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Tell us more about your goals, timeline, and any specific requirements..."
                    className="w-full bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#00f0ff] text-[#080809] font-semibold flex items-center justify-center gap-2 hover:glow-cyan transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
                {error && <p className="text-[12px] text-red-500 text-center">{error}</p>}
                <p className="text-[11px] text-muted-foreground text-center">Summary: "I am looking to {intent} {projectType} with NovoTechy."</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
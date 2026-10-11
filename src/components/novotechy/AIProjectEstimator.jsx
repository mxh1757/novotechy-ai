import { useState } from "react";
import { Calculator, Loader2, Clock, DollarSign, Users, GitBranch, Cpu, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

const budgetOptions = ["Under $25k", "$25k-$75k", "$75k-$200k", "$200k+", "Flexible"];
const timelineOptions = ["ASAP", "1-3 months", "3-6 months", "6+ months", "Flexible"];

export default function AIProjectEstimator() {
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("Flexible");
  const [timeline, setTimeline] = useState("Flexible");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState(null);

  const run = async () => {
    if (!description.trim() || loading) return;
    setLoading(true);
    setEstimate(null);
    try {
      const res = await base44.functions.invoke("novotechyAI", {
        action: "estimate",
        description,
        budget,
        timeline,
      });
      setEstimate(res.data.estimate);
    } catch (e) {
      setEstimate({ error: "Unable to generate estimate right now. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel-strong rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#ffb800]/10 border border-[#ffb800]/30 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-[#ffb800]" />
        </div>
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            AI Project Estimator
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffb800]/10 text-[#ffb800] font-mono">NEW</span>
          </h3>
          <p className="text-xs text-muted-foreground">Describe your project — get an instant AI-generated scope, timeline & budget</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Describe your project</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="e.g. We need an AI-powered customer support platform with a custom knowledge base, chatbot, and analytics dashboard..."
            className="w-full bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-[#ffb800]/40 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Budget</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ffb800]/40"
            >
              {budgetOptions.map((b) => (
                <option key={b} value={b} className="bg-card">{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Timeline</label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ffb800]/40"
            >
              {timelineOptions.map((t) => (
                <option key={t} value={t} className="bg-card">{t}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={run}
          disabled={loading || !description.trim()}
          className="w-full py-3 rounded-xl bg-[#ffb800] text-[#080809] font-semibold flex items-center justify-center gap-2 hover:glow-amber transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Analyzing your project...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Generate Estimate
            </>
          )}
        </button>
      </div>

      {estimate && !estimate.error && (
        <div className="mt-6 space-y-4 animate-[fadeIn_0.4s_ease]">
          <div className="flex items-center gap-2 text-[#ffb800]">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">{estimate.projectType}</span>
          </div>
          <p className="text-sm text-muted-foreground italic">{estimate.summary}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel rounded-xl p-4">
              <Clock className="w-4 h-4 text-[#00f0ff] mb-2" />
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Duration</div>
              <div className="text-sm font-semibold mt-0.5">{estimate.estimatedDuration}</div>
            </div>
            <div className="glass-panel rounded-xl p-4">
              <DollarSign className="w-4 h-4 text-[#ffb800] mb-2" />
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Budget Range</div>
              <div className="text-sm font-semibold mt-0.5">{estimate.estimatedBudgetRange}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Users className="w-3.5 h-3.5" /> Recommended Team
            </div>
            <div className="flex flex-wrap gap-2">
              {estimate.teamComposition?.map((r) => (
                <span key={r} className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-xs">{r}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <GitBranch className="w-3.5 h-3.5" /> Key Milestones
            </div>
            <ul className="space-y-1.5">
              {estimate.keyMilestones?.map((m, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <span className="text-[#00f0ff] font-mono">{String(i + 1).padStart(2, "0")}</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Cpu className="w-3.5 h-3.5" /> Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {estimate.techStack?.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-[#00f0ff]/5 text-[11px] font-mono text-[#00f0ff] border border-[#00f0ff]/15">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-start glass-panel rounded-xl p-3">
            <AlertTriangle className="w-4 h-4 text-[#ffb800] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">{estimate.riskNotes}</p>
          </div>

          <a href="#contact" className="flex items-center justify-center gap-2 text-sm text-[#00f0ff] hover:underline pt-2">
            {estimate.nextStep} <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {estimate?.error && (
        <p className="mt-4 text-sm text-destructive text-center">{estimate.error}</p>
      )}
    </div>
  );
}
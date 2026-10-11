import { useState } from "react";
import { Compass, Loader2, ArrowRight, Check, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

const questions = [
  {
    q: "What's your primary goal?",
    options: ["Build a new product", "Modernize existing systems", "Add AI capabilities", "Improve customer experience"],
  },
  {
    q: "Who are your main users?",
    options: ["Internal team", "Customers / B2C", "Business clients / B2B", "Mixed audience"],
  },
  {
    q: "What scale are you targeting?",
    options: ["Startup / MVP", "Growing business", "Enterprise", "Global platform"],
  },
  {
    q: "Which matters most right now?",
    options: ["Speed to market", "Long-term scalability", "Cost efficiency", "Competitive differentiation"],
  },
];

export default function AISolutionRecommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const pick = (opt) => {
    const next = [...answers];
    next[step] = `${questions[step].q}: ${opt}`;
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      run(next);
    }
  };

  const run = async (allAnswers) => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke("novotechyAI", {
        action: "recommend",
        answers: allAnswers,
      });
      setResult(res.data.recommendation);
    } catch (e) {
      setResult({ error: "Unable to generate a recommendation right now." });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const progress = ((step + (result ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="glass-panel-strong rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#5d5fef]/10 border border-[#5d5fef]/30 flex items-center justify-center">
          <Compass className="w-5 h-5 text-[#5d5fef]" />
        </div>
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            AI Solution Recommender
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5d5fef]/10 text-[#5d5fef] font-mono">NEW</span>
          </h3>
          <p className="text-xs text-muted-foreground">Answer 4 questions — get a tailored service recommendation</p>
        </div>
      </div>

      {!result && !loading && (
        <>
          <div className="w-full h-1 rounded-full bg-black/5 dark:bg-white/5 mb-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#5d5fef] to-[#00f0ff] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="text-[10px] text-muted-foreground font-mono mb-2">
              QUESTION {step + 1} / {questions.length}
            </div>
            <h4 className="text-lg font-semibold mb-5">{questions[step].q}</h4>
            <div className="space-y-2.5">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pick(opt)}
                  className="w-full text-left px-4 py-3 rounded-xl glass-panel hover:border-[#5d5fef]/40 hover:translate-x-1 transition-all text-sm flex items-center justify-between group"
                >
                  {opt}
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-4 text-xs text-muted-foreground hover:text-foreground self-start">
                ← Back
              </button>
            )}
          </div>
        </>
      )}

      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#5d5fef]" />
          <p className="text-sm text-muted-foreground">Analyzing your needs...</p>
        </div>
      )}

      {result && !result.error && (
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-[#5d5fef]">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Your Recommendation</span>
          </div>

          <div className="glass-panel rounded-xl p-4 border-[#5d5fef]/30">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Best Fit</div>
            <div className="text-lg font-semibold text-gradient-cyan">{result.primaryRecommendation}</div>
          </div>

          {result.secondaryServices?.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-2">Also recommended</div>
              <div className="flex flex-wrap gap-2">
                {result.secondaryServices.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-[#5d5fef]/10 text-xs border border-[#5d5fef]/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs text-muted-foreground mb-2">Why this fits</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.rationale}</p>
          </div>

          <div className="flex items-center gap-2 glass-panel rounded-xl p-3">
            <Check className="w-4 h-4 text-[#00f0ff] flex-shrink-0" />
            <span className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">Complexity:</span> {result.estimatedComplexity}
            </span>
          </div>

          <div className="glass-panel rounded-xl p-4">
            <div className="text-xs text-muted-foreground mb-1">Suggested next step</div>
            <p className="text-sm">{result.suggestedFirstStep}</p>
          </div>

          <div className="flex gap-3 pt-2">
            <a href="#contact" className="flex-1 py-2.5 rounded-xl bg-[#5d5fef] text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity">
              Start Your Project
            </a>
            <button onClick={reset} className="px-4 py-2.5 rounded-xl glass-panel text-sm hover:text-foreground transition-colors">
              Retake
            </button>
          </div>
        </div>
      )}

      {result?.error && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-destructive">{result.error}</p>
          <button onClick={reset} className="px-4 py-2 rounded-xl glass-panel text-sm">Try again</button>
        </div>
      )}
    </div>
  );
}
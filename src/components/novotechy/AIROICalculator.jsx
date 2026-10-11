import { useMemo, useState } from "react";
import { Clock, Users, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import AnimatedNumber from "@/components/AnimatedNumber";

const tiers = [
  { label: "Occasional helper", hrs: 1.2, desc: "Autocomplete, boilerplate, simple tests" },
  { label: "Everyday assistant", hrs: 2.4, desc: "Refactoring, routine coding, review help" },
  { label: "Power user", hrs: 5, desc: "AI handles most coding tasks, daily use" },
  { label: "Agentic workflows", hrs: 9, desc: "Agents run multi-step tasks, light supervision" },
];

const fmtMoney = (n) => "$" + Math.round(n).toLocaleString();
const fmtNum = (n) => Math.round(n).toLocaleString();

function SliderRow({ label, value, min, max, step = 1, suffix, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs text-muted-foreground">{label}</label>
        <span className="text-sm font-semibold font-mono">
          {suffix === "$" ? suffix : ""}
          {value.toLocaleString()}
          {suffix && suffix !== "$" ? ` ${suffix}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#00f0ff] cursor-pointer"
      />
    </div>
  );
}

export default function AIROICalculator() {
  const [team, setTeam] = useState(80);
  const [salary, setSalary] = useState(150000);
  const [tierIdx, setTierIdx] = useState(1);
  const [adoption, setAdoption] = useState(80);
  const [cost, setCost] = useState(19);

  const r = useMemo(() => {
    const tier = tiers[tierIdx];
    const adopting = team * (adoption / 100);
    const monthlyHours = adopting * tier.hrs * 4.33;
    const hourly = salary / 2080;
    const monthlyValue = monthlyHours * hourly;
    const toolCost = adopting * cost;
    const net = monthlyValue - toolCost;
    const roi = toolCost > 0 ? monthlyValue / toolCost : 0;
    const fte = monthlyHours / 173;
    return { monthlyHours, monthlyValue, toolCost, net, roi, fte };
  }, [team, salary, tierIdx, adoption, cost]);

  return (
    <section id="roi" className="relative py-32 px-6">
      <div className="absolute top-1/2 -left-32 w-[500px] h-[500px] rounded-full bg-[#00f0ff]/5 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#00f0ff] font-mono">AI ROI Calculator</span>
          <h2 className="font-heading font-light text-4xl md:text-5xl mt-4 leading-tight">
            Quantify the return on your
            <span className="text-gradient-cyan font-semibold"> AI investment</span>
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            Model the real economic value of AI tooling for your engineering team. Adjust the inputs to project hours reclaimed, capacity freed, and ROI.
          </p>
        </Reveal>

        <Reveal>
          <div className="glass-panel-strong rounded-2xl grid lg:grid-cols-2 overflow-hidden">
            {/* inputs */}
            <div className="p-8 space-y-7">
              <SliderRow label="Engineering team size" value={team} min={5} max={500} onChange={setTeam} suffix="devs" />
              <SliderRow label="Adoption rate" value={adoption} min={10} max={100} onChange={setAdoption} suffix="%" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-muted-foreground">Avg. engineer salary</label>
                  <span className="text-sm font-semibold font-mono">${salary.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={60000}
                  max={300000}
                  step={5000}
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full accent-[#5d5fef] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-muted-foreground">Monthly AI tooling cost / dev</label>
                  <span className="text-sm font-semibold font-mono">${cost}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={1}
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="w-full accent-[#ffb800] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Usage tier</label>
                <div className="grid grid-cols-2 gap-2">
                  {tiers.map((t, i) => (
                    <button
                      key={t.label}
                      onClick={() => setTierIdx(i)}
                      className={`text-left px-3 py-2.5 rounded-xl border transition-all ${
                        tierIdx === i
                          ? "border-[#00f0ff]/50 bg-[#00f0ff]/10"
                          : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="text-xs font-semibold">{t.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* results */}
            <div className="p-8 bg-gradient-to-br from-[#00f0ff]/5 to-transparent border-t lg:border-t-0 lg:border-l border-black/5 dark:border-white/5 flex flex-col">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Estimated ROI</div>
              <div className="text-6xl font-bold font-heading text-gradient-cyan mt-1 leading-none">
                <AnimatedNumber value={r.roi} format={(v) => v.toFixed(1)} />x
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Net monthly value:{" "}
                <span className="text-foreground font-semibold">
                  <AnimatedNumber value={r.net} format={fmtMoney} />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="glass-panel rounded-xl p-4">
                  <Clock className="w-4 h-4 text-[#00f0ff] mb-2" />
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Hours saved / mo</div>
                  <div className="text-lg font-semibold mt-0.5">
                    <AnimatedNumber value={r.monthlyHours} format={fmtNum} />
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-4">
                  <Users className="w-4 h-4 text-[#5d5fef] mb-2" />
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">FTE capacity reclaimed</div>
                  <div className="text-lg font-semibold mt-0.5">
                    <AnimatedNumber value={r.fte} format={(v) => v.toFixed(1)} />
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-4">
                  <DollarSign className="w-4 h-4 text-[#ffb800] mb-2" />
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Monthly value</div>
                  <div className="text-lg font-semibold mt-0.5">
                    <AnimatedNumber value={r.monthlyValue} format={fmtMoney} />
                  </div>
                </div>
                <div className="glass-panel rounded-xl p-4">
                  <TrendingUp className="w-4 h-4 text-[#00f0ff] mb-2" />
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Annualized value</div>
                  <div className="text-lg font-semibold mt-0.5">
                    <AnimatedNumber value={r.monthlyValue * 12} format={fmtMoney} />
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="mt-6 group px-5 py-3 rounded-xl bg-[#00f0ff] text-[#080809] text-sm font-semibold flex items-center justify-center gap-2 hover:glow-cyan transition-all"
              >
                Turn this ROI into a roadmap
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </Reveal>
        <p className="text-center text-xs text-muted-foreground mt-6">
          Benchmarked against the DX AI Measurement Framework (Q2 2026). Estimates are directional, not guarantees.
        </p>
      </div>
    </section>
  );
}
import { Search, ShieldCheck, MapPin } from "lucide-react";

const rows = [
  { name: "Sadaqat Corporation", country: "Pakistan", schemes: ["GOTS", "WRAP"], status: "Valid" },
  { name: "Jay Jay Mills Lanka", country: "Sri Lanka", schemes: ["OEKO-TEX®", "LEED"], status: "Valid" },
  { name: "SCM Garments", country: "India", schemes: ["GOTS", "OEKO-TEX®"], status: "Renewal" },
];

export default function ProductMock() {
  return (
    <div className="rounded-2xl overflow-hidden glass-panel-strong border border-black/5 dark:border-white/10 shadow-2xl">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-black/5 dark:border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="ml-3 text-[10px] font-mono text-muted-foreground truncate">integritythread.com/search</div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2">
          <Search className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span className="text-[11px] text-muted-foreground">Search 41,454 certified facilities…</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["GOTS", "OEKO-TEX®", "WRAP", "LEED"].map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20">
              {s}
            </span>
          ))}
        </div>

        <div className="space-y-1.5">
          {rows.map((r) => (
            <div key={r.name} className="flex items-center justify-between gap-2 rounded-lg bg-black/5 dark:bg-white/5 px-3 py-2">
              <div className="min-w-0">
                <div className="text-[11px] font-medium truncate">{r.name}</div>
                <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                  <MapPin className="w-2.5 h-2.5" /> {r.country}
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {r.schemes.map((s) => (
                  <span key={s} className="hidden sm:inline text-[9px] px-1.5 py-0.5 rounded bg-[#5d5fef]/10 text-[#5d5fef]">{s}</span>
                ))}
                <span className="flex items-center gap-0.5 text-[9px] text-emerald-500">
                  <ShieldCheck className="w-2.5 h-2.5" /> {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground pt-1">
          <span>134 countries</span>
          <span className="text-[#00f0ff]">12,572 valid certificates</span>
        </div>
      </div>
    </div>
  );
}
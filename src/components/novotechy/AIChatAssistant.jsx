import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const suggestions = [
  "What AI services do you offer?",
  "How can AI help my business?",
  "Tell me about your custom knowledge bases",
  "What's your development process?",
];

export default function AIChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm NovoTechy AI, your virtual consultant. Ask me anything about our software and AI solutions, or tell me about your project.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text) => {
    const message = text || input;
    if (!message || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await base44.functions.invoke("novotechyAI", {
        action: "chat",
        message,
        history: newMessages.slice(-9).map((m) => ({ role: m.role, content: m.content })),
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble connecting right now. Please try again or reach out via the contact form below." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel-strong rounded-2xl overflow-hidden flex flex-col h-[520px]">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3 bg-gradient-to-r from-[#00f0ff]/5 to-transparent">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#5d5fef] flex items-center justify-center">
          <Bot className="w-5 h-5 text-[#080809]" strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-sm font-semibold flex items-center gap-2">
            NovoTechy AI Assistant
            <span className="flex items-center gap-1 text-[10px] text-[#00f0ff] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" /> LIVE
            </span>
          </div>
          <div className="text-[11px] text-muted-foreground">Ask about our services, AI solutions, or your project</div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                m.role === "user" ? "bg-white/5" : "bg-gradient-to-br from-[#00f0ff] to-[#5d5fef]"
              }`}
            >
              {m.role === "user" ? (
                <User className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Bot className="w-4 h-4 text-[#080809]" />
              )}
            </div>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-[#00f0ff]/10 text-foreground rounded-tr-sm"
                  : "glass-panel text-muted-foreground rounded-tl-sm"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#5d5fef] flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#080809]" />
            </div>
            <div className="glass-panel px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#00f0ff]" />
              <span className="text-xs text-muted-foreground">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="px-3 py-1.5 rounded-full glass-panel text-xs text-muted-foreground hover:text-foreground hover:border-[#00f0ff]/30 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#ffb800]" />
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 border-t border-white/5">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask NovoTechy AI anything..."
            className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/40"
          />
          <button
            onClick={() => send()}
            disabled={loading}
            className="w-11 h-11 rounded-xl bg-[#00f0ff] text-[#080809] flex items-center justify-center hover:glow-cyan transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
import { Bot, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-black/5 dark:border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <a href="#top" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#5d5fef] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#080809]" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight font-heading">
                Novo<span className="text-gradient-cyan">Techy</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-4">
              Innovating Tomorrow's Tech Today. Transforming businesses through cutting-edge software solutions, AI innovation, and digital excellence.
            </p>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#00f0ff]" />
              <span>10861 Sakonnet River Dr., Apt. 204, Tampa, Florida-33615</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition-colors">Enterprise Software</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Mobile Apps</a></li>
              <li><a href="#ai-solutions" className="hover:text-foreground transition-colors">AI Solutions</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">E-Commerce</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">ERP & CX</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#why-us" className="hover:text-foreground transition-colors">Why Choose Us</a></li>
              <li><a href="#ai-solutions" className="hover:text-foreground transition-colors">AI Tools</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="mailto:info@novotechy.com" className="hover:text-foreground transition-colors flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> info@novotechy.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NovoTechy LLC. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Built with <span className="text-[#00f0ff]">intelligence</span> in Tampa, FL
          </p>
        </div>
      </div>
    </footer>
  );
}
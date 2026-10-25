import { useEffect, useState } from "react";
import Navbar from "@/components/novotechy/Navbar";
import Hero from "@/components/novotechy/Hero";
import About from "@/components/novotechy/About";
import Services from "@/components/novotechy/Services";
import Products from "@/components/novotechy/Products";
import AISolutions from "@/components/novotechy/AISolutions";
import AIROICalculator from "@/components/novotechy/AIROICalculator";
import Process from "@/components/novotechy/Process";
import WhyChooseUs from "@/components/novotechy/WhyChooseUs";
import Testimonials from "@/components/novotechy/Testimonials";
import Contact from "@/components/novotechy/Contact";
import Footer from "@/components/novotechy/Footer";
import CommandPalette from "@/components/novotechy/CommandPalette";

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar onOpenCommand={() => setCmdOpen(true)} />
      <main>
        <Hero />
        <About />
        <Services />
        <Products />
        <AISolutions />
        <AIROICalculator />
        <Process />
        <WhyChooseUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
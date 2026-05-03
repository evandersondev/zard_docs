import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { UsedFor } from "@/components/sections/UsedFor";
import { Examples } from "@/components/sections/Examples";
import { RealWorld } from "@/components/sections/RealWorld";
import { Performance } from "@/components/sections/Performance";
import { Comparison } from "@/components/sections/Comparison";
import { Why } from "@/components/sections/Why";
import { CTA } from "@/components/sections/CTA";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Zard — Schema validation for Dart, done right";
    const desc = "Zard is a fast, type-safe schema validation and transformation library for Dart and Flutter. Inspired by Zod.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', desc);
  }, []);

  // Scroll-triggered entrance animations
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".section-animate");

    // Elements already in viewport on load should be visible immediately
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add("in-view");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.08 }
    );

    els.forEach(el => {
      if (!el.classList.contains("in-view")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Why />
        <Features />
        <UsedFor />
        <Examples />
        <RealWorld />
        <Performance />
        <Comparison />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

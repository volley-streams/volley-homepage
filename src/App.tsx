import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CodeShowcase from "./components/CodeShowcase";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Progressive reveal on scroll. Uses IntersectionObserver so it's cheap
    // and gracefully degrades (elements remain visible if unsupported).
    if (typeof IntersectionObserver === "undefined") {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    document
      .querySelectorAll<HTMLElement>(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Features />
        <CodeShowcase />
      </main>
      <Footer />
    </div>
  );
}

export default App;

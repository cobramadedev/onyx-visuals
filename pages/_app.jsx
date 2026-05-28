import "../styles/globals.css";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ── Performance: lazy load images that are off screen ──
    if ("IntersectionObserver" in window) {
      const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
            }
            imgObserver.unobserve(img);
          }
        });
      }, { rootMargin: "200px" });

      document.querySelectorAll("img[data-src]").forEach(img => imgObserver.observe(img));
    }

    // ── Performance: prefetch links on hover ──
    const prefetched = new Set();
    const onMouseOver = (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || prefetched.has(href)) return;
      prefetched.add(href);
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      document.head.appendChild(link);
    };
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      lenis.destroy();
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Loader />
      <Component {...pageProps} />
    </>
  );
}
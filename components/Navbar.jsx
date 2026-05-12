"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl]   = useState("");
  const [active, setActive]     = useState("home");

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "logo_url")
      .single()
      .then(({ data }) => { if (data?.value) setLogoUrl(data.value); });

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onScrollActive = () => {
      let cur = "home";
      ["work", "feedback", "about"].forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScrollActive, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollActive);
    };
  }, []);

  return (
    <>
      <style>{`
        /* ── Outer bar ── */
        .nw {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          font-family: 'Satoshi','Inter',system-ui,sans-serif;
          transition: background 0.4s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s cubic-bezier(0.16,1,0.3,1),
                      padding 0.4s cubic-bezier(0.16,1,0.3,1);
          background: transparent;
          border-bottom: 1px solid transparent;
          padding: 0;
        }
        .nw.sc {
          background: rgba(10,10,10,0.75);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4);
        }

        /* ── Inner container — controls width ── */
        .nw-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          max-width: 100%;
          transition: max-width 0.4s cubic-bezier(0.16,1,0.3,1),
                      padding 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .nw.sc .nw-inner {
          max-width: 1200px;
          padding: 0 2rem;
        }

        /* ── Logo ── */
        .nw-logo {
          display: flex; align-items: center;
          text-decoration: none; flex-shrink: 0; transition: opacity 0.2s;
        }
        .nw-logo:hover { opacity: 0.7; }
        .nw-logo img { max-height: 30px; max-width: 130px; object-fit: contain; display: block; }
        .nw-logo-text { font-size: 13px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #fff; }
        .nw-logo-text span { color: #555; }

        /* ── Pill ── */
        .nw-pill {
          display: flex; align-items: center; gap: 2px; padding: 5px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(18,18,18,0.6);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 2px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: background 0.35s ease, border-color 0.35s ease;
          position: absolute; left: 50%; transform: translateX(-50%);
        }
        .nw.sc .nw-pill {
          background: rgba(14,14,14,0.8);
          border-color: rgba(255,255,255,0.12);
        }

        /* ── Pill links ── */
        .nw-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 9999px;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none; letter-spacing: 0.02em;
          transition: color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          white-space: nowrap; cursor: pointer;
          background: transparent; border: none; font-family: inherit;
        }
        .nw-link:hover { color: #fff; background: rgba(255,255,255,0.07); }
        .nw-link.active {
          color: #111; background: #fff; font-weight: 600;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        /* ── Right side ── */
        .nw-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        /* ── CTA button ── */
        .nw-cta {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 18px; border-radius: 30px;
          font-size: 12px; font-weight: 700; font-family: inherit;
          letter-spacing: 0.04em; text-decoration: none; cursor: pointer; border: none;
          background: linear-gradient(180deg,#ffffff 0%,#e8e8e8 50%,#d4d4d4 100%);
          color: #111;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9),
                      inset 0 -1px 0 rgba(0,0,0,0.12),
                      0 1px 2px rgba(0,0,0,0.4);
          transition: opacity 0.2s; white-space: nowrap;
        }
        .nw-cta:hover { opacity: 0.88; }

        /* ── Hamburger ── */
        .nw-burger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 6px;
          flex-shrink: 0;
        }
        .nw-burger span {
          display: block; width: 20px; height: 1.5px;
          background: #fff; border-radius: 2px; transition: all 0.25s ease;
        }
        .nw-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nw-burger.open span:nth-child(2) { opacity: 0; }
        .nw-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .nw-mobile {
          position: fixed; top: 64px; left: 0; right: 0;
          background: rgba(8,8,8,0.97);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column;
          padding: 0.5rem 1.25rem 1.25rem; gap: 2px;
          transform: translateY(-110%); opacity: 0;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
          z-index: 99;
          font-family: 'Satoshi','Inter',system-ui,sans-serif;
        }
        .nw-mobile.open { transform: translateY(0); opacity: 1; }

        .nw-mobile a {
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none; padding: 12px 8px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; gap: 10px;
          transition: color 0.2s, background 0.2s;
          border-radius: 8px; letter-spacing: 0.02em;
        }
        .nw-mobile a:last-child { border-bottom: none; }
        .nw-mobile a:hover { color: #fff; background: rgba(255,255,255,0.04); }

        .nw-mobile-cta {
          margin-top: 0.75rem;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 12px; border-radius: 30px;
          font-size: 13px; font-weight: 700; font-family: inherit;
          letter-spacing: 0.04em; text-decoration: none; cursor: pointer; border: none;
          background: linear-gradient(180deg,#ffffff 0%,#e8e8e8 50%,#d4d4d4 100%);
          color: #111 !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.4);
          transition: opacity 0.2s;
          border-bottom: none !important;
          background-color: #fff !important;
        }
        .nw-mobile-cta:hover { opacity: 0.88; background: linear-gradient(180deg,#ffffff 0%,#e8e8e8 50%,#d4d4d4 100%) !important; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .nw-pill { display: none; }
          .nw-cta { display: none; }
          .nw-burger { display: flex; }
        }

        @media (max-width: 480px) {
          .nw-inner { padding: 0 1.25rem; height: 58px; }
          .nw-mobile { top: 58px; }
          .nw-logo-text { font-size: 12px; }
        }
      `}</style>

      {/* Navbar bar */}
      <header className={`nw${scrolled ? " sc" : ""}`}>
        <div className="nw-inner">

          {/* Logo */}
          <a href="/" className="nw-logo">
            {logoUrl && <img src={logoUrl} alt="Onyx Visuals" />}
          </a>

          {/* Centred pill */}
          <nav className="nw-pill">
            <a href="/" className={`nw-link${active === "home" ? " active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              Home
            </a>
            <a href="#work" className={`nw-link${active === "work" ? " active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
              Portfolio
            </a>
            <a href="#vouches" className={`nw-link${active === "feedback" ? " active" : ""}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Feedback
            </a>
            <a href="#about" className={`nw-link${active === "about" ? " active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              About
            </a>
          </nav>

          {/* Right */}
          <div className="nw-right">
            <a href="/order" className="nw-cta">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Order Now
            </a>
            <button
              className={`nw-burger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      <nav className={`nw-mobile${menuOpen ? " open" : ""}`}>
        <a href="/" onClick={() => setMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          Home
        </a>
        <a href="#work" onClick={() => setMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          Portfolio
        </a>
        <a href="#vouches" onClick={() => setMenuOpen(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Feedback
        </a>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          About
        </a>
        <a href="/order" className="nw-mobile-cta" onClick={() => setMenuOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Order Now
        </a>
      </nav>
    </>
  );
}
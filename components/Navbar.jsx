"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl]   = useState("");
  const [active, setActive]     = useState("home");

  useEffect(() => {
    // Fetch logo
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "logo_url")
      .single()
      .then(({ data }) => { if (data?.value) setLogoUrl(data.value); });

    // Scroll → float
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active section on scroll
    const sections = ["work", "services", "about"];
    const onScrollActive = () => {
      let cur = "home";
      sections.forEach(id => {
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
        .nw {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 2rem;
          transition: padding 0.4s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
          font-family: 'Satoshi','Inter',system-ui,sans-serif;
        }
        .nw.sc { padding: 0.75rem 1.5rem; }

        .nw-logo {
          pointer-events: all; display: flex; align-items: center;
          text-decoration: none; flex-shrink: 0; transition: opacity 0.2s;
        }
        .nw-logo:hover { opacity: 0.75; }
        .nw-logo img { max-height: 30px; max-width: 130px; object-fit: contain; display: block; }
        .nw-logo-text { font-size: 13px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #fff; }
        .nw-logo-text span { color: #555; }

        .nw-pill {
          pointer-events: all;
          display: flex; align-items: center; gap: 2px; padding: 5px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(15,15,15,0.5);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 2px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: background 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.4s;
          position: absolute; left: 50%; transform: translateX(-50%);
        }
        .sc .nw-pill {
          background: rgba(12,12,12,0.72);
          border-color: rgba(255,255,255,0.13);
          box-shadow: 0 4px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .nw-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 9999px;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-decoration: none; letter-spacing: 0.02em;
          transition: color 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s;
          white-space: nowrap; cursor: pointer;
          background: transparent; border: none; font-family: inherit;
        }
        .nw-link:hover { color: #fff; background: rgba(255,255,255,0.07); }
        .nw-link.active { color: #111; background: #fff; font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }

        .nw-right { pointer-events: all; display: flex; align-items: center; gap: 10px; }

        .nw-cta {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 18px; border-radius: 30px;
          font-size: 12px; font-weight: 700; font-family: inherit;
          letter-spacing: 0.04em; text-decoration: none; cursor: pointer; border: none;
          background: linear-gradient(180deg,#ffffff 0%,#e8e8e8 50%,#d4d4d4 100%);
          color: #111;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.4);
          transition: opacity 0.2s; white-space: nowrap;
        }
        .nw-cta:hover { opacity: 0.88; }

        .nw-burger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 6px;
        }
        .nw-burger span { display: block; width: 20px; height: 1.5px; background: #fff; border-radius: 2px; transition: all 0.25s ease; }
        .nw-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nw-burger.open span:nth-child(2) { opacity: 0; }
        .nw-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .nw-mobile {
          position: fixed; top: 68px; left: 0; right: 0;
          background: rgba(10,10,10,0.94); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column;
          padding: 0.75rem 1.5rem 1.25rem; gap: 2px;
          transform: translateY(-110%); opacity: 0;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
          z-index: 99; font-family: 'Satoshi','Inter',system-ui,sans-serif;
        }
        .nw-mobile.open { transform: translateY(0); opacity: 1; }
        .nw-mobile a {
          font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.6);
          text-decoration: none; padding: 10px 4px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; gap: 8px; transition: color 0.2s;
        }
        .nw-mobile a:last-child { border-bottom: none; }
        .nw-mobile a:hover { color: #fff; }

        @media (max-width: 768px) {
          .nw { padding: 0 1.5rem; }
          .nw-pill { display: none; }
          .nw-cta { display: none; }
          .nw-burger { display: flex; }
        }
      `}</style>

      <div className={`nw${scrolled ? " sc" : ""}`}>

        <a href="/" className="nw-logo">
          {logoUrl
            ? <img src="https://i.postimg.cc/25Lw0xhg/3.png" alt="Onyx Visuals" />
            : <span className="nw-logo-text">Onyx<span> Visuals</span></span>
          }
        </a>

        {/* Pill */}
        <nav className="nw-pill">
          <a href="/" className={`nw-link${active === "home" ? " active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            Home
          </a>
          <a href="#work" className={`nw-link${active === "work" ? " active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            Portfolio
          </a>
          <a href="#services" className={`nw-link${active === "services" ? " active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
            Services
          </a>
          <a href="#about" className={`nw-link${active === "about" ? " active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            About
          </a>
        </nav>

        {/* Right */}
        <div className="nw-right">
          <a href="#order" className="nw-cta">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Order Now
          </a>
          <button className={`nw-burger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      <nav className={`nw-mobile${menuOpen ? " open" : ""}`}>
        <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#work" onClick={() => setMenuOpen(false)}>Portfolio</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#order" onClick={() => setMenuOpen(false)}>Order Now</a>
      </nav>
    </>
  );
}
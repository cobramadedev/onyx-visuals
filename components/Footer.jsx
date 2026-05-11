import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState("");
  const year = new Date().getFullYear();

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "logo_url")
      .single()
      .then(({ data }) => { if (data?.value) setLogoUrl(data.value); });
  }, []);

  return (
    <>
      <style>{`
        .ft {
          font-family: 'Satoshi','Inter',system-ui,sans-serif;
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 56px 0 0;
        }

        .ft-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .ft-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .ft-brand {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 280px;
        }

        .ft-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .ft-logo-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ft-logo-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }


        .ft-tagline {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.3);
          line-height: 1.7;
        }

        .ft-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 999px;
          padding: 5px 12px 5px 8px;
          width: fit-content;
        }

        .ft-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.6);
          animation: ftPulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes ftPulse {
          0%,100% { opacity:1; }
          50% { opacity:0.4; }
        }

        .ft-status-text {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
        }

        .ft-nav {
          display: flex;
          gap: 56px;
        }

        .ft-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ft-col-title {
          font-size: 11px;
          font-weight: 600;
          color: #808080;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .ft-col a {
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }

        .ft-col a:hover { color: #fff; }

        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 24px 0 32px;
          flex-wrap: wrap;
        }

        .ft-copy {
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.2);
          line-height: 1.6;
        }

        .ft-discord {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 7px 14px;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          font-size: 13px;
          font-family: inherit;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }

        .ft-discord:hover {
          background: rgba(88,101,242,0.1);
          border-color: rgba(88,101,242,0.35);
          color: #7289da;
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .ft-top { flex-direction: column; gap: 36px; }
          .ft-nav { flex-wrap: wrap; gap: 36px; }
        }

        @media (max-width: 480px) {
          .ft-inner { padding: 0 1.5rem; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
          .ft-nav { gap: 28px; }
        }
      `}</style>

      <footer className="ft">
        <div className="ft-inner">

          <div className="ft-top">
            <div className="ft-brand">
              <a href="/" className="ft-logo">
                <div className="ft-logo-icon">
                  {logoUrl
                    ? <img src={logoUrl} alt="Onyx Visuals" />
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                  }
                </div>
              </a>
              <p className="ft-tagline">
                Premium graphics for brands that take their image seriously. Thumbnails, logos, banners & more.
              </p>
              <div className="ft-status">
                <span className="ft-dot" />
                <span className="ft-status-text">Currently accepting orders</span>
              </div>
            </div>

            <nav className="ft-nav">
              <div className="ft-col">
                <span className="ft-col-title">Pages</span>
                <a href="/">Home</a>
                <a href="#work">Portfolio</a>
                <a href="#services">Services</a>
                <a href="#vouches">Feedbacks</a>
                <a href="#order">Order Now</a>
              </div>
              <div className="ft-col">
                <span className="ft-col-title">Portfolio</span>
                <a href="#work">Thumbnails</a>
                <a href="#work">Logos</a>
                <a href="#work">Banners</a>
                <a href="#work">Product Boxes</a>
                <a href="#work">Product Cards</a>
              </div>
              <div className="ft-col">
                <span className="ft-col-title">Legal</span>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Refund Policy</a>
              </div>
            </nav>

          </div>

          <div className="ft-bottom">
            <p className="ft-copy">
              © {year} Onyx Visuals. All rights reserved.
            </p>
            <a href="https://discord.gg/onyxvisuals" target="_blank" rel="noopener noreferrer" className="ft-discord">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#5865F2">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.096 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.096 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z"/>
              </svg>
              Discord
            </a>
          </div>

        </div>
      </footer>
    </>
  );
}
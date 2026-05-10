const styles = `
  footer { position:relative; border-top:1px solid rgba(255,255,255,0.06); background:#0a0a0a; overflow:hidden; font-family:'Satoshi','Inter',system-ui,sans-serif; }
  footer::before { content:''; position:absolute; top:-120px; left:-80px; width:500px; height:500px; background:radial-gradient(ellipse at center,rgba(255,255,255,0.03) 0%,transparent 70%); pointer-events:none; }
  .footer-inner { position:relative; z-index:1; max-width:1280px; margin:0 auto; padding:4rem 2.5rem 0; }
  .footer-top { display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:3rem; padding-bottom:3rem; border-bottom:1px solid rgba(255,255,255,0.05); }
  .footer-brand { display:flex; flex-direction:column; gap:1.25rem; }
  .footer-logo { font-size:14px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:#fff; text-decoration:none; display:inline-block; }
  .footer-logo span { color:#444; }
  .footer-logo img { max-height:32px; max-width:140px; object-fit:contain; }
  .footer-desc { font-size:13px; color:#444; line-height:1.75; max-width:280px; }
  .discord-widget { display:flex; align-items:center; gap:12px; background:rgba(88,101,242,0.08); border:1px solid rgba(88,101,242,0.2); border-radius:12px; padding:12px 14px; text-decoration:none; transition:background 0.2s,border-color 0.2s,box-shadow 0.2s; max-width:260px; }
  .discord-widget:hover { background:rgba(88,101,242,0.14); border-color:rgba(88,101,242,0.4); box-shadow:0 0 24px rgba(88,101,242,0.12); }
  .discord-icon { width:38px; height:38px; border-radius:9px; background:#5865F2; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .discord-icon svg { width:20px; height:20px; fill:#fff; }
  .discord-info { display:flex; flex-direction:column; gap:3px; }
  .discord-name { font-size:13px; font-weight:600; color:#fff; }
  .discord-online { display:flex; align-items:center; gap:5px; font-size:11px; color:#555; }
  .discord-dot { width:6px; height:6px; border-radius:50%; background:#23a55a; flex-shrink:0; animation:pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .discord-join { margin-left:auto; font-size:11px; font-weight:700; color:#fff; background:#5865F2; padding:5px 11px; border-radius:6px; flex-shrink:0; }
  .footer-col { display:flex; flex-direction:column; gap:1rem; }
  .footer-col-title { font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#fff; margin-bottom:0.25rem; }
  .footer-col a { font-size:13px; color:#444; text-decoration:none; transition:color 0.2s; display:flex; align-items:center; gap:6px; }
  .footer-col a:hover { color:#aaa; }
  .footer-col a::before { content:''; width:3px; height:3px; border-radius:50%; background:#2a2a2a; flex-shrink:0; transition:background 0.2s; }
  .footer-col a:hover::before { background:#666; }
  .footer-bottom { display:flex; align-items:center; justify-content:space-between; padding:1.5rem 0; gap:1rem; flex-wrap:wrap; }
  .footer-copy { font-size:12px; color:#2a2a2a; }
  .footer-legal { display:flex; gap:1.5rem; }
  .footer-legal a { font-size:12px; color:#2a2a2a; text-decoration:none; transition:color 0.2s; }
  .footer-legal a:hover { color:#666; }
  @media (max-width:900px) { .footer-top { grid-template-columns:1fr 1fr; gap:2rem; } .footer-brand { grid-column:1/-1; } }
  @media (max-width:540px) { .footer-top { grid-template-columns:1fr; } .footer-bottom { flex-direction:column; align-items:flex-start; } .footer-inner { padding:3rem 1.5rem 0; } }
`;

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="/" className="footer-logo">Onyx<span> Visuals</span></a>
              <p className="footer-desc">Sharp, intentional graphics for brands that take their image seriously. Thumbnails, logos, banners and more — crafted with precision.</p>
              <a href="https://discord.gg/onyxvisuals" target="_blank" rel="noopener noreferrer" className="discord-widget">
                <div className="discord-icon">
                  <svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 2.08 2.08 0 0 0-.65 1.335 22.58 22.58 0 0 0-6.68 0 2.08 2.08 0 0 0-.665-1.335.074.074 0 0 0-.08-.037 19.791 19.791 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.04.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.085 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.085 2.157 2.418 0 1.334-.956 2.419-2.157 2.419z"/></svg>
                </div>
                <div className="discord-info">
                  <span className="discord-name">Onyx Visuals</span>
                  <span className="discord-online"><span className="discord-dot"></span>Join our server</span>
                </div>
                <span className="discord-join">Join</span>
              </a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Pages</span>
              <a href="/">Home</a>
              <a href="#work">Portfolio</a>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#order">Order Now</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Portfolio</span>
              <a href="#work">Thumbnails</a>
              <a href="#work">Logos</a>
              <a href="#work">Banners</a>
              <a href="#work">Product Boxes</a>
              <a href="#work">Product Cards</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Company</span>
              <a href="/admin">Admin</a>
              <a href="https://discord.gg/onyxvisuals" target="_blank" rel="noopener noreferrer">Support</a>
              <a href="https://discord.gg/onyxvisuals" target="_blank" rel="noopener noreferrer">Discord</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 Onyx Visuals. All rights reserved.</span>
            <nav className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

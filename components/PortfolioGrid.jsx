"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

const CATEGORIES = ["All", "Thumbnails", "Logos", "Banners", "Product Boxes", "Product Cards"];

const styles = `
  @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes shimmer { 0% { background-position:-800px 0; } 100% { background-position:800px 0; } }
  @keyframes shiny-text { 0%,70%,100% { background-position:calc(-100% - var(--shiny-width)) 0; } 40%,60% { background-position:calc(100% + var(--shiny-width)) 0; } }
  @keyframes revealUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

  .pg-section { background:#0f0f0f; padding:6rem 2rem; min-height:60vh; font-family:'Satoshi','Inter',system-ui,sans-serif; color:#fff; }
  .pg-header { text-align:center; margin-bottom:3rem; display:flex; flex-direction:column; align-items:center; gap:1.1rem; }
  .reveal { opacity:0; }
  .reveal.visible { animation:revealUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
  .reveal.visible.delay-1 { animation-delay:0.1s; }
  .reveal.visible.delay-2 { animation-delay:0.2s; }
  .pg-badge { display:inline-flex; align-items:center; border-radius:9999px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.06); backdrop-filter:blur(12px); cursor:default; }
  .pg-badge-inner { --shiny-width:120px; display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:6px 14px; font-size:13px; color:rgba(255,255,255,0.6); background-clip:text; -webkit-background-clip:text; background-repeat:no-repeat; background-position:calc(-100% - var(--shiny-width)) 0; background-size:var(--shiny-width) 100%; background-image:linear-gradient(to right,transparent,rgba(255,255,255,0.9),transparent); animation:shiny-text 6s cubic-bezier(.6,.6,0,1) infinite; margin:0; }
  .pg-title { font-size:clamp(2rem,4vw,3rem); font-weight:700; letter-spacing:-0.025em; color:#fff; margin:0; }
  .pg-sub { font-size:14px; color:#444; }
  .pg-tabs { display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; margin-bottom:3rem; }
  .pg-tab { padding:7px 18px; border-radius:30px; font-size:13px; font-weight:500; font-family:inherit; letter-spacing:0.01em; cursor:pointer; border:1px solid rgba(255,255,255,0.08); background:transparent; color:#555; transition:all 0.2s ease; }
  .pg-tab:hover { border-color:rgba(255,255,255,0.15); color:#aaa; }
  .pg-tab.active { background:#fff; color:#0f0f0f; border-color:#fff; font-weight:700; }
  .pg-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; max-width:1300px; margin:0 auto; transition:opacity 0.2s ease; }
  .pg-grid.hidden { opacity:0; }
  .pg-card { position:relative; border-radius:12px; overflow:hidden; background:#1a1a1a; aspect-ratio:16/9; cursor:pointer; animation:fadeIn 0.35s ease forwards; border:1px solid rgba(255,255,255,0.05); }
  .pg-card.square { aspect-ratio:1/1; }
  .pg-card img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),filter 0.4s ease; }
  .pg-card:hover img { transform:scale(1.06); filter:blur(4px) brightness(0.55); }
  .pg-card-overlay { position:absolute; inset:0; opacity:0; transition:opacity 0.3s ease; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; padding:1.1rem; }
  .pg-card:hover .pg-card-overlay { opacity:1; }
  .pg-card-title { font-size:13px; font-weight:600; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:90%; text-align:center; }
  .pg-card-tag { font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.45); font-weight:500; }
  .pg-view-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 18px; border-radius:30px; font-size:12px; font-weight:600; font-family:inherit; letter-spacing:0.03em; cursor:pointer; border:1px solid rgba(255,255,255,0.25); background:linear-gradient(180deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.08) 100%); color:#fff; backdrop-filter:blur(12px); margin-top:4px; transition:background 0.2s; }
  .pg-empty { grid-column:1/-1; text-align:center; padding:5rem 0; color:#333; font-size:14px; }
  .pg-skeleton { border-radius:12px; aspect-ratio:16/9; background:#1a1a1a; background-image:linear-gradient(90deg,#1a1a1a 0px,#242424 200px,#1a1a1a 400px); background-size:800px 100%; animation:shimmer 1.6s infinite linear; }
  .pg-skeleton.square { aspect-ratio:1/1; }
  .pg-lightbox { position:fixed; inset:0; z-index:1000; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.92); backdrop-filter:blur(12px); opacity:0; pointer-events:none; transition:opacity 0.25s ease; }
  .pg-lightbox.open { opacity:1; pointer-events:all; }
  .pg-lightbox-img { max-width:90vw; max-height:88vh; border-radius:12px; object-fit:contain; box-shadow:0 32px 80px rgba(0,0,0,0.6); transform:scale(0.94); transition:transform 0.3s cubic-bezier(0.16,1,0.3,1); }
  .pg-lightbox.open .pg-lightbox-img { transform:scale(1); }
  .pg-lightbox-close { position:absolute; top:1.5rem; right:1.5rem; width:38px; height:38px; border-radius:50%; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.07); color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(8px); transition:background 0.2s; }
  .pg-lightbox-info { position:absolute; bottom:2rem; left:50%; transform:translateX(-50%); text-align:center; }
  .pg-lightbox-name { font-size:14px; font-weight:600; color:#fff; }
  .pg-lightbox-cat { font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-top:3px; }
  @media (max-width:1024px) { .pg-grid { grid-template-columns:repeat(3,1fr); } }
  @media (max-width:640px) { .pg-grid { grid-template-columns:repeat(2,1fr); gap:10px; } }
`;

export default function PortfolioGrid() {
  const [active, setActive]       = useState("All");
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [visible, setVisible]     = useState(true);
  const [lightbox, setLightbox]   = useState(null);
  const headerRef                 = useRef(null);

  useEffect(() => {
    fetchItems("All");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
  }, []);

  const fetchItems = async (category) => {
    setLoading(true);
    let query = supabase.from("portfolio").select("id,title,category,image_url").order("created_at", { ascending: false });
    if (category !== "All") query = query.eq("category", category);
    const { data } = await query;
    if (data) setItems(data);
    setLoading(false);
  };

  const switchCategory = (cat) => {
    if (cat === active) return;
    setVisible(false);
    setTimeout(() => { setActive(cat); fetchItems(cat); setVisible(true); }, 200);
  };

  const openLightbox = (item) => { setLightbox(item); document.body.style.overflow = "hidden"; };
  const closeLightbox = () => { setLightbox(null); document.body.style.overflow = ""; };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <section className="pg-section" id="work">
        <div className="pg-header">
          <div className="pg-badge reveal" data-reveal>
            <p className="pg-badge-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>
              </svg>
              Our Work
            </p>
          </div>
          <h2 className="pg-title reveal delay-1" data-reveal>The Portfolio</h2>
          <p className="pg-sub reveal delay-2" data-reveal>Browse work across every category we offer.</p>
        </div>

        <div className="pg-tabs">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`pg-tab${active === cat ? " active" : ""}`} onClick={() => switchCategory(cat)}>{cat}</button>
          ))}
        </div>

        <div className="pg-grid" style={{ opacity: visible ? 1 : 0 }}>
          {loading ? Array.from({ length: 8 }).map((_, i) => <div key={i} className={`pg-skeleton${active === "Logos" ? " square" : ""}`} />) :
           items.length === 0 ? <div className="pg-empty">No items in this category yet.</div> :
           items.map(item => (
            <div key={item.id} className={`pg-card${item.category === "Logos" ? " square" : ""}`}>
              <img src={item.image_url} alt={item.title} loading="lazy" />
              <div className="pg-card-overlay">
                <span className="pg-card-title">{item.title}</span>
                <span className="pg-card-tag">{item.category}</span>
                <button className="pg-view-btn" onClick={() => openLightbox(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  View Image
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <div className={`pg-lightbox${lightbox ? " open" : ""}`} onClick={e => { if (e.target.classList.contains("pg-lightbox")) closeLightbox(); }}>
        <button className="pg-lightbox-close" onClick={closeLightbox}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        {lightbox && <img className="pg-lightbox-img" src={lightbox.image_url} alt={lightbox.title} />}
        {lightbox && (
          <div className="pg-lightbox-info">
            <p className="pg-lightbox-name">{lightbox.title}</p>
            <p className="pg-lightbox-cat">{lightbox.category}</p>
          </div>
        )}
      </div>
    </> 
  );
}
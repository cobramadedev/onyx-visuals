import Head from "next/head";
import Script from "next/script";
import { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SHOP_ID = 123197;

const INDIVIDUAL = [
  { id: 717001, variantId: 1152309, name: "Logo",                     price: "$9.99",  desc: "Clean, memorable logo tailored to your brand identity." },
  { id: 717002, variantId: 1152310, name: "Server Banner",            price: "$9.99",  desc: "Eye-catching animated or static Discord server banner." },
  { id: 717003, variantId: 1152311, name: "Profile Banner",           price: "$9.99",  desc: "Stylish personal profile banner for Discord or social media." },
  { id: 717006, variantId: 1152316, name: "Product Box",              price: "$1.99",  desc: "Sharp product box mockup for your digital storefront." },
  { id: 717007, variantId: 1152317, name: "Product Card",             price: "$1.99",  desc: "Sleek product card design for showcasing items." },
  { id: 717011, variantId: 1152323, name: "Thumbnail",                price: "$4.99",  desc: "High-converting YouTube or content thumbnail." },
  { id: 717005, variantId: 1152315, name: "Server Invite Background", price: "$4.99",  desc: "Custom Discord server invite background graphic." },
  { id: 717012, variantId: 1152324, name: "Signature",                price: "$7.99",  desc: "Unique forum or profile signature graphic." },
];

const PACKAGES = [
  { id: 717015, variantId: 1152331, name: "Onyx Gold",    price: "$29.99",  badge: "Popular",    desc: "A curated bundle of our most requested GFX items to elevate your brand." },
  { id: 717016, variantId: 1152332, name: "Onyx Diamond", price: "$49.99",  badge: "Best Value",  desc: "Full brand kit — logos, banners, product boxes and more in one package." },
  { id: 717017, variantId: 1152333, name: "Onyx Nemesis", price: "$149.99", badge: "Premium",     desc: "The complete Onyx experience. Most of the stuff we offer, crafted to perfection." },
];

const BADGE_COLORS = {
  "Popular":    { bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)",  color: "#f59e0b" },
  "Best Value": { bg: "rgba(99,102,241,0.1)",   border: "rgba(99,102,241,0.25)",  color: "#818cf8" },
  "Premium":    { bg: "rgba(236,72,153,0.1)",   border: "rgba(236,72,153,0.25)",  color: "#f472b6" },
};

function BuyButton({ productId, variantId, full }) {
  const btnRef = useRef(null);

  return (
    <button
      ref={btnRef}
      type="button"
      className="sellauth-button bb"
      onClick={() => {
        if (window.sellAuthEmbed) {
          window.sellAuthEmbed.checkout(btnRef.current, {
            cart: [{ productId, variantId, quantity: 1 }],
            shopId: SHOP_ID,
            modal: true,
          });
        }
      }}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
        width: full ? "100%" : "auto",
        padding: "10px 20px", borderRadius: 30,
        fontSize: 13, fontWeight: 700, fontFamily: "inherit",
        border: "none", cursor: "pointer",
        background: "linear-gradient(180deg,#fff 0%,#e8e8e8 50%,#d4d4d4 100%)",
        color: "#111",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 3px rgba(0,0,0,0.4)",
        transition: "opacity 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="icon cart" width="13" height="13" viewBox="0 0 256 256" fill="currentColor">
        <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon spinner" width="13" height="13" viewBox="0 0 256 256" fill="currentColor">
        <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"/>
      </svg>
      <span>Buy Now</span>
    </button>
  );
}

export default function OrderPage() {
  return (
    <>
      <Head>
        <title>Order — Onyx Visuals</title>
      </Head>

      {/* Sellauth embed script */}
      <Script src="https://sellauth.com/assets/js/sellauth-embed-2.js" strategy="beforeInteractive" />

      <style>{`
        /* Sellauth spinner/cart icon visibility handled by the script */
        .sellauth-button .icon.spinner { display: none; }
        .sellauth-button.loading .icon.cart { display: none; }
        .sellauth-button.loading .icon.spinner { display: inline; animation: sa-spin 0.8s linear infinite; }
        @keyframes sa-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .sp { min-height:100vh; background:#0f0f0f; font-family:'Satoshi','Inter',system-ui,sans-serif; color:#fff; }
        .sp-hero { text-align:center; padding:10rem 2rem 5rem; border-bottom:1px solid rgba(255,255,255,0.05); }
        .sp-badge { display:inline-flex; align-items:center; gap:6px; border-radius:9999px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.05); padding:6px 14px; font-size:13px; color:rgba(255,255,255,0.5); margin-bottom:1.25rem; }
        .sp-title { font-size:clamp(2.2rem,5vw,3.5rem); font-weight:700; letter-spacing:-0.03em; margin:0 0 1rem; line-height:1.1; }
        .sp-sub { font-size:15px; color:#444; max-width:460px; margin:0 auto; line-height:1.7; }
        .sp-sec { max-width:1200px; margin:0 auto; padding:5rem 2rem; }
        .sp-sec-t { font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#808080; margin-bottom:2rem; display:flex; align-items:center; gap:12px; }
        .sp-sec-t::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.05); }
        .ig { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .ic { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; gap:10px; transition:border-color 0.2s,background 0.2s; }
        .ic:hover { border-color:rgba(255,255,255,0.12); background:rgba(255,255,255,0.045); }
        .ic-name { font-size:14px; font-weight:600; color:#fff; }
        .ic-desc { font-size:12px; color:#3a3a3a; line-height:1.6; flex:1; }
        .ic-price { font-size:18px; font-weight:700; color:#fff; letter-spacing:-0.02em; }
        .pg { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .pc { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:1.75rem; display:flex; flex-direction:column; gap:14px; transition:border-color 0.2s,background 0.2s; }
        .pc:hover { border-color:rgba(255,255,255,0.12); background:rgba(255,255,255,0.045); }
        .pc-top { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; }
        .pc-name { font-size:16px; font-weight:700; color:#fff; }
        .pc-badge { font-size:10px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; padding:3px 10px; border-radius:20px; flex-shrink:0; }
        .pc-price { font-size:32px; font-weight:700; color:#fff; letter-spacing:-0.03em; }
        .pc-desc { font-size:13px; color:#3a3a3a; line-height:1.7; flex:1; }
        .pc-div { height:1px; background:rgba(255,255,255,0.05); }
        @media (max-width:1024px) { .ig { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:768px) { .ig { grid-template-columns:repeat(2,1fr); } .pg { grid-template-columns:1fr; } }
        @media (max-width:480px) { .ig { grid-template-columns:1fr; } .sp-sec { padding:3rem 1.5rem; } }
      `}</style>

      <div className="sp" id="order">
        <Navbar />

        <div className="sp-hero">
          <div className="sp-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Order Now
          </div>
          <h1 className="sp-title">Premium Graphics,<br />Delivered Fast.</h1>
          <p className="sp-sub">Browse our services below and checkout securely via Sellauth.</p>
        </div>

        {/* Individual Items */}
        <div className="sp-sec">
          <div className="sp-sec-t">Individual Items</div>
          <div className="ig">
            {INDIVIDUAL.map(item => (
              <div key={item.id} className="ic">
                <div className="ic-name">{item.name}</div>
                <div className="ic-desc">{item.desc}</div>
                <div className="ic-price">{item.price}</div>
                <BuyButton productId={item.id} variantId={item.variantId} full />
              </div>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div className="sp-sec" style={{ paddingTop: 0 }}>
          <div className="sp-sec-t">Packages</div>
          <div className="pg">
            {PACKAGES.map(pkg => {
              const bc = BADGE_COLORS[pkg.badge];
              return (
                <div key={pkg.id} className="pc">
                  <div className="pc-top">
                    <div className="pc-name">{pkg.name}</div>
                    <span className="pc-badge" style={{ background: bc.bg, border: `1px solid ${bc.border}`, color: bc.color }}>
                      {pkg.badge}
                    </span>
                  </div>
                  <div className="pc-price">{pkg.price}</div>
                  <div className="pc-desc">{pkg.desc}</div>
                  <div className="pc-div" />
                  <BuyButton productId={pkg.id} variantId={pkg.variantId} full />
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
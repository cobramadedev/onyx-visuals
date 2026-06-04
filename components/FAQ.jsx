import { useState } from "react";

const FAQS = [
  {
    q: "How fast are your delivery times?",
    a: "Most orders are completed within 24 hours. More complex projects such as full website builds or large GFX packages may take up to 48 hours. You'll be kept updated throughout the process via Discord ticket.",
  },
  {
    q: "Who is the owner of Onyx Visuals?",
    a: "Onyx Visuals is founded and led by Cobra, a designer based in London, UK. The team also includes Kosmy and Geeked, designers based in Canada and the US respectively.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes. We offer revisions on all orders until you're satisfied with the result. Just let us know what you'd like changed through your Discord ticket and we'll sort it. Please note that revisions after the animation has been done, an additional fee may be required depending on the extent of the changes.",
  },
  {
    q: "How do I place an order?",
    a: "Head to our Order page, choose your service and complete checkout securely via Sellauth. Once paid, open a ticket in our Discord server and provide your order details and brief — we'll take it from there.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major debit and credit cards, as well as cryptocurrency — all processed securely through Sellauth.",
  },
  {
    q: "Can I see examples of your work before ordering?",
    a: "Absolutely. Browse the Portfolio section on our site to see work across every category we offer. You can also check our Discord server for the latest work and client vouches.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.25rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "'Satoshi','Inter',system-ui,sans-serif",
        }}
      >
        <span style={{
          fontSize: 15,
          fontWeight: 600,
          background: "linear-gradient(to top, #9ca0ab 0%, #ffffff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.4,
        }}>
          {q}
        </span>
        <span style={{
          flexShrink: 0,
          width: 24, height: 24,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.0001 11.121L8.28755 14.8335L7.22705 13.773L12.0001 9L16.7731 13.773L15.7126 14.8335L12.0001 11.121Z"
              fill="url(#faqChev)"
            />
            <defs>
              <linearGradient id="faqChev" x1="12" y1="9" x2="12" y2="17.22" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="#363A3F" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </button>

      <div style={{
        overflow: "hidden",
        maxHeight: open ? "400px" : "0px",
        transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <p style={{
          fontSize: 14,
          color: "#444",
          lineHeight: 1.8,
          padding: "0 0 1.25rem",
          margin: 0,
          fontFamily: "'Satoshi','Inter',system-ui,sans-serif",
        }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <style>{`
        @keyframes faqReveal {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .faq-reveal { opacity:0; }
        .faq-reveal.faq-visible { animation: faqReveal 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
        .faq-reveal.faq-d1 { animation-delay: 0.08s; }
        .faq-reveal.faq-d2 { animation-delay: 0.16s; }

        @keyframes faqShine {
          0%,70%,100% { background-position: calc(-100% - 120px) 0; }
          40%,60%     { background-position: calc(100% + 120px) 0; }
        }
      `}</style>

      <section
        id="faq"
        style={{
          background: "#0a0a0a",
          padding: "6rem 2rem",
          fontFamily: "'Satoshi','Inter',system-ui,sans-serif",
        }}
        ref={el => {
          if (!el) return;
          const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
              el.querySelectorAll(".faq-reveal").forEach(x => x.classList.add("faq-visible"));
              obs.disconnect();
            }
          }, { threshold: 0.1 });
          obs.observe(el);
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "5rem", alignItems: "start" }}>
          <div className="faq-reveal" style={{ position: "sticky", top: "8rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              padding: "6px 14px",
              marginBottom: "1.25rem",
            }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, fontWeight: 100, letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.5)",
                "--shiny-width": "120px",
                backgroundImage: "linear-gradient(to right,transparent,rgba(255,255,255,0.8),transparent)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "calc(-100% - var(--shiny-width)) 0",
                backgroundSize: "var(--shiny-width) 100%",
                animation: "faqShine 5s cubic-bezier(.6,.6,0,1) infinite",
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                </svg>
                Have a Question?
              </span>
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              margin: "0 0 1rem",
              background: "linear-gradient(to top, #696969 0%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Frequently Asked<br />Questions
            </h2>

            <p style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.75, margin: "0 0 1.5rem" }}>
              Can't find your answer here? Open a ticket on our Discord and we'll get back to you fast.
            </p>

            <a
              href="https://discord.gg/onyxvisuals"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "9px 18px", borderRadius: 30,
                fontSize: 12, fontWeight: 600, fontFamily: "inherit",
                textDecoration: "none", color: "rgba(255,255,255,0.55)",
                background: "rgba(88,101,242,0.08)",
                border: "1px solid rgba(88,101,242,0.2)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(88,101,242,0.15)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(88,101,242,0.08)"; e.currentTarget.style.color="rgba(255,255,255,0.55)"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.003.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.096 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.096 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z"/></svg>
              Ask on Discord
            </a>
          </div>

          {/* Right — accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="faq-reveal"
                style={{ animationDelay: `${0.08 + i * 0.07}s` }}
                ref={el => {
                  if (!el) return;
                  const obs = new IntersectionObserver(([e]) => {
                    if (e.isIntersecting) { el.classList.add("faq-visible"); obs.disconnect(); }
                  }, { threshold: 0.15 });
                  obs.observe(el);
                }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </div>
            ))}
          </div>

        </div>

        {/* Mobile layout */}
        <style>{`
          @media (max-width: 768px) {
            #faq > div > div {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
            #faq > div > div > div:first-child {
              position: static !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
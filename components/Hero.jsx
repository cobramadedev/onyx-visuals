const styles = `
  @keyframes aurora {
    0%   { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  @keyframes bounce-scroll {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(7px); }
  }

  @keyframes shiny-text {
    0%, 70%, 100% { background-position: calc(-100% - var(--shiny-width)) 0; }
    40%, 60%      { background-position: calc(100% + var(--shiny-width)) 0; }
  }

  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #0f0f0f;
    font-family: 'Satoshi', 'Inter', system-ui, sans-serif;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  .aurora-mask {
    pointer-events: none;
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 75%;
    z-index: 1;
    overflow: hidden;
    -webkit-mask-image: radial-gradient(ellipse at 55% 0%, black 10%, transparent 70%);
            mask-image: radial-gradient(ellipse at 55% 0%, black 10%, transparent 70%);
  }

  .aurora-inner {
    width: 200%;
    height: 100%;
    animation: aurora 90s linear infinite;
    will-change: transform;
    background-image: repeating-linear-gradient(
      105deg,
      transparent 0%,
      transparent 2%,
      rgba(255,255,255,0.00) 2%,
      rgba(255,255,255,0.07) 3.5%,
      rgba(255,255,255,0.12) 5%,
      rgba(255,255,255,0.07) 6.5%,
      rgba(255,255,255,0.00) 8%,
      transparent 8%,
      transparent 10%,
      rgba(255,255,255,0.00) 10%,
      rgba(255,255,255,0.04) 11%,
      rgba(255,255,255,0.08) 12.5%,
      rgba(255,255,255,0.04) 14%,
      rgba(255,255,255,0.00) 15%,
      transparent 15%,
      transparent 17%,
      rgba(255,255,255,0.00) 17%,
      rgba(255,255,255,0.09) 19%,
      rgba(255,255,255,0.16) 21.5%,
      rgba(255,255,255,0.09) 24%,
      rgba(255,255,255,0.00) 26%,
      transparent 26%,
      transparent 28%,
      rgba(255,255,255,0.00) 28%,
      rgba(255,255,255,0.03) 29%,
      rgba(255,255,255,0.06) 30%,
      rgba(255,255,255,0.03) 31%,
      rgba(255,255,255,0.00) 32%,
      transparent 32%,
      transparent 34%,
      rgba(255,255,255,0.00) 34%,
      rgba(255,255,255,0.06) 36%,
      rgba(255,255,255,0.13) 38.5%,
      rgba(255,255,255,0.06) 41%,
      rgba(255,255,255,0.00) 43%,
      transparent 43%,
      transparent 45%,
      rgba(255,255,255,0.00) 45%,
      rgba(255,255,255,0.05) 46.5%,
      rgba(255,255,255,0.10) 48%,
      rgba(255,255,255,0.05) 49.5%,
      rgba(255,255,255,0.00) 50%,
      transparent 50%
    );
  }

  .aurora-fade {
    pointer-events: none;
    position: absolute;
    left: 0; right: 0;
    top: 38%; height: 42%;
    background: linear-gradient(to bottom, transparent, #0f0f0f);
    z-index: 2;
  }

  .hero-body {
    position: relative;
    z-index: 20;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5rem 2rem 6rem;
    gap: 1.75rem;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.06);
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    backdrop-filter: blur(12px);
    cursor: pointer;
    transition: all 0.2s ease-in;
  }

  .hero-badge:hover {
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,255,255,0.18);
  }

  .hero-badge-inner {
    --shiny-width: 120px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 6px 14px;
    font-size: 13px;
    color: rgba(255,255,255,0.6);
    background-clip: text;
    -webkit-background-clip: text;
    background-repeat: no-repeat;
    background-position: calc(-100% - var(--shiny-width)) 0;
    background-size: var(--shiny-width) 100%;
    background-image: linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent);
    animation: shiny-text 6s cubic-bezier(.6,.6,0,1) infinite;
    transition: color 0.3s ease;
    margin: 0;
  }

  .hero-badge:hover .hero-badge-inner { color: rgba(255,255,255,0.85); }

  .hero-badge-arrow {
    width: 12px;
    height: 12px;
    transition: transform 0.3s ease;
    flex-shrink: 0;
    color: rgba(255,255,255,0.4);
  }

  .hero-badge:hover .hero-badge-arrow { transform: translateX(2px); }

  .hero-h1 {
    font-family: 'Satoshi', 'Inter', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(3rem, 7vw, 5.4rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: #fff;
    max-width: 820px;
    margin: 0;
    font-style: normal;
  }

  .hero-sub {
    font-size: 15px;
    color: #555;
    max-width: 400px;
    line-height: 1.8;
    letter-spacing: 0.01em;
  }

  .hero-cta-row {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 0.5rem;
  }

  .hero-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 0.78rem 1.85rem;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 700;
    font-family: 'Satoshi', 'Inter', system-ui, sans-serif;
    text-decoration: none;
    transition: background 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    white-space: nowrap;
    letter-spacing: 0.01em;
    cursor: pointer;
    isolation: isolate;
    border: none;
  }

  .hero-btn-primary {
    background: linear-gradient(180deg, #ffffff 0%, #e8e8e8 50%, #d4d4d4 100%);
    color: #111;
    border: 1px solid rgba(255,255,255,0.25);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.9),
      inset 0 -1px 0 rgba(0,0,0,0.12),
      0 1px 2px rgba(0,0,0,0.4),
      0 8px 24px -6px rgba(255,255,255,0.12);
  }

  .hero-btn-primary:hover {
    background: linear-gradient(180deg, #ffffff 0%, #efefef 50%, #dedede 100%);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,1),
      inset 0 -1px 0 rgba(0,0,0,0.1),
      0 1px 2px rgba(0,0,0,0.4),
      0 10px 28px -6px rgba(255,255,255,0.18);
  }

  .hero-btn-ghost {
    background: linear-gradient(180deg,
      rgba(255,255,255,0.085) 0%,
      rgba(255,255,255,0.04) 55%,
      rgba(255,255,255,0.02) 100%
    );
    color: rgba(255,255,255,0.88);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      inset 0 -1px 0 rgba(0,0,0,0.22),
      0 1px 2px rgba(0,0,0,0.3);
  }

  .hero-btn-ghost:hover {
    background: linear-gradient(180deg,
      rgba(255,255,255,0.12) 0%,
      rgba(255,255,255,0.065) 55%,
      rgba(255,255,255,0.035) 100%
    );
    border-color: rgba(255,255,255,0.16);
    color: #fff;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.14),
      inset 0 -1px 0 rgba(0,0,0,0.22),
      0 1px 2px rgba(0,0,0,0.3);
  }

  .hero-scroll {
    position: absolute;
    bottom: 1.75rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: rgba(255,255,255,0.22);
    animation: bounce-scroll 2s ease-in-out infinite;
  }
`;

export default function Hero() {
  return (
    <>
      <style>{styles}</style>

      <section className="hero">

        <div className="aurora-mask" aria-hidden="true">
          <div className="aurora-inner" />
        </div>
        <div className="aurora-fade" aria-hidden="true" />

        <div className="hero-body">

          <div className="hero-badge">
            <p className="hero-badge-inner">
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 100 100" fill="currentColor">
                  <path d="m50.027 10.459-.018-.032-33.606 19.404.076.132v22.893h.014c.286 19.111 14.859 34.755 33.519 36.718 18.66-1.962 33.234-17.606 33.519-36.718V29.953l.066-.114zm-.015 69.097V51.677H26.435V35.651L50.012 22.04v29.637h23.563v1.179h.017c-.278 13.593-10.439 24.798-23.58 26.7" />
                </svg>
                Trusted by 700+ Satisfied Customers
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hero-badge-arrow">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </p>
          </div>

          <h1 className="hero-h1">
            Luxury in Every Pixel
          </h1>

          <p className="hero-sub">
            Onyx Visuals crafts sharp, intentional graphics for brands
            that take their image seriously.
          </p>

          <div className="hero-cta-row">
            <a href="#work" className="hero-btn hero-btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Browse Portfolio
            </a>

            <a href="#order" className="hero-btn hero-btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Order Now
            </a>
          </div>

        </div>

        <div className="hero-scroll" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="7" />
            <path d="M12 6v4" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

      </section>
    </>
  );
}

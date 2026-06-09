import { useState, useEffect } from "react";

export default function Popup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 768) return;
    // Show after a short delay
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setClosing(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes popupIn {
          from { opacity:0; transform:translateY(16px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes popupOut {
          from { opacity:1; transform:translateY(0) scale(1); }
          to   { opacity:0; transform:translateY(16px) scale(0.97); }
        }
        .popup-wrap {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9998;
          max-width: 340px;
          width: 100%;
          animation: ${closing ? "popupOut" : "popupIn"} 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .popup-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 16px;
          padding: 1.25rem 1.25rem 1.25rem 1.1rem;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
          font-family: 'Satoshi','Inter',system-ui,sans-serif;
        }
        .popup-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .popup-body { flex: 1; min-width: 0; }
        .popup-label {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin: 0 0 4px;
        }
        .popup-msg {
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          margin: 0;
        }
        .popup-close {
          flex-shrink: 0;
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.25);
          transition: color 0.2s;
          padding: 0; margin-top: 1px;
        }
        .popup-close:hover { color: rgba(255,255,255,0.7); }
      `}</style>

      <div className="popup-wrap">
        <div className="popup-card">
          <div className="popup-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
          </div>
          <div className="popup-body">
            <p className="popup-label">Note</p>
            <p className="popup-msg">SellAuth Themes will soon be available for purchase on our website.</p>
          </div>
          <button className="popup-close" onClick={close} aria-label="Dismiss">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
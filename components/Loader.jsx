import { useState, useEffect } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for everything to load
    const done = () => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    };

    if (document.readyState === "complete") {
      setTimeout(done, 300);
    } else {
      window.addEventListener("load", () => setTimeout(done, 300));
    }
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes loaderSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#0a0a0a",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "2rem",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: fadeOut ? "none" : "all",
      }}>
        {/* Spinner */}
        <div style={{
          width: 32, height: 32,
          border: "2px solid rgba(255,255,255,0.08)",
          borderTopColor: "rgba(255,255,255,0.6)",
          borderRadius: "50%",
          animation: "loaderSpin 0.75s linear infinite",
        }} />
      </div>
    </>
  );
}
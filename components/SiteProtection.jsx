import { useEffect } from "react";

export default function SiteProtection() {
  useEffect(() => {
    // ── Disable right-click ──
    const noContext = (e) => e.preventDefault();
    document.addEventListener("contextmenu", noContext);

    // ── Disable text selection ──
    const noSelect = (e) => e.preventDefault();
    document.addEventListener("selectstart", noSelect);

    // ── Disable image drag ──
    const noDrag = (e) => { if (e.target.tagName === "IMG") e.preventDefault(); };
    document.addEventListener("dragstart", noDrag);

    // ── Disable common copy/save shortcuts ──
    const noShortcuts = (e) => {
      const blocked = (
        // Ctrl+S (save), Ctrl+U (view source), Ctrl+Shift+I (devtools on some)
        (e.ctrlKey && ["s", "u"].includes(e.key.toLowerCase())) ||
        // Cmd equivalents on Mac
        (e.metaKey && ["s", "u"].includes(e.key.toLowerCase()))
      );
      if (blocked) e.preventDefault();
    };
    document.addEventListener("keydown", noShortcuts);

    // ── Console warning ──
    console.clear();
    console.log(
      "%cPlease dont be a skid!",
      "color:#fff;background:#0a0a0a;font-size:32px;font-weight:700;padding:8px 16px;"
    );
    console.log(
      "%cThis is a protected site. Unauthorized use of content is prohibited.",
      "color:#808080;font-size:14px;"
    );

    return () => {
      document.removeEventListener("contextmenu", noContext);
      document.removeEventListener("selectstart", noSelect);
      document.removeEventListener("dragstart", noDrag);
      document.removeEventListener("keydown", noShortcuts);
    };
  }, []);

  // Inject CSS-based protection
  return (
    <style>{`
      img { -webkit-user-drag: none; user-drag: none; pointer-events: none; }
      .pg-view-btn, .h-btn-p, .h-btn-g, .hero-btn, .bb, a { pointer-events: all !important; }
      ::selection { background: transparent; }
      ::-moz-selection { background: transparent; }
    `}</style>
  );
}
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ── Primary Meta ───────────────────────── */}
        <meta charSet="utf-8" />
        <meta name="description" content="Onyx Visuals — Luxury in Every Pixel. Premium graphics for brands that take their image seriously. Thumbnails, logos, banners, product boxes & more." />
        <meta name="keywords" content="graphic design, thumbnails, logos, banners, product boxes, product cards, onyx visuals, custom graphics" />
        <meta name="author" content="Onyx Visuals" />
        <meta name="theme-color" content="#808080" />

        {/* ── Open Graph (Discord, Facebook etc) ─── */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onyxvisuals.vercel.app" />
        <meta property="og:title" content="Onyx Visuals — Luxury in Every Pixel" />
        <meta property="og:description" content="Premium graphics for brands that take their image seriously. Thumbnails, logos, banners, product boxes & more. Trusted by 700+ satisfied customers." />
        <meta property="og:image" content="https://i.postimg.cc/25Lw0xhg/3.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Onyx Visuals" />

        {/* ── Twitter Card ────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Onyx Visuals — Luxury in Every Pixel" />
        <meta name="twitter:description" content="Premium graphics for brands that take their image seriously. Thumbnails, logos, banners & more." />
        <meta name="twitter:image" content="https://i.postimg.cc/25Lw0xhg/3.png" />

        {/* ── Favicon ─────────────────────────────── */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* ── Fonts ───────────────────────────────── */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
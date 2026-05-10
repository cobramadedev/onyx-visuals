import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PortfolioGrid from "../components/PortfolioGrid";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PortfolioGrid />
      </main>
      <Footer />
    </>
  );
}

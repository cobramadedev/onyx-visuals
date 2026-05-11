import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PortfolioGrid from "../components/PortfolioGrid";
import Footer from "../components/Footer";
import Vouches from "../components/Vouches";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PortfolioGrid />
        <Vouches />
      </main>
      <Footer />
    </>
  );
}

import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import { products } from "../lib/products";

export default function Home({ initialProducts = [] }) {
  return (
    <>
      <Head>
        <meta name="description" content="Dropify — modern streetwear drops." />
      </Head>
      <Header />
      <main>
        <Hero />
        <section className="section">
          <div className="container">
            <h2 className="section-title">Featured Drops</h2>
            <ProductGrid initialProducts={initialProducts} />
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">About Dropify</h2>
            <p style={{ color: "var(--muted)" }}>Dropify curates limited streetwear drops made from premium materials. We focus on fit, function and making each drop memorable.</p>
          </div>
        </section>
      </main>
      <footer style={{ padding: 36, textAlign: "center", color: "var(--muted)" }}>
        © {new Date().getFullYear()} Dropify — Made for bold drops
      </footer>
    </>
  );
}

export async function getServerSideProps() {
  // server-side fetch — replace with real headless API
  // using the mock list from lib/products for now.
  return {
    props: {
      initialProducts: products.slice(0, 6)
    }
  };
}
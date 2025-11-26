import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const Grid = styled.div`
  display:grid; grid-template-columns: repeat(3, 1fr); gap:20px;
  @media (max-width:1000px){ grid-template-columns: repeat(2,1fr); }
  @media (max-width:600px){ grid-template-columns: 1fr; }
`;

export default function ProductGrid({ initialProducts = [] }) {
  const [items, setItems] = useState(initialProducts);
  const [selected, setSelected] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const { add } = useCart();

  async function loadMore() {
    setLoadingMore(true);
    // example: fetch API (headless later)
    try {
      const res = await fetch(`/api/products?skip=${items.length}&limit=6`);
      const json = await res.json();
      setItems(prev => [...prev, ...json.data]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    // lazy infinite scroll trigger
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 700 && !loadingMore) {
        loadMore();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [items, loadingMore]);

  function handleAdd(product) {
    add({ productId: product.id, title: product.title, price: product.price, image: product.images[0] });
  }

  return (
    <>
      <Grid>
        {items.map((p) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <ProductCard product={p} onQuickView={(pr) => setSelected(pr)} onAdd={handleAdd} />
          </motion.div>
        ))}
      </Grid>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
        <button className="btn secondary" onClick={loadMore} disabled={loadingMore}>
          {loadingMore ? "Loading..." : "Load more"}
        </button>
      </div>

      {selected && <QuickViewModal product={selected} onClose={() => setSelected(null)} onAdd={handleAdd} />}
    </>
  );
}
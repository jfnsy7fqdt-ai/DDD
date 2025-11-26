import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";

const Card = styled(motion.article)`
  background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:12px;
  transition:transform .28s var(--ease);
  &:hover { transform: translateY(-8px); }
  .meta { display:flex; justify-content:space-between; align-items:center; }
  .title{ font-size:15px; margin:0; }
  .price{ color:var(--accent); font-weight:600; }
  .actions{ display:flex; gap:8px; margin-top:auto; }
`;

export default function ProductCard({ product, onQuickView, onAdd }) {
  return (
    <Card whileHover={{ y: -6 }} whileTap={{ scale: 0.99 }} layout>
      <div style={{ borderRadius: 10, overflow: "hidden", height: 220 }}>
        <Image src={product.images[0]} alt={product.title} width={800} height={600} sizes="(max-width: 800px) 100vw, 33vw" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
      </div>
      <div className="meta">
        <h3 className="title">{product.title}</h3>
        <div className="price">${product.price}</div>
      </div>
      <p style={{ color: "var(--muted)", margin: 0, fontSize: 14 }}>{product.description}</p>
      <div className="actions">
        <button className="btn secondary" onClick={() => onQuickView(product)}>Quick view</button>
        <button className="btn primary" onClick={() => onAdd(product)}>Add to cart</button>
      </div>
    </Card>
  );
}
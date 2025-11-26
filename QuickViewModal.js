import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";

const ModalWrap = styled(motion.div)`
  position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:70;
`;
const Backdrop = styled.div`
  position:absolute; inset:0; background:rgba(2,6,12,0.7); backdrop-filter: blur(6px);
`;
const Panel = styled(motion.div)`
  position:relative; width:min(900px,96%); background:linear-gradient(180deg, rgba(11,12,15,0.9), rgba(11,12,15,0.95));
  border-radius:12px; padding:20px; display:flex; gap:16px; z-index:10; overflow:hidden;
`;
const Close = styled.button`
  position:absolute; right:10px; top:8px; border:0; background:transparent; color:var(--muted);
`;

export default function QuickViewModal({ product, onClose, onAdd }) {
  if (!product) return null;
  return (
    <ModalWrap initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Backdrop onClick={onClose} />
      <Panel initial={{ scale: 0.98 }} animate={{ scale: 1 }}>
        <div style={{ width: 360, borderRadius: 8, overflow: "hidden" }}>
          <Image src={product.images[0]} alt={product.title} width={800} height={800} style={{ objectFit: "cover" }} />
        </div>
        <div style={{ maxWidth: 420 }}>
          <h3 style={{ marginTop: 0 }}>{product.title}</h3>
          <div style={{ color: "var(--accent)", fontWeight: 700 }}>${product.price}</div>
          <p style={{ color: "var(--muted)" }}>{product.description}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
            <button className="btn primary" onClick={() => { onAdd(product); onClose?.(); }}>
              Add to cart
            </button>
            <button className="btn secondary" onClick={onClose}>Close</button>
          </div>
        </div>
        <Close aria-label="Close" onClick={onClose}>✕</Close>
      </Panel>
    </ModalWrap>
  );
}
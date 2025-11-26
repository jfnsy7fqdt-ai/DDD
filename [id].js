import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import { findProductById } from "../../lib/products";
import styled from "styled-components";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const Wrap = styled.div`padding:48px 0;`;
const Gallery = styled.div`display:flex; gap:20px; align-items:flex-start;`;
const Thumbs = styled.div`display:flex; flex-direction:column; gap:8px;`;
const Thumb = styled.button`border:0; padding:0; background:transparent; border-radius:8px; overflow:hidden; cursor:pointer; opacity:${p=>p.active?1:0.6}; transform: translateY(0); transition:all .18s var(--ease); &:hover{opacity:1; transform:translateY(-4px)}`;

export default function ProductPage({ product }) {
  const [idx, setIdx] = useState(0);
  const { add } = useCart();
  if (!product) return <div>Not found</div>;

  return (
    <>
      <Head>
        <title>{product.title} — Dropify</title>
        <meta name="description" content={product.description} />
      </Head>
      <Header />
      <main className="container">
        <Wrap>
          <Gallery>
            <div style={{ flex: "0 0 420px" }}>
              <div style={{ borderRadius: 12, overflow: "hidden" }}>
                <div style={{ position: "relative", width: "100%", height: 520 }}>
                  <Image src={product.images[idx]} alt={product.title} fill sizes="(max-width: 800px) 100vw, 420px" style={{ objectFit: "cover" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                {product.images.map((src, i) => (
                  <Thumb key={src} active={i === idx} onClick={() => setIdx(i)}>
                    <div style={{ width: 72, height: 72, overflow: "hidden", borderRadius: 8 }}>
                      <Image src={src} alt={`${product.title} ${i}`} width={120} height={120} style={{ objectFit: "cover" }} />
                    </div>
                  </Thumb>
                ))}
              </div>
            </div>

            <div style={{ maxWidth: 560 }}>
              <h1 style={{ marginTop: 0 }}>{product.title}</h1>
              <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: 20 }}>${product.price}</div>
              <p style={{ color: "var(--muted)" }}>{product.description}</p>

              <div style={{ marginTop: 18 }}>
                <label style={{ display: "block", marginBottom: 8, color: "var(--muted)" }}>Size</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {product.size.map(s => <button key={s} className="btn secondary">{s}</button>)}
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <label style={{ display: "block", marginBottom: 8, color: "var(--muted)" }}>Color</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {product.color.map(c => <button key={c} className="btn secondary">{c}</button>)}
                </div>
              </div>

              <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
                <button className="btn primary" onClick={() => add({ productId: product.id, title: product.title, price: product.price, image: product.images[0] })}>Add to cart</button>
                <button className="btn secondary">Size guide</button>
              </div>

              <section style={{ marginTop: 28 }}>
                <details style={{ color: "var(--muted)" }}>
                  <summary style={{ cursor: "pointer", marginBottom: 8 }}>Full description & details</summary>
                  <div style={{ marginTop: 8 }}>
                    <p>Composition, fit info, care instructions, delivery & returns policy.</p>
                  </div>
                </details>
              </section>
            </div>
          </Gallery>
        </Wrap>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const product = findProductById(params.id);
  if (!product) {
    return { notFound: true };
  }
  return { props: { product } };
}
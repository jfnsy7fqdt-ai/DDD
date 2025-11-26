import styled from "styled-components";
import { motion } from "framer-motion";

const HeroWrap = styled.section`
  padding:48px 0 24px; position:relative; overflow:hidden;
  .hero-inner { display:grid; grid-template-columns:1fr 480px; gap:36px; align-items:center; }
  h1{ font-size:clamp(26px,4vw,44px); margin:0 0 12px;}
  p{ color:var(--muted); margin:0 0 18px; }
  @media (max-width:1000px){ .hero-inner{ grid-template-columns:1fr; } }
`;
const Video = styled.video`
  width:100%; height:360px; object-fit:cover; border-radius:16px; display:block;
  box-shadow:0 30px 60px rgba(3,6,10,0.6);
`;

export default function Hero() {
  return (
    <HeroWrap>
      <div className="container hero-inner">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1>Dropify — New drops, refined minimalism</h1>
          <p>Curated limited drops, premium fabrics, fast shipping. Be first. Be bold.</p>
          <a className="btn primary" href="/catalog">Browse drops</a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div style={{ borderRadius: 16, overflow: "hidden" }}>
            <Video autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1520975661060-3a7f56a6c2f1?w=1200&q=60&auto=format&fit=crop">
              <source src="/sample-loop.mp4" type="video/mp4" />
              {/* Fallback: static image */}
            </Video>
          </div>
        </motion.div>
      </div>
    </HeroWrap>
  );
}
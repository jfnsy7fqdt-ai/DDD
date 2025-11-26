import Link from "next/link";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const HeaderWrap = styled.header`
  position:sticky; top:0; z-index:50;
  backdrop-filter: blur(6px);
  background: linear-gradient(180deg, rgba(11,12,15,0.35), rgba(11,12,15,0.15));
  border-bottom: 1px solid rgba(255,255,255,0.03);
`;
const HeaderInner = styled.div`
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 20px;
`;
const Logo = styled.a`
  font-weight:700; font-size:20px; letter-spacing:0.6px; color:#fff;
`;
const Nav = styled.nav`
  display:flex; gap:18px; align-items:center;
  .link { color:var(--muted); padding:8px; border-radius:10px; transition: all .18s var(--ease); }
  .link:hover { color:#fff; background:var(--glass); transform:translateY(-2px); }
`;
const CartButton = styled.button`
  position:relative; border:0; background:transparent; color:var(--muted); cursor:pointer;
  padding:8px; border-radius:10px;
`;
const Count = styled(motion.span)`
  position:absolute; right:-6px; top:-6px; background:var(--accent); color:white; border-radius:999px;
  padding:4px 7px; font-size:12px;
`;

export default function Header() {
  const { count } = useCart();

  return (
    <HeaderWrap>
      <div className="container">
        <HeaderInner>
          <Link href="/" legacyBehavior><Logo>Dropify</Logo></Link>
          <Nav>
            <Link href="/catalog" legacyBehavior><a className="link">Shop</a></Link>
            <a className="link" href="#about">About</a>
            <a className="link" href="#contact">Contact</a>
            <CartButton aria-label="Open cart">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor">
                <path d="M6 6h15l-1.5 9h-12z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              <Count
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 0.6, ease: [0.2,0.9,0.2,1] }}
              >
                {count}
              </Count>
            </CartButton>
          </Nav>
        </HeaderInner>
      </div>
    </HeaderWrap>
  );
}
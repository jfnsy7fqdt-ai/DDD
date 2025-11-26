import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";
import { CartProvider } from "../context/CartContext";

const GlobalStyle = createGlobalStyle`
  :root{
    --bg:#0f1115;
    --muted:#9aa3b2;
    --accent:#ff5a5f;
    --glass: rgba(255,255,255,0.03);
    --container:1200px;
    --ease:cubic-bezier(.2,.9,.2,1);
  }
  html,body,#__next{height:100%}
  body{
    margin:0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background:linear-gradient(180deg,#071018 0%, #0b0f14 100%);
    color:#e6eef6;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    line-height:1.35;
  }
  a{color:inherit;text-decoration:none}
  img{display:block;max-width:100%}
  button{font:inherit}
  .container{max-width:var(--container);margin:0 auto;padding:0 20px}
`;

const theme = {
  accent: "var(--accent)",
  muted: "var(--muted)",
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Dropify — Modern streetwear</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ThemeProvider>
    </>
  );
}
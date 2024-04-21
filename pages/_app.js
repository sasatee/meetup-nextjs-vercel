import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

//  you have some component

// or some setting that affects all your pages

// you can utilize this _app.js file to easily add

// that without diving into dozens of files individually. ===>MainNavigation / Layout

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

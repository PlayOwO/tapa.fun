import { Html, Head, Main, NextScript } from "next/document";
import { ADS_ID } from "../lib/constants";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_ID}`}
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

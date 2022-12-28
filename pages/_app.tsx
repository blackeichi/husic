import "../styles/globals.css";
import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Husic</title>
      </Head>
      <div className="bg-black w-full box-border sm:pt-0">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

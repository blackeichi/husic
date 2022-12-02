import "../styles/globals.css";
import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="bg-black w-full box-border sm:pt-0">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-black w-full">
      <div className="w-full p-3 bg-black fixed flex justify-between items-center z-20">
        <h1 className="text-white font-Cafe24Shiningstar text-6xl md:text-8xl">
          Husic
        </h1>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

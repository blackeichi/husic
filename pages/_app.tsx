import "../styles/globals.css";
import type { AppProps } from "next/app";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-black w-full">
      <div className="w-full p-3 bg-black fixed flex justify-between items-center z-20 text-white">
        <h1 className="font-Cafe24Shiningstar text-6xl md:text-8xl">Husic</h1>
        <div className="flex gap-10 sm:mr-10 sm:text-xl lg:text-2xl items-center">
          <h1 className="cursor-pointer">Login</h1>
          <h1 className="cursor-pointer bg-white text-black px-4 py-2 rounded-xl">
            Join
          </h1>
        </div>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { FloatingBtn } from "../components/FloatingBtn";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };
  return (
    <div className="bg-black w-full">
      <div className="w-full p-3 bg-black fixed flex justify-between items-center z-20 text-white">
        <h1
          onClick={goHome}
          className="font-Cafe24Shiningstar text-6xl md:text-8xl cursor-pointer"
        >
          Husic
        </h1>
        <div className="flex gap-10 sm:mr-10 sm:text-xl lg:text-2xl items-center">
          <FloatingBtn isBlack={false} Text={"Login"} href="/enter" />
          <FloatingBtn isBlack={true} Text={"Join"} href="/enter" />
        </div>
      </div>
      <Component {...pageProps} />
    </div>
  );
}
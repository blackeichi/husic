import "../styles/globals.css";
import type { AppProps } from "next/app";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { FloatingBtn } from "../components/FloatingBtn";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import useUser from "../libs/client/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faHeadphones,
  faUpload,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const user = useUser(false);
  const goHome = () => {
    router.push("/");
  };
  const [open, setOpen] = useState(false);
  return (
    <RecoilRoot>
      <div className="bg-black w-full box-border sm:pt-0">
        <div className="w-full p-3 bg-black fixed flex justify-between items-center z-20 top-0 text-white">
          <h1
            onClick={goHome}
            className="font-Cafe24Shiningstar text-6xl md:text-8xl cursor-pointer"
          >
            Husic
          </h1>
          {user?.user?.ok ? (
            user.isLoading ? (
              <></>
            ) : (
              <div className="flex sm:gap-7 gap-2 sm:mr-10 sm:text-xl lg:text-2xl items-center relative">
                <div className="gap-7 items-center sm:flex hidden">
                  <FloatingBtn isBlack={false} Text={"Upload"} href="/upload" />
                  <FloatingBtn isBlack={true} Text={"Watch"} href="/watch" />
                </div>
                <div className="gap-2 items-center sm:hidden flex text-black">
                  <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faFileUpload} />
                  </div>
                  <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faHeadphones} />
                  </div>
                </div>
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="sm:text-4xl text-2xl cursor-pointer"
                >
                  <FontAwesomeIcon icon={faUserCircle} />
                </div>
                {open && (
                  <div className="bg-white absolute sm:-right-10 sm:top-14 right-0 top-8 rounded-lg items-center justify-center text-black sm:text-sm font-MonoplexKRRegular px-7 py-4">
                    <h1>PROFILE</h1>
                    <h1>LOG OUT</h1>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="flex gap-10 sm:mr-10 sm:text-xl lg:text-2xl items-center">
              <FloatingBtn isBlack={false} Text={"Login"} href="/enter" />
              <FloatingBtn isBlack={true} Text={"Join"} href="/enter" />
            </div>
          )}
        </div>
        <div onClick={() => setOpen(false)}>
          <Component {...pageProps} />
        </div>
      </div>
    </RecoilRoot>
  );
}

import { faBlogger, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const element = useRef<HTMLDivElement>(null);
  const onMoveBox = () => {
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-screen relative flex items-center justify-end px-10 md:px-30">
        <div className="w-full h-full flex items-end absolute">
          <img className="bg-#9C5D3C h-3/5 lg:h-4/5" src="/img/rhythm.gif" />
        </div>
        <div className="text-white flex flex-col text-right items-end justify-center relative md:mt-72 mb-20">
          <h1 className="lg:text-8xl sm:text-6xl text-5xl z-10 font-thin">
            Let&apos;s just listen to
          </h1>
          <div
            onClick={onMoveBox}
            className="border-2 sm:w-36 w-24 py-2 z-10 box-border flex items-center justify-center cursor-pointer mt-5 hover:scale-105 duration-200"
          >
            <h1 className="sm:text-5xl text-2xl text-white font-bold font-KOFIHDrLEEJWTTF">
              Husic
            </h1>
          </div>
          <img
            className="rounded-lg absolute w-2/5 md:block hidden"
            src="/img/tape.gif"
          />
        </div>
      </div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="z-10 w-full sm:h-1/2 h-80 max-w-2xl font-Cafe24Shiningstar text-5xl rounded-2xl bg-gray-900 flex flex-col items-center md:p-10 p-4 justify-between text-white">
          <h1>Han Jeong Woo</h1>
          <div className="flex flex-col font-MonoplexKRRegular text-lg gap-5">
            <div className="flex gap-3 items-center">
              <FontAwesomeIcon icon={faEnvelope} />
              blackeichi@naver.com
            </div>
            <Link
              href={"https://github.com/blackeichi"}
              className="flex gap-3 items-center"
            >
              <FontAwesomeIcon icon={faGithub} />
              https://github.com/blackeichi
            </Link>
            <Link
              href="https://velog.io/@blackeichi"
              className="flex gap-3 items-center"
            >
              <FontAwesomeIcon icon={faBlogger} />
              https://velog.io/@blackeichi
            </Link>
          </div>
          <div className="cursor-pointer hover:scale-105 duration-200 font-KOFIHDrLEEJWTTF p-3 bg-white text-black rounded-xl text-xl">
            About-Me
          </div>
        </div>
        <div className="w-full max-w-2xl h-full absolute flex items-center">
          <div className="w-3/4 h-3/4 md:block hidden absolute -left-20 aspect-video bg-gradient-to-b from-violet-900 to-black border-8 border-gray-900 " />
        </div>
      </div>
      <div
        ref={element}
        className="w-full h-screen relative flex flex-col"
      ></div>
    </div>
  );
}

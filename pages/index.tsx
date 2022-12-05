import { faBlogger, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRef } from "react";
import useYoutube from "../libs/client/useYoutube";
import { BeatLoader } from "react-spinners";
import { VideoThumb } from "../components/VideoThumb";
import { useRouter } from "next/router";
import { Header } from "../components/Header";

export type videoType = {
  id: number;
  title: string;
  createdAt: string;
  channelId: string;
  channelTitle: string;
  description: string;
  youtubeId: string;
  channelThumb: string;
  tags: string;
  thumb: string;
  user: {
    nickname: string;
    id: number;
    username: string;
    avatar: string;
  };
};

export default function Home() {
  const element = useRef<HTMLDivElement>(null);
  const onMoveBox = () => {
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const data = useYoutube("query");
  const videos = data?.data?.videos;
  const route = useRouter();
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-screen relative flex items-center justify-end px-10 md:px-30">
        <div className="w-full h-full flex items-end absolute">
          <img className="bg-#9C5D3C h-3/5 lg:h-4/5" src="/img/rhythm.gif" />
        </div>
        <div className="text-white flex flex-col items-end text-right justify-center relative md:mt-72 mb-20">
          <h1
            id="aniText"
            className="lg:text-8xl sm:text-6xl text-5xl z-10 sm:block hidden font-Pretendard"
          >
            Let&apos;s just listen to
          </h1>
          <h1 className="lg:text-8xl sm:text-6xl text-5xl text-right z-10 sm:hidden block font-Pretendard">
            Let&apos;s just listen to
          </h1>
          <div
            onClick={onMoveBox}
            className="border-2 px-4 py-3 z-10 box-border flex items-center justify-center cursor-pointer sm:mt-10 mt-5 hover:scale-105 duration-200 gap-4 sm:text-3xl text-xl"
          >
            <h1 className="text-white font-bold font-KOFIHDrLEEJWTTF sm:text-6xl text-3xl">
              Husic
            </h1>
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <img
            className="rounded-lg absolute w-2/5 md:block hidden"
            src="/img/tape.gif"
          />
        </div>
      </div>
      <div className="w-full h-screen sm:mt-40 mt-20   flex justify-center items-center">
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
        className="w-full min-h-screen relative flex flex-col pb-7 pt-20 md:px-10 md:items-start items-center"
      >
        <div className="flex text-white font-MonoplexKRRegular w-full justify-between sm:px-10 px-5 sm:text-base text-sm sm:py-10 py-5 items-center">
          <h1 className="font-bold sm:text-2xl text-lg">--RECOMMENDED</h1>
          <h1
            onClick={() => {
              route.push("/watch");
            }}
            className="cursor-pointer hover:scale-105 duration-200"
          >
            More Husic..
          </h1>
        </div>
        {videos ? (
          <div className="flex flex-col gap-10">
            {videos.map((video: videoType) => (
              <VideoThumb key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <BeatLoader color="#36d7b7" />
        )}
      </div>
    </div>
  );
}

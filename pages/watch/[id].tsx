import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { VideoThumb } from "../../components/VideoThumb";
import useYoutube from "../../libs/client/useYoutube";
import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { cls } from "../../libs/client/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { videoType } from "..";
import useMutaion from "../../libs/client/useMutation";

const opts: YouTubeProps["opts"] = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    contols: 0,
  },
};

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function HusicDetail() {
  const router = useRouter();
  const { data: videodata } = useSWR(
    router.query.id ? `/api/videos/${router.query.id}` : null,
    fetcher
  );
  const video: videoType = videodata?.videos;
  const related = videodata?.related;
  //----window size
  const [screen, setScreen] = useState() as any;
  const [size, setSize] = useState("Web");
  useEffect(() => {
    setScreen(window.outerWidth);
    const handleResize = () => {
      setScreen(window.outerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (screen >= 980) {
      setSize("Web");
    } else if (screen <= 700 && screen > 560) {
      setSize("Mobile");
    } else if (screen <= 560) {
      setSize("Small");
    } else {
      setSize("Mid");
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screen]);
  const arr = video?.description.split("\n");
  const [openDes, setOpenDes] = useState(false);
  useEffect(() => {
    if (arr?.length > 10 && !openDes) {
      arr?.slice(0, 10);
    }
  }, [arr, openDes]);
  //---------fav
  const [toggleFav] = useMutaion(`/api/videos/${router.query.id}/fav`);
  const clickFav = () => {
    toggleFav({});
  };
  return (
    <div className="font-MonoplexKRRegular w-full min-h-screen flex flex-col items-center  text-white sm:p-10 sm:pt-36 pt-28 pb-5">
      <div className="flex flex-col items-center">
        <div
          style={
            screen >= 1531
              ? { width: "1400px" }
              : size === "Small"
              ? { width: "390px" }
              : size === "Mobile"
              ? { width: "560px" }
              : { width: "700px" }
          }
          className="flex flex-col mb-8"
        >
          <h1>관련 영상</h1>
          <div
            className="flex overflow-x-scroll w-full sm:gap-1 gap-5"
            id="relate"
          >
            {related?.map((rel: videoType, index: any) => (
              <div
                onClick={() => {
                  router.push(`/watch/${rel.youtubeId}`);
                }}
                key={index}
                className="min-w-max cursor-pointer relative"
              >
                <img
                  className="2xl:w-80 lg:w-56 sm:w-44 w-36"
                  src={rel.thumb}
                ></img>
                <div className="h-full w-full absolute top-0 sm:opacity-0 opacity-75 hover:opacity-75 duration-200">
                  <div className="2xl:w-80 lg:w-56 sm:w-44 w-36 bg-black absolute bottom-0">
                    <h1 className="sm:block hidden">{rel.title}</h1>
                  </div>
                </div>
                <div className="2xl:w-80 lg:w-56 sm:w-44 w-36 overflow-hidden">
                  <h1 className="sm:hidden whitespace-nowrap">{rel.title}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        {video ? (
          <div
            className="text-white flex flex-wrap justify-center sm:gap-5 gap-3"
            style={{ wordBreak: "break-all" }}
          >
            <div id="leftBox" className="flex flex-col relative">
              <div className="flex justify-between absolute -top-6 w-full">
                <div className="items-center gap-2 flex">
                  <h1
                    onClick={() => {
                      router.push(`/search/${video.user.id}`);
                    }}
                    className="flex items-center justify-center cursor-pointer text-lg"
                  >
                    {video?.user.avatar ? video?.user.avatar : "🤗"}
                  </h1>
                  <h1
                    onClick={() => {
                      router.push(`/search/${video.user.id}`);
                    }}
                    className="cursor-pointer"
                  >
                    {video?.user.username}
                  </h1>
                </div>
                <h1
                  onClick={clickFav}
                  className="text-lg text-gray-400 cursor-pointer hover:scale-110"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </h1>
              </div>
              <div className="rounded-3xl overflow-hidden">
                <YouTube
                  videoId={video?.youtubeId}
                  opts={{
                    height:
                      size === "Small"
                        ? "260"
                        : size === "Mobile"
                        ? "300"
                        : "400",
                    width:
                      size === "Small"
                        ? "390"
                        : size === "Mobile"
                        ? "560"
                        : "700",
                    playerVars: {
                      // https://developers.google.com/youtube/player_parameters
                      autoplay: 1,
                      rel: 0,
                      modestbranding: 1,
                    },
                  }}
                  onEnd={(e) => {
                    e.target.stopVideo(0);
                  }}
                />
              </div>
              <div id="comment"></div>
            </div>
            <div
              id="rightBox"
              className="flex flex-col gap-2"
              style={
                size === "Small"
                  ? { width: "390px" }
                  : size === "Mobile"
                  ? { width: "560px" }
                  : { width: "700px" }
              }
            >
              <h1 className="font-bold md:text-2xl sm:text-xl text-base">
                {video.title}
              </h1>
              <div id="channel" className="flex items-center gap-2">
                <img
                  onClick={() => {
                    router.push(`/search/${video.channelId}`);
                  }}
                  className="rounded-full sm:w-10 w-7 z-10 cursor-pointer"
                  src={video.channelThumb}
                />
                <h1
                  onClick={() => {
                    router.push(`/search/${video.channelId}`);
                  }}
                  className={"cursor-pointer"}
                >
                  {video.channelTitle}
                </h1>
              </div>
              <div className="flex flex-wrap gap-2">
                {video.tags
                  .split(",")
                  .slice(0, 5)
                  .map((tag, index) => (
                    <h1 key={index}>#{tag}</h1>
                  ))}
              </div>
              <div
                id="description"
                className="bg-gray-500 p-2 box-border rounded-xl"
              >
                {arr.slice(0, 5).map((des, index) => (
                  <div className="my-1" key={index}>
                    <h1>{des}</h1>
                  </div>
                ))}
                {arr?.length > 5 && !openDes ? (
                  <></>
                ) : (
                  arr.map((des, index) => (
                    <div className="my-1" key={index}>
                      <h1>{des}</h1>
                    </div>
                  ))
                )}
                <h1
                  onClick={() => {
                    setOpenDes((prev) => !prev);
                  }}
                  className="cursor-pointer text-center hover:bg-gray-600 py-1"
                >
                  {arr?.length > 5 && !openDes ? "더 보기.." : "간략히"}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <BeatLoader color="#36d7b7" />
        )}
      </div>
    </div>
  );
}

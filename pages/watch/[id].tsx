import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { VideoThumb } from "../../components/VideoThumb";
import useYoutube from "../../libs/client/useYoutube";
import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useState } from "react";
import useSWR from "swr";

const opts: YouTubeProps["opts"] = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
type videoType = {
  id: string;
  snippet: {};
};
const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function HusicDetail() {
  const router = useRouter();
  const video = useSWR(
    router.query.id ? `/api/videos/${router.query.id}` : null,
    fetcher
  );
  console.log(video);
  return (
    <div className="font-MonoplexKRRegular w-full min-h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3 sm:p-10 sm:pt-32 pt-24 pb-5 ">
      <YouTube
        videoId="YjOHCcAGQQA"
        opts={opts}
        onEnd={(e) => {
          e.target.stopVideo(0);
        }}
      />
    </div>
  );
}

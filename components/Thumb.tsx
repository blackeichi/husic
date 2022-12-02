import { useRouter } from "next/router";
import { videoType } from "../pages";

export const Thumb = (videos: any) => {
  const router = useRouter();
  const video = videos?.video;
  return (
    <div
      className="flex overflow-x-scroll w-full sm:gap-10 gap-5 pr-3"
      id="relate"
    >
      <div
        onClick={() => {
          router.push(`/watch/${video.youtubeId}`);
        }}
        className="min-w-max cursor-pointer dataative mb-3"
      >
        <img
          className="2xl:w-72 lg:w-56 sm:w-44 w-36 rounded-lg"
          src={video.thumb}
        ></img>
        <div className="h-full w-full absolute top-0 sm:opacity-0 opacity-75 hover:opacity-75 duration-200">
          <div className="2xl:w-72 lg:w-56 sm:w-44 w-36 bg-black absolute bottom-0">
            <h1 className="sm:block hidden">{video.title}</h1>
          </div>
        </div>
        <div className="2xl:w-72 lg:w-56 sm:w-44 w-36 overflow-hidden">
          <h1 className="sm:hidden whitespace-nowrap">{video.title}</h1>
        </div>
      </div>
    </div>
  );
};

import { useRouter } from "next/router";
import { videoType } from "../pages";

export const Thumb = (videos: any) => {
  const router = useRouter();
  const video = videos?.videos;
  return (
    <div
      onClick={() => {
        router.push(`/watch/${video?.youtubeId}`);
      }}
      className="min-w-max cursor-pointer mb-3 relative"
    >
      <img
        className="2xl:w-72 lg:w-64 sm:w-52 w-40 rounded-lg"
        src={video?.thumb}
      ></img>
      <div className="h-full w-full absolute top-0 sm:opacity-0 opacity-75 hover:opacity-75 duration-200">
        <div className="2xl:w-72 lg:w-64 sm:w-52 w-40 bg-black absolute bottom-0">
          <h1 className="md:block hidden">{video?.title}</h1>
        </div>
      </div>
      <div className="2xl:w-72 lg:w-64 sm:w-52 w-40 overflow-hidden">
        <h1 className="md:hidden whitespace-nowrap">{video?.title}</h1>
      </div>
    </div>
  );
};

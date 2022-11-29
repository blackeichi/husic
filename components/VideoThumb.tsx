import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { videoType } from "../pages";

type Type = {
  video: videoType;
};

export const VideoThumb = ({ video }: Type) => {
  const router = useRouter();
  return (
    <div className="flex sm:flex-nowrap  flex-wrap lg:w-full sm:w-screen w-72 items-center text-white font-MonoplexKRRegular sm:px-10 px-2 gap-4  hover:scale-105 delay-300 duration-200">
      <img
        onClick={() => {
          router.push(`watch/${video.youtubeId}`);
        }}
        className="sm:w-96 w-72 rounded-lg cursor-pointer"
        src={video.thumb}
      />
      <div className="flex flex-col gap-2  whitespace-nowrap w-full overflow-hidden">
        <div className="flex items-center gap-2 ">
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
          onClick={() => {
            router.push(`watch/${video.youtubeId}`);
          }}
          className="font-bold sm:text-base text-sm cursor-pointer"
        >
          {video.title}
        </h1>
        <div className="text-gray-400 sm:text-sm text-xs flex flex-col gap-1">
          <div className="flex items-center gap-2">
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
        </div>
      </div>
    </div>
  );
};

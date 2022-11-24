import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { videoType } from "../pages";

type Type = {
  video: videoType;
};

export const VideoThumb = ({ video }: Type) => {
  return (
    <div className="flex sm:flex-nowrap  flex-wrap lg:w-full sm:w-screen w-72 items-center text-white font-MonoplexKRRegular sm:px-10 px-2 gap-4 cursor-pointer hover:scale-105 delay-300 duration-200">
      <img className="sm:w-96 w-72 rounded-lg" src={video.thumb} />
      <div className="flex flex-col gap-2  whitespace-nowrap w-full overflow-hidden">
        <div className="flex items-center gap-2">
          <h1 className="bg-gray-500 w-5 h-5 rounded-full flex items-center justify-center">
            U
          </h1>
          <h1>{video?.user.username}</h1>
        </div>
        <h1 className="font-bold sm:text-base text-sm ">{video.title}</h1>
        <div className="text-gray-400 sm:text-sm text-xs flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <img
              className="rounded-full sm:w-10 w-7"
              src={video.channelThumb}
            />
            <h1>{video.channelTitle}</h1>
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

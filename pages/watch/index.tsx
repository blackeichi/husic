import { BeatLoader } from "react-spinners";
import { videoType } from "..";
import { VideoThumb } from "../../components/VideoThumb";
import useYoutube from "../../libs/client/useYoutube";

export default function Upload() {
  const data = useYoutube();
  const videos = data?.data?.videos;
  return (
    <div className="font-MonoplexKRRegular w-full min-h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3 sm:p-10 sm:pt-32 pt-24 pb-5 ">
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
  );
}

import useUser from "../libs/client/useUser";
import { BeatLoader } from "react-spinners";
import { Header } from "../components/Header";
import useYoutube from "../libs/client/useYoutube";
import { videoType } from ".";
import { VideoThumb } from "../components/VideoThumb";
import { Thumb } from "../components/Thumb";

export default function Profile() {
  const { user, isLoading } = useUser();
  const data = useYoutube("query");
  const favs = data?.data?.favs;
  return (
    <div className="font-MonoplexKRRegular w-full min-h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3 sm:p-10 sm:pt-32 pt-24 pb-5 ">
      <Header />
      {isLoading ? (
        <BeatLoader color="#36d7b7" />
      ) : (
        <div className="flex flex-col justify-center gap-1">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-lg">
              {user?.profile?.nickname}&apos;s profile
            </h1>
            <button className="hover:bg-gray-300 hover:text-gray-800 duration-200 px-2 py-1">
              Edit
            </button>
          </div>
          <div>
            <div id="select"></div>
            <div id="my-content" className="flex flex-col gap-10">
              {favs.map((content: any) => (
                <Thumb key={content.videoId} videos={content.video} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

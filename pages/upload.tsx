import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import useMutaion from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { cls } from "../libs/client/utils";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";

type FindForm = {
  id: string;
};
interface MutationResult {
  ok: boolean;
}
type videoType = {
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  defaultLanguage: string;
  description: string;
  publishedAt: string;
  tags: [];
  thumbnails: {
    default: { url: string };
    high: { url: string };
    maxres: { url: string };
    medium: { url: string };
    standard: { url: string };
  };
  title: string;
};
type channelType = {
  thumbnails: {
    default: { url: string };
    high: { url: string };
    medium: { url: string };
  };
  title: string;
};

export default function Upload() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, resetField } = useForm() as any;
  const [upload, { loading, data, error }] =
    useMutaion<MutationResult>("/api/videos");
  const [videoData, setVideoData] = useState<videoType>();
  const [channelData, setChannelData] = useState<channelType>();
  const [youtubeId, setId] = useState() as any;
  const [apiloading, setLoading] = useState(false);
  const user = useUser();
  const onValid = (formData: FindForm) => {
    setLoading(true);
    (async () => {
      const results = await (
        await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${formData?.id}&key=AIzaSyDklqLAWYKnwDPB87xKHK064ULHSUeojNE`
        )
      ).json();
      const channel = await (
        await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${results?.items[0].snippet.channelId}&key=AIzaSyDklqLAWYKnwDPB87xKHK064ULHSUeojNE`
        )
      ).json();
      await setChannelData(channel?.items[0].snippet);
      await setVideoData(results?.items[0].snippet);
      setId(formData.id);
      resetField("id");
    })();
    setLoading(false);
  };
  const onUpload = () => {
    if (loading) return;
    const updata = { ...user.user, youtubeId, videoData, channelData };
    upload(updata);
  };
  useEffect(() => {
    if (data?.ok) {
      router.push("/watch");
    }
  });
  return (
    <div className="font-MonoplexKRRegular w-full min-h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3 sm:p-10 pt-20 pb-5 ">
      {videoData ? (
        <>
          <div className="flex md:flex-row flex-col items-center justify-center gap-4 md:text-left text-center px-3 relative ">
            <img
              className="rounded-lg sm:w-96"
              src={videoData.thumbnails.medium.url}
            />
            <div className="gap-5 flex flex-col">
              <h1>{videoData.title}</h1>
              <div className="flex items-center md:justify-start justify-center gap-2">
                <img
                  className="rounded-full w-10"
                  src={channelData?.thumbnails.default.url}
                />
                <h1>{channelData?.title}</h1>
              </div>
              <div className="flex gap-3 text-xs text-gray-400 md:justify-start justify-center">
                {videoData.tags.slice(0, 5).map((tag, index) => (
                  <h1 key={index}>#{tag}</h1>
                ))}
              </div>
            </div>
          </div>
          <div className="flex sm:gap-5 gap-3">
            <div
              onClick={onUpload}
              className="mt-4 text-black bg-white font-bold p-3 px-14 rounded-lg cursor-pointer hover:scale-105 duration-200"
            >
              공유하기
            </div>
            <div
              onClick={() => {
                setChannelData(undefined);
                setVideoData(undefined);
              }}
              className="mt-4 text-black bg-white font-bold p-3 rounded-lg cursor-pointer hover:scale-105 duration-200"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </div>

          {data?.error && (
            <h1 className="text-red-500 text-sm">{data?.error}</h1>
          )}
        </>
      ) : (
        <form
          onSubmit={handleSubmit(onValid)}
          className={"flex flex-col gap-1  items-center sm:w-96 w-4/5 relative"}
        >
          <Input
            label={"Youtube ID"}
            icon={<FontAwesomeIcon color="red" icon={faYoutube} />}
            name={"id"}
            type={"text"}
            register={register("id", {
              required: true,
            })}
            required
            auto={true}
          />
          <button
            className={cls(
              "bg-white w-full py-2 rounded-md border text-black focus:border-y-blue-400 focus:outline-none focus:ring-border-y-blue-400 hover:bg-orange-200 duration-200",
              apiloading ? "disabled" : ""
            )}
          >
            {apiloading ? (
              <h1>Loading...</h1>
            ) : (
              <FontAwesomeIcon icon={faSearch} />
            )}
          </button>
          {open ? (
            <>
              <div
                onClick={() => setOpen(false)}
                className={
                  "absolute right-2 top-10 rounded-full bg-black w-6 h-6 flex items-center justify-center cursor-pointer"
                }
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
              <div
                className={
                  "bg-white text-black absolute p-3 rounded-lg text-sm top-16 flex flex-col gap-1"
                }
              >
                <div className="flex gap-2 text-neutral-600">
                  <h1 className="font-bold text-black">Q.</h1>
                  <h1>영상 ID는 어떻게 알 수 있죠?</h1>
                </div>
                <div className="flex gap-2 text-neutral-600">
                  <h1 className="font-bold text-black">A.</h1>
                  <h1>아래의 캡처처럼 주소에서 복사하시면 됩니다!</h1>
                </div>
                <img src="/img/youtubeCap.PNG" />
              </div>
            </>
          ) : (
            <div
              onClick={() => setOpen(true)}
              className={
                "absolute right-2 rounded-full bg-slate-300 w-6 h-6 flex items-center justify-center top-10 cursor-pointer"
              }
            >
              <h1>?</h1>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

import useUser from "../libs/client/useUser";
import { BeatLoader } from "react-spinners";
import { Header } from "../components/Header";
import useYoutube from "../libs/client/useYoutube";
import { videoType } from ".";
import { VideoThumb } from "../components/VideoThumb";
import { Thumb } from "../components/Thumb";
import { useState } from "react";
import { cls } from "../libs/client/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const { user, isLoading } = useUser();
  const [sel, setSel] = useState("mine");
  const data = useYoutube("query");
  const favs = data?.data?.favs;
  const mines = data?.data?.mines;
  const [open, setOpen] = useState(false);
  console.log(favs.length);
  return (
    <div className="font-MonoplexKRRegular w-full min-h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3 sm:p-10 sm:pt-44 pt-32 pb-5 ">
      <Header />
      {open ? (
        <div className="fixed w-screen h-screen flex items-center justify-center z-10">
          <div className="w-10/12 h-4/6 max-w-3xl bg-white z-20">h</div>
          <div
            onClick={() => setOpen(false)}
            className="w-full h-full absolute top-0"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          ></div>
        </div>
      ) : (
        <></>
      )}
      {isLoading ? (
        <BeatLoader color="#36d7b7" />
      ) : (
        <div className="flex flex-col justify-center gap-1">
          <div className="flex flex-col items-center gap-2 ">
            <h1 className="font-bold text-3xl relative">
              {user?.profile?.nickname}&apos;s profile
              <button
                onClick={() => setOpen(true)}
                className="hover:scale-110 duration-200 text-xl absolute -top-4 -right-6"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </h1>
          </div>
          <div className="flex flex-col gap-4 sm:mt-32 mt-10">
            <div
              id="select"
              className="flex gap-2 justify-center text-2xl font-bold"
            >
              <h1
                onClick={() => setSel("mine")}
                className={cls(
                  "px-3 py-1 rounded-xl cursor-pointer",
                  sel === "mine" ? "bg-white text-black " : ""
                )}
              >
                Mine
              </h1>
              <h1
                onClick={() => setSel("favor")}
                className={cls(
                  "px-3 py-1 rounded-xl cursor-pointer",
                  sel === "favor" ? "bg-white text-black " : ""
                )}
              >
                Favor
              </h1>
            </div>
            <div id="my-content" className="flex flex-col items-center">
              {sel === "favor" ? (
                favs?.length > 0 ? (
                  <div className="sm:w-4/5 w-full flex flex-wrap justify-center gap-2">
                    {favs.map((content: any) => (
                      <Thumb key={content.videoId} videos={content?.video} />
                    ))}
                  </div>
                ) : (
                  <h1>좋아요를 누른 영상이 없습니다..🤔</h1>
                )
              ) : mines?.length > 0 ? (
                <div className="sm:w-4/5 w-full flex flex-wrap justify-center gap-2">
                  {mines.map((content: any) => (
                    <Thumb key={content.id} videos={content} />
                  ))}
                </div>
              ) : (
                <h1>업로드한 영상이 없습니다..🙄</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

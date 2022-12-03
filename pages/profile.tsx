import useUser from "../libs/client/useUser";
import { BeatLoader } from "react-spinners";
import { Header } from "../components/Header";
import useYoutube from "../libs/client/useYoutube";
import { videoType } from ".";
import { VideoThumb } from "../components/VideoThumb";
import { Thumb } from "../components/Thumb";
import { useEffect, useState } from "react";
import { cls, emotions } from "../libs/client/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Buttton";
import useMutaion from "../libs/client/useMutation";

export default function Profile() {
  const { user, isLoading } = useUser();
  const [sel, setSel] = useState("mine");
  const content = useYoutube("query");
  const favs = content?.data?.favs;
  const mines = content?.data?.mines;
  const [open, setOpen] = useState(false);
  const [openEmo, setOpenEmo] = useState(false);
  const [selectedEmo, setselectedEmo] = useState("");
  const [mynick, setMyNick] = useState(undefined);
  const { register, setValue, handleSubmit } = useForm();
  useEffect(() => {
    if (user?.profile) setValue("nickname", user.profile.nickname);
  }, [user, setValue]);
  const [edit, { loading, data, error }] = useMutaion("/api/users/edit");
  const onValid = ({ nickname }: any) => {
    const postData = {
      nickname,
      avatar: selectedEmo !== "" ? selectedEmo : user.profile.avatar,
    };
    edit(postData);
  };
  useEffect(() => {
    if (data?.ok) {
      setOpen(false);
      if (data?.nickname) {
        setMyNick(data?.nickname);
      }
    }
  }, [data?.nickname, data?.ok]);
  return (
    <div className="font-MonoplexKRRegular w-full min-h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3 sm:p-10 sm:pt-44 pt-32 pb-5 ">
      <Header />
      {isLoading ? (
        <BeatLoader color="#36d7b7" />
      ) : (
        <div className="flex flex-col justify-center gap-1">
          {open ? (
            <div className="fixed w-screen h-screen flex items-center justify-center z-10 left-0">
              <div className="w-10/12 h-4/6 max-w-3xl bg-white z-20 text-black rounded-2xl flex flex-col items-center justify-center">
                <div className="text-2xl relative mb-7">
                  {openEmo ? (
                    <div className="bg-white flex w-48 border-gray-500 border-2 items-center justify-center flex-wrap overflow-y-scroll gap-2 h-56 p-1 rounded-lg absolute top-10 left-7">
                      {emotions.map((emotion, index) => (
                        <h1
                          className="cursor-pointer"
                          key={index}
                          onClick={() => {
                            setselectedEmo(emotion);
                            setOpenEmo(false);
                          }}
                        >
                          {emotion}
                        </h1>
                      ))}
                    </div>
                  ) : null}
                  <h1
                    onClick={() => setOpenEmo((prev) => !prev)}
                    className="cursor-pointer text-4xl"
                  >
                    {selectedEmo
                      ? selectedEmo
                      : user.profile.avatar
                      ? user.profile.avatar
                      : "🤗"}
                  </h1>
                </div>
                <form onSubmit={handleSubmit(onValid)}>
                  <Input
                    register={register("nickname")}
                    required={false}
                    label="nickname"
                    name="nickname"
                    type="text"
                    black={true}
                  />
                  <Button edit={true} />
                  {data?.error ? (
                    <h1 className="mt-1 text-red-500">{data?.error}</h1>
                  ) : null}
                </form>
              </div>
              <div
                onClick={() => setOpen(false)}
                className="w-full h-full absolute top-0"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              ></div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-col items-center gap-2 justify-center relative">
            <div className="text-gray-600 text-9xl absolute">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <h1 className="font-bold text-3xl relative">
              {mynick ? mynick : user?.profile?.nickname}&apos;s profile
              <button
                onClick={() => setOpen(true)}
                className="hover:scale-110 duration-200 text-xl absolute -top-4 -right-6"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </h1>
          </div>
          <div className="flex flex-col gap-4 sm:mt-28 mt-10">
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
                <div className="sm:w-4/5 w-full flex flex-wrap gap-2 justify-center">
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

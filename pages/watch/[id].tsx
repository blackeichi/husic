import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { VideoThumb } from "../../components/VideoThumb";
import useYoutube from "../../libs/client/useYoutube";
import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { cls } from "../../libs/client/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPauseCircle,
  faPlayCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { videoType } from "..";
import useMutaion from "../../libs/client/useMutation";
import { useForm } from "react-hook-form";
import useUser from "../../libs/client/useUser";
import { MutationResult } from "../upload";

const opts: YouTubeProps["opts"] = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    contols: 0,
  },
};

const fetcher = (url: string) => fetch(url).then((response) => response.json());

type Tcomment = {
  id: number;
  text: string;
  createdAt: string;
  user: {
    id: number;
    avatar: null;
    username: string;
  };
  youtubeId: string;
};

export default function HusicDetail() {
  const router = useRouter();
  const userdata = useUser(false);
  const user = userdata?.user?.profile;
  const { data: videodata, mutate } = useSWR(
    router.query.id ? `/api/videos/${router.query.id}` : null,
    fetcher
  );
  const video: videoType = videodata?.videos;
  const related = videodata?.related;
  //----video alert
  const [openInfo, setOpenInfo] = useState(false);
  const [random, setRandom] = useState(0);
  useEffect(() => {
    setRandom(Math.round(Math.random() * related?.length));
  }, [related?.length]);
  const alldata = useYoutube();
  const allvideos = alldata?.data?.videos;
  const [autoPlay, setAutoPlay] = useState(true);
  //----window size
  const [screen, setScreen] = useState() as any;
  const [size, setSize] = useState("Web");
  useEffect(() => {
    setScreen(window.outerWidth);
    const handleResize = () => {
      setScreen(window.outerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (screen >= 980) {
      setSize("Web");
    } else if (screen <= 700 && screen > 560) {
      setSize("Mobile");
    } else if (screen <= 560) {
      setSize("Small");
    } else {
      setSize("Mid");
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screen]);
  const arr = video?.description.split("\n");
  const [openDes, setOpenDes] = useState(false);
  useEffect(() => {
    if (arr?.length > 10 && !openDes) {
      arr?.slice(0, 10);
    }
  }, [arr, openDes]);
  //---------fav
  const [toggleFav] = useMutaion(`/api/videos/${router.query.id}/fav`);
  const clickFav = () => {
    if (!videodata) return;
    mutate({ ...videodata, isLiked: !videodata.isLiked }, false);
    toggleFav({});
  };
  //----------comment
  const { register, handleSubmit, resetField } = useForm() as any;
  //upload comment
  const [upload, { loading, data, error }] = useMutaion<MutationResult>(
    `/api/videos/${router.query.id}/comment`
  );
  //get comments
  const { data: commenDdata, mutate: commentMutate } = useSWR(
    router.query.id ? `/api/videos/${router.query.id}/comment` : null,
    fetcher
  );
  const resetCom = () => {
    resetField("comment");
  };
  const onValid = (text: any) => {
    const uploadData = { ...text, videoId: video.id };
    upload(uploadData);
    resetField("comment");
    if (!commenDdata) return;
    const now = new Date(Date.now());
    const date =
      now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    const newComment = {
      text: text.comment,
      createdAt: date,
      user: {
        avatar: user.avatar,
        username: user.username,
      },
    };
    commentMutate(
      { ...commenDdata, comments: [...commenDdata.comments, newComment] },
      false
    );
  };
  const comments = commenDdata?.comments;
  const delComment = (id: number) => {
    const ok = window.confirm("정말 삭제하시겠습니까? 😮");
    if (ok) {
      window.alert("삭제되었습니다. 👏");
      upload({ del: id });
      commentMutate(
        {
          ...commenDdata,
          comments: commenDdata.comments.filter(
            (com: Tcomment) => com.id !== id
          ),
        },
        false
      );
    }
  };
  return (
    <div className="font-MonoplexKRRegular w-full min-h-screen flex flex-col items-center  text-white sm:p-10 sm:pt-36 pt-28 pb-5">
      <div className="flex flex-col items-center">
        <div
          style={
            screen >= 1531
              ? { width: "1400px" }
              : size === "Small"
              ? { width: "390px" }
              : size === "Mobile"
              ? { width: "560px" }
              : { width: "700px" }
          }
          className="flex flex-col mb-8"
        >
          <h1>관련 영상</h1>
          <div
            className="flex overflow-x-scroll w-full sm:gap-1 gap-5"
            id="relate"
          >
            {related?.map((rel: videoType, index: any) => (
              <div
                onClick={() => {
                  router.push(`/watch/${rel.youtubeId}`);
                }}
                key={index}
                className="min-w-max cursor-pointer relative "
              >
                <img
                  className="2xl:w-72 lg:w-56 sm:w-44 w-36 rounded-lg"
                  src={rel.thumb}
                ></img>
                <div className="h-full w-full absolute top-0 sm:opacity-0 opacity-75 hover:opacity-75 duration-200">
                  <div className="2xl:w-80 lg:w-56 sm:w-44 w-36 bg-black absolute bottom-0">
                    <h1 className="sm:block hidden">{rel.title}</h1>
                  </div>
                </div>
                <div className="2xl:w-80 lg:w-56 sm:w-44 w-36 overflow-hidden">
                  <h1 className="sm:hidden whitespace-nowrap">{rel.title}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        {video ? (
          <div
            className="text-white flex flex-wrap justify-center sm:gap-5 gap-3"
            style={{ wordBreak: "break-all" }}
          >
            <div id="leftBox" className="flex flex-col relative">
              <div className="flex justify-between absolute -top-7 w-full">
                <div className="items-center gap-2 flex">
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
                <div className="flex items-center gap-3 text-xl">
                  <div className="flex items-center gap-1">
                    <h1 className="text-sm">
                      {autoPlay ? "자동재생" : "일시중지"}
                    </h1>
                    <div
                      className="cursor-pointer hover:scale-110"
                      onClick={() => setAutoPlay((prev) => !prev)}
                    >
                      {autoPlay ? (
                        <FontAwesomeIcon color="white" icon={faPlayCircle} />
                      ) : (
                        <FontAwesomeIcon color="gray" icon={faPauseCircle} />
                      )}
                    </div>
                  </div>

                  <h1
                    onClick={clickFav}
                    className={cls(
                      "cursor-pointer hover:scale-110",
                      videodata.isLiked ? "text-red-500" : "text-gray-400"
                    )}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </h1>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative flex items-center justify-center">
                {openInfo ? (
                  <div className="absolute bg-black p-2">
                    <h1>3초후 자동으로 다음 영상으로 넘어갑니다.</h1>
                  </div>
                ) : (
                  <></>
                )}

                <YouTube
                  videoId={video?.youtubeId}
                  opts={{
                    height:
                      size === "Small"
                        ? "260"
                        : size === "Mobile"
                        ? "300"
                        : "400",
                    width:
                      size === "Small"
                        ? "390"
                        : size === "Mobile"
                        ? "560"
                        : "700",
                    playerVars: {
                      // https://developers.google.com/youtube/player_parameters
                      autoplay: 1,
                      rel: 0,
                      modestbranding: 1,
                    },
                  }}
                  onEnd={(e) => {
                    e.target.stopVideo(0);
                    if (autoPlay) {
                      setOpenInfo(true);
                      setTimeout(() => {
                        router.push(
                          `/watch/${
                            related
                              ? related[random]?.youtubeId
                              : allvideos[random]?.youtubeId
                            //관련 영상들 중 랜덤으로 재생, 관련영상이 없으면 아무거나
                          }`
                        );
                        setOpenInfo(false);
                      }, 3000);
                    }
                  }}
                />
              </div>
              <div id="comment" className="mt-3">
                {user ? (
                  <div id="upload-comment" className="flex gap-2 ">
                    <div className="flex relative justify-center items-center min-w-max">
                      <h1 className="text-2xl absolute opacity-50">
                        {user.avatar ? user.avatar : "🤗"}
                      </h1>
                      <h1 className="z-10">{user?.username}</h1>
                    </div>
                    <form onSubmit={handleSubmit(onValid)} className="w-full">
                      <input
                        placeholder="댓글 추가.."
                        {...register("comment", { require: true })}
                        className="bg-transparent border-b-2 border-gray-400 w-full p-1 outline-none"
                      />
                      <div className="flex gap-3 justify-end mt-1">
                        <div onClick={resetCom} className="p-1 cursor-pointer">
                          취소
                        </div>
                        <button className="px-2 py-1 bg-gray-400 rounded-2xl">
                          댓글
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="my-5">
                    <h1>댓글을 추가하시려면 로그인을 해주세요..</h1>
                  </div>
                )}
                <div id="get-comment" className="mt-2 flex flex-col gap-4">
                  {comments?.map((com: Tcomment, index: any) => (
                    <div key={index} className="flex items-center gap-2">
                      <h1 className="text-2xl">
                        {com.user.avatar ? com.user.avatar : "🤗"}
                      </h1>
                      <div>
                        <div className="text-sm text-gray-300 flex gap-2 items-center">
                          <h1>{com.user.username}</h1>
                          <h1>{com?.createdAt?.slice(0, 10)}</h1>
                          {user?.id === com.user.id ? (
                            <div
                              onClick={() => {
                                delComment(com.id);
                              }}
                              className="cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <h1>{com.text}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              id="rightBox"
              className="flex flex-col gap-2"
              style={
                size === "Small"
                  ? { width: "390px" }
                  : size === "Mobile"
                  ? { width: "560px" }
                  : { width: "700px" }
              }
            >
              <h1 className="font-bold md:text-2xl sm:text-xl text-base">
                {video.title}
              </h1>
              <div id="channel" className="flex items-center gap-2">
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
                    <h1
                      className="font-Pretendard text-violet-300 opacity-75"
                      key={index}
                    >
                      #{tag}
                    </h1>
                  ))}
              </div>
              <div
                id="description"
                className="bg-gray-500 p-2 box-border rounded-xl"
              >
                {arr.slice(0, 5).map((des, index) => (
                  <div className="my-1" key={index}>
                    <h1>{des}</h1>
                  </div>
                ))}
                {arr?.length > 5 && !openDes ? (
                  <></>
                ) : (
                  arr.map((des, index) => (
                    <div className="my-1" key={index}>
                      <h1>{des}</h1>
                    </div>
                  ))
                )}
                <h1
                  onClick={() => {
                    setOpenDes((prev) => !prev);
                  }}
                  className="cursor-pointer text-center hover:bg-gray-600 py-1"
                >
                  {arr?.length > 5 && !openDes ? "더 보기.." : "간략히"}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <BeatLoader color="#36d7b7" />
        )}
      </div>
    </div>
  );
}

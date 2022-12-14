import useUser from "../libs/client/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faHeadphones,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import useMutaion from "../libs/client/useMutation";
import { useEffect, useState } from "react";
import { FloatingBtn } from "../components/FloatingBtn";
import { useRouter } from "next/router";
import { MutationResult } from "../pages/upload";

export const Header = () => {
  const router = useRouter();
  const user = useUser(false);
  //const [user, setUser] = useState() as any;
  const goHome = () => {
    router.push("/");
  };
  const [open, setOpen] = useState(false);
  //-------user
  const [logout] = useMutaion<MutationResult>("/api/users/me");
  const onLogout = () => {
    const ok = window.confirm("로그아웃 하시겠습니까? 👋");
    if (ok) {
      router.reload();
      logout({});
    }
  };
  return (
    <div className="w-full p-3 bg-black fixed flex justify-between items-center z-20 top-0 text-white">
      <h1
        onClick={goHome}
        className="font-Cafe24Shiningstar text-6xl md:text-8xl cursor-pointer"
      >
        Husic
      </h1>
      {user?.user?.ok ? (
        user.isLoading ? (
          <></>
        ) : (
          <div className="flex sm:gap-7 gap-2 sm:mr-10 sm:text-xl lg:text-2xl items-center relative">
            <div className="gap-7 items-center sm:flex hidden">
              <FloatingBtn isBlack={false} Text={"Upload"} href="/upload" />
              <FloatingBtn isBlack={true} Text={"Listen"} href="/watch" />
            </div>
            <div className="gap-2 items-center sm:hidden flex text-black">
              <div
                onClick={() => {
                  router.push("/upload");
                }}
                className="bg-white w-6 h-6 rounded-full flex items-center hover:text-gray-400 duration-200 justify-center cursor-pointer"
              >
                <FontAwesomeIcon icon={faFileUpload} />
              </div>
              <div
                onClick={() => {
                  router.push("/watch");
                }}
                className="bg-white w-6 h-6 rounded-full flex items-center hover:text-gray-400 duration-200 justify-center cursor-pointer"
              >
                <FontAwesomeIcon icon={faHeadphones} />
              </div>
            </div>
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="sm:text-4xl text-2xl hover:text-gray-400 duration-200 cursor-pointer"
            >
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            {open && (
              <div className="bg-white absolute sm:-right-10 sm:top-14 right-0 top-8 rounded-lg items-center justify-center text-black sm:text-sm font-MonoplexKRRegular px-7 py-4">
                <h1
                  className="cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  PROFILE
                </h1>
                <h1 className="cursor-pointer" onClick={onLogout}>
                  LOG OUT
                </h1>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="flex gap-10 sm:mr-10 sm:text-xl lg:text-2xl items-center">
          <FloatingBtn isBlack={false} Text={"Login"} href="/enter" />
          <FloatingBtn isBlack={true} Text={"Join"} href="/enter" />
        </div>
      )}
    </div>
  );
};

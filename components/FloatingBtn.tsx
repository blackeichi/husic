import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { enterState } from "../libs/client/atom";
import { cls } from "../libs/client/utils";

type IBtn = {
  href: string;
  isBlack: boolean;
  Text: string;
};

export const FloatingBtn = ({ href, isBlack, Text }: IBtn) => {
  const setEnter = useSetRecoilState(enterState);
  return (
    <Link
      onClick={() => {
        isBlack ? setEnter("join") : setEnter("login");
      }}
      href={{
        pathname: href,
        query: {
          form: Text,
        },
      }}
      as={href}
    >
      <h1
        className={cls(
          "cursor-pointer font-MonoplexKRRegular",
          isBlack
            ? "bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-400 duration-200"
            : ""
        )}
      >
        {Text}
      </h1>
    </Link>
  );
};

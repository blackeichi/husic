import Link from "next/link";
import { cls } from "../libs/utils";

type IBtn = {
  href: string;
  isBlack: boolean;
  Text: string;
};

export const FloatingBtn = ({ href, isBlack, Text }: IBtn) => {
  return (
    <Link
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
          "cursor-pointer",
          isBlack ? "bg-white text-black px-4 py-2 rounded-xl" : ""
        )}
      >
        {Text}
      </h1>
    </Link>
  );
};

import Link from "next/link";

type IBtn = {
  href: string;
  isBlack: boolean;
  Text: string;
};

export const FloatingBtn = ({ href, isBlack, Text }: IBtn) => {
  return (
    <Link href={href}>
      <h1
        className={
          isBlack
            ? "cursor-pointer bg-white text-black px-4 py-2 rounded-xl"
            : "cursor-pointer"
        }
      >
        {Text}
      </h1>
    </Link>
  );
};

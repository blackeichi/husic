import useUser from "../libs/client/useUser";
import { BeatLoader } from "react-spinners";
import { Header } from "../components/Header";

export default function Profile() {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <div className="font-MonoplexKRRegular w-full min-h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3 sm:p-10 sm:pt-32 pt-24 pb-5 ">
      <Header />
      {isLoading ? (
        <BeatLoader color="#36d7b7" />
      ) : (
        <div className="flex flex-col justify-center gap-1">
          <h1 className="font-bold text-lg">
            {user?.profile?.nickname}&apos;s profile
          </h1>
          <button className="hover:bg-gray-300 hover:text-gray-800 duration-200">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

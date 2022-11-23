import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../components/Buttton";
import { Input } from "../components/Input";
import useMutaion from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";
import Youtube from "../libs/client/getYoutube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type UploadForm = {
  id: string;
  tag?: string;
  confirmPw?: string;
};
interface MutationResult {
  ok: boolean;
}

export default function Upload() {
  const { register, handleSubmit, resetField } = useForm<UploadForm>();
  //const [enter, { loading, data, error }] = useMutaion<MutationResult>("/api/users/enter");
  const onValid = (formData: UploadForm) => {
    console.log(formData);
    //if (loading) return;
    // enter(formData);
  };
  const user = useUser();
  const youtube = Youtube("tlOm6N8_5Ec");
  console.log(youtube);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3 pt-10">
      <form
        onSubmit={handleSubmit(onValid)}
        className={"flex flex-col gap-1  items-center sm:w-72 w-4/5"}
      >
        <Input
          label={"영상 ID"}
          name={"id"}
          type={"text"}
          register={register("id", {
            required: true,
          })}
          required
        />
        <button
          className={
            "bg-white w-full py-2 rounded-md border text-black focus:border-y-blue-400 focus:outline-none focus:ring-border-y-blue-400 hover:bg-slate-200 duration-400"
          }
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <form className={"flex flex-col gap-3  items-center sm:w-72 w-4/5"}>
        <Input
          label={"태그"}
          name={"tag"}
          type={"text"}
          register={register("tag", {
            required: true,
          })}
          required
        />
      </form>
    </div>
  );
}

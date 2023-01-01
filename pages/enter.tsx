import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../components/Buttton";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { enterState } from "../libs/client/atom";
import useMutaion from "../libs/client/useMutation";
import useUser from "../libs/client/useUser";

type EnterForm = {
  username?: string;
  password?: string;
  confirmPw?: string;
};
interface MutationResult {
  ok: boolean;
  user?: User;
  error?: string;
}

export default function Enter() {
  const router = useRouter();
  const { form } = router.query;
  const { register, handleSubmit, resetField } = useForm<EnterForm>();
  const [enter, { loading, data }] =
    useMutaion<MutationResult>("/api/users/enter");
  const onValid = (formData: EnterForm) => {
    if (loading) return;
    enter(formData);
  };
  const [enterValue, setEnter] = useRecoilState(enterState);
  useEffect(() => {
    resetField("username");
    resetField("password");
    resetField("confirmPw");
  }, [resetField, enterValue]);
  useEffect(() => {
    if (form === "Join") {
      if (data?.ok) {
        router.reload();
      }
    } else {
      if (data?.ok) {
        console.log("login");
        router.push("/");
      }
    }
  }, [router, data, setEnter, form]);
  const { user, isLoading } = useUser(false);
  if (user?.profile) {
    router.replace("/");
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3 pt-10">
      <Header />
      <h1 className="text-2xl font-MonoplexKRRegular">
        {enterValue === "join" ? "회원가입" : "로그인"}
      </h1>
      <form
        onSubmit={handleSubmit(onValid)}
        className={"flex flex-col gap-3  items-center sm:w-72 w-4/5"}
      >
        <Input
          label={"ID"}
          name={"username"}
          type={"text"}
          register={register("username", {
            required: true,
          })}
          required
        />
        <Input
          label={"Password"}
          name={"password"}
          type={"password"}
          register={register("password", {
            required: true,
          })}
          required
        />
        {enterValue === "join" ? (
          <Input
            label={"Confirm Password"}
            name={"confirmPw"}
            type={"password"}
            register={register("confirmPw", {
              required: true,
            })}
            required
          />
        ) : null}
        <Button />
        {data?.error && <h1 className="text-red-400 text-sm">{data?.error}</h1>}
      </form>
    </div>
  );
}

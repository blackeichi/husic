import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";

type EnterForm = {
  username?: string;
  password?: string;
  confirmPw?: string;
};

export default function Enter() {
  const router = useRouter();
  const { form } = router.query;
  const { register, handleSubmit, reset } = useForm<EnterForm>();
  const onValid = () => {};
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white sm:gap-6 gap-3">
      <h1 className="text-2xl font-MonoplexKRRegular">
        {form === "Join" ? "회원가입" : "로그인"}
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
          register={register("username", {
            required: true,
          })}
          required
        />
        {form === "Join" ? (
          <Input
            label={"Confirm Password"}
            name={"password"}
            type={"password"}
            register={register("username", {
              required: true,
            })}
            required
          />
        ) : null}
      </form>
    </div>
  );
}

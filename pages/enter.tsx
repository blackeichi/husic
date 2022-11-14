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
  return (
    <div className="w-full h-screen flex flex-col">
      <Input
        label={"User Name"}
        name={"username"}
        type={"text"}
        register={register("username", {
          required: true,
        })}
        required
      />
    </div>
  );
}

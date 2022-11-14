import type { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  kind?: "text";
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
};

export const Input = ({
  label,
  name,
  kind = "text",
  type,
  register,
  required,
}: InputProps) => {
  return (
    <div className="text-white flex flex-col gap-2 w-full">
      <label>{label}</label>
      <input
        id={name}
        required={required}
        {...register}
        type={type}
        className="text-black w-full rounded-md border px-3 py-2  placeholder-gray-400 focus:border-y-blue-400 focus:outline-none focus:ring-border-y-blue-400"
      />
    </div>
  );
};

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
    <div className="">
      <label>{label}</label>
      <input></input>
    </div>
  );
};

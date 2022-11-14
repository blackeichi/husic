import type { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  kind?: "Join" | "Login";
  type: string;
  register: UseFormRegisterReturn;
  required: boolean;
};

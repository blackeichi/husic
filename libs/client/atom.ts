import { atom } from "recoil";

export const enterState = atom({
  key: "enterState",
  default: "login" || "join",
});

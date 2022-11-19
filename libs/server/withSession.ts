import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  //session에 user추가하기
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
const cookieOptions: IronSessionOptions = {
  cookieName: "husicsession",
  password: process.env.COOKEY_PASSWORD!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

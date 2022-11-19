import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export type ResponseType = {
  ok: boolean;
  [key: string]: any;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { username, password, confirmPw } = req.body;
  if (confirmPw) {
    //join
    bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
      bcrypt.hash(password, salt, async function (err: any, hash: any) {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (user) {
          res.status(404).end();
          console.log("이미 존재하는 아이디입니다.");
        } else {
          await client.user.create({
            data: {
              username,
              password: hash,
            },
          });
          res.status(200).end();
        }
      });
    });
  } else {
    //Login
    const user = await client.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      bcrypt.compare(
        password,
        user.password,
        async function (err: any, result: any) {
          if (result) {
            req.session.user = {
              id: user.id,
            };
            await req.session.save();
            console.log("로그인!");
            res.json({
              ok: true,
            });
          } else {
            res.status(404).json({ ok: false });
            console.log("비밀번호가 틀렸습니다.");
          }
        }
      );
    }
  }
}
export default withApiSession(withHandler("POST", handler));

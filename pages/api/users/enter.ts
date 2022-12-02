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
          res
            .status(404)
            .json({ ok: false, error: "이미 존재하는 아이디입니다." });
        } else {
          await client.user.create({
            data: {
              username,
              nickname: username,
              password: hash,
            },
          });
          res.status(200).json({
            ok: true,
          });
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
            res.status(200).json({
              ok: true,
              user: req.session.user,
            });
          } else {
            res
              .status(404)
              .json({ ok: false, error: "비밀번호가 틀렸습니다." });
          }
        }
      );
    } else {
      res.status(404).json({ ok: false, error: "존재하지 않는 아이디입니다." });
    }
  }
}
export default withApiSession(withHandler(["POST"], handler));

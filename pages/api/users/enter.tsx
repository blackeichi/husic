import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
const bcrypt = require("bcrypt");
const saltRounds = 10;

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
      bcrypt.compare(password, user.password, function (err: any, result: any) {
        if (result) {
        } else {
          res.status(404).end();
          console.log("비밀번호가 틀렸습니다.");
        }
      });
    }
  }
  res.status(200).end();
}

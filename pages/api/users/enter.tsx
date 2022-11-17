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
  let hashPW: any;
  if (confirmPw) {
    //join
    bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
      bcrypt.hash(password, salt, async function (err: any, hash: any) {
        const user = await client.user.upsert({
          where: {
            username,
          },
          create: {
            username,
            password: hash,
          },
          update: {},
        });
      });
    });
  } else {
    //Login
    bcrypt.compare(password, hashPW, function (err: any, result: any) {
      console.log(result);
    });
  }
  console.log(hashPW);
  res.status(200).json({ name: "John Doe" });
}

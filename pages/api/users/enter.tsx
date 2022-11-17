import type { NextApiRequest, NextApiResponse } from "next";
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
  let hashedPw = "";
  if (confirmPw) {
    //Join
  } else {
    //Login
  }
  bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
    bcrypt.hash(password, salt, function (err: any, hash: any) {
      hashedPw = hash;
    });
  });
  bcrypt.compare(password, hashedPw, function (err: any, result: any) {
    console.log(result);
  });
  res.status(200).json({ name: "John Doe" });
}

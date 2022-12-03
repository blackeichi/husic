import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";
import { ResponseType } from "./enter";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { nickname, avatar },
  } = req;
  const currentUser = await client.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (nickname && nickname !== currentUser?.nickname) {
    const alreadyExists = Boolean(
      await client.user.findUnique({
        where: {
          nickname,
        },
        select: {
          id: true,
        },
      })
    );
    if (alreadyExists) {
      return res.json({
        ok: false,
        error: "이미 존재하는 닉네임입니다.😮",
      });
    }
    await client.user.update({
      where: {
        id: user?.id,
      },
      data: {
        nickname,
        avatar,
      },
    });
    console.log("Update!");
    res.json({ ok: true, nickname });
  } else {
    await client.user.update({
      where: {
        id: user?.id,
      },
      data: {
        avatar,
      },
    });
    console.log("Update!");
    res.json({ ok: true });
  }
}
export default withApiSession(withHandler(["GET", "POST"], handler));

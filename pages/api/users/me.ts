import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";
import { ResponseType } from "./enter";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });
    if (profile) {
      res.json({
        ok: true,
        profile,
      });
    }
  }
  if (req.method === "POST") {
    console.log("로그아웃!");
    await req.session.destroy();
    res.send({ ok: true });
  }
}
export default withApiSession(withHandler(["GET", "POST"], handler));

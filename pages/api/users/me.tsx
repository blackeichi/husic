import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";
import { ResponseType } from "./enter";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
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
export default withApiSession(withHandler("GET", handler));

import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { withApiSession } from "../../../libs/server/withSession";
import { ResponseType } from "../users/enter";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;
  const videos = await client.video.findMany({
    take: 4,
    include: {
      user: true,
    },
  });
  const favs = await client.fav.findMany({
    where: {
      userId: user?.id,
    },
  });
  console.log(favs);
  if (videos) {
    res.json({
      ok: true,
      videos,
    });
  }
}
export default withApiSession(withHandler(["GET"], handler));

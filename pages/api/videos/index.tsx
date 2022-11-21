import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { ResponseType } from "../users/enter";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const videos = await client.video.findMany({
    take: 4,
  });
  if (videos) {
    res.json({
      ok: true,
      videos,
    });
  }
}
export default withHandler("GET", handler);

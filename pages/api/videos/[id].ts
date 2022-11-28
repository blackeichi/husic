import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { ResponseType } from "../users/enter";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  console.log(id);
  const videos = await client.video.findUnique({
    where: {
      youtubeId: id?.toString(),
    },
  });
  if (videos) {
    res.json({
      ok: true,
      videos,
    });
  }
}
export default withHandler(["GET"], handler);

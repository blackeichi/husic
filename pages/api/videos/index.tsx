import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { ResponseType } from "../users/enter";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const videos = await client.video.findMany();
    if (videos) {
      res.json({
        ok: true,
        videos,
      });
    }
  }
  if (req.method === "POST") {
    const {
      body: { title },
      session: { user },
    } = req;
    const videos = await client.video.create({
      data: { title, user: { connect: { id: user?.id } } },
    });
  }
}
export default withHandler(["GET", "POST"], handler);

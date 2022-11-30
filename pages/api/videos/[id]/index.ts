import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import withHandler from "../../../../libs/server/withHandler";
import { ResponseType } from "../../users/enter";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const videos = await client.video.findUnique({
    where: {
      youtubeId: id?.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  const terms = videos?.tags.split(",").map((word) => ({
    tags: {
      contains: word,
    },
  }));
  const related = await client.video.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: videos?.id,
        },
      },
    },
  });
  //console.log(terms);
  if (videos) {
    res.json({
      ok: true,
      videos,
      related,
    });
  }
}
export default withHandler(["GET"], handler);

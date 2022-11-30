import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";
import withHandler from "../../../../libs/server/withHandler";
import { withApiSession } from "../../../../libs/server/withSession";
import { ResponseType } from "../../users/enter";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
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
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        youtubeId: videos?.youtubeId,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  if (videos) {
    res.json({
      ok: true,
      videos,
      related,
      isLiked: !user ? false : isLiked,
    });
  }
}
export default withApiSession(withHandler(["GET"], handler));

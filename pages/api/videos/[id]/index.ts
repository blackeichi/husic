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
  if (req.method === "DELETE") {
    const { id } = req.body;
    /* const video = await client.video.delete({
      where: {
        id: id,
      },
    }); */
    res.json({ ok: true });
  } else {
    const videos = await client.video.findUnique({
      where: {
        youtubeId: id?.toString(),
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
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
          videoId: videos?.id,
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
}
export default withApiSession(withHandler(["GET", "DELETE"], handler));

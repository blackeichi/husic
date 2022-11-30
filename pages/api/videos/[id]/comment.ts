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
  if (req.method === "GET") {
    const comments = await client.comment.findMany({
      where: {
        youtubeId: id?.toString(),
      },
      include: {
        user: true,
      },
    });
    if (comments) {
      res.json({
        ok: true,
        comments,
      });
    }
  }
  if (req.method === "POST") {
    const { comment, videoId, del } = req.body;
    if (del) {
      const comments = await client.comment.delete({
        where: {
          id: del,
        },
      });
      res.json({ ok: true });
    } else {
      const comments = await client.comment.create({
        data: {
          youtubeId: id?.toString(),
          text: comment,
          user: { connect: { id: user?.id } },
          video: { connect: { id: videoId } },
        },
      });
      res.json({ ok: true, comments });
    }

    /*
      const videos = await client.video.create({
        data: {
          title: videoData.title,
          youtubeId: youtubeId,
          thumb: videoData.thumbnails.medium.url,
          description: videoData.description,
          createdAt: videoData.publishedAt,
          tags: videoData.tags.join(),
          channelId: videoData.channelId,
          channelTitle: channelData.title,
          channelThumb: channelData.thumbnails.default.url,
          user: { connect: { id: profile?.id } },
        },
      });
      res.status(200).json({
        ok: true,
        data: videos,
      });
    } */
  }
}

export default withApiSession(withHandler(["GET", "POST"], handler));

23;

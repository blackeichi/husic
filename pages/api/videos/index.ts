import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "../../../libs/server/withHandler";
import { ResponseType } from "../users/enter";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const videos = await client.video.findMany({
      include: {
        user: true,
      },
    });
    if (videos) {
      res.json({
        ok: true,
        videos,
      });
    }
  }
  if (req.method === "POST") {
    const {
      body: { profile, channelData, videoData, youtubeId },
    } = req;
    const exist = await client.video.findUnique({
      where: { youtubeId: youtubeId },
    });
    if (exist) {
      res.status(404).json({
        ok: false,
        error: "이미 존재하는 영상입니다!",
      });
    } else {
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
    }
  }
}
export default withHandler(["GET", "POST"], handler);

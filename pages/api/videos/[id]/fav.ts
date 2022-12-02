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
    body: { videoId },
  } = req;
  const alreadyExists = await client.fav.findFirst({
    where: {
      videoId: videoId,
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        video: {
          connect: {
            youtubeId: id?.toString(),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(withHandler(["POST"], handler));

23;

import { NextApiRequest, NextApiResponse } from "next";

type method = "GET" | "POST" | "DELETE";

export default function withHandler(
  method: method[],
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !method.includes(req.method as any)) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

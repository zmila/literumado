// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  dato: string;
  tempo: number;
  nomo: string | string[];
};

/** /api/ek?nomo=aoeui */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const nomo = req.query.nomo || "eĥoŝanĝo ĉiuĵaŭde";
  const d = new Date();
  res.status(200).json({ dato: d.toLocaleString("eo"), tempo: d.getTime(), 'nomo': nomo });
}

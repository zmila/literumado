// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';

/** /api/historio */
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const filePath = path.join(process.cwd(), 'public', 'historio.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    res.status(200).json(data);
}
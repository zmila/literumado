import type { NextApiRequest, NextApiResponse } from 'next'

/** /api/eroj/3 ==> numero 3 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { numero } = req.query
    res.end(`numero: ${numero}`)
}
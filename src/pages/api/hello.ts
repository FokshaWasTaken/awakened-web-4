// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

export const config = {runtime: 'edge'};

type Data = {
    [key: string]: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({hello: 'world!'})
}

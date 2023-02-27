import { NextApiRequest, NextApiResponse } from "next"

type User = {
    id: string
    name: string
    age?: number
    phoneNumber?: string
}

type Props = User[]


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Props>) {
    // getリクエスト以外を受け付けない
    if(req.method?.toLocaleLowerCase() != 'get'){
        return res.status(405).end()
    }
    res.status(200).json([
        {
            id: '1',
            name: 'kawanobe',
            age: 32,
            phoneNumber: '090-1234-5678'
        }, {
            id: '2',
            name: 'kishimoto',
            age: 30,
            phoneNumber: '080-1234-5678'
        }, {
            id: '3',
            name: 'fushiana',
            age: 27,
            phoneNumber: '080-6332-5447'
        }
    ])
}

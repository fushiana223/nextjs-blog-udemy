import { NextApiRequest, NextApiResponse } from "next"

type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: [
            {
                lat: string,
                lng: string
            }
        ]
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

type Props = User[]


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Props>) {
    // getリクエスト以外を受け付けない
    if (req.method?.toLocaleLowerCase() != 'get') {
        return res.status(405).end()
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    res.status(200).json(users)
}

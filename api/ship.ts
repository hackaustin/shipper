import { PrismaClient } from "@prisma/client";
import { VercelRequest, VercelResponse } from "@vercel/node"


export default async function handler(req: VercelRequest, res: VercelResponse) {
    const prisma = new PrismaClient()
    const bo = JSON.parse(req.body)
    let connector: any[] = []
    for (let i = 0; i < bo.team.length; i++) {
        connector.push({
            email: bo.team[i]
        })
    }
    await prisma.ship.create({
        data: {
            title: bo.title,
            link: bo.link,
            authors: {
                connect: connector 
            }
        }
    })
    res.status(200).send("ok")
}
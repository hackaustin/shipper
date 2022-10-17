import { PrismaClient, Ship } from "@prisma/client";
import { VercelRequest, VercelResponse } from "@vercel/node"

interface ModShip {
    id: string;
    votes: number;
    link: string | null;
    title: string;
}

export default async function(req: VercelRequest, res: VercelResponse) {
    const prisma = new PrismaClient()
    const ships = await prisma.ship.findMany()
    const ret: ModShip[] = []
    for (const ship of ships) {
        ret.push({
            id: ship.id.toString(),
            link: ship.link,
            title: ship.title,
            votes: ship.votes
        })
    }
    res.status(200).send(ret)
}
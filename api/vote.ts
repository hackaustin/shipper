import { Prisma, PrismaClient } from "@prisma/client";
import { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handle(req: VercelRequest, res: VercelResponse) {
    const prisma = new PrismaClient()
    const sh = await prisma.ship.findFirst({where: {id: {equals: req.body}}}) 
    if (sh == null) { res.status(500).send("error lol"); return }
    const cvotes = sh.votes + 1 
    await prisma.ship.update({where: {id: req.body}, data: {votes: cvotes}})
}
import { PrismaClient } from "@prisma/client";
import { VercelRequest, VercelResponse } from "@vercel/node"


export default async function handler(req: VercelRequest, res: VercelResponse) {
    const prisma = new PrismaClient()
    const person = await prisma.participant.findFirst({where: {email: {equals:req.body}}})
    res.status(200).send(person !== null)
}
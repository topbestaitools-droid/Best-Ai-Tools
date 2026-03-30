import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { searchQuery, tag } = req.query;

        try {
            const tools = await prisma.tool.findMany({
                where: {
                    AND: [
                        { name: { contains: searchQuery as string, mode: 'insensitive' } },
                        { tagline: { contains: searchQuery as string, mode: 'insensitive' } },
                        tag ? { tags: { some: { name: tag as string } } } : {},
                    ],
                },
                include: {
                    reviews: true,
                },
            });

            const responseData = tools.map(tool => {
                const averageRating = tool.reviews.length > 0 
                    ? tool.reviews.reduce((sum, review) => sum + review.rating, 0) / tool.reviews.length 
                    : 0;
                return {
                    ...tool,
                    averageRating,
                    reviewCount: tool.reviews.length,
                };
            });

            res.status(200).json(responseData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
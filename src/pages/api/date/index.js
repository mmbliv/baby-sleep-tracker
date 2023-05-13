import serverAuth from "../../../../libs/serverAuth";
import prisma from "../../../../libs/prismadb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "GET") {
      const { userId } = req.query;
      let sleeping;

      if (userId && typeof userId === "string") {
        sleeping = await prisma.sleeping.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).json(sleeping);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

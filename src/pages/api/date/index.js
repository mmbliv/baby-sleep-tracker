import serverAuth from "../../../../libs/serverAuth";
import prisma from "../../../../libs/prismadb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "GET") {
      const { userId, weekOrMonth, date } = req.query;
      let sleeping;
      // console.log(date);
      if (userId && typeof userId === "string") {
        if (weekOrMonth === "weekly") {
          const queryDate = new Date(date);
          const weekStart = new Date(queryDate);
          weekStart.setDate(weekStart.getDate() - queryDate.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 7);
          sleeping = await prisma.sleeping.findMany({
            where: {
              fell_asleep: {
                gte: weekStart,
                lt: weekEnd,
              },
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
        if (weekOrMonth === "monthly") {
          const d = new Date(date);
          const year = d.getFullYear();
          const month = d.getMonth();

          const startDate = new Date(year, month, 1);
          const endDate = new Date(year, month + 1, 1);

          sleeping = await prisma.sleeping.findMany({
            where: {
              fell_asleep: {
                gte: startDate,
                lt: endDate,
              },
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
      }
      return res.status(200).json(sleeping);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

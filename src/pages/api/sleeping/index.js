// import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "../../../../libs/serverAuth";
import prisma from "../../../../libs/prismadb";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;
      const sleeping = await prisma.sleeping.create({
        data: {
          ...body,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(sleeping);
    }

    if (req.method === "GET") {
      const { userId } = req.query;
      let sleeping;

      if (userId && typeof userId === "string") {
        const d = new Date();
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
            createdAt: "asc",
          },
        });
      }
      return res.status(200).json(sleeping);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

  if (req.method === "PATCH") {
    try {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;
      const updatedSleeping = await prisma.sleeping.update({
        where: {
          id: body.id,
        },
        data: {
          woke_up: body.woke_up,
          note: body.note,
        },
      });
      return res.status(200).json(updatedSleeping);
    } catch (err) {
      console.log(err);
      return res.status(400).end();
    }
  }
}

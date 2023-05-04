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
      // console.log(req.body);
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

      // console.log(req.query);

      let sleeping;

      if (userId && typeof userId === "string") {
        sleeping = await prisma.sleeping.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            // comments: true,
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

  if (req.method === "PATCH") {
    try {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;
      const updatedSleeping = await prisma.sleeping.update({
        where: {
          id: body.id,
          userId: currentUser.id,
        },
        data: {
          woke_up: body.woke_up,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).end();
    }
  }
}

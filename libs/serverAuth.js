// import { NextApiRequest, NextApiResponse } from "next";

import prisma from "./prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const serverAuth = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  // console.log(session);

  if (!session?.user?.email) {
    throw new Error("no session");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("no user");
  }

  return { currentUser };
};

export default serverAuth;

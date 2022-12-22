// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { client } from "../../utils/client";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const user = req.body;
    client.createIfNotExists(user).then(() => res.status(200).json("Login success"));
  }
};

export default handler;

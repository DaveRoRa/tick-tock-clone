// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { client } from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = postDetailQuery(id as string);
    const data = await client.fetch(query);
    
    res.status(200).json(data);
  }
};

export default handler;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await client.fetch(allPostsQuery);

    res.status(200).json(response);
  } else if (req.method === "POST") {
    const document = req.body;
    await client.create(document);
    res.status(201).json("Video created");
  }
};

export default handler;

import {client} from "@app/utils/contentful";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await client.getEntries({ content_type: "generalContent" });
    res.status(200).json(response.items[0].fields);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch general content" });
  }
}
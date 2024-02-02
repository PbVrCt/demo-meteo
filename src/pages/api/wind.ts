import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "sst/node/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const date = req.query.date as string;
    const response = await fetch(`${Api.api.url}/wind?date=${date}`);
    const htmlString = await response.text();
    res.status(200).send(htmlString);
  } catch (error) {
    res.status(500).json({ error: "Failed to load data" });
  }
}

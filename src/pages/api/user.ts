import { table } from "@/utils/Airtable";
import { Error } from "airtable";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, name, address } = req.body;
    const addressRecord = await table
      .select({
        fields: ["address", "email", "name"],
        filterByFormula: `address = '${address}'`,
      })
      .all();

    if (addressRecord.length > 0) {
      return res.status(400).json({ error: "Address already registered" });
    }

    const emailRecord = await table
      .select({
        fields: ["address", "email", "name"],
        filterByFormula: `email = '${email}'`,
      })
      .all();

    if (emailRecord.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    try {
      const createdRecord = await table.create([
        {
          fields: {
            address,
            email,
            name,
          },
        },
      ]);
      return res.status(200).json(createdRecord);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  if (req.method === "PUT") {
    const { email, name, address } = req.body;

    const record = await table
      .select({
        fields: ["address", "email", "name"],
        filterByFormula: `address = '${address}'`,
      })
      .firstPage();

    try {
      const updatedRecord = await table.update([
        {
          id: record[0].id,
          fields: {
            address,
            email,
            name,
          },
        },
      ]);
      return res.status(200).json(updatedRecord);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: (err as Error).message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;

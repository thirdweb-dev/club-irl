import { table } from "@/utils/Airtable";
import { Error } from "airtable";
import { getUser } from "auth.config";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUser(req);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const {
      email,
      name,
      address,
      company,
      role,
      bio,
      communication,
      handle,
      events,
      connections,
      location_city,
    } = req.body;
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
            company,
            role,
            bio,
            communication,
            handle,
            events,
            connections,
            location_city,
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
    const {
      email,
      name,
      company,
      role,
      bio,
      communication,
      handle,
      events,
      connections,
      shared_channel,
      location_city,
    } = req.body;

    const address = user.address;

    const record = await table
      .select({
        fields: ["address", "email", "name"],
        filterByFormula: `address = '${address}'`,
      })
      .firstPage();

    if (record.length === 0) {
      try {
        const createdRecord = await table.create([
          {
            fields: {
              address,
              email,
              name,
              company,
              role,
              bio,
              communication,
              handle,
              events,
              connections,
              shared_channel,
              location_city,
            },
          },
        ]);
        return res.status(200).json(createdRecord);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: (err as Error).message });
      }
    }

    try {
      const updatedRecord = await table.update([
        {
          id: record[0].id,
          fields: {
            address,
            email,
            name,
            company,
            role,
            bio,
            communication,
            handle,
            events,
            connections,
            shared_channel,
            location_city,
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

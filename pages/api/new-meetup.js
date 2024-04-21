// api/new-meetup
//POST /api/new-meetup

import { connectToDatabase, closeConnection } from "../../db/mongoConnection";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      //const { title, description, address, image } = data;
      const { db } = await connectToDatabase();

      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data);
      // console.log(result);
      await closeConnection();

      res.status(201).json({ message: "Meetup inserted!" });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;

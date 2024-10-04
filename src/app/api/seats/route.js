// pages/api/seats/index.js
import { connect } from "@/dbConfig/dbConfig";
import Seat from "@/models/seatModel";

connect();


export default async function handler(req, res) {


  if (req.method === 'GET') {
    // Fetch all seats
    try {
      console.log('Fetching all seats');
      const seats = await Seat.find({});
      
      res.status(200).json({ success: true, data: seats });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === 'POST') {
    // Book seat(s)
    try {
      const { seatNumbers } = req.body; // Array of seat numbers
      await Seat.updateMany({ seatNumber: { $in: seatNumbers } }, { isBooked: true });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

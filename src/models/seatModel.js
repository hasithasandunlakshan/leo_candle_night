import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

export default mongoose.models.Seat || mongoose.model('Seat', seatSchema);

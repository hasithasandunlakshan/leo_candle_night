import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    index: { type: String, required: true },
    numOfSeat: { type: Number, required: true },
    seats: { type: [String], required: true },
    users: [
      {
        username: { type: String, required: true },
        email: { type: String, required: true },
        whatsapp: { type: String, required: true },
        department: { type: String, required: true },
        foodList: { type: [String], required: true },
        totalPrice: { type: Number, required: true },
        batch: { type: String, required: true },
        faculty: { type: String, required: true },
        seatNumber: { type: String, default: undefined }, // Optional field
      },
    ],
    createdAt: { type: Date, default: Date.now },
  });
  
  // Check if the Order model already exists, otherwise create it
  const User = mongoose.models.Order || mongoose.model("User", orderSchema);

export default User;
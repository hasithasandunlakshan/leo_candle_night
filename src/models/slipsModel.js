import mongoose from 'mongoose';

const slipsSchema = new mongoose.Schema({
    publicId: { type: String, required: true },
    imageUrl: { type: String, default: false },
    createdAt: { type: Date, default: false },
});

export default mongoose.models.Slips || mongoose.model('Slips', slipsSchema);
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: [true, "Please provide a name"],
    },
    price: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a index number"],
        unique: true
    }

})

const Food = mongoose.models.foods || mongoose.model("foods", foodSchema);

export default Food;
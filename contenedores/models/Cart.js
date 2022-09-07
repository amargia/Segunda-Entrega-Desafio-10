import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: { type: Array, required: true },
});

export const Cart = mongoose.model("cart", CartSchema);
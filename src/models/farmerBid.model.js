import mongoose, { Schema } from "mongoose";

const farmerBidSchema = new Schema({
//   farmer_id: {
//     type: Schema.Types.ObjectId,
//     ref: "Farmer",
//     required: true,
//   },
  cropType: {
    type: String,
    required: true,
  },
  land_size: {
    type: Number,
    required: false,
  },
  harvestTime: {
    type: Number,
    required: true,
  },
  productionCapacity: {
    type: Number,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ["Monthly", "Quarterly"],
    required: true,
  },
});

export const FarmerBid = mongoose.model("FarmerBid", farmerBidSchema);

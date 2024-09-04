import { asyncHandler } from "../utils/asyncHandler.js";
import { Farmer } from "../models/farmer.model.js";
import { FarmerBid } from "../models/farmerBid.model.js";

export const getCropTypes = asyncHandler(async (req, res) => {
  const farmer_id = req.body;
  if (!farmer_id) {
    return res.status(404).json({ message: "provide the farmer id" });
  }
  const farmer = await Farmer.findById(farmer_id);
  if (!farmer) {
    return res.status(404).json({ message: "farmer not found" });
  }

  const cropTypes = farmer.land_details.crop_types;
  if (!cropTypes || cropTypes.length === 0) {
    return res.status(404).json({ message: "No crop types found" });
  }

  res.status(200).json({ message: "cropTypes found", cropTypes });
});

export const postFarmerBid = asyncHandler(async (req, res) => {
    //const farmer_id = req.user._id; 
    //authentication chahiye hoga..have to do it later
  });
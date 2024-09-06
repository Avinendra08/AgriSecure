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

  
//Create the operation

  export const createFarmerBid = asyncHandler(async (req, res) => {
    try {
      const farmerBid = new FarmerBid(req.body);
      const savedBid = await farmerBid.save();
      res.status(201).json(savedBid);
    } catch (error) {
      res.status(400).json({ message: "Create operation failed" });
    }
  });
  
  // Read operation

  export const getFarmerBids = asyncHandler(async (req, res) => {
    try {
      const farmerBids = await FarmerBid.find();
      res.json(farmerBids);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Read operation(by id)

  export const getFarmerBidById = asyncHandler(async (req, res) => {
    try {
      const farmerBid = await FarmerBid.findById(req.params.id);
      if (!farmerBid) {
        return res.status(404).json({ message: "FarmerBid not found" });
      }
      res.json(farmerBid);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update operation(by id)

  export const updateFarmerBid = asyncHandler(async (req, res) => {
    try {
      const updatedBid = await FarmerBid.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedBid) {
        return res.status(404).json({ message: "FarmerBid not found" });
      }
      res.json(updatedBid);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete operation(by id)

  export const deleteFarmerBid = asyncHandler(async (req, res) => {
    try {
      const deletedBid = await FarmerBid.findByIdAndDelete(req.params.id);
      if (!deletedBid) {
        return res.status(404).json({ message: "FarmerBid not found" });
      }
      res.json({ message: "FarmerBid deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

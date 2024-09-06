import express from 'express';
import {
  createFarmerBid,
  getFarmerBids,
  getFarmerBidById,
  updateFarmerBid,
  deleteFarmerBid,
} from '../controllers/farmerBid.controller.js';

const router = express.Router();

//routes

router.post('/', createFarmerBid);
router.get('/', getFarmerBids); //if kuch extra chahiya toh add
router.get('/:farmer_id', getFarmerBidById); //read with id krna hai toh
router.put('/:farmer_id', updateFarmerBid);
router.delete('/:farmer_id', deleteFarmerBid);

export default router;
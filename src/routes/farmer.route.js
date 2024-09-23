import {Router} from "express";
import {onboardFarmer, sendOtp, signUpFarmer, verifyOtp } from "../controllers/farmer.controller.js";

const router = Router();

//router.get("/check",check);
router.post("/signUp",signUpFarmer);
router.post("/onboardFarmer/:farmer_id",onboardFarmer);
router.post("/sendOtp",sendOtp);
router.post("/verifyOtp",verifyOtp);

export default router;
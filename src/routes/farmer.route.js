import {Router} from "express";
import {onboardFarmer, signUpFarmer } from "../controllers/farmer.controller.js";

const router = Router();

//router.get("/check",check);
router.post("/signUp",signUpFarmer);
router.post("/onboardFarmer/:farmer_id",onboardFarmer);

export default router;
import { Farmer } from "../models/farmer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const check = asyncHandler(async (req, res) => {
  console.log("hello");
  res.status(200).json({ message: "hello" });
});

export const signUpFarmer = asyncHandler(async (req, res) => {
  const { first_name, last_name, mobile_number } = req.body;

  //otp validation code
  //if otp is correct then only register the user(done below) else wrong otp message

  const newFarmer = new Farmer({
    first_name,
    last_name,
    mobile_number,
  });

  await newFarmer.save();
  res
    .status(201)
    .json({ message: "signup successfull", farmer_id: newFarmer._id });
});

export const onboardFarmer = asyncHandler(async (req, res) => {
  const { farmer_id } = req.params;
  const {
    gender,
    address,
    age,
    land_details,
    number_of_labourers,
    aadharNumber,
    panNumber,
  } = req.body;

  const updatedFarmer = await Farmer.findByIdAndUpdate(
    farmer_id,
    {
      gender,
      address,
      age,
      land_details,
      number_of_labourers,
      aadharNumber,
      panNumber,
    },
    { new: true }
  );

  if (!updatedFarmer) {
    return res.status(404).json({ message: "Farmer not found" });
  }

  res
    .status(200)
    .json({ message: "Onboarding complete", farmer: updatedFarmer });
});

import { Farmer } from "../models/farmer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import otpGenerator from 'otp-generator';
import twilio from 'twilio';

// export const check = asyncHandler(async (req, res) => {
//   console.log("hello");
//   res.status(200).json({ message: "hello" });
// });
// controler for Send-Otp
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const cDate = new Date()
const twilioClient = new twilio(accountSid,authToken)
export const sendOtp = async(req,res)=>{
  try {
   
   const{mobile_number} = req.body
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    });
    
    await Farmer.findOneAndUpdate(
      {mobile_number},
      {otp,otpExpiration: new Date(cDate.getTime())},
      {upsert: true , new: true , setDefaultsOnInsert: true}
    )

    await twilioClient.messages.create({
      body:`Your OTP is :${otp}`,
      to:mobile_number,
      from: process.env.TWILIO_MOBILE_NUMBER
    })
    return res.status(200).json({
      success:true,
      msg:'OTP sent successfully',
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    })
  }
}

export const verifyOtp = async(req,res) => {
  try {
    const{otp} = req.body
    
    const Farmer = await Farmer.findOne({otp})
    if(Farmer){
      return res.json({
        message : "OTP is correct"
      },)
    }

   
  } catch (error) {
    console.log(error.message)
  }
}
// controller for Signup
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

import mongoose, { Schema } from "mongoose";

const landSchema = new Schema({
  size: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  crop_types: {
    type: String, //enum bhi rakh sakte yahan
    required: true,
  },
  production_quantity: {
    type: Map,
    of: Number,
    //required: true,
  },
});

const addressSchema = new Schema({
  village: {
    type: String,
    required: true,
  },
  postOffice: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pin_code: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const farmerSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  otp:{
    type: String,
    required: true,
  },

  otpExpiration:{
    type: Date,
    get:(otpExpiration)=> otpExpiration.getTime(),
    set:(otpExpiration)=> new Date(otpExpiration),
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: false,
  },
  address: {
    type: addressSchema,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  land_details: {
    type: landSchema, //can be array as the farmer may have multiple lands
    required: false,
  },
  number_of_labourers: {
    type: Number,
    required:false,
  },
  aadharNumber:{
    type:Number,
    required:false,
  },
  panNumber:{
    type:String,
    required:false,
  }
});

export const Farmer = mongoose.model("Farmer", farmerSchema);

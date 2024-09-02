import { asyncHandler } from "../utils/asyncHandler.js";

const check = asyncHandler(async (req, res) => {
  console.log("less go!");
  res.send({ status: 200, success: true, msg: "hello world" });
});

export {check};

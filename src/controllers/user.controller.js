import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { APiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  console.log(email, "email");
  if (
    [fullName, email, userName, password].some((field) => filed?.trim() == "")
  ) {
    throw new ApiError(400, "All fileds are required");
  }
  // if(fullName == ''){ optional
  //   throw new ApiError(400,"full")
  // }
  const existedUser = User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "user with email or username already exist");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar gile is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar gile is required");
  }
  User.create({
    fullName,
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName:userName.toLowerCase()
  })
  const createdUser = await User.findById(userName._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
  }
  return res.status(201).json(
    new APiResponse(200, createdUser, "User Register Sucessfully")
  )
});

export { registerUser };

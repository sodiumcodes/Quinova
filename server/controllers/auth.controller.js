import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { verifyRefreshToken } from '../utils/jwt.js';

// Cookie configuration // httpOnly prevents JavaScript from accessing cookies (protects against XSS) 
// secure ensures cookies are only sent over HTTPS
const options = {
    httpOnly: true,
    secure : true,
}
const generateAccessAndRefresehTokens= async (userId)=>{
    const user = await User.findOne({ _id: userId });
    const refreshToken= user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;

    //when we do save, it will check for password as well, but we only need to save refresh token, so we do this: 
    await user.save({ validateBeforeSave : false });
    return {accessToken, refreshToken};
}
const register = asyncHandler(
    async(req,res)=>{
         //Collect data
        const { fullName, email, password } = req.body;
        
        //Validate data
        // if (!fullName || !email || !password) {
        //     return res.status(400).json({
        //         message: "All fields are required"
        //     })
        // }
        if([fullName, email, password].some((field) => !field || field?.trim() === "")){
            throw new ApiError(400, "All fields are required.")
        }

        //Check if user exists
        if (await User.findOne({ email })) {
            throw new ApiError(409,"User already exists. Kindly login.");
        }
        const user = await User.create({
            fullName, email, password
        })
        const updatedUser = await User.findOne({ email }).select("-password");
        res.status(201).json( new ApiResponse(201,updatedUser,"Registered successful."));
})
const login = asyncHandler(
    async(req,res)=>{
        //Collect data
        const { email, password } = req.body;
        
        //Validate data
        if (!email || !password) {
            throw new ApiError(400, "All fields are required.")
        }

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, "Invalid Credentials.")
        }

        //Compare password
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            throw new ApiError(400, "Invalid Credentials.")
        }
        
        //Generate token
        const {accessToken, refreshToken} = await generateAccessAndRefresehTokens(user._id);

        //now the user that we have here in login, is the old user not the updated one with tokens.
        //so for that reason we make db query.
        //it totally depends on the use case.
        // Excluding password and refreshToken for security
        const updatedUser = await User.findOne({ email }).select("-password -refreshToken");

        res.cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        // also include token in body so front end can store/use it
        .status(200)
        .json( new ApiResponse(200, updatedUser,"Login successful."));
})
const logout = asyncHandler(
    async(req,res)=>{
        await User.findOneAndUpdate(req.user._id, {
                $set:{
                    refreshToken : undefined
                }
            },
            {
                new: true
            }
        )
        res.status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .json(
            new ApiResponse(200,"","Logout successful.")
        )
    }
)
//This function allows a user to stay logged in without repeatedly entering credentials, 
//while still keeping access tokens short-lived and secure.
const refreshAccessToken= asyncHandler(
    async (req, res) => {
        const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken
        if(!incomingRefreshToken) throw new ApiError(401, "Unauthorized Access.");

        try {
            const decodedToken = verifyRefreshToken(incomingRefreshToken);
    
            const user = User.findById(decodedToken?._id).select("-password");
            if(!user) throw new ApiError(401, "Invalid Refresh Token.");
    
            //check if the incoming refresh token is actually correct or not--- meaning if its from the same user or not
            if(incomingRefreshToken !== decodedUser?.refreshToken){
                throw new ApiError(401, "Refresh Token Expired or Used.");
            }
            const {accessToken, newRefreshToken} = await generateAccessAndRefresehTokens();
    
            res.cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .status(200).json(
               new ApiResponse(200, { accessToken, refreshToken } , "Access Token Refreshed.")
            )
        } 
        catch (error) {
            throw new ApiError(400, error.message || "Invalid Request.")
        }
    }
)
export {login, logout, register, refreshAccessToken}
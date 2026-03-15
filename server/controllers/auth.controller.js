import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js'
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
            throw new ApiError(400,"User already exists. Kindly login.");
        }
        const user = await User.create({
            fullName, email, password
        })
        // also include token in body so front end can store/use it
        res.status(201).json({
            message: "Registered successful.",
            user,
        });
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

        // //Generate token

        // also include token in body so front end can store/use it
        res.status(200).json({
            message: "Login successful.",
            user,
            // token
        });
})

export {login , register}
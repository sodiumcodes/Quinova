import User from '../models/user.model.js'
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
        if([fullName, email, password].some((field) => field?.trim() === "")){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        //Check if user exists
        if (await User.findOne({ email })) {
            return res.status(400).json({
                message: "User already exists. Kindly login"
            })
        }
        const user = await User.create({
            fullName, email, password
        })
        // also include token in body so front end can store/use it
        res.status(200).json({
            message: "Login successful",
            user,
        });
})
const login = asyncHandler(
    async(req,res)=>{
        //Collect data
        const { email, password } = req.body;
        
        //Validate data
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        //Compare password
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        // //Generate token

        // also include token in body so front end can store/use it
        res.status(200).json({
            message: "Login successful",
            user,
            // token
        });
})

export {login , register}
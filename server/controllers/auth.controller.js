import User from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.js'
const register = asyncHandler(
    async(req,res)=>{

})
const login = asyncHandler(
    async(req,res)=>{
        res.status(200).json({
            message: "working"
        })
})

export default {register,login}
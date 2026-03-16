import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from "jsonwebtoken"

const verifyUser = asyncHandler(
// since we are not sending any response from this middleware,
// we use '_' for the response parameter to indicate it is unused
    async (req, _, next) => {
        try {
            /*
            Extract access token from either:
                1) Cookies (preferred when using httpOnly cookies)
                2) Authorization header (used in APIs/Postman/mobile apps)
            */
            const accessToken =
                req.cookies?.accessToken ||
                //headers = "Bearer abc123"
                req.headers.authorization?.split(" ")[1]
                //["Bearer", "abc123"]

            if (!accessToken) {
                throw new ApiError(401, "Unauthorized Access.");
            }

            // Verify the token using the secret key
            // If token is invalid or expired, jwt.verify will throw an error
            const decodedUser = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET
            );
            // Extract the user id stored inside the token payload
            const _id = decodedUser._id

            const user = await User.findOne({_id})
                        .select("-password -refreshToken");

            // If user doesn't exist, the token is considered invalid
            if (!user) {
                throw new ApiError(401, "Invalid access token");
            }

            // Attach the authenticated user to the request object
            // This allows later controllers to access req.user
            req.user = user;
            next();

        } 
        catch (error) {
            // If any error occurs (token expired, invalid, DB error),
            // return an authentication error
            throw new ApiError(401, error?.message || "Invalid access token");
        }
    }
)
export { verifyUser };
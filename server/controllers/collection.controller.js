import Collections from "../models/collection.model.js"
import CollectionItem from "../models/collectionItem.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const createCollection = asyncHandler(
    async (req, res) => {
        const {name} = req.params;
        const newName = name.trim();
        if(!newName){
            throw new ApiError(400, "Kindly add a collection Name.")
        }
        const collections = await Collections.create({
            name: newName,
            author: req.user._id,
        })
        return res.status(201)
        .json(new ApiResponse(201, newName));
    }
)
const getCollections= asyncHandler(
    async (req, res) => {
        const collections = await Collections.find({author: req.user._id}).select("name");
        return res.status(200)
        .json(new ApiResponse(200, collections, `Collections by user: ${req.user.username}`))
    }
)
const deleteCollection = asyncHandler(
    async (req, res) => {
        
    }
)
const saveToDefault = asyncHandler(
    async (req, res) => {
        
    }
)
const addToCollection = asyncHandler(
    async (req, res) => {
        
    }
)
const removeFromCollection = asyncHandler(
    async (req, res) => {
        
    }
)
const updateNote = asyncHandler(
    async (req, res) => {
        
    }
)
const getCollectionItems = asyncHandler(
    async (req, res) => {
        
    }
)

export { createCollection , getCollections , deleteCollection , saveToDefault , addToCollection , removeFromCollection , updateNote , getCollectionItems }
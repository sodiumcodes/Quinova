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
        const {name} = req.params;
        console.log(name);
        
        if(!name.trim()){
            throw new ApiError(400, "Please enter a valid collections name.")
        }
        const removed = await Collections.findOneAndDelete({
            name : name.trim()
        });
        if(removed){
            throw new ApiError(400, `Cannot delete Collection : ${name}.`)
        }
        return res.status(204)
        .json(new ApiResponse(204, name, `Collection : ${name} deleted successfully.`))
    }
)
const updateCollectionName = asyncHandler(
    async (req, res) => {
        const {name} = req.params;
        if(!name.trim()){
            throw new ApiError(400, "Please enter a valid collections name.")
        }
        const newName = await Collections.findOneAndUpdate({
            name : name.trim()
        },
        {
            name : req.body.name
        });
        console.log(newName);
        
        return res.status(200)
        .json(new ApiResponse(200, name, `Collection : ${name} updated successfully to ${req.body.name}.`))
    }
)
//collectionItems Controllers
const saveItemToCollection = asyncHandler(
    async (req, res) => {
        const {nameC} = req.query;

        if(!nameC.trim()){
            throw new ApiError(400, "Invalid Collection Name. Please enter a valid name.")
        }
        const collectionName = await Collections.findOne({name: nameC.trim()}); 
        const saved = await CollectionItem.create({
            collections: collectionName._id,
            post: req.body.postId,
            addedBy: req.user._id 
        })
        return res.status(201)
        .json(new ApiResponse(201, saved, `Item added to ${nameC} collection.`))
    }
)
const removeItemFromCollection = asyncHandler(
    async (req, res) => {
        const{id} = req.params;
        const removed = await CollectionItem.findByIdAndDelete({
            _id: id
        })
        return res.status(204)
        .json(
            new ApiResponse(204, null,  "Post removed successfully.")
        )
    }
)
const updateItemNote = asyncHandler(
    async (req, res) => {
        const {id} = req.params;
        const note = req.body.note;
        if(!note){
            throw new ApiError(400, "Please enter a new note.")
        }
        const updatedItem = await CollectionItem.findByIdAndUpdate(
            id,                        
            { note: note },
        );
        if (!updatedItem) {
            throw new ApiError(404, "Collection item not found.");
        }
        return res.status(200)
        .json(new ApiResponse(200, note , "Note updated successfully."))
    }
)
const getCollectionItems = asyncHandler(
    async (req, res) => {
        const {name} = req.params;
        const collectionId = await Collections.findOne({name: name.trim()});
        const posts = await CollectionItem.find({collections: collectionId}).select("post note addedBy -_id");
        if(!posts){
            throw new ApiError(400, "No posts found.")
        }
        return res.status(200)
        .json(
            new ApiResponse(200, posts, `${name}: posts`)
        )
    }
)

export { createCollection , getCollections , deleteCollection , updateCollectionName , saveItemToCollection , removeItemFromCollection , updateItemNote , getCollectionItems }
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Video from '../models/video.model.js';

const publishVideo = asyncHandler(
    async (req,res) => {
        
    }
)
const togglePublishStatus = asyncHandler(
    async (req,res) => {
        
    }
)
const updateVideo = asyncHandler(
    async (req,res) => {
        
    }
)
const getAllVideos = asyncHandler(
    async (req,res) => {
        Video
    }
)
const getVideoById = asyncHandler(
    async (req,res) => {
        
    }
)
const deleteVideo = asyncHandler(
    async (req,res) => {
        
    }
)
export { deleteVideo, getAllVideos, getVideoById, publishVideo, togglePublishStatus, updateVideo }
import { UserModel } from "../models/user.model.js";
import { historyModel } from "../models/history.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createUser = asyncHandler(async (req,res) => {
    const { name } = req.body;
    if(!name){
        throw new ApiError(400, "Name is required.")
    }

    const existedUser = await UserModel.findOne({ name });
    if(existedUser){
        throw new ApiError(400, "user with name already exists.")
    }

    const user = await UserModel.create({ name })

    return res.status(200).json( new ApiResponse(200, user, " User Created successfully.")) 
})

export const getLeaderboard = asyncHandler(async (req, res) => {
  const users = await UserModel.find().sort({ points: -1 });

  const leaderboard = users.map((user, index) => ({
    _id: user._id,
    name: user.name,
    points: user.points,
    rank: index + 1
  }));

  return res.status(200).json(
    new ApiResponse(200, leaderboard, "Leaderboard fetched successfully.")
  );
});

export const claimPoints = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if(!userId){
        throw new ApiError(400, "User Id is required.")
    }

    const points = Math.floor(Math.random()*10)+1;

    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $inc: { points } },
        { new: true }
    )

    if(!updatedUser){
        throw new ApiError(500, "User not found.")
    }

    const history = await historyModel.create({
        userId,
        pointsClamed: points
    });

    await history.save();

    return res.status(200).json(new ApiResponse(200,{
    name: updatedUser.name,
    newPoints: points,
    totalPoints: updatedUser.points
    }, "Points claimed successfully."))
})

export const getHistory = asyncHandler(async (req,res) => {
    const history = await historyModel.find()
             .sort({ createdAt: -1})
             .populate("userId", "name");

    return res.status(200).json(new ApiResponse(200, history, "History fatched successfully."))          
})
import { Router } from "express";
import { createUser, getLeaderboard, claimPoints, getHistory } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/create-user").post( createUser );
userRouter.route("/get-leaderboard").get( getLeaderboard );
userRouter.route("/claimpoints").post( claimPoints );
userRouter.route("/get-history").get( getHistory );

export default userRouter
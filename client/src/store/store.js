import {configureStore} from "@reduxjs/toolkit";
import leaderboardSlice from "./leaderboard.js"

export const store = configureStore({
    reducer:{
        leaderboard: leaderboardSlice
    }
})
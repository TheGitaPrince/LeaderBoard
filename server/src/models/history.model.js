import mongoose,{ Schema } from "mongoose"

const historySchema = new Schema({
   userId: {
     type: Schema.Types.ObjectId,
     ref: "User",
     required: true
   },
   pointsClamed:{
     type: Number,
     required: true
   }
},{ timestamps: true })

export const historyModel = mongoose.model("History", historySchema)
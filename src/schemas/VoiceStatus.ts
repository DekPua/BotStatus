import { model, Schema } from "mongoose";

export default model("VoiceStatus", new Schema({
    UserId: String,
    VoiceChannelId: String,
    ChannelType: String,
    StartAt: Date,
    EndAt: Date,
    TotalMinute: Number,
    Status: String
}, {
    timestamps: true
}));
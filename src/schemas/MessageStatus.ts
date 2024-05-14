import { model, Schema } from "mongoose";

export default model("MessageStatus", new Schema({
    UserId: String,
    ChannelId: String,
    ChannelType: Number,
    MessageId: String,
    Lenght: Number,
    CreateAt: Date
}, {
    timestamps: true
}));
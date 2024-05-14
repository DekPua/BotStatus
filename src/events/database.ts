import { Client, Events } from "discord.js";
import mongoose from "mongoose";

export default {
    name: Events.ClientReady,
    async execute(client: Client) {
        if (!process.env.MONGODB_URI) return;

        await mongoose.connect(process.env.MONGODB_URI);

        console.log(`${client.user?.tag} have connected to database!`);
    }
}
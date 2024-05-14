import { Client, GatewayIntentBits } from "discord.js";
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds
    ]
});

async function handelEvents(eventFiles: string[]) {
    for (const file of eventFiles) {
        const { default: event } = await import(`../src/events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

client.login(process.env.TOKEN)

handelEvents(fs.readdirSync("src/events").filter(file => file.endsWith(".ts")))
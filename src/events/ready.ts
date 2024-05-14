import { ActivityType, Client, Events } from "discord.js";
import { version } from '../../package.json';

export default {
    name: Events.ClientReady,
    async execute(client: Client) {
        console.log(`Logged in with ${client.user?.tag}`);

        client.user?.setPresence({ activities: [{ name: `V${version}`, type: ActivityType.Playing }]})

        setInterval(async () => {
            client.user?.setPresence({ activities: [{ name: `V${version}`, type: ActivityType.Playing }]})
        }, 10 * 1000);
    }
};
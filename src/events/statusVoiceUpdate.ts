import { Client, Events, VoiceChannel } from "discord.js";
import VoiceStatusSchema from '../schemas/VoiceStatus'

export default {
    name: Events.ClientReady,
    async execute(client: Client) {
        setInterval(async () => {
            try {
                const userOnlines = await VoiceStatusSchema.find({ Status: "online" });

                for (const user of userOnlines) {
                    if (!user.VoiceChannelId || !user.StartAt || !user.UserId) continue;
                
                    let voiceChannel;

                    try {
                        voiceChannel = await client.channels.fetch(user.VoiceChannelId) as VoiceChannel;
                    } catch (err) { }

                    if (!voiceChannel || voiceChannel.members.size === 0 || !voiceChannel.members.has(user.UserId)) {
                        const endAt = new Date();
                        const durationInMillis = endAt.getTime() - (user.StartAt as Date).getTime();
                        const durationInMinutes = Math.round(durationInMillis / 60000);

                        await VoiceStatusSchema.updateOne({
                            UserId: user.UserId,
                            VoiceChannelId: user.VoiceChannelId
                        }, {
                            Status: "ended",
                            EndAt: endAt,
                            TotalMinute: durationInMinutes
                        });
                    }
                }
            } catch (error) {
                console.error("Error updating voice status:", error);
            }
        }, 5000);
    }
};

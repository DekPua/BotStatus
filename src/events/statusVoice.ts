import { Client, Events, VoiceState } from "discord.js";
import VoiceStatusSchema from '../schemas/VoiceStatus'

export default {
    name: Events.VoiceStateUpdate,
    async execute(oldState: VoiceState, newState: VoiceState, client: Client) {
        if (!newState.channelId || newState.channelId == "1213473935707078786" || newState.member?.user.bot) return;

        const isAutoVoiceChannel = newState.channel?.parent?.id === "1213473826881544193";
        const channelType = isAutoVoiceChannel ? "AutoVoiceChannel" : "Normal";
        const userId = newState.member?.id;
        const voiceChannelId = newState.channelId;

        if (!userId) return;

        const alreadyHave = await VoiceStatusSchema.findOne({
            UserId: userId,
            VoiceChannelId: voiceChannelId,
            Status: "online"
        });

        if (alreadyHave) return;

        await VoiceStatusSchema.create({
            UserId: userId,
            VoiceChannelId: voiceChannelId,
            ChannelType: channelType,
            StartAt: new Date(),
            EndAt: null,
            TotalMinute: 0,
            Status: "online"
        });
    }
};
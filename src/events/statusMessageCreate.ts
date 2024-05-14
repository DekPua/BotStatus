import { ChannelType, Client, Events, Message } from "discord.js";
import MessageStatusSchema from '../schemas/MessageStatus'

export default {
    name: Events.MessageCreate,
    async execute(message: Message, client: Client) {
        if (message.author.bot) return;
    
        await MessageStatusSchema.create({
            UserId: message.author.id,
            ChannelId: message.channel.id,
            ChannelType: message.channel.type,
            MessageId: message.id,
            Lenght: message.content.length,
            CreateAt: new Date()
        });
    }
}
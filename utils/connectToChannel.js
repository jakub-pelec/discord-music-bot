const { createDiscordJSAdapter } = require("./adapter");
const {
    joinVoiceChannel,
    entersState,
    VoiceConnectionStatus,
} = require("@discordjs/voice");

module.exports = async (channel) => {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: createDiscordJSAdapter(channel),
    });
    try {
        await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
        return connection;
    } catch (error) {
        connection.destroy();
        throw error;
    }
};

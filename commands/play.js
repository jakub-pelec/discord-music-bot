const connectToChannel = require("../utils/connectToChannel");

module.exports = async (client, interaction) => {
    const channel = interaction.member.voice.channel;
    console.log(client.player.hasQueue())

    if (channel) {
        try {
            await connectToChannel(channel);
            const queue = client.player.createQueue(interaction.guild.id);
            await queue.join(channel);
            const song = await queue
                .play(interaction.options.get("url").value)
                .catch((_) => {
                    if (!guildQueue) queue.stop();
                });

            interaction.reply("Playing new song!");
        } catch (error) {
            console.error(error);
        }
    } else {
        interaction.reply("Join a voice channel then try again!");
    }
};

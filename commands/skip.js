module.exports = async (client, interaction) => {
    const guildQueue = client.player.getQueue(interaction.guild.id);
    try {
        guildQueue.skip();
        interaction.reply("Skipped!");
    } catch (error) {
        console.error(error);
    }
};

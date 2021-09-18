const playMusic = require("../commands/play");

module.exports = (client) =>
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        if (commandName === "ping") {
            await interaction.reply("Pong!");
        } else if (commandName === "server") {
            await interaction.reply("Server info.");
        } else if (commandName === "user") {
            await interaction.reply("User info.");
        } else if (commandName === "play") {
            playMusic(client, interaction);
        }
    });

const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token, guildId } = require('./config')

const commands = [
    new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays music")
        .addStringOption((option) =>
            option.setName("URL").setDescription("URL").setRequired(true)
        ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });

        console.log("Successfully registered application commands.");
    } catch (error) {
        console.error(error);
    }
})();

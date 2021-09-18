const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const clientId = "861955919951560714";
const token = "ODYxOTU1OTE5OTUxNTYwNzE0.YORVAQ.wtJI-nBbz_Q26xdnsrpfYukH6pk";
const guildId = "323172248053743628";

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

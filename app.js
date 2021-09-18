const { Client, Intents } = require("discord.js");
const { Player } = require("discord-music-player");
const { token } = require("./config");
const register = require("./handlers/register");
const connectToChannel = require('./utils/connectToChannel');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

const player = new Player(client, {
    leaveOnEmpty: false,
});

client.player = player;
register(client);

client.login(token);

client.on('interactionCreate', async(interaction) => {
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
})

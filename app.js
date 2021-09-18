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
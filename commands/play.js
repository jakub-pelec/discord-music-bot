const { default: axios } = require("axios");
const connectToChannel = require("../utils/connectToChannel");
const { ytApiKey } = require("../config");

module.exports = async (client, interaction) => {
    const channel = interaction.member.voice.channel;
    const videoUrl = interaction.options.get("url").value;
    const videoId = new URL(videoUrl).searchParams.get("v");
    const apiURL = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&part=status&id=${videoId}&key=${ytApiKey}`;
    const resp = await axios.get(apiURL);
    const { items } = resp.data;
    const {
        snippet: { title },
        contentDetails: { duration },
    } = items[0];
    const time = duration.split("PT")[1];
    const normalizedDuration = {
        minutes: time.split("M")[0],
        seconds: time.split("M")[1].substring(0, time.split("M").length - 1),
    };

    if (channel) {
        try {
            await connectToChannel(channel);
            const queue = client.player.createQueue(interaction.guild.id);
            await queue.join(channel);
            const song = await queue.play(videoUrl).catch((_) => {
                if (!guildQueue) queue.stop();
            });

            interaction.reply(
                `${title} (${normalizedDuration.minutes.padStart(
                    2,
                    "0"
                )}:${normalizedDuration.seconds.padStart(
                    2,
                    "0"
                )}) added to queue!`
            );
        } catch (error) {
            console.error(error);
        }
    } else {
        interaction.reply("Join a voice channel then try again!");
    }
};

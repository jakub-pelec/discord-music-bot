const connectToChannel = require("../utils/connectToChannel");

module.exports = (client) =>
    client.on("messageCreate", async (message) => {
        if (!message.guild) return;
    });

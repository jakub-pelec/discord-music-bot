const ready = require("./ready");
const messageCreate = require("./messageCreate");
const interactionCreate = require("./interactionCreate");
const songAdd = require("./songAdd");

module.exports = (client) => {
    ready(client);
    messageCreate(client);
    // interactionCreate(client);
    songAdd(client);
};

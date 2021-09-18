module.exports = (client) =>
    client.on("songAdd", (q, s) => {
        console.log("q", q);
        console.log("s", s);
    });

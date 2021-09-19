const { default: axios } = require("axios");
const { ytApiKey } = require("./config");

const getSongDetails = async (videoId) => {
    const resp = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&part=status&id=${videoId}&key=${ytApiKey}`
    );
    return resp.data;
};

const searchWithKeywords = async (keywords) => {
    const query = keywords.split(" ").join("%20");
    const resp = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${ytApiKey}`
    );
    return resp.data;
};

module.exports = {
    getSongDetails,
    searchWithKeywords,
};

module.exports = (string) => {
    try {
        return Boolean(new URL(string));
    } catch (e) {
        return false;
    }
};

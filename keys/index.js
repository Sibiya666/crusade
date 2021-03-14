module.exports = process.env.NODE_ENV === "productions" ? require("./prod") : require("./dev");

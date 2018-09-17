//test to search a video on YouTube
const settings = require("settings.json"),
    client = new(require("../LavalinkREST.js"))(settings);


//pretty random anime song
console.log(client.resolve("MIIRO", true));
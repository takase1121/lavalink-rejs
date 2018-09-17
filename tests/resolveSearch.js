//test to search a video on YouTube
const settings = require("./settings.json"),
    client = new(require("../LavalinkREST.js"))(settings);


//pretty random anime song
client.resolve("MIIRO", true).then(x => console.log(x));
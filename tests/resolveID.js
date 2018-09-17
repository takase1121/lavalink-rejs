// a test with a video ID and a playlist ID
const settings = require("settings.json"),
    client = new(require("../LavalinkREST.js"))(settings);


//audio test video
console.log(client.resolve("2ZrWHtvSog4"));

//audio test playlist
console.log(client.resolve("PLYVsml1j1og26_LFIGinKHj7dpru2UgMG"));

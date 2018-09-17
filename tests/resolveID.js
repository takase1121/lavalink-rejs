// a test with a video ID and a playlist ID
const settings = require("./settings.json"),
    client = new(require("../LavalinkREST.js"))(settings);


//audio test video
client.resolve("2ZrWHtvSog4").then(x => console.log(x));

//audio test playlist
client.resolve("PLYVsml1j1og26_LFIGinKHj7dpru2UgMG").then(x => console.log(x));

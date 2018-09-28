//test is now merged into one file
const settings = require("./settings.json"),
    client = new(require("../LavalinkREST"))(settings);


//single full link video
client.resolve("https://www.youtube.com/watch?v=6tOnKPDtqlo").then(x => console.log(x));

//single short link video
client.resolve("https://youtu.be/U5Gl5FrlMWk").then(x => console.log(x));

//playlist link
client.resolve("https://www.youtube.com/playlist?list=PLWDdhA90m6kAeGuFtHLbudBgDByZZx9av").then(x => console.log(x));

//search on YouTube
client.resolve("MIIRO").then(x => console.log(x));

//search on SoundCloud
client.resolve("MIIRO", "sc").then(x => console.log(x));
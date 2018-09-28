const fetch = require("node-fetch");


const state = {
        good: ["TRACK_LOADED", "PLAYLIST_LOADED", "SEARCH_RESULT"],
        bad: ["NO_MATCHES"],
        fatal: ["LOAD_FAILED"]
    },
    ytRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/i

class LavalinkClient {
    /**
     * Constructs a Lavalink REST Client.
     * @class
     * @prop {Object} options The options for the REST API
     * @prop {Number} options.port=2333 The port.
     * @prop {String} options.host="localhost" The host.
     * @prop {String} options.password The password.
     */
    constructor(options) {
        this.port = options.port || 2333;
        this.host = options.host || "localhost";
        this.password = options.password || "";
    }


    /**
     * Resolve something. When searching, this method returns null if there are no matches.
     * @param {String} query The query to resolve.
     * @param {Boolean} [search] The search type. Currently supports "yt" and "sc".
     * @returns {Object|Array}
     */
    async resolve(query, search = "yt") {
        if (!query) return null;

        if (!query.match(ytRegex)) {
            query = encodeURIComponent(`${search.toLowerCase()}search:${query}`);
        }

        let res = await fetch(`http://${this.host}:${this.port}/loadtracks?identifier=${query}`, {
            headers: {
                Authorization: this.password
            }
        });
        res = await res.json();

        if (state.fatal.includes(res.loadType)) throw "FATAL ERROR FROM LAVALINK REST API. 'LOAD_FAILED' RECEIVED."

        if (state.bad.includes(res.loadType)) return null;

        //playlist handling
        if (res.loadType === "PLAYLIST_LOADED") {
            res.tracks.meta = {
                name: res.playlistInfo.name,
                query: query
            };
            return res.tracks;
        }

        if (res.loadType === "TRACK_LOADED") {
            return { ...res.tracks[0],
                query
            };
        }

        if (res.loadType === "SEARCH_RESULT") {
            return { ...res,
                query
            };
        }
    }
}

module.exports = LavalinkClient;

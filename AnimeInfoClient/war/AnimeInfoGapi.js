var utils;
(function (utils) {
    var AnimeInfoGapi;
    (function (AnimeInfoGapi) {
        var ROOT = 'https://animeinfoserver.appspot.com/_ah/api';
        function loadGapi(callback) {
            gapi.client.load('animeInfo', 'v1', callback, ROOT);
        }
        AnimeInfoGapi.loadGapi = loadGapi;
        function getAnime(callback, period) {
            if (period === void 0) { period = null; }
            gapi.client.animeInfo.get.anime({ period: period }).execute(callback);
        }
        AnimeInfoGapi.getAnime = getAnime;
        function putAnime(anime, callback) {
            gapi.client.animeInfo.put.anime({ items: [anime] }).execute(callback);
        }
        AnimeInfoGapi.putAnime = putAnime;
        function deleteAnime(id, callback) {
            gapi.client.animeInfo.erase.anime({ ids: [id] }).execute(callback);
        }
        AnimeInfoGapi.deleteAnime = deleteAnime;
        function getPeriod(callback) {
            gapi.client.animeInfo.get.period().execute(callback);
        }
        AnimeInfoGapi.getPeriod = getPeriod;
    })(AnimeInfoGapi = utils.AnimeInfoGapi || (utils.AnimeInfoGapi = {}));
})(utils || (utils = {}));
//# sourceMappingURL=AnimeInfoGapi.js.map
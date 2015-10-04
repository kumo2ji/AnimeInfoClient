/// <reference path="scripts/typings/gapi/gapi.animeinfo.d.ts" />
var utils;
(function (utils) {
    var LocalStorage;
    (function (LocalStorage) {
        var ANIME_INFOS_KEY = 'animeInfos';
        function getAnimeInfos() {
            return JSON.parse(localStorage.getItem(ANIME_INFOS_KEY));
        }
        LocalStorage.getAnimeInfos = getAnimeInfos;
        function setAnimeInfos(animeInfos) {
            localStorage.setItem(ANIME_INFOS_KEY, JSON.stringify(animeInfos));
        }
        LocalStorage.setAnimeInfos = setAnimeInfos;
    })(LocalStorage = utils.LocalStorage || (utils.LocalStorage = {}));
})(utils || (utils = {}));
//# sourceMappingURL=LocalStorage.js.map
/// <reference path="scripts/typings/gapi/gapi.animeinfo.d.ts" />
namespace utils.LocalStorage {
    const ANIME_INFOS_KEY = 'animeInfos'
    export function getAnimeInfos(): Array<gapi.client.animeInfo.AnimeInfo> {
        return JSON.parse(localStorage.getItem(ANIME_INFOS_KEY))
    }
    export function setAnimeInfos(animeInfos: Array<gapi.client.animeInfo.AnimeInfo>) {
        localStorage.setItem(ANIME_INFOS_KEY, JSON.stringify(animeInfos))
    }
}
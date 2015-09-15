/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/gapi/gapi.animeinfo.d.ts" />
namespace gapiUtils {
    import Response = gapi.client.animeInfo.Response
    import AnimeInfo = gapi.client.animeInfo.AnimeInfo
    import CoursObject = gapi.client.animeInfo.CoursObject
    const ROOT = 'https://animeinfoserver.appspot.com/_ah/api'

    export function loadGapi(callback: () => void) {
        gapi.client.load('animeInfo', 'v1', callback, ROOT)
    }

    export function getAnime(callback: (resp: Response<AnimeInfo>) => void, coursObject: CoursObject = null) {
        gapi.client.animeInfo.get.anime({ coursObject: coursObject }).execute(callback)
    }

    export function getCoursObjects(callback: (resp: Response<CoursObject>) => void) {
        gapi.client.animeInfo.get.cours().execute(callback)
    }
}
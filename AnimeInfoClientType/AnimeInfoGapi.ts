namespace utils.AnimeInfoGapi {
    import Response = gapi.client.animeInfo.Response
    import AnimeInfo = gapi.client.animeInfo.AnimeInfo
    import Period = gapi.client.animeInfo.Period
    import IdRequest = gapi.client.animeInfo.IdRequest
    import BooleanResponse = gapi.client.animeInfo.BooleanResponse
    const ROOT = 'https://animeinfoserver.appspot.com/_ah/api'

    export function loadGapi(callback: () => void) {
        gapi.client.load('animeInfo', 'v1', callback, ROOT)
    }

    export function getAnime(callback: (resp: Response<AnimeInfo>) => void, period: Period = null) {
        gapi.client.animeInfo.get.anime({ period: period }).execute(callback)
    }

    export function putAnime(anime: AnimeInfo, callback: (resp: Response<AnimeInfo>) => void) {
        gapi.client.animeInfo.put.anime({ items: [anime] }).execute(callback)
    }

    export function deleteAnime(id: number, callback: (resp: BooleanResponse) => void) {
        gapi.client.animeInfo.erase.anime({ ids: [id] }).execute(callback)
    }

    export function getPeriod(callback: (resp: Response<Period>) => void) {
        gapi.client.animeInfo.get.period().execute(callback)
    }
}